Ext.onReady(function(){
    Ext.QuickTips.init();
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
                                    title:'Usuarios',
                                    iconCls: 'x-icon-templates',
                                    tabTip: 'Templates tabtip',
                                    style: 'padding: 10px;'//,


                                },{
                                    title:'Modficación',
                                    iconCls: 'x-icon-templates',
                                    tabTip: 'Templates tabtip',
                                    style: 'padding: 10px;'//,

                                }
                            ]
                        },
                        {
                            mainItem: 1,
                            items: [
                                {
                                    title: 'Inscribirme en cursado',
                                    layout: 'fit',
                                    iconCls: 'x-icon-tickets',
                                    tabTip: 'Registrar Inscripción',
                                    style: 'padding: 10px;',

                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form'
                                                    ,frame:true
                                                    ,width:400
                                                    ,items:[
                                                    {   xtype:'combo'
                                                        ,fieldLabel:'Año Lectivo'
                                                        ,valueField:'id'
                                                        ,mode:'local'
                                                        ,displayField:'descripcion'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:anioLectivoUrl,
                                                        fields:['id','descripcion'],
                                                        autoLoad:true
                                                    })
                                                    },new Ext.grid.GridPanel({
                                                        store:new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:correlCursar,
                                                            fields:[{name:'id'},{name:'denominacion'},{name:'seleccionada',type:'bool'}],
                                                            autoLoad:true,
                                                            baseParams:{
                                                                alumnoId:12,
                                                                anioLectivoId:2,
                                                                carreraId:'ENFERMERIA'
                                                            }
                                                        }),
                                                        columns: [
                                                            {header: "id",dataIndex:'id',hidden:true},
                                                            {header: "Denominación",width:200,sortable:false,dataIndex:'denominacion'},
                                                            {
                                                                xtype: 'checkcolumn',
                                                                header: 'Seleccionada',
                                                                dataIndex: 'seleccionada',
                                                                width: 55,
                                                                editor:{
                                                                    xtype:'checkbox'
                                                                }
                                                            }
                                                        ],
                                                        stripeRows: true,
                                                        height:250,
                                                        width:500,
                                                        loadMask:true,
                                                        title:'Materias a Inscribir',
                                                        iconCls: 'icon-grid'

                                                        })
                                                    ],
                                                    buttons:[
                                                        {
                                                            text:'Inscribir',
                                                            handler: function(){

                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },{
                                        xtype: 'portal',
                                        title: 'Inscripciones',
                                        tabTip: 'Inscripciones'
                                }, {
                                        title: 'Inscribirme en Finales',
                                        iconCls: 'x-icon-subscriptions',
                                        tabTip: 'Subscriptions tabtip',
                                        style: 'padding: 10px;',
                                        layout: 'fit',
                                        items: [{
                                            xtype: 'panel',
                                            activeTab: 1,
                                            items:[
                                                {
                                                    xtype:'form'
                                                    ,frame:true
                                                    ,items:[
                                                    {   xtype:'combo'
                                                        ,fieldLabel:'Año Lectivo'
                                                        ,valueField:'id'
                                                        ,mode:'local'
                                                        ,displayField:'descripcion'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:anioLectivoUrl,
                                                        fields:['id','descripcion'],
                                                        autoLoad:true
                                                    })
                                                    },new Ext.grid.GridPanel({
                                                        store:new Ext.data.JsonStore({
                                                            root:'rows'//,
                                                            //url:'../materia/'
                                                        }),
                                                        columns: [
                                                            {header: "id",dataIndex:'id',hidden:true},
                                                            {header: "Nombre",width:200,sortable:true,dataIndex:'nombre'},
                                                            {header: "Representante", width:200,sortable:true,dataIndex:'nombreRepresentante'},
                                                            {header: "telefono1",width:100}
                                                        ],
                                                        stripeRows: true,
                                                        height:250,
                                                        width:600,
                                                        loadMask:true,
                                                        title:'Empresas',
                                                        iconCls: 'icon-grid'

                                                    })
                                                ]
                                                }

                                            ]
                                        }]
                                }, {
                                        title: 'Users',
                                        iconCls: 'x-icon-users',
                                        tabTip: 'Users tabtip',
                                        style: 'padding: 10px;'//,
                                        //html: Ext.example.shortBogusMarkup
                                }
                            ]
                        }, {
                            expanded: true,
                            items: [{
                                title: 'Configuration',
                                iconCls: 'x-icon-configuration',
                                tabTip: 'Configuration tabtip',
                                style: 'padding: 10px;'//,
                                //html: Ext.example.shortBogusMarkup
                            }, {
                                title: 'Email Templates',
                                iconCls: 'x-icon-templates',
                                tabTip: 'Templates tabtip',
                                style: 'padding: 10px;'//,
                                //html: Ext.example.shortBogusMarkup
                            }]
                        }
                ]
            }
        ]
    });

});