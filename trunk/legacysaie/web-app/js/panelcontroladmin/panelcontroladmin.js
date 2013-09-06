
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
                                                                    editable:false,
                                                                    triggerAction:'all',
                                                                    displayField:'descripcion',
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
                                                                                                'fechadesde':Ext.getCmp('fechaexamendesdeId').getRawValue(),
                                                                                                'fechahasta':Ext.getCmp('fechaexamenhastaId').getRawValue()
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
                                                                {header: "Nº de Documento",width:90,sortable:false,dataIndex:'numerodocumento'},
                                                                {header: "Nombre de Alumno",width:120,sortable:false,dataIndex:'nombrealumno'},
                                                                {header: "E-mail",width:270,sortable:false,dataIndex:"email"},
                                                                {header: "Tiene Usuario?",width:270,sortable:false,dataIndex:"tieneusuario"},
                                                                {header: "Ver",width:270,sortable:false,dataIndex:"id"}
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
                                                title:'Carga de Notas',
                                                id:'formcargadenotasId',
                                                frame:true,
                                                width:650,
                                                height:450,
                                                items:[
                                                    {
                                                        xtype:'combo',
                                                        fieldLabel:'Año Lectivo',
                                                        id:'comboaniolectivonotasId',
                                                        mode:'local',
                                                        editable:false,
                                                        displayField:'descripcion',
                                                        valueField:'id',
                                                        triggerAction:'all',
                                                        hiddenName:'aniolectivo_id',
                                                        store: new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:aniolectivoUrl,
                                                            fields:['id','descripcion'],
                                                            autoLoad:true
                                                        }),
                                                        listeners:{
                                                            select:function(combobox,record,index){
                                                                Ext.getCmp('combomaterianotasId').clearValue();
                                                                Ext.getCmp('comboexamencargadoId').clearValue();
                                                                Ext.getCmp('combomaterianotasId').getStore().load({
                                                                    params:{
                                                                        //docente_id:docenteId,
                                                                        aniolectivo_id:Ext.getCmp('comboaniolectivonotasId').hiddenField.value
                                                                    }
                                                                });
                                                                Ext.getCmp('comboexamencargadoId').getStore().load({
                                                                    params:{
                                                                        //docente_id:docenteId,
                                                                        aniolectivo_id:Ext.getCmp('comboaniolectivonotasId').hiddenField.value,
                                                                        materia_id:0
                                                                    }
                                                                });

                                                            }
                                                        }

                                                    },
                                                    {
                                                        xtype:'combo',
                                                        fieldLabel:'Materia',
                                                        id:'combomaterianotasId',
                                                        mode:'local',
                                                        displayField:'denominacion',
                                                        editable:false,
                                                        triggerAction:'all',
                                                        valueField:'id',
                                                        width:350,
                                                        hiddenName:'materia_id',
                                                        store: new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:docentemateriaUrl,
                                                            fields:['id','denominacion'],
                                                            autoLoad:false
                                                        }),
                                                        listeners:{
                                                            select:function(combobox,record,index){
                                                                Ext.getCmp('comboexamencargadoId').clearValue();
                                                                Ext.getCmp('comboexamencargadoId').getStore().load({
                                                                    params:{
                                                                        //docente_id:docenteId,
                                                                        aniolectivo_id:Ext.getCmp('comboaniolectivonotasId').hiddenField.value,
                                                                        materia_id:Ext.getCmp('combomaterianotasId').hiddenField.value
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype:'combo',
                                                        fieldLabel:'Examen Cargado',
                                                        id:'comboexamencargadoId',
                                                        mode:'local',
                                                        editable:false,
                                                        displayField:'descripcion',
                                                        triggerAction:'all',
                                                        valueField:'id',
                                                        width:350,
                                                        hiddenName:'examencargado_id',
                                                        store: new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:fechaexamenesnotasUrl,
                                                            fields:['id','descripcion'],
                                                            autoLoad:false
                                                        }),
                                                        listeners:{
                                                            select:function(combobox,record,index){
                                                                Ext.getCmp('gridfechasdeexamenId').setTitle(
                                                                    Ext.getCmp('comboaniolectivonotasId').getRawValue()+', '
                                                                        +Ext.getCmp('combomaterianotasId').getRawValue()+', '
                                                                        +Ext.getCmp('comboexamencargadoId').getRawValue()
                                                                );
                                                                Ext.getCmp('gridfechasdeexamenId').getStore().load({
                                                                    params:{
                                                                        cargaexamen_id:Ext.getCmp('comboexamencargadoId').hiddenField.value
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }/*,

                                                    new Ext.grid.GridPanel({
                                                        id:'gridfechasdeexamenId',
                                                        title:' ',
                                                        stripeRows:true,
                                                        store:new Ext.data.JsonStore({
                                                            reader:new Ext.data.JsonReader({root:'rows',id:'id',fields: RecordNotas}),
                                                            root:'rows',
                                                            url:notasexamenesUrl,
                                                            fields:['id','nombrealumno','nota']
                                                            ,autoLoad:false
                                                            ,listeners:{
                                                                update:function(thisstore,record,operacion){
                                                                    var conn = new Ext.data.Connection();
                                                                    conn.request({
                                                                        url:updatenotaUrl
                                                                        ,method:'GET'
                                                                        ,params:{
                                                                            id:record.data.id
                                                                            ,nota:record.data.nota
                                                                        },
                                                                        success: function(resp,opt){
                                                                        },
                                                                        failure: function(resp,opt){

                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }),
                                                        plugins: [editor],
                                                        columns: [
                                                            {header: "Id",width:100,sortable:false,dataIndex:'id',hidden:true},
                                                            {header: "Alumno",width:350,sortable:false,dataIndex:'nombrealumno'},
                                                            {header: "Nota",width:150,sortable:false,dataIndex:"nota"
                                                                ,xtype:'numbercolumn'
                                                                ,align:'right',renderer: Ext.util.Format.numberRenderer('0,0.00/i')
                                                                ,editor:{xtype:'numberfield',allowBlank:false,decimalPrecision:2
                                                                ,decimalSeparator:'.',maxValue:10,minValue:0}}
                                                        ],
                                                        stripeRows: true,
                                                        height:350,
                                                        width:600,
                                                        loadMask:true,
                                                        iconCls: 'icon-grid',
                                                        listeners:{
                                                        }
                                                    })
                                                    */
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