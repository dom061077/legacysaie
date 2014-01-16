Ext.onReady(function(){
    Ext.QuickTips.init();

    var viewport = new Ext.Viewport({
        layout: "border",
        id: 'movieview',
        renderTo: document.body,
        items: [{
            region: "north",
            xtype: 'panel',
            border:false,
            html:
                '<div style="padding-left: 15px;padding-top: 15px;">'
                    +'    <div style=" float:left;padding-left: 100px"  id="grailsLogo" role="banner"><a href=""><img  src="'+imagecableftUrl+'" alt="Cruz Roja"/></a>'
                    +'    </div>'
                    +'    <div style="padding-left: 15px ;float: left; text-align: left">'
                    +'        CRUZ ROJA <br>'
                    +'        ARGENTINA <br>'
                    +'        FILIAL CORDOBA <br>'
                    +'        Instituto Superior de Enseñanza'
                    +'    </div>'
                    +'    <div style="float:right;padding-right: 100px">'
                    +'          <img src="'+imagecabrightUrl+'" />'
                    +'    </div>'
                    +'</div>'

        },{
            region: 'west',
            xtype: 'panel',
            border:false,
            //split: true,
            //collapsible: true,
            //collapseMode: 'mini',
            //title: 'Some Info',
            //bodyStyle:'padding:5px;',
            width: 100
            //minSize: 200,
            //,html: 'West'
        },{
            region: 'center',
            border:false,
            //xtype: 'panel',
            border:false,
            width: 400,
            //activeTab: 0,
            items: [{
                //title: 'Grid',
                html: '<p style="text-align: center">'
                    +'<h1 style="font-size: large;text-align: center">No hay preinscripciones abiertas</h2>'
                    +'<a style="align: center" href="http://www.iscrafcordoba.edu.ar/"> Abandonar el sitio </a>'
                    +'</p>'
            }]
        },{
            region: 'east',
            xtype: 'panel',
            //split: true,
            width: 100,
            //html: 'East',
            border:false
        },{
            region: 'south',
            xtype: 'panel',
            html:'<p style="text-align: center">'
                +'© 2014 Instituto Superior Cruz Roja Argentina - Filial Códoba'
                +'</p>'
            ,border:false
        }]
    });
});