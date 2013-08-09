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


var errorDoc=true
var errorCupo=true

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

Ext.apply(Ext.form.VTypes,{
    //cuitVal: /^\d{2}\-\d{8}\-\d{1}$/,

    numdocexistsText:'Número de documento ya existe',
    numdocexists :		function CPcuitValido(numdoc) {
        if (typeof(numdoc) == 'undefined')
            return true;
        if (numdoc == '')
            return true;
        var vec= new Array(10);
        Ext.Ajax.request(
            {
                url: '../alumno/existenumdoc',
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
    var wizard = new Ext.ux.Wiz({
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
                    html      : 'Bienvenido al registro de datos personales del <strong>Colegio de la Cruz Roja Argentina</strong>, '+
                        ' es necesario que cargue todos los datos que incluye la registración.<br/><br/>'+
                        'Por favor, pulse el botón "siguiente" para comenzar la carga de datos.'
                }]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos del Alumno'
                ,id:'datosdelalumnocarId'
                ,frame:false
                ,monitorValid:false
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
                        name:'tipodocumento',
                        allowBlank:false,
                        layout:'form',
                        width:95,
                        hidden:false,
                        valueField:'id',
                        hiddenName:'tipodocumento_id',
                        displayField:'descripcion',
                        mode:'local',
                        store:new Ext.data.JsonStore({
                            root:'rows',
                            url:'../tipoDocumentoIdentidad/cmbjson',
                            fields:['id','descripcion'],
                            autoLoad:true
                        })
                    },{
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
                        msgTarget:'under',
                        layout:'form',
                        name:'apellido'
                    },{
                        xtype:'textfield',
                        id:'nombreId',
                        fieldLabel:'Nombre',
                        allowBlank: false,
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
                        allowBlank:false,
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
                            }
                        }


                    },{
                        xtype:'combo',
                        id:'provincianacimientoId',
                        fieldLabel:'Provincia Nacimiento',
                        valueField:'id',
                        hiddenName:'provincianacimiento_id',
                        displayField:'descripcion',
                        allowBlank:false,
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
                        allowBlank:false,
                        msgTarget:'under',
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
                        ,msgTarget:'under'
                        ,name:'calledomicilio'
                        ,layout:'form'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'numerodomicilioId'
                        ,fieldLabel:'Número del Domicilio'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'numerodomicilio'
                    },{
                        xtype:'textfield'
                        ,id:'barriodomicilioId'
                        ,fieldLabel:'Barrio Domicilio'
                        ,msgTarget:'under'
                        ,name:'barriodomicilio'
                        ,layout:'form'
                        ,allowBlank:false
                    },{
                        xtype:'combo',
                        id:'paisdomicilioId',
                        fieldLabel:'País Domicilio',
                        valueField:'id',
                        hiddenName:'paisdomicilio_id',
                        displayField:'descripcion',
                        allowBlank:false,
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
                        allowBlank:false,
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
                        allowBlank:false,
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
                ,monitorValid:false
                ,autoScroll:true
                ,labelWidth:130

                ,items:[
                    {
                        xtype:'fieldset',
                        title:'Domicilio',
                        items:[
                            {
                                xtype:'textfield',
                                id:'telefonoparticularId',
                                fieldLabel:'Teléfono Particular',
                                msgTarget:'under',
                                name:'telefonoparticular',
                                allowBlank:false
                            }
                            ,{
                                xtype:'textfield',
                                id:'telefonocelularId',
                                fieldLabel:'Teléfono Celular',
                                msgTarget:'under',
                                name:'telefonocelular',
                                allowBlank:false
                            },{
                                xtype:'textfield',
                                id:'telefonoalternativoId',
                                fieldLabel:'Teléfono Alternativo',
                                msgTarget:'under',
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
                                fieldLabel:'Establecimineot de Procedencia',
                                msgTarget:'under',
                                name:'establecimientoprocedencia',
                                allowBlank:false
                            },{
                                xtype:'textfield',
                                id:'tituloobtenidoId',
                                fieldLabel:'Título Obtenido',
                                msgTarget:'under',
                                name:'tituloobtenido',
                                allowBlank:false
                            },{
                                xtype:'numberfield',
                                id:'anioegresoId',
                                fieldLabel:'Año de Egreso',
                                msgTarget:'under',
                                name:'anioegreso',
                                allowNegative:false,
                                maxLength:4,
                                allowBlank:false
                            },{
                                xtype:'textfield',
                                id:'situacionacademica',
                                fieldLabel:'Situación Académica',
                                msgTarget:'under',
                                name:'situacionacademica',
                                allowBlank:false
                            },{
                                xtype:'textfield',
                                id:'legajoId',
                                fieldLabel:'Legajo',
                                msgTarget:'under',
                                name:'legajo',
                                allowBlank:false
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
                        ,name:'lugarlaboral'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'telefonolaboralId'
                        ,fieldLabel:'Teléfono Laboral'
                        ,msgTarget:'under'
                        ,name:'telefonolaboral'
                    },{
                        xtype:'textfield'
                        ,id:'callelaboralId'
                        ,fieldLabel:'Calle'
                        ,msgTarget:'under'
                        ,name:'callelaboral'
                    },{
                        xtype:'textfield'
                        ,id:'numerocallelaboralId'
                        ,fieldLabel:'Número'
                        ,msgTarget:'under'
                        ,name:'numerocallelaboral'
                    },{
                        xtype:'textfield'
                        ,id:'barriolaboralId'
                        ,fieldLabel:'Barrio Laboral'
                        ,msgTarget:'under'
                        ,name:'barriolaboral'
                    },{
                        xtype:'combo',
                        id:'paislaboralId',
                        fieldLabel:'País Laboral',
                        valueField:'id',
                        hiddenName:'paislaboral_id',
                        displayField:'descripcion',
                        allowBlank:false,
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
                        allowBlank:false,
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
                        allowBlank:false,
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
                        ,layout:'form'
                        ,name:'apellidonombretutor'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'profesiontutorId'
                        ,fieldLabel:'Profesión del Tutor'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'profesiontutor'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'parentescotutorId'
                        ,fieldLabel:'Parentesco del Tutor'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'parentescotutor'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'telefonotutorId'
                        ,fieldLabel:'Teléfono del Tutor'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'telefonotutor'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'calletutorId'
                        ,fieldLabel:'Calle'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'calletutor'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'numerocalletutorId'
                        ,fieldLabel:'Número'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'numerocalletutor'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'barriotutorId'
                        ,fieldLabel:'Barrio del Tutor'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'barriotutor'
                        ,allowBlank:false
                    },{
                        xtype:'combo',
                        id:'paistutorId',
                        fieldLabel:'País del Tutor',
                        valueField:'id',
                        hiddenName:'paistutor_id',
                        displayField:'descripcion',
                        allowBlank:false,
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
                        allowBlank:false,
                        msgTarget:'under',
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
                        allowBlank:false,
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
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'apellidonombregarante'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'profesiongaranteId'
                        ,fieldLabel:'Profesión del Garante'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'profesiongarante'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'parentescogaranteId'
                        ,fieldLabel:'Parentesco del Garante'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'parentescogarante'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'telefonogaranteId'
                        ,fieldLabel:'Teléfono del Garante'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'telefonogarante'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'callegaranteId'
                        ,fieldLabel:'Calle'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'callegarante'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'numerocallegaranteId'
                        ,fieldLabel:'Número'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'numerocallegarante'
                        ,allowBlank:false
                    },{
                        xtype:'textfield'
                        ,id:'barriogaranteId'
                        ,fieldLabel:'Barrio del Garante'
                        ,msgTarget:'under'
                        ,layout:'form'
                        ,name:'barriogarante'
                        ,allowBlank:false
                    },{
                        xtype:'combo',
                        id:'paisgaranteId',
                        fieldLabel:'País del Garante',
                        valueField:'id',
                        hiddenName:'paisgarante_id',
                        displayField:'descripcion',
                        allowBlank:false,
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
                        allowBlank:false,
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
                        allowBlank:false,
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
                                Recaptcha.create("6LfTZcwSAAAAAISkWiE7aqtH3xa7vdmu7GL9O7bm",
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
        window.location='../';
    });
    wizard.on('finish',function(wiz,datos){
        var conn = new Ext.data.Connection();
        Ext.MessageBox.show({
            msg: 'Guardando datos. Por favor espere...',
            progressText: 'Guardando...',
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
                ,apellido:datos.datosdelalumnocarId.apellido
                ,nombre:datos.datosdelalumnocarId.nombre
                ,sexo:datos.datosdelalumnocarId.sexo_id
                ,numeroDocumento: datos.datosdelalumnocarId.numerodocumento
                ,legajo: datos.datosdelalumnocarId.legajo
                ,email: datos.datoscontactoacademicoscarId.email


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
                        fn: function(btn){}
                    });

                }
                ('recaptcha_reload_btn')
            }
        });
    });
    wizard.show();
});