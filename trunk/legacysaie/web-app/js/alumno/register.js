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
        url:'../provincia/provinciasjson',
        fields:['id','descripcion'],
        autoLoad:true
    });
    var wizard = new Ext.ux.Wiz({
        title:'Registro de Alumno'
        ,closable:false
        ,height:520
        ,previousButtonText:'Anterior'
        ,nextButtonText:'Siguiente'
        ,cancelButtonText:'Cancelar'
        ,finishButtonText:'Finalizar'
        ,width:750
        ,headerConfig:{
            //title:'Alta de Orden de Reserva',
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
                ,items:[
                    {
                        xtype:'textfield',
                        id:'tipodocumentoId',
                        hideLabel:false ,
                        fieldLabel:'Tipo de Documento',
                        msgTarget:'under',
                        name:'tipodocumento',
                        hidden:false
                    },{
                        xtype:'textfield',
                        id:'numerodocumentoId',
                        fieldLabel:'Número de Documento',
                        allowBlank:true,
                        msgTarget:'under',
                        width:95,
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
                        displayField:'descripcion',
                        allowBlank:false,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        name:'paisnacimiento'


                    },{
                        xtype:'combo',
                        id:'provincianacimientoId',
                        fieldLabel:'Provincia Nacimiento',
                        valueField:'id',
                        displayField:'descripcion',
                        allowBlank:false,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        name:'provincianacimiento'


                    },{
                        xtype:'combo',
                        id:'localidadId',
                        fieldLabel:'Localidad',
                        valueField:'id',
                        displayField:'descripcion',
                        allowBlank:false,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        name:'localidadnacimiento'
                    },{
                        xtype:'textfield',
                        id:'calledomicilioId',
                        fieldLabel:'Calle Domicilio',
                        allowBlank: false,
                        width:260,
                        msgTarget: 'under',
                        name: 'calledomicilio'
                    },{
                        xtype:'textfield',
                        id:'numerodomicilioId',
                        fieldLabel:'Número Domicilio',
                        allowBlank: false,
                        width:260,
                        msgTarget: 'under',
                        name: 'numerodomicilio'
                    },{
                        xtype:'textfield',
                        id:'barriodomicilioId',
                        fieldLabel:'Barrio Domicilio',
                        allowBlank: false,
                        width:260,
                        msgTarget: 'under',
                        name: 'barriodomicilio'
                    },{
                        xtype:'combo',
                        id:'paisdomicilioId',
                        fieldLabel:'País Domicilio',
                        valueField:'id',
                        displayField:'descripcion',
                        allowBlank:false,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        name:'paisdomicilio'


                    },{
                        xtype:'combo',
                        id:'provinciadomicilioId',
                        fieldLabel:'Provincia Domicilio',
                        valueField:'id',
                        displayField:'descripcion',
                        allowBlank:false,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        name:'provinciadomicilio'


                    },{
                        xtype:'combo',
                        id:'localidaddomicilioId',
                        fieldLabel:'Localidad Domicilio',
                        valueField:'id',
                        displayField:'descripcion',
                        allowBlank:false,
                        msgTarget:'under',
                        store:provinciaStore,
                        mode:'local',
                        width:200,
                        name:'localidaddomicilio'

                    }




                ]
            })
        ]


    });
    wizard.show();
});