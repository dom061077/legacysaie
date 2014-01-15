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
                width:100,
                html:'ESTE'
            })
            ,
            new Ext.BoxComponent({
                region:'center',
                height:400,
                html:'REGION CENTRAL'
            }),

            new Ext.BoxComponent({
                region:'west',
                width:100,
                html:'OESTE'
            }),
            new Ext.BoxComponent({
                region:'south',
                height:25,
                html:'<p style="text-align: center">'
                    +'© 2014 Instituto Superior Cruz Roja Argentina - Filial Códoba'
                    +'</p>'
            })

        ]

    });
});