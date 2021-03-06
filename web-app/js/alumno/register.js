/*myComboBox.doQuery = function(q, forceAll){
    q = Ext.isEmpty(q) ? '' : q;
    var qe = {
        query: q,
        forceAll: forceAll,
        combo: this,
        cancel:false
    };
    if(this.fireEvent('beforequery', qe)===false || qe.cancel){
        return false;
    }
    q = qe.query;
    forceAll = qe.forceAll;
    if(forceAll === true || (q.length >= this.minChars)){
        if(this.lastQuery !== q){
            this.lastQuery = q;
            if(this.mode == 'local'){
                this.selectedIndex = -1;
                if(forceAll){
                    this.store.clearFilter();
                }else{
                    this.store.filter(this.displayField, q, true); // supply the anyMatch option
                }
                this.onLoad();
            }else{
                this.store.baseParams[this.queryParam] = q;
                this.store.load({
                    params: this.getParams(q)
                });
                this.expand();
            }
        }else{
            this.selectedIndex = -1;
            this.onLoad();
        }
    }
};
 http://www.sencha.com/forum/showthread.php?118733-ExtJs-Combo-should-look-for-the-entered-string-typeAhead-problem
*/


var errorDoc=true ;
var errorCupo=true;
var wizard;

var numerodocumentoaux;
var returnnumdocflag=true;

var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});

Ext.apply(Ext.layout.FormLayout.prototype, {
    originalRenderItem: Ext.layout.FormLayout.prototype.renderItem,
    renderItem: function(c, position, target){
        if (c && !c.rendered && c.isFormField && c.fieldLabel && !c.allowBlank) {
            c.fieldLabel = '<span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>'+ c.fieldLabel ;
        }
        this.originalRenderItem.apply(this, arguments);
    }
});

Ext.apply(Ext.form.VTypes,{
    cupolimiteText:'No hay cupo disponible para esta carrera',
    cupolimite: function cupoLimite(carrera){
        if (typeof(carrera) == 'undefined')
            return true;
        if (carrera=='')
            return true;

        Ext.Ajax.request(
            {
                url: cupoUrl,
                async:false,
                params : {
                    carreraId:Ext.getCmp('combocarreraId').hiddenField.value,
                    anioLectivoId:Ext.getCmp('aniolectivoId').value
                },
                success: function(response, options){
                    jsonData = Ext.decode(response.responseText);
                    errorCupo = jsonData.success;

                },
                failure: function(response, options){
                    Ext.Msg.show({
                        title:'Error',
                        msg:'Se produjo un error de comunicación',
                        icon:Ext.MessageBox.ERROR,
                        buttons:Ext.MessageBox.OK,
                        fn:function(btn){
                            errorCupo = true;
                        }
                    });
                }
            }
        );

        return errorCupo;
    }
});


/*
* phone: function(value,field){
 return value.replace(/[ \-\(\)]/g,'').length == 10;
 },
 phoneText: 'Wrong phone number, please make sure it contains 10 digits',
 phoneMask: /[ \d\-\(\)]/
* */
Ext.apply(Ext.form.VTypes,{
    //cuitVal: /^\d{2}\-\d{8}\-\d{1}$/,

    numdocexistsText:'Número de documento ya existe',
    numdocexists :		function CPcuitValido(numdoc) {
        if (typeof(numdoc) == 'undefined')
            return true;
        if (numdoc == '')
            return true;

        var vec= new Array(10);

        if (numerodocumentoaux==numdoc)
            return errorDoc;
        numerodocumentoaux = numdoc;
        Ext.Ajax.request(
            {
                url: '../alumno/existenumdoc',
                method: 'POST',
                async:false,
                params : {
                    numdoc: numdoc
                },  // end-params

                success: function(response, opts) {
                    var jsonData = Ext.decode(response.responseText);
                    var numDoc = jsonData.respuesta;
                    if (numDoc.numeroDocumento !='undefined') {
                        errorDoc = false;

                    } else {
                        errorDoc = true;
                    } // end-if
                }, // end-function

                failure: function (response, options) {
                    Ext.Msg.show({
                        title:'Error',
                        msg:'Se produjo un error de comunicación',
                        icon:Ext.MessageBox.ERROR,
                        buttons:Ext.MessageBox.OK,
                        fn:function(btn){
                            //wizard.cardPanel.getLayout().setActiveItem(wizard.currentCard - 1);
                        }
                    });
                }

            } // end-ajax

        );



        return errorDoc;
       // return true;//true determina que la validacion pase false indica error en la validacion
    }
});





Ext.onReady(function(){
    Ext.QuickTips.init();

    var viewport = new Ext.Viewport({
        items:[
                new Ext.BoxComponent({
                    region:'north',
                    height:100,
                    html:
                        '<div style="padding-left: 5px;padding-top: 15px;">'
                            +'    <div style=" float:left;padding-left: 5px"  id="grailsLogo" role="banner"><a href=""><img  src="'+imagecableftUrl+'" alt="Cruz Roja"/></a>'
                            +'    </div>'
                            +'    <div style="padding-left: 15px ;float: left; text-align: left">'
                            +'       CRUZ ROJA <br>'
                            +'        ARGENTINA <br>'
                            +'        FILIAL CORDOBA <br>'
                            +'        Instituto Superior de Enseñanza'
                            +'    </div>'
                            +'    <div style="float:right;padding-right: 5px">'
                            +'          <img src="'+imagecabrightUrl+'" />'
                            +'    </div>'
                            +'</div>'

                    /*autoEl:{
                     tag:'div',
                     html:'<p>SUPRA PEZON</p>'
                     } */
                }),
                new Ext.BoxComponent({
                    region:'east',
                    width:10
                }),
                new Ext.BoxComponent({
                    region:'center',
                    height:515
                }),
                new Ext.BoxComponent({
                    region:'south',
                    height:25,
                    html:'<p style="text-align: center">'
                        +'© 2014 Instituto Superior Cruz Roja Argentina - Filial Códoba'
                        +'</p>'
                })
                ,
                new Ext.BoxComponent({
                    region:'west',
                    width:10
                })
        ]

    });

    connvtypes = new Ext.data.Connection();
    var provinciaStore = new Ext.data.JsonStore({
        root:'rows',
        url:'../location/provinciasjson',
        fields:['id','descripcion'],
        autoLoad:true
    });

    var localidadStore = new Ext.data.JsonStore({
        root:'rows',
        url:'../location/localidadesjson',
        fields:['id','descripcion'],
        autoLoad:true
    });

    var paisesStore = new Ext.data.JsonStore({
        root:'rows',
        url:'../location/paisesjson',
        fields:['id','descripcion'],
        autoLoad:true
    });
    wizard = new Ext.ux.Wiz({
        title:'Registro de Alumno',
        closable:false,
        modal:false
        ,height:600
        ,previousButtonText:'Anterior'
        ,nextButtonText:'Siguiente'
        ,cancelButtonText:'Cancelar'
        ,finishButtonText:'Finalizar'
        ,width:780
        ,headerConfig:{
            title:'',
            stepText : "Paso {0} de {1}: {2}"
        },
        cardPanelConfig : {
            defaults : {
                baseCls    : 'x-small-editor',
                bodyStyle  : 'padding:40px 15px 5px 120px;background-color:#F6F6F6;',
                border     : false
            }
        },
        cards:[
            new Ext.ux.Wiz.Card({
                title : 'Bienvenido',
                items : [{
                    border    : false,
                    bodyStyle : 'background:none;',
                    html      : 'Bienvenido al registro de datos personales del <strong>INSTITUTO SUPERIOR CRUZ ROJA ARGENTINA – FILIAL CÓRDOBA</strong>, '+
                        ' es necesario que cargue todos los datos marcados con rojo que incluye la registración.<br/><br/>'+
                        'Por favor, pulse el botón "siguiente" para comenzar la carga de datos.'
                }]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos del Alumno'
                ,id:'datosdelalumnocarId'
                ,frame:false
                ,monitorValid:true
                ,autoScroll:true
                ,labelWidth:140
                ,items:[
                    {
                      xtype:'hidden',
                      id:'aniolectivoId',
                      name:'aniolectivo',
                      value:aniolectivoId
                    },
                    /*{
                      xtype:'textfield',
                      id:'aniolectivodescId',
                      name:'aniolectivodesc',
                      fieldLabel:'Año Lectivo Vigente',
                      value:aniolectivoDesc,
                      disabled:true
                    },
                    {
                      xtype:'combo'
                      ,fieldLabel:'Carrera'
                      ,id:'combocarreraId'
                      ,msgTarget:'under'
                      ,valueField:'id'
                      ,name:'carrera'
                      ,width:260
                      ,mode:'local'
                      ,displayField:'denominacion'
                      ,hiddenName:'carrera_id'
                      ,store:new Ext.data.JsonStore({
                        root:'rows',
                        url:carreraUrl,
                        fields:['id','denominacion'],
                        autoLoad:true
                        })
                      ,vtype:'cupolimite'
                    }, */
                    {
                        xtype:'combo',
                        id:'tipodocumentoId',
                        hideLabel:false ,
                        fieldLabel:'Tipo de Documento',
                        msgTarget:'under',
                        name:'tipoDocumento_id',
                        allowBlank:false,
                        triggerAction:'all',
                        layout:'form',
                        width:95,
                        hidden:false,
                        valueField:'id',
                        hiddenName:'tipoDocumento',
                        displayField:'descripcion',
                        mode:'local',
                        store:new Ext.data.JsonStore({
                            root:'rows',
                            url:'../tipoDocumentoIdentidad/cmbjson',
                            fields:['id','descripcion'],
                            autoLoad:true
                        })
                    },
                    /*new Ext.form.TextFieldRemoteVal({
                        fieldLabel:'Número de Documento',
                        name:'numerodocumento',
                        id:'numerodocumentoId',
                        msgTarget:'under',
                        remoteValidation: 'onValidate', 		// When start remote validation, value: 'onBlur' or 'onValidate'
                        urlRemoteVal: validnumdocUrl, 					// Url for remote validation
                        method: 'POST', 						// Optional, method for remote validation 'GET' or 'POST', default POST
                        //paramsRemoteVal: { w: 'testPseudo' }, 	// Optional, additional parameter(s) (Object or String)
                        timeout: 30, 							// Optional, timeout for validation request, default 30
                        badServerRespText: 'badServerRespText', 			// Optional, text showing after bad server response, default: 'Error: bad server response during validation'
                        badComText: 'badComText' 					// Optional, text showing after incorrect comunication, default: 'Error: validation unavailable'
                    }),*/
                    {
                        xtype:'numberfield',
                        id:'numerodocumentoId',
                        fieldLabel:'Número de Documento',
                        allowBlank:false,
                        msgTarget:'under',
                        width:95,
                        layout:'form',
                        name:'numerodocumento',
                        vtype:'numdocexists'
                    },{
                        xtype:'textfield',
                        id:'apellidoId',
                        fieldLabel:'Apellido',
                        width:260,
                        allowBlank:false,
                        style : {textTransform: "uppercase"},
                        msgTarget:'under',
                        layout:'form',
                        name:'apellido'
                    },{
                        xtype:'textfield',
                        id:'nombreId',
                        fieldLabel:'Nombre',
                        allowBlank: false,
                        style : {textTransform: "uppercase"},
                        width:260,
                        msgTarget: 'under',
                        layout:'form',
                        name: 'nombre'

                    },{
                        xtype:'combo',
                        id:'sexoId',
                        fieldLabel:'Sexo',
                        valueField:'id',
                        hiddenName:'sexo_id',
                        displayField:'descripcion',
                        allowBlank:false,
                        triggerAction:'all',
                        msgTarget:'under',
                        width:95,
                        layout:'form',
                        name:'sexo',
                        mode:'local',
                        forceSelection:true,
                        store:new Ext.data.JsonStore({
                            root:'rows',
                            url:'../enumsRendering/sexo',
                            fields:['id','descripcion'],
                            autoLoad:true
                        })
                    },{
                        xtype:'datefield',
                        id:'fechanacimientoId',
                        fieldLabel:'Fecha Nacimiento',
                        allowBlank:false,
                        msgTarget:'under',
                        width:95,
                        layout:'form',
                        name:'fechanacimiento'
                    },{
                        xtype:'combo',
                        id:'paisnacimientoId',
                        fieldLabel:'País Nacimiento',
                        valueField:'id',
                        hiddenName:'paisnacimiento_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:paisesStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'paisnacimiento',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var provinciaCmb = Ext.getCmp('provincianacimientoId');
                                provinciaCmb.clearValue();
                                provinciaCmb.store.load({
                                    params:{'pais_id':Ext.getCmp('paisnacimientoId').hiddenField.value}
                                });
                                var localidadCmb = Ext.getCmp('localidadnacimientoId');
                                localidadCmb.clearValue();
                                localidadCmb.store.load({
                                    params:{'provincia_id':Ext.getCmp('provincianacimientoId').hiddenField.value}
                                });

                            }
                        }


                    },{
                        xtype:'combo',
                        id:'provincianacimientoId',
                        fieldLabel:'Provincia Nacimiento',
                        valueField:'id',
                        hiddenName:'provincianacimiento_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'provincianacimiento',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var localidadCmb = Ext.getCmp('localidadnacimientoId');
                                localidadCmb.clearValue();
                                localidadCmb.store.load({
                                    params:{'provincia_id':Ext.getCmp('provincianacimientoId').hiddenField.value}
                                });
                            }
                        }

                    },{
                        xtype:'combo',
                        id:'localidadnacimientoId',
                        fieldLabel:'Localidad Nacimiento',
                        valueField:'id',
                        hiddenName:'localidadnacimiento_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        triggerAction:'all',
                        store:localidadStore,
                        mode:'local',
                        width:400,
                        layout:'form',
                        name:'localidadnacimiento'

                    },
                    {
                        xtype:'textfield'
                        ,id:'calledomicilioId'
                        ,fieldLabel:'Calle del Domicilio'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,allowBlank:true
                        ,name:'calledomicilio'
                        ,layout:'form'
                    },{
                        xtype:'textfield'
                        ,id:'numerodomicilioId'
                        ,fieldLabel:'Número del Domicilio'
                        ,allowBlank:true
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'numerodomicilio'
                    },{
                        xtype:'textfield'
                        ,id:'barriodomicilioId'
                        ,fieldLabel:'Barrio Domicilio'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,allowBlank:true
                        ,name:'barriodomicilio'
                        ,layout:'form'
                    },{
                        xtype:'combo',
                        id:'paisdomicilioId',
                        fieldLabel:'País Domicilio',
                        valueField:'id',
                        hiddenName:'paisdomicilio_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:paisesStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'paisdomicilio',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var provinciaCmb = Ext.getCmp('provinciadomicilioId');
                                provinciaCmb.clearValue();
                                provinciaCmb.store.load({
                                    params:{'pais_id':Ext.getCmp('paisdomicilioId').hiddenField.value}
                                });
                            }
                        }
                    },{
                        xtype:'combo',
                        id:'provinciadomicilioId',
                        fieldLabel:'Provincia Domicilio',
                        valueField:'id',
                        hiddenName:'provinciadomicilio_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'provinciadomicilio',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var localidadCmb = Ext.getCmp('localidaddomicilioId');
                                localidadCmb.clearValue();
                                localidadCmb.store.load({
                                    params:{'provincia_id':Ext.getCmp('provinciadomicilioId').hiddenField.value}
                                });
                            }
                        }

                    },{
                        xtype:'combo',
                        id:'localidaddomicilioId',
                        fieldLabel:'Localidad Domicilio',
                        valueField:'id',
                        hiddenName:'localidaddomicilio_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:localidadStore,
                        mode:'local',
                        width:400,
                        layout:'form',
                        name:'localidaddomicilio'

                    }/*,{
                        xtype: 'fileuploadfield',
                        id: 'fotoalumnoId',
                        emptyText: 'Seleccione imagen',
                        fieldLabel: 'Photo',
                        name: 'photo-path',
                        buttonText: '',
                        layout:'form',
                        anchor: '-20',
                        buttonCfg: {
                            iconCls: 'upload-icon'
                        }
                    }*/
                ]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos de Contacto y Académicos'
                ,id:'datoscontactoacademicoscarId'
                ,frame:false
                ,allowBlank:false
                ,monitorValid:true
                ,autoScroll:true
                ,labelWidth:130

                ,items:[
                    {
                        xtype:'fieldset',
                        title:'Contacto',
                        items:[
                            {
                                xtype:'textfield',
                                id:'telefonoparticularId',
                                fieldLabel:'Teléfono Particular',
                                msgTarget:'under',
                                name:'telefonoparticular',
                                allowBlank:true
                            }
                            ,{
                                xtype:'textfield',
                                id:'telefonocelularId',
                                fieldLabel:'Teléfono Celular',
                                msgTarget:'under',
                                name:'telefonocelular',
                                allowBlank:true
                            },{
                                xtype:'textfield',
                                id:'telefonoalternativoId',
                                fieldLabel:'Teléfono Alternativo',
                                msgTarget:'under',
                                allowBlank:true,
                                name:'telefonoalternativo'
                            },{
                                xtype:'textfield',
                                id:'emailId',
                                fieldLabel:'E-mail',
                                msgTarget:'under',
                                name:'email',
                                vtype:'email',
                                allowBlank:false
                            }
                        ]
                    },{
                        xtype:'fieldset',
                        title:'Datos Académicos',
                        items:[
                            {
                                xtype:'textfield',
                                id:'establecimientoId',
                                fieldLabel:'Establecimiento de Procedencia',
                                style : {textTransform: "uppercase"},
                                msgTarget:'under',
                                name:'establecimientoprocedencia',
                                allowBlank:true
                            },{
                                xtype:'textfield',
                                id:'tituloobtenidoId',
                                fieldLabel:'Título Obtenido',
                                style : {textTransform: "uppercase"},
                                msgTarget:'under',
                                name:'tituloobtenido',
                                allowBlank:true
                            },{
                                xtype:'numberfield',
                                id:'anioegresoId',
                                fieldLabel:'Año de Egreso',
                                msgTarget:'under',
                                name:'anioegreso',
                                allowNegative:false,
                                maxLength:4,
                                allowBlank:true
                            }/*,{
                                xtype:'checkfield',
                                id:'secundariocompletoId',
                                fieldLabel:'Secundario completo'
                                ,style : {textTransform: "uppercase"}
                                ,msgTarget:'under',
                                name:'situacionacademica',
                                allowBlank:true
                            }*/,{
                                xtype:'textfield',
                                id:'legajoId',
                                fieldLabel:'Legajo',
                                msgTarget:'under',
                                name:'legajo',
                                allowBlank:true
                            }
                        ]
                    }
                ]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos Laborales'
                ,id:'datoslaboralesId'
                ,frame:false
                ,monitorValid:false
                ,autoScroll:true
                ,labelWidth:140
                ,items:[
                    {
                        xtype:'textfield'
                        ,id:'lugarlaboralId'
                        ,fieldLabel:'Lugar Laboral'
                        ,msgTarget:'under'
                        ,style : {textTransform: "uppercase"}
                        ,name:'lugarlaboral'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'telefonolaboralId'
                        ,fieldLabel:'Teléfono Laboral'
                        ,msgTarget:'under'
                        ,allowBlank:true
                        ,name:'telefonolaboral'
                    },{
                        xtype:'textfield'
                        ,id:'callelaboralId'
                        ,fieldLabel:'Calle'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,name:'callelaboral'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'numerocallelaboralId'
                        ,fieldLabel:'Número'
                        ,msgTarget:'under'
                        ,name:'numerocallelaboral'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'barriolaboralId'
                        ,fieldLabel:'Barrio Laboral'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,name:'barriolaboral'
                        ,allowBlank:true
                    },{
                        xtype:'combo',
                        id:'paislaboralId',
                        fieldLabel:'País Laboral',
                        valueField:'id',
                        hiddenName:'paislaboral_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:paisesStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'paislaboral',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var provinciaCmb = Ext.getCmp('provincialaboralId');
                                provinciaCmb.clearValue();
                                provinciaCmb.store.load({
                                    params:{'pais_id':Ext.getCmp('paislaboralId').hiddenField.value}
                                });
                            }
                        }


                    },{
                        xtype:'combo',
                        id:'provincialaboralId',
                        fieldLabel:'Provincia Laboral',
                        valueField:'id',
                        hiddenName:'provincialaboral_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'provincialaboral',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var localidadCmb = Ext.getCmp('localidadlaboralId');
                                localidadCmb.clearValue();
                                localidadCmb.store.load({
                                    params:{'provincia_id':Ext.getCmp('provincialaboralId').hiddenField.value}
                                });
                            }
                        }

                    },{
                        xtype:'combo',
                        id:'localidadlaboralId',
                        fieldLabel:'Localidad Laboral',
                        valueField:'id',
                        hiddenName:'localidadlaboral_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:localidadStore,
                        mode:'local',
                        width:400,
                        layout:'form',
                        name:'localidadlaboral'
                    }



                ]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos del Tutor'
                ,id:'datosdeltutorId'
                ,frame:false
                ,monitorValid:false
                ,autoScroll:true
                ,labelWidth:170
                ,items:[
                    {
                        xtype:'textfield'
                        ,id:'apellidonombretutorId'
                        ,fieldLabel:'Apellido y Nombre del Tutor'
                        ,msgTarget:'under'
                        ,style : {textTransform: "uppercase"}
                        ,layout:'form'
                        ,name:'apellidonombretutor'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'profesiontutorId'
                        ,fieldLabel:'Profesión del Tutor'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'profesiontutor'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'parentescotutorId'
                        ,fieldLabel:'Parentesco del Tutor'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'parentescotutor'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'telefonotutorId'
                        ,fieldLabel:'Teléfono del Tutor'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'telefonotutor'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'calletutorId'
                        ,fieldLabel:'Calle'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'calletutor'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'numerocalletutorId'
                        ,fieldLabel:'Número'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'numerocalletutor'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'barriotutorId'
                        ,fieldLabel:'Barrio del Tutor'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'barriotutor'
                        ,allowBlank:true
                    },{
                        xtype:'combo',
                        id:'paistutorId',
                        fieldLabel:'País del Tutor',
                        valueField:'id',
                        hiddenName:'paistutor_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:paisesStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'paistutor',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var provinciaCmb = Ext.getCmp('provinciatutorId');
                                provinciaCmb.clearValue();
                                provinciaCmb.store.load({
                                    params:{'pais_id':Ext.getCmp('paistutorId').hiddenField.value}
                                });
                            }
                        }


                    },{
                        xtype:'combo',
                        id:'provinciatutorId',
                        fieldLabel:'Provincia Tutor',
                        valueField:'id',
                        hiddenName:'provinciatutor_id',
                        displayField:'descripcion',
                        allowBlank:true,
                        msgTarget:'under',
                        triggerAction:'all',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'provinciatutor',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var localidadCmb = Ext.getCmp('localidadtutorId');
                                localidadCmb.clearValue();
                                localidadCmb.store.load({
                                    params:{'provincia_id':Ext.getCmp('provinciatutorId').hiddenField.value}
                                });
                            }
                        }
                    },{
                        xtype:'combo',
                        id:'localidadtutorId',
                        fieldLabel:'Localidad Tutor',
                        valueField:'id',
                        hiddenName:'localidadtutor_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:localidadStore,
                        mode:'local',
                        width:400,
                        layout:'form',
                        name:'localidadtutor'
                    }
                ]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos del Garante'
                ,id:'datosdelgaranteId'
                ,frame:false
                ,monitorValid:false
                ,autoScroll:true
                ,labelWidth:170
                ,items:[
                    {
                        xtype:'textfield'
                        ,id:'apellidonombregaranteId'
                        ,fieldLabel:'Apellido y Nombre del Garante'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'apellidonombregarante'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'profesiongaranteId'
                        ,fieldLabel:'Profesión del Garante'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'profesiongarante'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'parentescogaranteId'
                        ,fieldLabel:'Parentesco del Garante'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'parentescogarante'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'telefonogaranteId'
                        ,fieldLabel:'Teléfono del Garante'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'telefonogarante'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'callegaranteId'
                        ,fieldLabel:'Calle'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'callegarante'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'numerocallegaranteId'
                        ,fieldLabel:'Número'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'numerocallegarante'
                        ,allowBlank:true
                    },{
                        xtype:'textfield'
                        ,id:'barriogaranteId'
                        ,fieldLabel:'Barrio del Garante'
                        ,style : {textTransform: "uppercase"}
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'barriogarante'
                        ,allowBlank:true
                    },{
                        xtype:'combo',
                        id:'paisgaranteId',
                        fieldLabel:'País del Garante',
                        valueField:'id',
                        hiddenName:'paisgarante_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:paisesStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'paisgarante',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var provinciaCmb = Ext.getCmp('provinciagaranteId');
                                provinciaCmb.clearValue();
                                provinciaCmb.store.load({
                                    params:{'pais_id':Ext.getCmp('paisgaranteId').hiddenField.value}
                                });
                            }
                        }


                    },{
                        xtype:'combo',
                        id:'provinciagaranteId',
                        fieldLabel:'Provincia Garante',
                        valueField:'id',
                        hiddenName:'provinciagarante_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        layout:'form',
                        name:'provinciagarante',
                        listeners:{
                            'select':function(cmd,rec,idx){
                                var localidadCmb = Ext.getCmp('localidadgaranteId');
                                localidadCmb.clearValue();
                                localidadCmb.store.load({
                                    params:{'provincia_id':Ext.getCmp('provinciagaranteId').hiddenField.value}
                                });
                            }
                        }
                    },{
                        xtype:'combo',
                        id:'localidadgaranteId',
                        fieldLabel:'Localidad Garante',
                        valueField:'id',
                        hiddenName:'localidadgarante_id',
                        displayField:'descripcion',
                        triggerAction:'all',
                        allowBlank:true,
                        msgTarget:'under',
                        store:localidadStore,
                        mode:'local',
                        width:400,
                        layout:'form',
                        name:'localidadgarante'
                    },{
                     xtype:'panel',
                     itemId:'reCaptcha',
                     border:false,
                     listeners:{
                            afterRender:function(){
                                Recaptcha.create("6Lc6dPgSAAAAAPOwGa9-CmSE_HdprJ-ci5aflPWJ",//siempre va la clave publica
                                    Ext.getDom(this.body),
                                    {
                                        theme: "clean",
                                        callback: Recaptcha.focus_response_field
                                    }
                                );
                            }
                        }

                     }
                ]
            })/*,{
                xtype:'panel',
                itemId:'reCaptcha',
                border:false,
                html:'<div id="">sssss</div>',
                listeners:{
                    afterRender:function(){
                        Recaptcha.create("6LfTZcwSAAAAAISkWiE7aqtH3xa7vdmu7GL9O7bm",
                            Ext.getDom(this.body),
                            {
                                theme: "clean",
                                callback: Recaptcha.focus_response_field
                            }
                        );
                    }
                }
            }  */
        ]


    });

    wizard.on('nextstep',function(wizard){
        if(this.currentCard==1){

        }

    });

    wizard.on('cancel',function(wizard){
        window.location=homeUrl;
    });
    wizard.on('finish',function(wiz,datos){
        var conn = new Ext.data.Connection();
        Ext.MessageBox.show({
            msg: 'Por favor espere...',
            //progressText: 'Enviando datos...',
            width:300,
            wait:true,
            waitConfig: {interval:200}

        });
        conn.request({
            url:'../alumno/savejson',
            method:'POST',
            isUpload:true,
            params:{
                recaptcha_response_field : datos.datosdelgaranteId.recaptcha_response_field
                ,recaptcha_challenge_field: datos.datosdelgaranteId.recaptcha_challenge_field
                ,'tipoDocumento.id': Ext.getCmp('tipodocumentoId').hiddenField.value
                ,numeroDocumento: datos.datosdelalumnocarId.numerodocumento
                ,apellido:Ext.getCmp('apellidoId').getValue()
                ,nombre:Ext.getCmp('nombreId').getValue()
                ,sexo:datos.datosdelalumnocarId.sexo_id
                ,fechaNacimiento :  datos.datosdelalumnocarId.fechanacimiento
                ,paisNacimiento : Ext.getCmp('paisnacimientoId').getRawValue()
                ,provinciaNacimiento : Ext.getCmp('provincianacimientoId').getRawValue()
                ,localidadNacimiento: Ext.getCmp('localidadnacimientoId').getRawValue()
                ,calleDomicilio: Ext.getCmp('calledomicilioId').getValue()
                ,numeroDomicilio: Ext.getCmp('numerodomicilioId').getValue()
                ,barrioDomicilio: Ext.getCmp('barriodomicilioId').getValue()
                ,paisDomicilio: Ext.getCmp('paisdomicilioId').getRawValue()
                ,provinciaDomicilio: Ext.getCmp('provinciadomicilioId').getRawValue()
                ,localidadDomicilio: Ext.getCmp('localidaddomicilioId').getRawValue()


                ,telefonoParticular: Ext.getCmp('telefonoparticularId').getValue()
                ,celularParticular: Ext.getCmp('telefonocelularId').getValue()
                ,telefonoAlternativo: Ext.getCmp('telefonoalternativoId').getValue()
                ,email: datos.datoscontactoacademicoscarId.email
                ,establecimiento: Ext.getCmp('establecimientoId').getValue()
                ,titulo: Ext.getCmp('tituloobtenidoId').getValue()
                ,anioEgreso: datos.datoscontactoacademicoscarId.anioegreso
                //este campo luego analizar si va o no,situacionAdministrativa:datos.datoscontactoacademicoscarId.situacionacademica
                ,legajo: datos.datoscontactoacademicoscarId.legajo


                ,lugarLaboral: Ext.getCmp('lugarlaboralId').getValue()
                ,telefonoLaboral: datos.datoslaboralesId.telefonolaboral
                ,calleLaboral: Ext.getCmp('callelaboralId').getValue()
                ,numeroDomicilioLaboral: datos.datoslaboralesId.numerocallelaboral
                ,barrioLaboral: Ext.getCmp('barriolaboralId').getValue()
                ,paisLaboral: Ext.getCmp('paislaboralId').getRawValue()
                ,provinciaLaboral: Ext.getCmp('provincialaboralId').getRawValue()
                ,localidadLaboral: Ext.getCmp('localidadlaboralId').getRawValue()

                ,apellidoNombreTutor: Ext.getCmp('apellidonombretutorId').getValue()
                ,profesion: Ext.getCmp('profesiontutorId').getValue()
                ,parentescoTutor: Ext.getCmp('parentescotutorId').getValue()
                ,telefonoTutor: datos.datosdeltutorId.telefonotutor
                ,calleTutor: Ext.getCmp('calletutorId').getValue()
                ,numeroDomicilioTutor: datos.datosdeltutorId.numerocalletutor
                ,barrioTutor: Ext.getCmp('barriotutorId').getValue()
                ,paisTutor: Ext.getCmp('paistutorId').getValue()
                ,provinciaTutor: Ext.getCmp('provinciatutorId').getValue()
                ,localidadTutor: Ext.getCmp('localidadtutorId').getValue()



                ,apellidoNombreGarante:Ext.getCmp('apellidonombregaranteId').getValue()
                ,profesionGarante: Ext.getCmp('profesiongaranteId').getValue()
                ,parentescoGarante: Ext.getCmp('parentescogaranteId').getValue()
                ,telefonoGarante: datos.datosdelgaranteId.telefonogarante
                ,calleGarante: Ext.getCmp('callegaranteId').getValue()
                ,numeroDomiciolioGarante: datos.datosdelgaranteId.numerocallegarante
                ,barrioGarante: Ext.getCmp('barriogaranteId').getValue()
                ,paisGarante: Ext.getCmp('paisgaranteId').getRawValue()
                ,provincia: Ext.getCmp('provinciagaranteId').getRawValue()
                ,localidadGarante: Ext.getCmp('localidadgaranteId').getRawValue()



                ,legajo: datos.datosdelalumnocarId.legajo

            },
            success: function(resp,opt){
                Ext.MessageBox.hide();


                var respuesta = Ext.decode(resp.responseText);
                var mensaje = respuesta.respuesta.msg+'<br><br>';
                $('#recaptcha_reload_btn').click(
                        function(){
                            return true;
                        }).trigger("click");

                if (respuesta.respuesta.success==false){
                    for(var i=0;i<respuesta.respuesta.errors.length;i++){
                        mensaje = mensaje +'- '+respuesta.respuesta.errors[i].msg+'<br>';
                    }

                    Ext.Msg.show({
                        title:'Mensajes',
                        icon:Ext.MessageBox.ERROR,
                        msg: mensaje,
                        buttons: Ext.MessageBox.OK,
                        fn: function(btn){
                            Recaptcha.reload();
                        }
                    });
                }else{
                    Ext.Msg.show({
                        title:'Mensajes',
                        icon:Ext.MessageBox.INFO,
                        msg: mensaje,
                        buttons: Ext.MessageBox.OK,
                        fn: function(btn){
                            window.location = homeUrl
                        }
                    });

                }
                //('recaptcha_reload_btn')
            },
            failure: function(resp,opt){

                Ext.Msg.show({
                    title:'Error',
                    icon:Ext.MessageBox.ERROR ,
                    msg: 'Error en el registro de datos. Intente más tarde o comuníquese vía telefónica con  el colegio',
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn){
                    }
                });
            }
        });
    });
    wizard.show();
});