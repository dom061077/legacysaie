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
