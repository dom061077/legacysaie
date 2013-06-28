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
                                    title:username,
                                    iconCls: 'x-icon-templates',
                                    tabTip: 'Templates tabtip',
                                    style: 'padding: 10px;'//,


                                },{
                                    title:'Modificación',
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
                                    title: 'Inscribirme en Finales',
                                    layout: 'fit',
                                    iconCls: 'x-icon-tickets',
                                    tabTip: 'Registrar Inscripción en examen final',
                                    style: 'padding: 10px;',

                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form'
                                                    ,id:'forminscfinalId'
                                                    ,frame:true
                                                    ,width:500
                                                    ,title:'Inscripcio'
                                                    ,listeners:{
                                                        afterrender: function(component){
                                                            /*var rowselected = Ext.getCmp('combocarreraId').getStore().getAt(0);
                                                            Ext.getCmp('combocarreraId').setValue(rowselected.get('denominacion'));
                                                            Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                params:{
                                                                    alumnoId:alumnoId,
                                                                    carreraId:rowselected.get('id')
                                                                }
                                                            });
                                                            rowselected = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                            Ext.getCmp('comboaniolectivoId').setValue(rowselected.get('descripcion'));  */
                                                        }
                                                    }
                                                    ,items:[
                                                        {
                                                            xtype:'combo'
                                                            ,fieldLabel:'Carrera'
                                                            ,id:'combocarreraId'
                                                            ,valueField:'id'
                                                            ,mode:'local'
                                                            ,displayField:'denominacion'
                                                            ,hiddenName:'carrera_id'
                                                            ,store:new Ext.data.JsonStore({
                                                                root:'rows',
                                                                url:carreraUrl,
                                                                fields:['id','denominacion'],
                                                                baseParams:{
                                                                    alumnoId: alumnoId
                                                                },
                                                                autoLoad:true
                                                            }),
                                                            listeners:{
                                                                change:function(combo,newValue,oldValue){
                                                                    if(newValue==''){
                                                                        Ext.getCmp('comboaniolectivoId').getStore().removeAll();
                                                                        Ext.getCmp('gridcorrelfinId').getStore().removeAll();
                                                                        Ext.getCmp('comboaniolectivoId').clearValue();
                                                                    }
                                                                },
                                                                afterrender: function(combo){
                                                                    /*var rowselected = combo.getStore().getAt(0);
                                                                    Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                        params:{
                                                                            alumnoId:alumnoId,
                                                                            carreraId:rowselected.get('id')
                                                                        }
                                                                    });
                                                                    rowselected = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                                    Ext.getCmp('comboaniolectivoId').setValue(rowselected.get('descripcion'));*/

                                                                },
                                                                select:function(combo,record,index){
                                                                    var rowselectedCarrera = Ext.getCmp('combocarreraId').getStore().getAt(0);
                                                                    Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                        params:{
                                                                            alumnoId:alumnoId,
                                                                            carreraId:rowselectedCarrera.get('id')
                                                                        }
                                                                    });

                                                                }
                                                            }
                                                        },
                                                        {   xtype:'combo'
                                                            ,fieldLabel:'Año Lectivo'
                                                            ,id:'comboaniolectivoId'
                                                            ,valueField:'id'
                                                            ,mode:'local'
                                                            ,displayField:'descripcion'
                                                            ,hiddenName:'aniolectivo_id'
                                                            ,store:new Ext.data.JsonStore({
                                                                    root:'rows',
                                                                    url:anioLectivoUrl,
                                                                    fields:['id','descripcion'],
                                                                    baseParams:{
                                                                        alumnoId:alumnoId
                                                                    },
                                                                    autoLoad:false
                                                                }),
                                                            listeners:{
                                                                /*afterrender: function(combo){
                                                                    var rowselected = combo.getStore().getAt(0);
                                                                    combo.setValue(rowselected.get('descripcion'));
                                                                }, */
                                                                select:function(combobox,record,index){
                                                                    Ext.getCmp('gridcorrelfinId').getStore().load({
                                                                        params:{
                                                                            alumnoId:alumnoId,
                                                                            anioLectivoId:Ext.getCmp('comboaniolectivoId').hiddenField.value,
                                                                            carreraId:Ext.getCmp('combocarreraId').hiddenField.value
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        },new Ext.grid.GridPanel({
                                                            id:'gridcorrelfinId',
                                                            store:new Ext.data.JsonStore({
                                                                root:'rows',
                                                                url:correlFinal,
                                                                fields:[{name:'id'},{name:'denominacion'},{name:'nivel'},{name:'seleccionada',type:'bool'}],
                                                                autoLoad:false
                                                            }),
                                                            columns: [
                                                                {header: "id",dataIndex:'id',hidden:true},
                                                                {header: "Denominación",width:200,sortable:false,dataIndex:'denominacion'},
                                                                {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                                                                {
                                                                    xtype: 'checkcolumn',
                                                                    header: 'Seleccionada',
                                                                    dataIndex: 'seleccionada',
                                                                    width: 70,
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
                                                            iconCls: 'icon-grid',
                                                            listeners:{
                                                            }
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
                                        title: 'Inscribirme en Cursado',
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
                                                    ,width:500
                                                    ,title:'Inscripción de Cursado'
                                                    ,items:[
                                                    {
                                                        xtype:'combo'
                                                        ,fieldLabel:'Carrera'
                                                        ,id:'combocarreracurId'
                                                        ,valueField:'id'
                                                        ,mode:'local'
                                                        ,displayField:'denominacion'
                                                        ,hiddenName:'carrera_id'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:carreraUrl,
                                                        fields:['id','denominacion'],
                                                        baseParams:{
                                                            alumnoId: alumnoId
                                                        },
                                                        autoLoad:true
                                                    }),
                                                        listeners:{
                                                            change:function(combo,newValue,oldValue){
                                                                if(newValue==''){
                                                                    Ext.getCmp('comboaniolectivocurId').getStore().removeAll();
                                                                    Ext.getCmp('gridcorrelcurId').getStore().removeAll();
                                                                    Ext.getCmp('comboaniolectivocurId').clearValue();
                                                                }
                                                            },
                                                            afterrender: function(combo){
                                                                /*var rowselected = combo.getStore().getAt(0);
                                                                 Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                 params:{
                                                                 alumnoId:alumnoId,
                                                                 carreraId:rowselected.get('id')
                                                                 }
                                                                 });
                                                                 rowselected = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                                 Ext.getCmp('comboaniolectivoId').setValue(rowselected.get('descripcion'));*/

                                                            },
                                                            select:function(combo,record,index){
                                                                var rowselectedCarrera = Ext.getCmp('combocarreracurId').getStore().getAt(0);
                                                                Ext.getCmp('comboaniolectivocurId').getStore().load({
                                                                    params:{
                                                                        alumnoId:alumnoId,
                                                                        carreraId:rowselectedCarrera.get('id')
                                                                    }
                                                                });

                                                            }
                                                        }
                                                    },
                                                    {   xtype:'combo'
                                                        ,fieldLabel:'Año Lectivo'
                                                        ,id:'comboaniolectivocurId'
                                                        ,valueField:'id'
                                                        ,mode:'local'
                                                        ,displayField:'descripcion'
                                                        ,hiddenName:'aniolectivo_id'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:anioLectivoUrl,
                                                        fields:['id','descripcion'],
                                                        baseParams:{
                                                            alumnoId:alumnoId
                                                        },
                                                        autoLoad:false
                                                    }),
                                                        listeners:{
                                                            /*afterrender: function(combo){
                                                             var rowselected = combo.getStore().getAt(0);
                                                             combo.setValue(rowselected.get('descripcion'));
                                                             }, */
                                                            select:function(combobox,record,index){
                                                                Ext.getCmp('gridcorrelcurId').getStore().load({
                                                                    params:{
                                                                        alumnoId:alumnoId,
                                                                        anioLectivoId:Ext.getCmp('comboaniolectivocurId').hiddenField.value,
                                                                        carreraId:Ext.getCmp('combocarreracurId').hiddenField.value
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }

                                                    ,new Ext.grid.GridPanel({
                                                        id:'gridcorrelcurId',
                                                        store:new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:correlCursar,
                                                            fields:[{name:'id'},{name:'denominacion'},{name:'nivel'},{name:'seleccionada',type:'bool'}],
                                                            autoLoad:false
                                                        }),
                                                        columns: [
                                                            {header: "id",dataIndex:'id',hidden:true},
                                                            {header: "Denominación",width:200,sortable:false,dataIndex:'denominacion'},
                                                            {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                                                            {
                                                                xtype: 'checkcolumn',
                                                                header: 'Seleccionada',
                                                                dataIndex: 'seleccionada',
                                                                width: 70,
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
                                                        iconCls: 'icon-grid',
                                                        listeners:{
                                                        }
                                                    })
                                                ],buttons:[
                                                        {
                                                            text:'Inscribir',
                                                            handler: function(){

                                                            }
                                                        }
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

    /*Ext.getCmp('gridcorrelcurId').getStore().load({
        params:{
            alumnoId:alumnoid,
            anioLectivoId:Ext.getCmp('comboaniolectivoId').hiddenField.value,
            carreraId:Ext.getCmp('combocarreraId').hiddenField.value
        }
    });*/

});