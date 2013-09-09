var winalumno;
function verUsuarioAlumno(){
    //var gridrecord = pGrid.getSelectionModel().getSelected();
    //var rowIndex = reservationsGrid.getStore().getAt(gridrecord[1]);
    if(!winalumno){
        winalumno = new Ext.Window({
            layout:'fit',
            width:500,
            height:300,
            modal:true,
            //closeAction:'hide'
            plain:true,
            items:[
                {
                    xtype:'form',
                    frame:true,
                    border:false,
                    items:[
                        {
                            xtype:'textfield',
                            fieldLabel:'Nº Documento',
                            id:'documentoalumnoId',
                            name:'documentoalumno'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Nombre Docente',
                            id:'nombrealumnoId',
                            name:'nombrealumno'
                        },{
                            xtype:'textfield',
                            fieldLabel:'E-mail',
                            id:'emailalumnoId',
                            name:'emailalumno'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Tiene Usuario',
                            id:'tieneusuarioalumnoId',
                            name:'tieneusuarioalumno'
                        }
                    ],buttons:[
                        {
                            text:'Crear usuario'
                        },{
                            text:'Enviar correo'
                        },{
                            text:'Cancelar'
                            ,handler:function(){
                                winalumno.close();
                            }
                        }
                    ]
                }
            ]

        });
        winalumno.show();
    }
}
Ext.onReady(function(){
    Ext.QuickTips.init();


    function processRowExpander(record, body, rowIndex){
        if(Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
            var innerRowDiv=Ext.DomQuery.select("div.detailData",body)[0];
            var nestedGrid = new Ext.grid.GridPanel({
                id:'griddetalleexamenId',
                stripeRows:true,
                store:storeplanillaexamen,
                columns: [
                    {header: "id",dataIndex:'id',hidden:false},
                    {header: "Alumno",width:200,sortable:false,dataIndex:'nombrealumno'},
                    {header: "Nota", width:80,dataIndex:"nota",align:'right',renderer: Ext.util.Format.numberRenderer('00,00/i')}
                ],
                stripeRows: true,
                height:250,
                width:500,
                loadMask:true,
                title:'Planilla de Alumnos',
                iconCls: 'icon-grid',
                listeners:{
                },
                renderTo: innerRowDiv,
                listeners: {
                    cellclick: function(grid,rowIndex, columnIndex,e){
                        e.stopEvent();
                    },
                    headerclick:function(grid,columnIndex,e){
                        e.stopEvent();
                    }
                }
            });
            storeplanillaexamen.load({
                params:{
                    cargaexamen_id:record.data.id
                }
            });

        }
    }





    var nestedRowGrid = new Ext.grid.RowExpander({
        tpl: new Ext.XTemplate('<div class="detailData">','','</div>'),
        listeners:
        {
            expand:function(ex,record,body,rowIndex){
                processRowExpander(record,body,rowIndex);
            },
            collapse : function(ex,record,body,rowIndex){

            }
        }
    });

    var usuariosAlumnosStore = new Ext.data.JsonStore({
        root:'rows',
        url:usuariosalumnosUrl,
        fields:['id','numerodocumento','nombrealumno','email','tieneusuario']
    });

    var usuariosDocentesStore = new Ext.data.JsonStore({
        root:'rows',
        url:usuariosdocentesUrl,
        fields:['id','numerodocumento','nombredocente','email','tieneusuario']
    });

    var viewport = new Ext.Viewport(
        {
            layout:'border',
            items:[
                new Ext.BoxComponent({
                    region:'north',
                    height:50
                    /*autoEl:{
                     tag:'div',
                     html:'<p>SUPRA PEZON</p>'
                     } */
                }),
                {
                    region:'center',
                    xtype: 'grouptabpanel',
                    tabWidth: 200,
                    activeGroup: 0,
                    items: [
                        {
                            expanded:true,
                            items:[
                                {
                                    title:usuario,
                                    iconCls: 'x-icon-templates',
                                    tabTip: 'Templates tabtip',
                                    style: 'padding: 10px;'//,
                                    ,items:[

                                ]
                                },{
                                    title:'Cerrar Sesión',
                                    iconCls: 'x-icon-close-session',
                                    tabTip: 'Cierra su sesión de Usuario',
                                    style: 'padding: 10px;',
                                    listeners:{
                                        afterrender : function(component){
                                            window.location = cerrarSesionUrl;

                                        }
                                    }

                                }
                            ]
                        },
                        {
                            mainItem: 1,
                            items: [
                                {
                                    title: 'Usuarios de Alumnos',
                                    layout: 'fit',
                                    iconCls: 'x-icon-insc-final',
                                    tabTip: 'Manejo de Usuarios',
                                    style: 'padding: 10px;',
                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    width:700,
                                                    title:'Listado de Usuarios de Alumnos',
                                                    height:450,
                                                    frame:true,
                                                    style: 'margin:0 auto;margin-top:50px;',
                                                    items:[
                                                        {

                                                            xtype:'fieldset',
                                                            //width:400,
                                                            title:'Filtros',
                                                            items:[
                                                                {
                                                                    xtype:'combo',
                                                                    fieldLabel:'Carrera',
                                                                    id:'combocarreraId',
                                                                    mode:'local',
                                                                    valueField:'id',
                                                                    hiddenField:'id',
                                                                    editable:false,
                                                                    triggerAction:'all',
                                                                    displayField:'denominacion',
                                                                    hiddenName:'carrera_id',
                                                                    store:new Ext.data.JsonStore({
                                                                        root:'rows',
                                                                        url:carreraUrl,
                                                                        fields:['id','denominacion'],
                                                                        autoLoad:true
                                                                    }),
                                                                    listeners:{
                                                                        select:function(combo,record,index){
                                                                            Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                                params:{
                                                                                    carrera_id:Ext.getCmp('combocarreraId').hiddenField.value
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                },{
                                                                    xtype:'combo',
                                                                    fieldLabel:'Año Lectivo',
                                                                    id:'comboaniolectivoId',
                                                                    mode:'local',
                                                                    valueField:'id',
                                                                    hiddenField:'id',
                                                                    editable:false,
                                                                    triggerAction:'all',
                                                                    displayField:'descripcion',
                                                                    hiddenName:'aniolectivo_id',
                                                                    store:new Ext.data.JsonStore({
                                                                        root:'rows',
                                                                        url:anioslectivosUrl,
                                                                        fields:['id','descripcion'],
                                                                        autoLoad:true
                                                                    })
                                                                },{
                                                                    layout:'column',
                                                                    frame:true,
                                                                    border:false,
                                                                    items:[
                                                                        {
                                                                            layout:'form',
                                                                            border:false,
                                                                            width:'80%',

                                                                            items:{
                                                                                xtype:'textfield',
                                                                                fieldLabel:'Filtrar por nombre de alumno',
                                                                                msgTarget:'under',
                                                                                anchor:'-10 ',
                                                                                id:'filtronombrealumnoId'
                                                                            }
                                                                        },{
                                                                            layout:'form',
                                                                            border:false,
                                                                            width:'20%',
                                                                            items:{
                                                                                xtype:'button',
                                                                                text:'Buscar',
                                                                                listeners:{
                                                                                    click:function(){
                                                                                        Ext.getCmp('gridusuariosalumnosId').getStore().load({
                                                                                            params:{
                                                                                                'carrera_id':Ext.getCmp('combocarreraId').hiddenField.value,
                                                                                                'aniolectivo_id':Ext.getCmp('comboaniolectivoId').hiddenField.value,
                                                                                                'filtronombre':Ext.getCmp('filtronombrealumnoId').getRawValue()
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        new Ext.grid.GridPanel({
                                                            id:'gridusuariosalumnosId',
                                                            store:usuariosAlumnosStore,
                                                            width:690,
                                                            height:250,
                                                            columns: [
                                                                {header: "Nº de Documento",width:100,sortable:false,dataIndex:'numerodocumento'},
                                                                {header: "Nombre de Alumno",width:200,sortable:false,dataIndex:'nombrealumno'},
                                                                {header: "E-mail",width:100,sortable:false,dataIndex:"email"},
                                                                {header: "Tiene Usuario?",width:90,sortable:false,dataIndex:"tieneusuario"
                                                                    ,xtype:'checkcolumn'},
                                                                {header: "Ver",width:60,sortable:false,dataIndex:"id",
                                                                    renderer: function (val, meta, record) {
                                                                    return '<a   href="#" onclick="verUsuarioAlumno()"><img style="margin-left:15px " src="'+pdfUrl+'"></a>';
                                                                }}
                                                            ],
                                                            loadMask:true,
                                                            bbar: new Ext.PagingToolbar({
                                                                pageSize: 10,
                                                                store: usuariosAlumnosStore,
                                                                displayInfo:true,
                                                                displayMsg: 'Visualizando registros {0} - {1} de {2}',
                                                                emptyMsg: 'No hay registros para visualizar'
                                                            })

                                                        })
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },{
                                    xtype: 'portal',
                                    title: 'Administración de Usuarios',
                                    tabTip: 'Manejo de Usuarios'
                                }, {
                                    title: 'Usuarios de Docentes',
                                    iconCls: 'x-icon-insc-regular',
                                    tabTip: 'Manejo de usuarios docentes',
                                    style: 'padding: 10px;',
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'panel',
                                        activeTab: 1,
                                        items:[
                                            {
                                                xtype:'form',
                                                style: 'margin:0 auto;margin-top:50px;',
                                                title:'Usuarios Docentes',
                                                id:'formcargadenotasId',
                                                frame:true,
                                                width:700,
                                                height:400,
                                                items:[
                                                    {
                                                        layout:'column',
                                                        frame:false,
                                                        width:500,
                                                        border:false,
                                                        items:[
                                                                {
                                                                    layout:'form',
                                                                    border:false,
                                                                    width:'80%',
                                                                    items:[
                                                                        {
                                                                            xtype:'textfield',
                                                                            fieldLabel:'Filtrar por Nombre',
                                                                            labelWidth:250,
                                                                            anchor:'-10',
                                                                            id:'filtronombreId'
                                                                        }
                                                                    ]
                                                                },{
                                                                    layout:'form',
                                                                    border:false,
                                                                    width:'20%',
                                                                    items:[
                                                                        {
                                                                            xtype:'button',
                                                                            text:'Filtrar'
                                                                        }
                                                                    ]

                                                                }
                                                        ]
                                                    }, new Ext.grid.GridPanel({
                                                            id:'gridusuariosdocentesId',
                                                            store:usuariosDocentesStore,
                                                            width:690,
                                                            height:300,
                                                            columns: [
                                                                {header: "Nº de Documento",width:100,sortable:false,dataIndex:'numerodocumento'},
                                                                {header: "Nombre del Docente",width:120,sortable:false,dataIndex:'nombredocente'},
                                                                {header: "E-mail",width:270,sortable:false,dataIndex:"email"},
                                                                {header: "Tiene Usuario?",width:100,sortable:false,dataIndex:"tieneusuario"
                                                                    ,xtype:'checkcolumn'},
                                                                {header: "Ver",width:80,sortable:false,dataIndex:"id"}
                                                            ],
                                                            loadMask:true,
                                                            bbar: new Ext.PagingToolbar({
                                                                pageSize: 10,
                                                                store: usuariosDocentesStore,
                                                                displayInfo:true,
                                                                displayMsg: 'Visualizando registros {0} - {1} de {2}',
                                                                emptyMsg: 'No hay registros para visualizar'
                                                            })

                                                        })
                                                ]
                                            }
                                        ]
                                    }]
                                }
                            ]
                        }


                    ]
                }
            ]
        });
});