Ext.onReady(function(){
    Ext.QuickTips.init();
    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[{
            xtype: 'grouptabpanel',
            tabWidth: 130,
            activeGroup: 0,
            items: [{
                mainItem: 1,
                items: [{
                    title: 'Inscribirme XXX',
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
                                            ,store:new Ext.data.JsonStore({
                                                root:'rows',
                                                url:'../',
                                                fields:['id','descripcion'],
                                                autoLoad:true
                                            })
                                        }
                                    ]
                                }
                            ]
                        },{
                            xtype:'panel',
                            items:[
                                {
                                    layout:'column',
                                    anchor:0,
                                    items:[
                                        {
                                            xtype:'combo',
                                            fieldLabel:'Año Lectivo'

                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                    {
                        xtype: 'portal',
                        title: 'Inscripciones',
                        tabTip: 'Inscripciones'/*,
                        items:[{
                            columnWidth:.33,
                            style:'padding:10px 0 10px 10px',
                            items:[{
                                title: 'Grid in a Portlet',
                                layout:'fit'//,
                                //tools: tools//,
                                //items: new SampleGrid([0, 2, 3])
                            },{
                                title: 'Another Panel 1'//,
                                //tools: tools//,
                                //html: Ext.example.shortBogusMarkup
                            },{
                              xtype:'button',
                              text:'SSSSSS',
                              listeners:{
                                  click:function(button,e){
                                      Ext.Msg.show({
                                          title:'Error',
                                          msg:'Se produjo un error al recuperar los datos de la empresa',
                                          icon:Ext.MessageBox.ERROR,
                                          buttons:Ext.MessageBox.OK
                                      });
                                  }
                              }
                            }
                            ]
                        },{
                            columnWidth:.33,
                            style:'padding:10px 0 10px 10px',
                            items:[{
                                title: 'Panel 2'//,
                                //tools: tools//,
                                //html: Ext.example.shortBogusMarkup
                            },{
                                title: 'Another Panel 2'//,
                                //tools: tools//,
                                //html: Ext.example.shortBogusMarkup
                            }]
                        },{
                            columnWidth:.33,
                            style:'padding:10px',
                            items:[{
                                title: 'Panel 3'//,
                                //tools: tools//,
                                //html: Ext.example.shortBogusMarkup
                            },{
                                title: 'Another Panel 3'//,
                                //tools: tools//,
                                //html: Ext.example.shortBogusMarkup
                            }]
                        }]*/
                    }, {
                        title: 'Subscriptions',
                        iconCls: 'x-icon-subscriptions',
                        tabTip: 'Subscriptions tabtip',
                        style: 'padding: 10px;',
                        layout: 'fit',
                        items: [{
                            xtype: 'tabpanel',
                            activeTab: 1,
                            items: [{
                                title: 'Nested Tabs'//,
                                //html: Ext.example.shortBogusMarkup
                            }]
                        }]
                    }, {
                        title: 'Users',
                        iconCls: 'x-icon-users',
                        tabTip: 'Users tabtip',
                        style: 'padding: 10px;'//,
                        //html: Ext.example.shortBogusMarkup
                    }]
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
            }]
        }]
    });

});