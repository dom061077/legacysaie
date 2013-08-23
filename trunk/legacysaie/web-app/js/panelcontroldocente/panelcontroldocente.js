Ext.onReady(function(){

        var viewport = new Ext.Viewport({
            layout:'fit',
            items:[
                {
                    xtype: 'grouptabpanel',
                    tabWidth: 200,
                    activeGroup: 0,
                    items: [

                        {
                            expanded:true,
                            items:[
                                {
                                    title:'Docente: Medina',
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
                                            //window.location = cerrarSesionUrl;

                                        }
                                    }

                                }
                            ]
                        },
                        {
                            mainItem: 1,
                            items: [
                                {
                                    title: 'Exámenes',
                                    layout: 'fit',
                                    iconCls: 'x-icon-insc-final',
                                    tabTip: 'Registrar Inscripción en examen final',
                                    style: 'padding: 10px;',

                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[

                                            ]
                                        }
                                    ]
                                },{
                                    xtype: 'portal',
                                    title: 'Inscripciones',
                                    tabTip: 'Inscripciones'
                                }, {
                                    title: 'Inscribirme en Cursado',
                                    iconCls: 'x-icon-insc-regular',
                                    tabTip: 'Inscripciones para el cursado',
                                    style: 'padding: 10px;',
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'panel',
                                        activeTab: 1,
                                        items:[
                                        ]
                                    }]
                                }, {
                                    title: 'Listado de Inscripciones',
                                    iconCls: 'x-icon-insc-listado',
                                    tabTip: 'Lista todas tus inscripciones',
                                    style: 'padding: 10px;',
                                    layout:'fit',
                                    items:[
                                        {
                                            xtype:'panel',
                                            items:[

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, {
                            expanded: true,
                            items: [

                                {
                                    title: 'Mis Cuotas',
                                    layout:'fit',
                                    iconCls: 'x-icon-configuration',
                                    tabTip: 'Configuration tabtip',
                                    style: 'padding: 10px;',//,
                                    items:[
                                    ]
                                }, {
                                    title: 'Impresión de Recibos',
                                    iconCls: 'x-icon-impresion-recibos',
                                    tabTip: 'Impresión de Recibo Rapipago',
                                    style: 'padding: 10px;'//,
                                    //html: Ext.example.shortBogusMarkup
                                }, {
                                    title: 'Estado de Deudas',
                                    iconCls: 'x-icon-listado-deudas',
                                    tabTip: 'Listado de Deudas',
                                    style: 'padding: 10px;'//,
                                    //html: Ext.example.shortBogusMarkup
                                }
                            ]
                        },{
                            expanded:true,
                            items:[
                                {
                                    title:'Mi Estado Académico',
                                    iconCls:'',
                                    tabTip:'Detalle sobre mi estado academico',
                                    style: 'padding: 10px;'//,
                                },{
                                    title:'Materias Aprobadas',
                                    iconCls: 'x-icon-materias-aprobadas',
                                    tabTip:'Finales Aprobados',
                                    style: 'padding: 10px;',
                                    items:[

                                    ]
                                },{
                                    title:'Materias Regulares',
                                    iconCls: 'x-icon-materias-regulares',
                                    tabTip:'Cursado Regular',
                                    style: 'padding: 10px;',
                                    //------------------------------
                                    items:[

                                    ]


                                }
                            ]
                        }
                    ]
                }
            ]
        });
});