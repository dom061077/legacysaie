var winalumno;
var windocente;
var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});


Ext.apply(Ext.form.VTypes,{
    changepasswordText:'La contraseña debe combinar letras con al menos un número o caracter especial  (!@#$%^&*()-_=+)',
    changepassword:function(valor,field){
        if(!valor.match(/[0-9!@#\$%\^&\*\(\)\-_=\+]+/i)){
            return false;
        }
        if(!valor.match(/[a-zA-Z]+/i)){
            return false;
        }
        if(Ext.getCmp('newpasswordId').getValue()!=Ext.getCmp('repeatnewpasswordId').getValue() &&
            field.id=='repeatnewpasswordId'){
            field.vtypeText = 'No coinciden las contraseñas';
            return false;
        }

        return true
    }
});




function verUsuarioDocente(){
    var gridrecord = Ext.getCmp('gridusuariosdocentesId').getSelectionModel().getSelected();
    if(!windocente){
        windocente = new Ext.Window({
            layout:'fit',
            width:500,
            height:300,
            modal:true,
            resizable:false,
            //closeAction:'hide'
            plain:true,
            items:[
                {
                    xtype:'form',
                    frame:true,
                    id:'formusuariodocenteId',
                    url:sendemaildocenteUrl,
                    border:false,
                    items:[
                        {
                            xtype:'textfield',
                            fieldLabel:'Id',
                            hidden:true,
                            id:'docenteId',
                            name:'id'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Nº Documento',
                            id:'documentodocenteId',
                            width:150,
                            disabled:true,
                            name:'documentodocente'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Apellido Docente',
                            disabled:true,
                            id:'apellidodocenteId',
                            width:300,
                            name:'apellidodocente'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Nombre Docente',
                            disabled:true,
                            id:'nombredocenteId',
                            width:300,
                            name:'nombredocente'
                        },{
                            xtype:'textfield',
                            fieldLabel:'E-mail',
                            disabled:true,
                            width:150,
                            id:'emaildocenteId',
                            name:'emaildocente'
                        },{
                            xtype:'checkbox',
                            fieldLabel:'Tiene Usuario',
                            disabled:true,
                            id:'tieneusuariodocenteId',
                            name:'tieneusuariodocente'
                        }
                    ],buttons:[
                    {
                        text:'Enviar correo',
                        id:'enviarusuariodocenteformId',
                        handler:function(){
                            loadMask.show();
                            Ext.getCmp('formusuariodocenteId').getForm().submit({
                                success: function(f,a){
                                    loadMask.hide();
                                    var mensaje = a.result.mensaje+'<br><br>';
                                    Ext.Msg.show({
                                        title:'Mensajes',
                                        //icon:Ext.MessageBox.INFO,
                                        msg: mensaje,
                                        buttons: Ext.MessageBox.OK,
                                        fn: function(btn){
                                            windocente.hide();
                                            Ext.getCmp('gridusuariosdocentesId').getStore().load();

                                        }
                                    });
                                },
                                failure:function(f,a){
                                    loadMask.hide();
                                    var mensaje = a.result.mensaje+'<br><br>';
                                    var errores = a.result.errors;
                                    for(var i=0;i<errores.length;i++){
                                        mensaje = mensaje +'- '+errores[i].msg+'<br>';
                                    }
                                    Ext.Msg.show({
                                        title:'Mensajes',
                                        icon:Ext.MessageBox.ERROR ,
                                        msg: mensaje,
                                        buttons: Ext.MessageBox.OK,
                                        fn: function(btn){
                                        }
                                    });
                                }
                            });
                        }
                    },{
                        text:'Cancelar'
                        ,handler:function(){
                            windocente.hide();
                        }
                    }
                ]
                }
            ]

        });
    }

    Ext.getCmp('formusuariodocenteId').getForm().reset();
    Ext.getCmp('formusuariodocenteId').getForm().load({
        url:usuariodocenteformUrl,
        params:{
            id:gridrecord.id
        },
        success: function(f,a){
        },
        failure: function(f,a){
            Ext.Msg.show({
                title:'Error',
                msg:a.result.mensaje
            });
        }
    });
    windocente.show();

}

function verUsuarioAlumno(){
    var gridrecord = Ext.getCmp('gridusuariosalumnosId').getSelectionModel().getSelected();
    //var rowIndex = reservationsGrid.getStore().getAt(gridrecord[1]);
    if(!winalumno){
        winalumno = new Ext.Window({
            layout:'fit',
            width:500,
            height:300,
            modal:true,
            resizable:false,
            //closeAction:'hide'
            plain:true,
            items:[
                {
                    xtype:'form',
                    frame:true,
                    id:'formusuarioalumnoId',
                    url:sendemailalumnoUrl,
                    border:false,
                    items:[
                        {
                            xtype:'textfield',
                            fieldLabel:'Id',
                            hidden:true,
                            id:'alumnoId',
                            name:'id'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Nº Documento',
                            id:'documentoalumnoId',
                            width:150,
                            disabled:true,
                            name:'documentoalumno'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Apellido Alumno',
                            disabled:true,
                            id:'apellidoalumnoId',
                            width:300,
                            name:'apellidoalumno'
                        },{
                            xtype:'textfield',
                            fieldLabel:'Nombre Alumno',
                            disabled:true,
                            id:'nombrealumnoId',
                            width:300,
                            name:'nombrealumno'
                        },{
                            xtype:'textfield',
                            fieldLabel:'E-mail',
                            disabled:true,
                            width:150,
                            id:'emailalumnoId',
                            name:'emailalumno'
                        },{
                            xtype:'checkbox',
                            fieldLabel:'Tiene Usuario',
                            disabled:true,
                            id:'tieneusuarioalumnoId',
                            name:'tieneusuarioalumno'
                        }
                    ],buttons:[
                        {
                            text:'Enviar correo',
                            id:'enviarusuarioalumnoformId',
                            handler:function(){
                                loadMask.show();
                                Ext.getCmp('formusuarioalumnoId').getForm().submit({
                                    success: function(f,a){
                                        loadMask.hide();
                                        var mensaje = a.result.mensaje+'<br><br>';
                                        Ext.Msg.show({
                                            title:'Mensajes',
                                            //icon:Ext.MessageBox.INFO,
                                            msg: mensaje,
                                            buttons: Ext.MessageBox.OK,
                                            fn: function(btn){
                                                winalumno.hide();
                                                Ext.getCmp('gridusuariosalumnosId').getStore().load({
                                                    params:{
                                                        alumnoId:alumnoId,
                                                        anioLectivoId:Ext.getCmp('comboaniolectivoId').hiddenField.value,
                                                        carreraId:Ext.getCmp('combocarreraId').hiddenField.value
                                                    }});

                                            }
                                        });
                                    },
                                    failure:function(f,a){
                                        loadMask.hide();
                                        var mensaje = a.result.mensaje+'<br><br>';
                                        var errores = a.result.errors;
                                        for(var i=0;i<errores.length;i++){
                                            mensaje = mensaje +'- '+errores[i].msg+'<br>';
                                        }
                                        Ext.Msg.show({
                                            title:'Mensajes',
                                            icon:Ext.MessageBox.ERROR ,
                                            msg: mensaje,
                                            buttons: Ext.MessageBox.OK,
                                            fn: function(btn){
                                            }
                                        });
                                    }
                                });
                            }
                        },{
                            text:'Cancelar'
                            ,handler:function(){
                                winalumno.hide();
                            }
                        }
                    ]
                }
            ]

        });
    }

    Ext.getCmp('formusuarioalumnoId').getForm().reset();
    Ext.getCmp('formusuarioalumnoId').getForm().load({
        url:usuarioalumnoformUrl,
        params:{
            id:gridrecord.id
        },
        success: function(f,a){
        },
        failure: function(f,a){
            Ext.Msg.show({
                title:'Error',
                msg:a.result.mensaje
            });
        }
    });
    winalumno.show();

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
                                    title:'Cambiar Contraseña',
                                    layout: 'fit',
                                    iconCls: 'x-icon-templates',
                                    tabTip: 'Cambiar password',
                                    style: 'padding: 10px',
                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    title:'Cambio de Contraseña',
                                                    url:changepasswordUrl,
                                                    id:'formpasswordId',
                                                    frame:true,
                                                    width:500,
                                                    labelWidth:150,
                                                    height:225,
                                                    style: 'margin:0 auto;margin-top:50px;',
                                                    items:[
                                                        {
                                                            xtype:'textfield',
                                                            hidden:true,
                                                            value:usuarioId,
                                                            name:'id',
                                                            allowBlank:false,
                                                            id:'nombreusuarioId'
                                                        },{
                                                            xtype:'textfield',
                                                            fieldLabel:'Contraseña anterior',
                                                            name:'passwordanterior',
                                                            msgTarget:'under',
                                                            allowBlank:false,
                                                            inputType:'password',
                                                            id:'passwordanteriorId'
                                                        },{
                                                            xtype:'textfield',
                                                            fieldLabel:'Nueva Contraseña',
                                                            name:'newpassword',
                                                            msgTarget:'under',
                                                            allowBlank:false,
                                                            inputType:'password',
                                                            id:'newpasswordId'//,
                                                            //vtype:'changepassword'
                                                        },{
                                                            xtype:'textfield',
                                                            fieldLabel:'Repita Nueva Contraseña',
                                                            name:'repeatnewpassword',
                                                            msgTarget:'under',
                                                            allowBlank:false,
                                                            inputType:'password',
                                                            id:'repeatnewpasswordId'//,
                                                           // vtype:'changepassword'
                                                        }
                                                    ],
                                                    buttons:[
                                                    {
                                                        text:'Cambiar',
                                                        handler:function(){
                                                            var formpassword = Ext.getCmp('formpasswordId');
                                                            if(formpassword.getForm().isValid()){
                                                                if(Ext.getCmp('newpasswordId').getValue()!=Ext.getCmp('repeatnewpasswordId').getValue()){
                                                                    Ext.Msg.show({
                                                                        title:'Mensaje'
                                                                        , icon:Ext.MessageBox.ERROR
                                                                        , msg:'La nueva contraseña no coincide con su repetición'
                                                                        , buttons:Ext.MessageBox.OK
                                                                        , fn: function(btn){

                                                                        }
                                                                    });
                                                                }else
                                                                    formpassword.getForm().submit({
                                                                        success: function(f,a){
                                                                            Ext.Msg.show({
                                                                                title:'Mensaje'
                                                                                ,icon:Ext.MessageBox.INFO
                                                                                ,buttons: Ext.MessageBox.OK
                                                                                ,msg:a.result.mensaje
                                                                                ,fn:function(btn){
                                                                                    window.location='';
                                                                                }
                                                                            });
                                                                        },
                                                                        failure: function(f,a){
                                                                            var mensaje = a.result.mensaje+'<br><br>';
                                                                            for(var i=0;i<a.result.errors.length;i++){
                                                                                mensaje = mensaje +'- '+a.result.errors[i].msg+'<br>';
                                                                            }
                                                                            Ext.Msg.show({
                                                                                title: 'Error'
                                                                                ,icon:Ext.MessageBox.ERROR
                                                                                ,msg: mensaje,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                fn: function(btn){

                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                            }
                                                        }
                                                    },{
                                                        text:'Cancelar'
                                                        ,handler:function(){
                                                            window.location='';
                                                        }
                                                    }
                                                ]

                                                }
                                            ]
                                        }
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
                                                                {header: "Tiene Usuario?",width:90,sortable:false,dataIndex:"tieneusuario"},
                                                                {header: "Enviar Pass",width:100,sortable:false,dataIndex:"id",
                                                                    renderer: function (val, meta, record) {
                                                                        return '<a   href="#" onclick="verUsuarioAlumno()"><img style="margin-left:15px " src="'+mailUrl+'"></a>';
                                                                    }
                                                                }
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
                                                                            text:'Filtrar',
                                                                            listeners:{
                                                                                click:function(){
                                                                                    Ext.getCmp('gridusuariosdocentesId').getStore().load({
                                                                                        params:{
                                                                                            'filtronombre':Ext.getCmp('filtronombreId').getValue()
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }

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
                                                                {header: "Nombre del Docente",width:200,sortable:false,dataIndex:'nombredocente'},
                                                                {header: "E-mail",width:170,sortable:false,dataIndex:"email"},
                                                                {header: "Tiene Usuario?",width:100,sortable:false,dataIndex:"tieneusuario"},
                                                                {header: "Enviar Pass",width:100,sortable:false,dataIndex:"id",renderer: function (val, meta, record) {
                                                                    return '<a   href="#" onclick="verUsuarioDocente()"><img style="margin-left:15px " src="'+mailUrl+'"></a>';
                                                                    }
                                                                }
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

    Ext.getCmp('gridusuariosalumnosId').getStore().on('beforeload',function(){
        Ext.getCmp('gridusuariosalumnosId').getStore().baseParams={
            'carrera_id':Ext.getCmp('combocarreraId').hiddenField.value,
            'aniolectivo_id':Ext.getCmp('comboaniolectivoId').hiddenField.value,
            'filtronombre':Ext.getCmp('filtronombrealumnoId').getRawValue()
        }
    });
    Ext.getCmp('gridusuariosdocentesId').getStore().on('beforeload',function(){
        Ext.getCmp('gridusuariosdocentesId').getStore().baseParams={
            'filtronombre':Ext.getCmp('filtronombreId').getValue()
        };
    });

});