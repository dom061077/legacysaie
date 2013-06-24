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
                                    title: 'Inscribirme en finales',
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
                                                    ,items:[
                                                    {   xtype:'combo'
                                                        ,fieldLabel:'Año Lectivo'
                                                        ,valueField:'id'
                                                        ,mode:'local'
                                                        ,displayField:'descripcion'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:'../anioLectivo/listjson',
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
                                        }
                                    ]
                                },{
                                        xtype: 'portal',
                                        title: 'Inscripciones',
                                        tabTip: 'Inscripciones'
                                }, {
                                        title: 'Inscribirme en cursado',
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
                                                    ,items:[
                                                    {   xtype:'combo'
                                                        ,fieldLabel:'Año Lectivo'
                                                        ,valueField:'id'
                                                        ,mode:'local'
                                                        ,displayField:'descripcion'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:'../anioLectivo/listjson',
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