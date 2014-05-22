function loginform(form){
    form.getForm().submit({
        success:function(form,action){
               window.location=homeUrl;
        },
        failure:function(form,action){
               Ext.Msg.show({
                   title:'Mensaje'
                   ,icon:Ext.MessageBox.INFO
                   ,msg:action.result.error
                   ,buttons:Ext.MessageBox.OK
                   ,handler:function(){
                       Ext.getCmp('usernameId').focus(false,200);
                   }

               });
        }
    });
}


Ext.onReady(function(){
    Ext.QuickTips.init();
    var formChangePassword=new Ext.form.FormPanel ({
        url:'../subRubro/savejson',
        id:'formSubrubroId',
        frame:true,
        width:450,
        height:150,
        items:[
            {
                xtype:'textfield',
                name:'nombreSubrubro',
                id:'nombreSubrubroId',
                fieldLabel:'Nombre Sub-Rubro',
                width:200
            }/*,{
             xtype:'combo',
             fieldLabel:'Rubro',
             id:'altarubroId',
             name:'rubro.id',
             store:rubroStore,
             mode:'local',
             valueField:'id',
             forceSelection:true,
             allowBlank:false,
             displayField:'nombreRubro',
             width:200
             }*/
        ],
        buttons:[
            {
                text:'Guardar',
                handler:function(){
                    formSubrubro.getForm().submit({
                        params:{
                            'rubro.id':Ext.getCmp('idRubro').hiddenField.value
                        },
                        success:function(f,a){
                            var subrubro = Ext.getCmp('idSubrubro')
                            subrubro.clearValue();
                            subrubro.store.load({
                                params:{'rubroid':Ext.getCmp('idRubro').hiddenField.value}
                            });
                            subrubro.enable();
                            winSubrubro.hide();
                            Ext.getCmp('idSubrubro').setValue(a.result.nombreSubrubro);
                            Ext.getCmp('idSubrubro').hiddenField.value=a.result.idSubRubro;

                        },
                        failure:function(f,a){
                            var msg="";
                            if (a.failureType==Ext.form.Action.CONNECT_FAILURE ||
                                a.failureType==Ext.form.Action.SERVER_INVALID){
                                Ext.Msg.alert('Error','El servidor no Responde')
                            }
                            if (a.result){
                                if (a.result.loginredirect==true){
                                    Ext.Msg.alert('Su sesion de usuario a caducado, ingrese nuevamente');
                                    window.location='../logout/index';
                                }
                                if (a.result.errors){
                                    for (var i=0; i<a.result.errors.length;i++){
                                        msg=msg+a.result.errors[i].title+'\r\n';
                                    }
                                    Ext.Msg.alert(msg);
                                }
                            }

                        }

                    });
                }
            },{
                text:'Cancelar',
                handler:function(){
                    winSubrubro.hide();
                }
            }
        ]
    });


    var winSubrubro=new Ext.Window({
        title:'Agregar Sub-Rubro',
        resizable:false,
        modal:true,
        formPanel: null,
        width:400,
        height:200,
        closeAction:'hide',
        plain: true,
        items:[formChangePassword]
    });


    function changepassword(){

    }

    var loginForm = new Ext.FormPanel({
        style: 'margin:0 auto;margin-top:100px;',
        url:postLoginUrl,
        title:'Ingreso a su Panel de Control',
        //renderTo:'loginId',
        frame:true,
        width:350,
        items:[
            {
                xtype : 'textfield',
                id : 'usernameId',
                name:'j_username',
                fieldLabel:'Usuario',
                //enableKeyEvents:true,
                listeners        : {
                    /*focus : function(tb, e) {
                        Ext.QuickTips.register({
                            target: Ext.getCmp('usernameId'),
                            title: 'QT Title',
                            text: 'QT Text'
                        });
                    },*/
                    //keydown:function(componente,e){
                    //}
                }
            },{
                layout:'column',
                border:false,
                anchor:'0',
                items:[
                    {
                        width:390,
                        layout:'form',
                        border:false,
                        items:{
                            xtype: 'textfield',
                            inputType: 'password',
                            fieldLabel: 'Password',
                            name: 'j_password',
                            enableKeyEvents:true,
                            listeners:{
                                keypress:function(component,event){
                                    if(event.getCharCode()==13)
                                        loginform(loginForm);
                                }
                            }
                        }
                    } ,{
                        width:390,
                        layout:'form',
                        border: false,
                        items:{
                            xtype:'label',
                            html:'<a href="">¿Olvidó su contraseña?</a>'
                        }
                    }

                ]
            }
        ],
        buttons:[
            {
                id:'loginbuttonId',
                text:'Ingresar',
                handler:function(){
                    loginform(loginForm);
                }
            }
        ]
    });
    Ext.getCmp('usernameId').focus(false,200);


    /*toolTip = new Ext.ToolTip({
        anchor: 'bottom',
        anchorToTarget: false,
        targetXY: [Ext.getCmp('usernameId').pageX, Ext.getCmp('usernameId').pageY],
        title: 'Tip',
        html: 'Hello world',
        hideDelay: 15000,
        closable: true
    });
    toolTip.show();*/

    var viewport = new Ext.Viewport({
        layout:'border',
        items:[
            new Ext.BoxComponent({
                region:'north',
                height:100,
                html:
                    '<div style="padding-left: 15px;padding-top: 15px;">'
                        +'    <div style=" float:left;padding-left: 100px"  id="grailsLogo" role="banner"><a href=""><img  src="'+imagecableftUrl+'" alt="Cruz Roja"/></a>'
                        +'    </div>'
                        +'    <div style="padding-left: 15px ;float: left; text-align: left">'
                        +'       CRUZ ROJA <br>'
                        +'        ARGENTINA <br>'
                        +'        FILIAL CORDOBA <br>'
                        +'        Instituto Superior de Enseñanza'
                        +'    </div>'
                        +'    <div style="float:right;padding-right: 100px">'
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
                width:100
            }),
            new Ext.BoxComponent({
                region:'south',
                height:25,
                html:'<p style="text-align: center">'
                    +'© 2014 Instituto Superior Cruz Roja Argentina - Filial Códoba'
                    +'</p>'
            }),
            {
                region:'center',
                xtype:'panel',
                items:[loginForm]
            },
            new Ext.BoxComponent({
                region:'west',
                width:100
            })
        ]
    });

});
