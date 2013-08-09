Ext.onReady(function(){
    Ext.QuickTips.init();

    new Ext.FormPanel({
        url:confirmUrl
        ,renderTo:'body'
        ,height:450
        ,width:450
        ,items:[
            {
                xtype:'hidden'
                ,name:'alumno'
                ,id:'alumnoId'
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