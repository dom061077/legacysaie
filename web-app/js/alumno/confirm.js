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
    function getRowsMaterias(){
        var storeMateria = Ext.getCmp('gridcorrelcurId').getStore();
        materiaArr = [];
        storeMateria.data.each(function(rec){
            materiaArr.push(rec.data);
        });
        return Ext.encode(materiaArr);
    }

    var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});
    new Ext.FormPanel({
        url:confirmUrl
        ,title:'Confirmación de Preinscripción'
        ,style: 'margin:0 auto;margin-top:100px;'
        ,renderTo:'formId'
        ,height:450
        ,id:'formconfirmId'
        ,width:520
        ,labelWidth:140
        ,frame:true
        ,items:[
            {
                xtype:'hidden'
                ,name:'keyconfirm'
                ,id:'keyconfirmId'
            },{
                xtype:'hidden'
                ,name:'aniolectivo'
                ,value:aniolectivoId
                ,id:'aniolectivoId'
            },{
                xtype:'numberfield'
                ,name:'numerodocumento'
                ,id:'numerodocumentoId'
                ,disabled:true
                ,fieldLabel:'Nº de documento'
            },{
                xtype:'textfield'
                ,name:'apellido'
                ,id:'apellidoId'
                ,width:260
                ,disabled:true
                ,fieldLabel:'Apellido'
            },{
                xtype:'textfield'
                ,name:'nombre'
                ,id:'nombeId'
                ,width:260
                ,disabled:true
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
                 ,fieldLabel:'Seleccione Carrera'
                 ,id:'combocarreraId'
                 ,msgTarget:'under'
                 ,valueField:'id'
                 ,name:'carrera'
                 ,allowBlank:false
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
                 ,listeners:{
                     select:function(combobox,record,index){
                         Ext.getCmp('gridmaterias').getStore().load({
                             params:{
                                 carreraId:Ext.getCmp('combocarreraId').hiddenField.value
                             }
                         });
                     }
                 }
             },{
                xtype:'hidden'
                ,id:'materiasId'
                ,name:'materias'
             },new Ext.grid.GridPanel({
                id:'gridmaterias'
                ,store: new Ext.data.JsonStore({
                    root:'rows'
                    ,url:materiasUrl
                    ,fields:[{name:'id'},{name:'denominacion'},{name:'seleccionada',type:'bool'}],
                    autoLoad:false
                })

                ,columns:[
                    {header:'Id',dataIndex:'id',hidden:true}
                    ,{header:'Materia',dataIndex:'denominacion',width:200,sortable:false}
                    ,{
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
                title:'Materias a Inscribir'

            })
        ],buttons:[
            {
                text:'Confirmar'
                ,handler:function(){
                    var formpreinsc = Ext.getCmp('formconfirmId');
                    if(formpreinsc.getForm().isValid()){
                        Ext.getCmp('materiasId').value=getRowsMaterias();
                        loadMask.show();
                        formpreinsc.getForm().submit({
                            success: function(f,a){
                                loadMask.hide();
                                Ext.Msg.show({
                                    title:'Mensaje'
                                    ,icon:Ext.MessageBox.INFO
                                    ,msg:a.result.mensaje
                                    ,buttons:Ext.MessageBox.OK
                                    ,fn:function(btn){
                                        window.location=homeUrl
                                    }
                                });
                            },
                            failure: function(f,a){
                                var mensaje = a.result.msg+'<br><br>';
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
                    window.location=homeUrl;
                }
            }
        ]
    });
   Ext.getCmp('formconfirmId').getForm().load({
       url:loadUrl
       ,success:function(f,a){

        }
       ,failure:function(f,a){

       }
   });

});