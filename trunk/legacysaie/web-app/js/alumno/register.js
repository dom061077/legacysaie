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
        title:'Registro de Alumno'
        ,closable:false
        ,height:550
        ,previousButtonText:'Anterior'
        ,nextButtonText:'Siguiente'
        ,cancelButtonText:'Cancelar'
        ,finishButtonText:'Finalizar'
        ,width:750
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
                title:'Datos del Alumno'
                ,id:'datosdelalumnocarId'
                ,frame:false
                ,allowBlank:false
                ,labelWidth:150
                ,items:[
                    {
                        xtype:'textfield',
                        id:'tipodocumentoId',
                        hideLabel:false ,
                        fieldLabel:'Tipo de Documento',
                        msgTarget:'under',
                        name:'tipodocumento',
                        allowBlank:false,
                        hidden:false
                    },{
                        xtype:'textfield',
                        id:'numerodocumentoId',
                        fieldLabel:'Número de Documento',
                        allowBlank:true,
                        msgTarget:'under',
                        width:95,
                        allowBlank:false,
                        vtype:'textfield',
                        name:'numerodocumento'
                    },{
                        xtype:'textfield',
                        id:'apellidoId',
                        fieldLabel:'Apellido',
                        width:260,
                        allowBlank:false,
                        msgTarget:'under',
                        name:'apellido'
                    },{
                        xtype:'textfield',
                        id:'nombreId',
                        fieldLabel:'Nombre',
                        allowBlank: false,
                        width:260,
                        msgTarget: 'under',
                        name: 'nombre'

                    },{
                        xtype:'textfield',
                        id:'sexoId',
                        fieldLabel:'Sexo',
                        allowBlank:false,
                        msgTarget:'under',
                        width:260,
                        name:'sexo'
                    },{
                        xtype:'datefield',
                        id:'fechanacimientoId',
                        fieldLabel:'Fecha Nacimiento',
                        allowBlank:false,
                        msgTarget:'under',
                        width:80,
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
                        width:270,
                        name:'localidadnacimiento'

                    },
                    {
                        xtype:'textfield'
                        ,id:'calledomicilioId'
                        ,fieldLabel:'Calle del Domicilio'
                        ,msgTarget:'under'
                        ,name:'calledomicilio'
                    },{
                        xtype:'textfield'
                        ,id:'numerodomicilioId'
                        ,fieldLabel:'Número del Domicilio'
                        ,msgTarget:'under'
                        ,name:'numerodomicilio'
                    },{
                        xtype:'textfield'
                        ,id:'barriodomicilioId'
                        ,fieldLabel:'Barrio Domicilio'
                        ,msgTarget:'under'
                        ,name:'barriodomicilio'
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
                        width:270,
                        name:'localidaddomicilio'

                    }




                ]
            }),
            new Ext.ux.Wiz.Card({
                title:'Datos del Domicilio'
                ,id:'datosdeldomicilioId'
                ,frame:false
                ,allowBlank:false
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
                                name:'telefonoparticular'
                            }
                            ,{
                                xtype:'textfield',
                                id:'telefonocelularId',
                                fieldLabel:'Teléfono Celular',
                                msgTarget:'under',
                                name:'telefonocelular'
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
                                vtype:'email'
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
                                name:'establecimientoprocedencia'
                            },{
                                xtype:'textfield',
                                id:'tituloobtenidoId',
                                fieldLabel:'Título Obtenido',
                                msgTarget:'under',
                                name:'tituloobtenido'
                            },{
                                xtype:'numberfield',
                                id:'anioegresoId',
                                fieldLabel:'Año de Egreso',
                                msgTarget:'under',
                                name:'anioegreso',
                                allowNegative:false,
                                maxLength:4
                            },{
                                xtype:'textfield',
                                id:'situacionacademica',
                                fieldLabel:'Situación Académica',
                                msgTarget:'under',
                                name:'situacionacademica'
                            },{
                                xtype:'textfield',
                                id:'legajoId',
                                fieldLabel:'Legajo',
                                msgTarget:'under',
                                name:'legajo'
                            }
                        ]
                    }
                ]
            })

        ]


    });
    wizard.show();
});