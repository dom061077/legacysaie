function loginform(form){
    form.getForm().submit({
        success:function(form,action){
               window.location=homeUrl;
        },
        failure:function(form,action){
               alert(action.result.error);
        }
    });
}


Ext.onReady(function(){
    Ext.QuickTips.init();
    var loginForm = new Ext.FormPanel({
        url:postLoginUrl,
        title:'Ingreso al Panel de Control del Alumno',
        renderTo:'loginId',
        frame:true,
        width:350,
        items:[
            {
                xtype : 'textfield',
                id : 'usernameId',
                name:'j_username',
                fieldLabel:'Usuario'
            },{
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'Password',
                name: 'j_password'
            }, {
                xtype: 'checkbox',
                fieldLabel: 'No cerrar sesión',
                name: '_spring_security_remember_me',
                checked: false
            }
        ],
        buttons:[
            {
                id:'loginbuttonId',
                text:'Ingresar',
                handler:function(){
                    loginform(loginForm);
                }
            },{
                id:'cancelbuttonId',
                text:'Salir',
                handler: function(){

                }
            }
        ]
    });
    Ext.getCmp('usernameId').focus();
});
