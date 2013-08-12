var errorCupo=true;

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

Ext.onReady(function(){
    Ext.QuickTips.init();

    new Ext.FormPanel({
        url:confirmUrl
        ,title:'Confirmación de Preinscripción'
        ,style: 'margin:0 auto;margin-top:100px;'
        ,renderTo:'formId'
        ,height:450
        ,id:'formconfirmId'
        ,width:450
        ,frame:true
        ,items:[
            {
                xtype:'hidden'
                ,name:'alumno'
                ,id:'alumnoId'
            },{
                xtype:'hidden'
                ,name:'aniolectivo'
                ,value:aniolectivoId
                ,id:'aniolectivoId'
            },{
                xtype:'textfield'
                ,name:'numerodocumento'
                ,id:'numerodocumentoId'
                ,fieldLabel:'Nº de documento'
            },{
                xtype:'textfield'
                ,name:'apellido'
                ,id:'apellidoId'
                ,fieldLabel:'Apellido'
            },{
                xtype:'textfield'
                ,name:'nombre'
                ,id:'nombeId'
                ,fieldLabel:'Nombre'
            },{
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
             }
        ]
    });
});