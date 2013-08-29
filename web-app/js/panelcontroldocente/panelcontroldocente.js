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

        var FechaExamenStore = new Ext.data.JsonStore({
            root:'rows',
            url:fechaexamenUrl,
            fields:['id','fecha','aniolectivo','carrera','materia','titulo','tipo','modalidad'],
            baseParams:{
                docente_id:docenteId
            },
            autoLoad:true
        });

        var viewport = new Ext.Viewport(
            /*{
              id:'logopanelId'
              ,layout:'fit'
              ,autoEl:{tag:'img',src:logoUrl,width:100,height:100}
            }, */
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
                                    title:docente,
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
                                    title: 'Fecha de Exámenes',
                                    layout: 'fit',
                                    iconCls: 'x-icon-insc-final',
                                    tabTip: 'Registrar Inscripción en examen final',
                                    style: 'padding: 10px;',

                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    width:700,
                                                    title:'Listado de Exámenes',
                                                    height:450,
                                                    style: 'margin:0 auto;margin-top:50px;',
                                                    items:[
                                                        new Ext.grid.GridPanel({
                                                            id:'gridfechaexamenesId',
                                                            store:FechaExamenStore,
                                                            width:700,
                                                            height:450,
                                                            columns: [
                                                                {header: "id",dataIndex:'id',hidden:true},
                                                                {header: "Fecha",width:80,sortable:false,dataIndex:'fecha'},
                                                                {header: "Año Lectivo",width:120,sortable:false,dataIndex:'aniolectivo'},
                                                                {header: "Carrera",width:270,sortable:false,dataIndex:"carrera"},
                                                                {header: "Materia",width:270,sortable:false,dataIndex:"materia"},
                                                                {header: "Título",width:270,sortable:false,dataIndex:"titulo"},
                                                                {header: "Tipo",width:100,sortable:false,dataIndex:"tipo"},
                                                                {header: "Modalidad",width:100,sortable:false,dataIndex:"modalidad"}
                                                            ],
                                                            loadMask:true,
                                                            bbar: new Ext.PagingToolbar({
                                                                pageSize: 10,
                                                                store: FechaExamenStore,
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
                                    title: 'Exámenes',
                                    tabTip: 'Fechas de Exámenes Exámenes'
                                }, {
                                    title: 'Carga de Notas',
                                    iconCls: 'x-icon-insc-regular',
                                    tabTip: 'Inscripciones para el cursado',
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
                                                                    Ext.getCmp('combomaterianotasId').getStore().load({
                                                                        params:{
                                                                            docente_id:docenteId,
                                                                            aniolectivo_id:Ext.getCmp('comboaniolectivonotasId').hiddenField.value
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
                                                                        Ext.getCmp('comboexamencargadoId').getStore().load({
                                                                            params:{
                                                                                docente_id:docenteId,
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
                                                                        var rowselected = Ext.getCmp('comboexamencargadoId').getStore().getAt(0);
                                                                        Ext.getCmp('gridfechasdeexamenId').getStore().load({
                                                                            params:{
                                                                                cargaexamen_id:rowselected.id
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                        },

                                                        new Ext.grid.GridPanel({
                                                                id:'gridfechasdeexamenId',
                                                                stripeRows:true,
                                                                store:new Ext.data.JsonStore({
                                                                    root:'rows',
                                                                    url:notasexamenesUrl,
                                                                    fields:['id','carrera','aniolectivo','materia','nivel']
                                                                    ,autoLoad:false
                                                                }),
                                                                columns: [
                                                                    {header: "Id",width:100,sortable:false,dataIndex:'id',hidden:true},
                                                                    {header: "Alumno",width:350,sortable:false,dataIndex:'alumnonombre'},
                                                                    {header: "Nota",width:150,sortable:false,dataIndex:"nota"}
                                                                ],
                                                                stripeRows: true,
                                                                height:350,
                                                                width:600,
                                                                loadMask:true,
                                                                iconCls: 'icon-grid',
                                                                listeners:{
                                                                }
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