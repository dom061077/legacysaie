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
    var loginForm = new Ext.FormPanel({
        style: 'margin:0 auto;margin-top:100px;',
        url:postLoginUrl,
        title:'Ingreso a su Panel de Control',
        renderTo:'loginId',
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

});
