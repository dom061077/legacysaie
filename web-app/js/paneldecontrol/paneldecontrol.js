var randomnumber;

function verdetalle(cabid){
    var grid = Ext.getCmp('gridlistadoInscDetalleId');
    grid.getStore().load({
        params:{
            inscripcionId:cabid
        }
    });
    var index = grid.getStore().findExact('id',cabid);
    var record = grid.getStore().getAt(index);
}


Ext.onReady(function(){
    //TO DO EL LOAD DEL FORMULARIO
    Ext.QuickTips.init();
    var nestedRowIndxAnt=0;
    var matriculaseleccionadapagocuota;
    var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});
    var storeaux =  new Ext.data.JsonStore({
        root:'rows',
        url:provurl,
        fields:['id','descripcion'],
        autoLoad:false
    });
    var task = {
        run: function(){
            storeaux.load();
        },
        interval: 10000 // every 30 seconds
    };
    var runner = new Ext.util.TaskRunner();
    runner.start(task);


    var provinciaStore = new Ext.data.JsonStore({
        root:'rows',
        url:provinciaUrl,
        fields:['id','descripcion'],
        autoLoad:true
    });

    var localidadStore = new Ext.data.JsonStore({
        root:'rows',
        url:localidadUrl,
        fields:['id','descripcion'],
        autoLoad:true
    });

    var paisesStore = new Ext.data.JsonStore({
        root:'rows',
        url:paisUrl,
        fields:['id','descripcion'],
        autoLoad:true
    });

    var storefechaexamenes = new Ext.data.JsonStore({
        root:'rows',
        url:fechasexamenesUrl,
        fields:['id','materia','docente','fechaexamen','tipo','modalidad'],
        autoLoad:true
    })

    var storenotasexamenes = new Ext.data.JsonStore({
        root:'rows',
        url:fechanotasexamenesUrl,
        fields:['id','materia','docente','fechaexamen','tipo','modalidad','nota'],
        autoLoad:true
    });

    function habilitaUpdateAlumno(){
        Ext.getCmp('boxfotoId').hide();
        Ext.getCmp('imagenId').show();
        Ext.getCmp('imagenId').setWidth(200);
        /*calledomicilioId
        numerodomicilioId
        barriodomicilioId
        paisdomicilioId
        provinciadomicilioId
        localidaddomicilioId*/
        Ext.getCmp('calledomicilioId').enable();
        Ext.getCmp('numerodomicilioId').enable();
        Ext.getCmp('barriodomicilioId').enable();
        Ext.getCmp('paisdomicilioId').enable();
        Ext.getCmp('provinciadomicilioId').enable();
        Ext.getCmp('localidaddomicilioId').enable();
        Ext.getCmp('telefonoparticularId').enable();
        Ext.getCmp('telefonocelularId').enable();
        Ext.getCmp('telefonoalternativoId').enable();
        Ext.getCmp('emailId').enable();
        Ext.getCmp('lugarlaboralId').enable();
        Ext.getCmp('telefonolaboralId').enable();
        Ext.getCmp('callelaboralId').enable();
        Ext.getCmp('numerolaboralId').enable();
        Ext.getCmp('barrriolaboralId').enable();
        Ext.getCmp('paislaboralId').enable();
        Ext.getCmp('provincialaboralId').enable();
        Ext.getCmp('localidadlaboralId').enable();
        //---
        Ext.getCmp('modificarbtnId').disable();
        Ext.getCmp('guardarbtnId').enable();
        Ext.getCmp('cancelarbtnId').enable();
    }

    function disableAlumnoData(){
        Ext.getCmp('boxfotoId').show();
        Ext.getCmp('imagenId').hide();
        Ext.getCmp('calledomicilioId').disable();
        Ext.getCmp('numerodomicilioId').disable();
        Ext.getCmp('barriodomicilioId').disable();
        Ext.getCmp('paisdomicilioId').disable();
        Ext.getCmp('provinciadomicilioId').disable();
        Ext.getCmp('localidaddomicilioId').disable();
        Ext.getCmp('telefonoparticularId').disable();
        Ext.getCmp('telefonocelularId').disable();
        Ext.getCmp('telefonoalternativoId').disable();
        Ext.getCmp('emailId').disable();
        Ext.getCmp('lugarlaboralId').disable();
        Ext.getCmp('telefonolaboralId').disable();
        Ext.getCmp('callelaboralId').disable();
        Ext.getCmp('numerolaboralId').disable();
        Ext.getCmp('barrriolaboralId').disable();
        Ext.getCmp('paislaboralId').disable();
        Ext.getCmp('provincialaboralId').disable();
        Ext.getCmp('localidadlaboralId').disable();

        //---
        Ext.getCmp('modificarbtnId').enable();
        Ext.getCmp('guardarbtnId').disable();
        Ext.getCmp('cancelarbtnId').disable();

    }

    function updateAlumno(){
        var formAlumno = Ext.getCmp('formalumnoId');

        if(formAlumno.getForm().isValid()){
            loadMask.show();
            formAlumno.getForm().submit({
                success: function(f,a){
                    loadMask.hide();
                    Ext.Msg.show({
                        title:'Mensaje'
                        , icon:Ext.MessageBox.INFO
                        , msg:a.result.mensaje
                        , buttons:Ext.MessageBox.OK
                        , fn: function(btn){
                            disableAlumnoData();
                            Ext.getCmp('formalumnoId').getForm().load({
                                url:alumnodataUrl
                            });
                            Ext.getCmp('boxfotoId').getEl().dom.src=alumnoreldimageUrl+'?parm='
                                +Math.floor(Math.random()*11);

                        }
                    });
                },
                failure: function(f,a){
                    var mensaje = a.result.mensaje+'<br><br>';
                    for(var i=0;i<a.result.errors.length;i++){
                        mensaje = mensaje +'- '+a.result.errors[i].msg+'<br>';
                    }

                    Ext.Msg.show({
                        title: 'Error'
                        ,icon:Ext.MessageBox.ERROR
                        ,msg: mensaje,
                        buttons: Ext.MessageBox.OK,
                        fn: function(btn){
                            loadMask.hide();
                        }

                    });
                }
            });
        }


    }

    function cancelarUpdateAlumno(){
        disableAlumnoData();
        Ext.getCmp('imagenId').setRawValue('Seleccione imagen');
        Ext.getCmp('formalumnoId').getForm().load({
            url:alumnodataUrl
            ,success:function(f,a){
                Ext.getCmp('paisdomicilioId').setValue(a.result.data.paisDomicilio);
                Ext.getCmp('paisdomicilioId').hiddenField.value = a.result.data.paisdomicilio_id;
                Ext.getCmp('provinciadomicilioId').setValue(a.result.data.provinciaDomicilio);
                Ext.getCmp('provinciadomicilioId').hiddenField.value = a.result.data.provinciadomicilio_id ;
                Ext.getCmp('localidaddomicilioId').setValue(a.result.data.localidadDomicilio);
                Ext.getCmp('localidaddomicilioId').hiddenField.value = a.result.data.localidaddomicilio_id;
                Ext.getCmp('provinciadomicilioId').getStore().load({
                    params:{'pais_id':Ext.getCmp('paisdomicilioId').hiddenField.value}
                });
                Ext.getCmp('localidaddomicilioId').getStore().load({
                    params:{'provincia_id':Ext.getCmp('provinciadomicilioId').hiddenField.value}
                });

            },
            failure:function(f,a){

            }
        });
    }

    function getRowsDataFinal(){
        var storeInscFinal = Ext.getCmp('gridcorrelfinId').getStore();
       inscFinalArr=[];
       storeInscFinal.data.each(function(rec){
           inscFinalArr.push(rec.data);
       });
       return Ext.encode(inscFinalArr);
    }

    function getRowsDataCursar(){
        var storeInscCursar = Ext.getCmp('gridcorrelcurId').getStore();
        inscCurArr = [];
        storeInscCursar.data.each(function(rec){
            inscCurArr.push(rec.data);
        });
        return Ext.encode(inscCurArr);
    }




    var nestedRowGrid = new Ext.grid.RowExpander({
        tpl: new Ext.XTemplate('<div id="iddetaildata'+randomnumber+'" class="detailData">','','</div>'),
        listeners:
        {
            expand:function(ex,record,body,rowIndex){
                randomnumber = Math.floor(Math.random()*11);
                if (nestedRowIndxAnt != rowIndex)
                    nestedRowGrid.toggleRow(nestedRowIndxAnt);
                nestedRowIndxAnt = rowIndex;

                processRowExpander(record,body,rowIndex);
            },
            collapse : function(ex,record,body,rowIndex){

            }
        }
    });



    var storelistadoinscdet = new Ext.data.JsonStore({
        root:'rows',
        url:inscDetUrl,
        fields:[{name:'id'},{name:'cabid'},{name:'denominacion'},{name:'nivel'},{name:'estado'},{name:'notafinal',type:'float'}],
        autoLoad:false
    });

    var storemateriasaprobadas = new Ext.data.JsonStore({
        root:'rows',
        url:materiasAprobadas,
        fields:[{name:'id'},{name:'carrera'},{name:'nivel'},{name:'materia'},{name:'notafinal'}],
        autoLoad:false
    });

    var storemateriasregulares = new Ext.data.JsonStore({
        root:'rows',
        url:materiasRegulares,
        fields:[{name:'id'},{name:'carrera'},{name:'nivel'},{name:'materia'}],
        autoLoad:false
    });


    storemateriasaprobadas.on('beforeload',function(){
        storemateriasaprobadas.baseParams={
            alumnoId:alumnoId,
            carreraId:Ext.getCmp('combocarreramataprobadasId').hiddenField.value,
            materiaDeno:Ext.getCmp('filtromateriaId').getValue()
        }
    });

    storemateriasregulares.on('beforeload',function(){
        storemateriasregulares.baseParams={
            alumnoId:alumnoId,
            carreraId:Ext.getCmp('combocarreramatregularesId').hiddenField.value,
            materiaDeno:Ext.getCmp('filtromateriaregularId').getValue()
        }
    });




    Ext.QuickTips.init();
    var storelistadoinscripciones = new Ext.data.JsonStore({
        root:'rows',
        url:inscUrl,
        remoteSort:true,
        baseParams:{
          alumnoId:alumnoId
        },
        fields:[{name:'id'},{name:'carrera'},{name:'aniolectivo'},{name:'fecha',type:'date'}],
        autoLoad:false
    });



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
                xtype: 'grouptabpanel',
                tabWidth: 200,
                region:'center',
                activeGroup: 0,
                items: [

                        {
                            expanded:true,
                            items:[
                                {
                                    title:username,
                                    iconCls: 'x-icon-templates',
                                    tabTip: 'Templates tabtip',
                                    style: 'padding: 10px;'//,
                                    ,items:[
                                        {
                                            xtype:'form'
                                            ,frame:true
                                            ,title:'Datos del Alumno    '
                                            ,id:'formalumnoId'
                                            ,style: 'margin:0 auto;margin-top:10px;'
                                            ,height:450
                                            ,width:450
                                            ,url:savealumnoUrl
                                            ,fileUpload:true
                                            ,items:[
                                                {
                                                    xtype:'hidden'
                                                    ,id:'alumnoId'
                                                    ,name:'id'
                                                    ,value:alumnoId
                                                },
                                                {
                                                    xtype:'tabpanel'
                                                    ,activeItem:0
                                                    ,autoScroll:true
                                                    ,border:false
                                                    ,defaults:{
                                                        layout:'form'
                                                        ,labelWidth:150
                                                        ,autoHeight:true
                                                        ,anchor:'100% 100%'
                                                        ,defaultType:'textfield'
                                                        ,bodyStyle:'padding:5px'
                                                        ,border:true
                                                        ,frame:true
                                                }
                                                    ,items:[
                                                        {
                                                            title:'Datos Personales'
                                                            ,items:[
                                                                {
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Tipo de Documento'
                                                                    ,name:'tipoDocumento'
                                                                    ,id:'tipodocumentoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Número de Documento'
                                                                    ,name:'numeroDocumento'
                                                                    ,id:'numerodocumentoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Apellido'
                                                                    ,name:'apellido'
                                                                    ,id:'apellidoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Nombre'
                                                                    ,name:'nombre'
                                                                    ,id:'nombreId'
                                                                    ,disabled:true


                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Calle'
                                                                    ,name:'calleDomicilio'
                                                                    ,id:'calledomicilioId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Nro.Domicilio'
                                                                    ,name:'numeroDomicilio'
                                                                    ,id:'numerodomicilioId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Barrio'
                                                                    ,name:'barrioDomicilio'
                                                                    ,id:'barriodomicilioId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'País Domicilio'
                                                                    ,mode:'local'
                                                                    ,triggerAction:'all'
                                                                    ,editable:false
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,hiddenName:'paisdomicilio_id'
                                                                    ,store:paisesStore
                                                                    ,name:'paisDomicilio'
                                                                    ,id:'paisdomicilioId'
                                                                    ,disabled:true
                                                                    ,listeners:{
                                                                        'select':function(cmd,rec,idx){
                                                                            var provinciaCmb = Ext.getCmp('provinciadomicilioId');
                                                                            provinciaCmb.clearValue();
                                                                            provinciaCmb.store.load({
                                                                                params:{'pais_id':Ext.getCmp('paisdomicilioId').hiddenField.value}
                                                                            });
                                                                            var localidadCmb = Ext.getCmp('localidaddomicilioId');
                                                                            localidadCmb.clearValue();
                                                                        }
                                                                    }

                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'Provincia Domicilio'
                                                                    ,mode:'local'
                                                                    ,editable:false
                                                                    ,triggerAction:'all'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,store:provinciaStore
                                                                    ,hiddenName:'provinciadomicilio_id'
                                                                    ,name:'provinciaDomicilio'
                                                                    ,id:'provinciadomicilioId'
                                                                    ,disabled:true
                                                                    ,listeners:{
                                                                        'select':function(cmd,rec,idx){
                                                                            var localidadCmb = Ext.getCmp('localidaddomicilioId');
                                                                            localidadCmb.clearValue();
                                                                            localidadCmb.store.load({
                                                                                params:{'provincia_id':Ext.getCmp('provinciadomicilioId').hiddenField.value}
                                                                            });
                                                                        }
                                                                    }

                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'Localidad Domicilio'
                                                                    ,name:'localidadDomicilio'
                                                                    ,id:'localidaddomicilioId'
                                                                    ,editable:false
                                                                    ,mode:'local'
                                                                    ,triggerAction:'all'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,hiddenName:'localidaddomicilio_id'
                                                                    ,mode:'local'
                                                                    ,store:localidadStore
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'box',
                                                                    id:'boxfotoId',
                                                                    fieldLabel:'Foto',
                                                                    autoEl: {tag: 'img', src: alumnoimageUrl, width: 100, height:80}

                                                                },{
                                                                    xtype: 'fileuploadfield',
                                                                    id: 'imagenId',
                                                                    hidden:true,
                                                                    emptyText: 'Seleccione imagen',
                                                                    fieldLabel: 'Foto',
                                                                    name: 'imagenphoto',
                                                                    buttonText: '',
                                                                    layout:'form',
                                                                    anchor: '0',
                                                                    buttonCfg: {
                                                                        iconCls: 'upload-icon'
                                                                    }
                                                                }
                                                            ]
                                                        },{
                                                            title:'Contacto'
                                                            ,items:[
                                                                {
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Particular'
                                                                    ,name:'telefonoParticular'
                                                                    ,id:'telefonoparticularId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Celular'
                                                                    ,name:'celularParticular'
                                                                    ,id:'telefonocelularId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Alternativo'
                                                                    ,name:'telefonoAlternativo'
                                                                    ,id:'telefonoalternativoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'E-mail'
                                                                    ,name:'email'
                                                                    ,id:'emailId'
                                                                    ,disabled:true
                                                                }
                                                            ]
                                                        }
                                                        ,{
                                                            title:'Datos Laborales'
                                                            ,items:[
                                                                {
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Lugar Laboral'
                                                                    ,name:'lugarLaboral'
                                                                    ,id:'lugarlaboralId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Laboral'
                                                                    ,name:'telefonoLaboral'
                                                                    ,id:'telefonolaboralId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Calle'
                                                                    ,name:'calleLaboral'
                                                                    ,id:'callelaboralId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Número'
                                                                    ,name:'numeroDomicilioLaboral'
                                                                    ,id:'numerolaboralId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Barrio Laboral'
                                                                    ,name:'barrioLaboral'
                                                                    ,id:'barrriolaboralId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'País Laboral'
                                                                    ,valueField:'id'
                                                                    ,mode:'local'
                                                                    ,editable:false
                                                                    ,triggerAction:'all'
                                                                    ,displayField:'descripcion'
                                                                    ,hiddenName:'paislaboral_id'
                                                                    ,mode:'local'
                                                                    ,store:paisesStore
                                                                    ,name:'paisLaboral'
                                                                    ,id:'paislaboralId'
                                                                    ,disabled:true
                                                                    ,listeners:{
                                                                        'select':function(cmd,rec,idx){
                                                                            var provinciaCmb = Ext.getCmp('provincialaboralId');
                                                                            provinciaCmb.clearValue();
                                                                            provinciaCmb.store.load({
                                                                                params:{'pais_id':Ext.getCmp('paislaboralId').hiddenField.value}
                                                                            });
                                                                        }
                                                                    }

                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'Provincia Laboral'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,mode:'local'
                                                                    ,editable:false
                                                                    ,triggerAction:'all'
                                                                    ,hiddenName:'provincialaboral_id'
                                                                    ,store:provinciaStore
                                                                    ,name:'provinciaLaboral'
                                                                    ,id:'provincialaboralId'
                                                                    ,disabled:true
                                                                    ,listeners:{
                                                                        'select':function(cmd,rec,idx){
                                                                            var localidadCmb = Ext.getCmp('localidadlaboralId');
                                                                            localidadCmb.clearValue();
                                                                            localidadCmb.store.load({
                                                                                params:{'provincia_id':Ext.getCmp('provincialaboralId').hiddenField.value}
                                                                            });
                                                                        }
                                                                    }

                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'Localidad Laboral'
                                                                    ,name:'localidadLaboral'
                                                                    ,id:'localidadlaboralId'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,mode:'local'
                                                                    ,editable:false
                                                                    ,triggerAction:'all'
                                                                    ,store:localidadStore
                                                                    ,disabled:true
                                                                    ,hiddenName:'localidadlaboral_id'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            buttons:[
                                                {
                                                    text:'Modificar'
                                                    ,id:'modificarbtnId'
                                                    ,handler:function(){
                                                        Ext.getCmp('boxfotoId').hide();
                                                        Ext.getCmp('imagenId').show();
                                                        Ext.getCmp('imagenId').setWidth(200);
                                                        habilitaUpdateAlumno();
                                                    }
                                                },{
                                                    text:'Guardar Cambios'
                                                    ,id:'guardarbtnId'
                                                    ,disabled:true
                                                    ,handler:function(){
                                                        updateAlumno();                                                    }
                                                },{
                                                    text:'Cancelar'
                                                    ,id:'cancelarbtnId'
                                                    ,disabled:true
                                                    ,handler:function(){
                                                        cancelarUpdateAlumno();
                                                    }
                                                }
                                            ]

                                        }
                                    ]
                                },
                                {
                                    title:'Cambiar Contraseña',
                                    layout: 'fit',
                                    iconCls: 'x-icon-change-pass',
                                    tabTip: 'Cambiar password',
                                    style: 'padding: 10px',
                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    title:'Cambio de Contraseña',
                                                    url:changepasswordUrl,
                                                    id:'formpasswordId',
                                                    frame:true,
                                                    width:500,
                                                    labelWidth:150,
                                                    height:225,
                                                    style: 'margin:0 auto;margin-top:50px;',
                                                    items:[
                                                        {
                                                            xtype:'textfield',
                                                            hidden:true,
                                                            value:usuarioId,
                                                            name:'id',
                                                            allowBlank:false,
                                                            id:'nombreusuarioId'
                                                        },{
                                                            xtype:'textfield',
                                                            fieldLabel:'Contraseña anterior',
                                                            name:'passwordanterior',
                                                            msgTarget:'under',
                                                            allowBlank:false,
                                                            inputType:'password',
                                                            id:'passwordanteriorId'
                                                        },{
                                                            xtype:'textfield',
                                                            fieldLabel:'Nueva Contraseña',
                                                            name:'newpassword',
                                                            msgTarget:'under',
                                                            allowBlank:false,
                                                            inputType:'password',
                                                            id:'newpasswordId'//,
                                                            //vtype:'changepassword'
                                                        },{
                                                            xtype:'textfield',
                                                            fieldLabel:'Repita Nueva Contraseña',
                                                            name:'repeatnewpassword',
                                                            msgTarget:'under',
                                                            allowBlank:false,
                                                            inputType:'password',
                                                            id:'repeatnewpasswordId'//,
                                                            // vtype:'changepassword'
                                                        }
                                                    ],
                                                    buttons:[
                                                        {
                                                            text:'Cambiar',
                                                            handler:function(){
                                                                var formpassword = Ext.getCmp('formpasswordId');
                                                                if(formpassword.getForm().isValid()){
                                                                    if(Ext.getCmp('newpasswordId').getValue()!=Ext.getCmp('repeatnewpasswordId').getValue()){
                                                                        Ext.Msg.show({
                                                                            title:'Mensaje'
                                                                            , icon:Ext.MessageBox.ERROR
                                                                            , msg:'La nueva contraseña no coincide con su repetición'
                                                                            , buttons:Ext.MessageBox.OK
                                                                            , fn: function(btn){

                                                                            }
                                                                        });
                                                                    }else
                                                                        formpassword.getForm().submit({
                                                                            success: function(f,a){
                                                                                Ext.Msg.show({
                                                                                    title:'Mensaje'
                                                                                    ,icon:Ext.MessageBox.INFO
                                                                                    ,buttons: Ext.MessageBox.OK
                                                                                    ,msg:a.result.mensaje
                                                                                    ,fn:function(btn){
                                                                                        window.location='';
                                                                                    }
                                                                                });
                                                                            },
                                                                            failure: function(f,a){
                                                                                var mensaje = a.result.mensaje+'<br><br>';
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
                                                                window.location='';
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]
                                        }
                                    ]
                                }
                                ,{
                                    title:'Cerrar Sesión',
                                    iconCls: 'x-icon-close-session',
                                    tabTip: 'Cierra su sesión de Usuario',
                                    style: 'padding: 10px;',
                                    listeners:{
                                        afterrender : function(component){
                                            window.location = cerrarSesionUrl;

                                        }
                                    }

                                }
                            ]
                        },
                        {
                            mainItem: 1,
                            items: [
                                {
                                    title: 'Inscribirme en Finales',
                                    layout: 'fit',
                                    iconCls: 'x-icon-insc-final',
                                    tabTip: 'Registrar Inscripción en examen final',
                                    style: 'padding: 10px;',

                                    items: [
                                        {
                                            xtype:'panel',
                                            items:[
                                                {
                                                    xtype:'form'
                                                    ,style: 'margin:0 auto;margin-top:50px;'
                                                    ,id:'forminscfinalId'
                                                    ,url:submitFinUrl
                                                    ,frame:true
                                                    ,width:500
                                                    ,title:'Inscripción de Finales'
                                                    ,listeners:{
                                                        afterrender: function(component){
                                                            /*var rowselected = Ext.getCmp('combocarreraId').getStore().getAt(0);
                                                            Ext.getCmp('combocarreraId').setValue(rowselected.get('denominacion'));
                                                            Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                params:{
                                                                    alumnoId:alumnoId,
                                                                    carreraId:rowselected.get('id')
                                                                }
                                                            });
                                                            rowselected = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                            Ext.getCmp('comboaniolectivoId').setValue(rowselected.get('descripcion'));  */
                                                        }
                                                    }
                                                    ,items:[
                                                        {
                                                            xtype:'hidden'
                                                            ,name:'matriculafinal'
                                                            ,id:'matriculafinalId'
                                                        },
                                                        {
                                                            xtype:'hidden'
                                                            ,name:'inscfinalmaterias'
                                                            ,id:'inscfinalmateriasId'
                                                        },
                                                        {
                                                            xtype:'combo'
                                                            ,fieldLabel:'Carrera'
                                                            ,id:'combocarreraId'
                                                            ,valueField:'id'
                                                            ,width:200
                                                            ,mode:'local'
                                                            ,editable:false
                                                            ,triggerAction:'all'
                                                            ,displayField:'denominacion'
                                                            ,hiddenName:'carrera_id'
                                                            ,allowBlank:false
                                                            ,msgTarget:'under'
                                                            ,store:new Ext.data.JsonStore({
                                                                root:'rows',
                                                                url:carreraUrl,
                                                                fields:['id','denominacion'],
                                                                baseParams:{
                                                                    alumnoId: alumnoId
                                                                },
                                                                autoLoad:true
                                                            }),
                                                            listeners:{
                                                                change:function(combo,newValue,oldValue){
                                                                    if(newValue==''){
                                                                        Ext.getCmp('comboaniolectivoId').getStore().removeAll();
                                                                        Ext.getCmp('gridcorrelfinId').getStore().removeAll();
                                                                        Ext.getCmp('comboaniolectivoId').clearValue();
                                                                    }
                                                                },
                                                                afterrender: function(combo){
                                                                    /*var rowselected = combo.getStore().getAt(0);
                                                                    Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                        params:{
                                                                            alumnoId:alumnoId,
                                                                            carreraId:rowselected.get('id')
                                                                        }
                                                                    });
                                                                    rowselected = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                                    Ext.getCmp('comboaniolectivoId').setValue(rowselected.get('descripcion'));*/

                                                                },
                                                                select:function(combo,record,index){
                                                                    var rowselectedCarrera = Ext.getCmp('combocarreraId').getStore().getAt(0);
                                                                    Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                        params:{
                                                                            alumnoId:alumnoId,
                                                                            carreraId:rowselectedCarrera.get('id')
                                                                        }
                                                                    });

                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            id:'inscfinalesmateriasId',
                                                            name:'inscfinalesmaterias',
                                                            hidden:true
                                                        },
                                                        {   xtype:'combo'
                                                            ,fieldLabel:'Año Lectivo'
                                                            ,id:'comboaniolectivoId'
                                                            ,with:200
                                                            ,valueField:'id'
                                                            ,mode:'local'
                                                            ,editable:false
                                                            ,triggerAction:'all'
                                                            ,displayField:'descripcion'
                                                            ,hiddenName:'aniolectivo_id'
                                                            ,triggerAction:'all'
                                                            ,allowBlank:false
                                                            ,msgTarget:'under'
                                                            ,store:new Ext.data.JsonStore({
                                                                    root:'rows',
                                                                    url:anioLectivoUrl,
                                                                    fields:['id','descripcion','matricula'],
                                                                    baseParams:{
                                                                        alumnoId:alumnoId
                                                                    },
                                                                    autoLoad:false
                                                                }),
                                                            listeners:{
                                                                /*afterrender: function(combo){
                                                                    var rowselected = combo.getStore().getAt(0);
                                                                    combo.setValue(rowselected.get('descripcion'));
                                                                }, */
                                                                select:function(combobox,record,index){
                                                                    Ext.getCmp('inscripcionfinalbtnId').disable();
                                                                    Ext.getCmp('gridcorrelfinId').getStore().load({
                                                                        params:{
                                                                            alumnoId:alumnoId,
                                                                            anioLectivoId:Ext.getCmp('comboaniolectivoId').hiddenField.value,
                                                                            carreraId:Ext.getCmp('combocarreraId').hiddenField.value
                                                                        }
                                                                    });
                                                                    rowselectedAnioLectivo = Ext.getCmp('combocarreraId').getStore().getAt(0);
                                                                    Ext.getCmp('matriculacursadoId').setValue(rowselectedAnioLectivo.get('matricula'));
                                                                }
                                                            }
                                                        },new Ext.grid.GridPanel({
                                                            id:'gridcorrelfinId',
                                                            store:new Ext.data.JsonStore({
                                                                root:'rows',
                                                                url:correlFinal,
                                                                fields:[{name:'id'},{name:'denominacion'},{name:'nivel'},{name:'seleccionada',type:'bool'}],
                                                                autoLoad:false,
                                                                listeners:{
                                                                    load:function(store,records,options){
                                                                      Ext.getCmp('inscripcionfinalbtnId').enable();
                                                                    }
                                                                }
                                                            }),
                                                            columns: [
                                                                {header: "id",dataIndex:'id',hidden:true
                                                                },
                                                                {header: "Denominación",width:200,sortable:false,dataIndex:'denominacion'},
                                                                {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                                                                {
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
                                                            title:'Materias a Inscribir',
                                                            iconCls: 'icon-grid',
                                                            listeners:{
                                                            }
                                                            })

                                                    ],
                                                    buttons:[
                                                        {
                                                            text:'Inscribir en Final',
                                                            id:'inscripcionfinalbtnId',
                                                            handler: function(){
                                                                if(Ext.getCmp('forminscfinalId').getForm().isValid()){
                                                                    var rowselectedMatricula = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                                    Ext.getCmp('matriculafinalId').setValue(rowselectedMatricula.get('matricula'));
                                                                    Ext.getCmp('inscfinalmateriasId').setValue(getRowsDataFinal());
                                                                    loadMask.show();
                                                                    Ext.getCmp('forminscfinalId').getForm().submit({
                                                                        success: function(f,resp){
                                                                            loadMask.hide();
                                                                            var respuesta = Ext.decode(resp.response.responseText);
                                                                            mensaje = respuesta.msg+'<br><br>';
                                                                            Ext.Msg.show({
                                                                                title:'Mensajes',
                                                                                //icon:Ext.MessageBox.INFO,
                                                                                msg: mensaje,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                fn: function(btn){
                                                                                    Ext.getCmp('gridcorrelfinId').getStore().load({
                                                                                        params:{
                                                                                        alumnoId:alumnoId,
                                                                                        anioLectivoId:Ext.getCmp('comboaniolectivoId').hiddenField.value,
                                                                                        carreraId:Ext.getCmp('combocarreraId').hiddenField.value
                                                                                    }});

                                                                                }
                                                                            });

                                                                        },
                                                                        failure: function(f,resp){
                                                                            loadMask.hide();
                                                                            var respuesta = Ext.decode(resp.response.responseText);
                                                                            mensaje = respuesta.msg+'<br><br>';
                                                                            for(var i=0;i<respuesta.errors.length;i++){
                                                                                mensaje = mensaje +'- '+respuesta.errors[i].msg+'<br>';
                                                                            }

                                                                            Ext.Msg.show({
                                                                                title:'Mensajes',
                                                                                icon:Ext.MessageBox.ERROR ,
                                                                                msg: mensaje,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                fn: function(btn){
                                                                                }
                                                                            });

                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },{
                                        xtype: 'portal',
                                        title: 'Inscripciones',
                                        tabTip: 'Inscripciones'
                                }, {
                                        title: 'Inscribirme en Cursado',
                                        iconCls: 'x-icon-insc-regular',
                                        tabTip: 'Inscripciones para el cursado',
                                        style: 'padding: 10px;',
                                        layout: 'fit',
                                        items: [{
                                            xtype: 'panel',
                                            activeTab: 1,
                                            items:[
                                                {
                                                    xtype:'form'
                                                    ,id:'formcursadoId'
                                                    ,style: 'margin:0 auto;margin-top:50px;'
                                                    ,url:submitCurUrl
                                                    ,frame:true
                                                    ,width:500
                                                    ,title:'Inscripción de Cursado'
                                                    ,items:[
                                                    {
                                                        xtype:'textfield'
                                                        ,hidden:true
                                                        ,name:'matriculacursado'
                                                        ,id:'matriculacursadoId'
                                                    },
                                                    {
                                                        xtype:'textfield'
                                                        ,hidden:true
                                                        ,name:'insccursadomaterias'
                                                        ,id:'insccursadomateriasId'
                                                    },
                                                    {
                                                        xtype:'combo'
                                                        ,fieldLabel:'Carrera'
                                                        ,id:'combocarreracurId'
                                                        ,width:200
                                                        ,valueField:'id'
                                                        ,editable:false
                                                        ,mode:'local'
                                                        ,triggerAction:'all'
                                                        ,displayField:'denominacion'
                                                        ,hiddenName:'carrera_id'
                                                        ,allowBlank:false
                                                        ,msgTarget:'under'
                                                        ,store:new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:carreraUrl,
                                                            fields:['id','denominacion'],
                                                            baseParams:{
                                                                alumnoId: alumnoId
                                                            },
                                                            autoLoad:true
                                                        }),
                                                        listeners:{
                                                            change:function(combo,newValue,oldValue){
                                                                if(newValue==''){
                                                                    Ext.getCmp('comboaniolectivocurId').getStore().removeAll();
                                                                    Ext.getCmp('gridcorrelcurId').getStore().removeAll();
                                                                    Ext.getCmp('comboaniolectivocurId').clearValue();
                                                                }
                                                            },
                                                            afterrender: function(combo){
                                                                /*var rowselected = combo.getStore().getAt(0);
                                                                 Ext.getCmp('comboaniolectivoId').getStore().load({
                                                                 params:{
                                                                 alumnoId:alumnoId,
                                                                 carreraId:rowselected.get('id')
                                                                 }
                                                                 });
                                                                 rowselected = Ext.getCmp('comboaniolectivoId').getStore().getAt(0);
                                                                 Ext.getCmp('comboaniolectivoId').setValue(rowselected.get('descripcion'));*/

                                                            },
                                                            select:function(combo,record,index){
                                                                var rowselectedCarrera = Ext.getCmp('combocarreracurId').getStore().getAt(0);
                                                                Ext.getCmp('comboaniolectivocurId').getStore().load({
                                                                    params:{
                                                                        alumnoId:alumnoId,
                                                                        carreraId:rowselectedCarrera.get('id')
                                                                    }
                                                                });

                                                            }
                                                        }
                                                    },
                                                    {   xtype:'combo'
                                                        ,fieldLabel:'Año Lectivo'
                                                        ,id:'comboaniolectivocurId'
                                                        ,valueField:'id'
                                                        ,editable:false
                                                        ,mode:'local'
                                                        ,triggerAction:'all'
                                                        ,displayField:'descripcion'
                                                        ,hiddenName:'aniolectivo_id'
                                                        ,allowBlank:false
                                                        ,msgTarget:'under'
                                                        ,store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:anioLectivoUrl,
                                                        fields:['id','descripcion','matricula'],
                                                        baseParams:{
                                                            alumnoId:alumnoId
                                                        },
                                                        autoLoad:false
                                                    }),
                                                        listeners:{
                                                            /*afterrender: function(combo){
                                                             var rowselected = combo.getStore().getAt(0);
                                                             combo.setValue(rowselected.get('descripcion'));
                                                             }, */
                                                            select:function(combobox,record,index){
                                                                Ext.getCmp('inscribircursadobtnId').disable();
                                                                Ext.getCmp('gridcorrelcurId').getStore().load({
                                                                    params:{
                                                                        alumnoId:alumnoId,
                                                                        anioLectivoId:Ext.getCmp('comboaniolectivocurId').hiddenField.value,
                                                                        carreraId:Ext.getCmp('combocarreracurId').hiddenField.value
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }

                                                    ,new Ext.grid.GridPanel({
                                                        id:'gridcorrelcurId',
                                                        stripeRows:true,
                                                        store:new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:correlCursar,
                                                            fields:[{name:'id'},{name:'denominacion'},{name:'nivel'},{name:'seleccionada',type:'bool'}],
                                                            autoLoad:false,
                                                            listeners:{
                                                                load:  function(grid,record,options){
                                                                    Ext.getCmp('inscribircursadobtnId').enable();
                                                                }
                                                            }
                                                        }),
                                                        columns: [
                                                            {header: "id",dataIndex:'id',hidden:true},
                                                            {header: "Denominación",width:200,sortable:false,dataIndex:'denominacion'},
                                                            {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                                                            {
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

                                                        title:'Materias a Inscribir',
                                                        iconCls: 'icon-grid',
                                                        listeners:{
                                                        }
                                                    })
                                                ],buttons:[
                                                        {
                                                            text:'Inscribir en Cursado',
                                                            id:'inscribircursadobtnId',
                                                            handler: function(){
                                                                if(Ext.getCmp('formcursadoId').getForm().isValid()){
                                                                    var rowselectedMatricula = Ext.getCmp('comboaniolectivocurId').getStore().getAt(0);
                                                                    Ext.getCmp('matriculacursadoId').setValue(rowselectedMatricula.get('matricula'));
                                                                    Ext.getCmp('insccursadomateriasId').setValue(getRowsDataCursar());
                                                                    loadMask.show();
                                                                    Ext.getCmp('formcursadoId').getForm().submit({
                                                                        success: function(f,resp){
                                                                            loadMask.hide();
                                                                            var respuesta = Ext.decode(resp.response.responseText);
                                                                            mensaje = respuesta.msg+'<br><br>';
                                                                            Ext.Msg.show({
                                                                                title:'Mensajes',
                                                                                //icon:Ext.MessageBox.INFO,
                                                                                msg: mensaje,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                fn: function(btn){
                                                                                    Ext.getCmp('gridcorrelcurId').getStore().load({
                                                                                        alumnoId:alumnoId,
                                                                                        anioLectivoId:Ext.getCmp('comboaniolectivocurId').hiddenField.value,
                                                                                        carreraId:Ext.getCmp('combocarreracurId').hiddenField.value
                                                                                    })

                                                                                }
                                                                            });

                                                                        },
                                                                        failure: function(f,resp){
                                                                            loadMask.hide();
                                                                            var respuesta = Ext.decode(resp.response.responseText);
                                                                            mensaje = respuesta.msg+'<br><br>';
                                                                            for(var i=0;i<respuesta.errors.length;i++){
                                                                                mensaje = mensaje +'- '+respuesta.errors[i].msg+'<br>';
                                                                            }

                                                                            Ext.Msg.show({
                                                                                title:'Mensajes',
                                                                                icon:Ext.MessageBox.ERROR ,
                                                                                msg: mensaje,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                fn: function(btn){
                                                                                }
                                                                            });

                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }

                                            ]
                                        }]
                                }, {
                                        title: 'Listado de Inscripciones',
                                        iconCls: 'x-icon-insc-listado',
                                        tabTip: 'Lista todas tus inscripciones',
                                        style: 'padding: 10px;',
                                        layout:'fit',
                                        items:[
                                            {
                                              xtype:'panel',
                                              items:[
                                                  {
                                                      xtype:'form',
                                                      style: 'margin:0 auto;margin-top:10px;',
                                                      id:'formlistadoinscId',
                                                      frame:true,
                                                      width:650,
                                                      height:460,
                                                      title:'Mis Inscripciones',
                                                      items:[
                                                          {
                                                              xtype:'combo'
                                                              ,fieldLabel:'Carrera'
                                                              ,id:'combocarreralistadoinscId'
                                                              ,width:250
                                                              ,valueField:'id'
                                                              ,editable:false
                                                              ,mode:'local'
                                                              ,triggerAction:'all'
                                                              ,displayField:'denominacion'
                                                              ,hiddenName:'carrera_id'
                                                              ,store:new Ext.data.JsonStore({
                                                                  root:'rows',
                                                                  url:carreraUrl,
                                                                  fields:['id','denominacion'],
                                                                  baseParams:{
                                                                      alumnoId: alumnoId
                                                                  },
                                                                  autoLoad:true
                                                              }),
                                                              listeners:{
                                                                  change:function(combo,newValue,oldValue){
                                                                      if(newValue==''){
                                                                          Ext.getCmp('comboaniolectivolistadoinscId').getStore().removeAll();
                                                                          Ext.getCmp('gridlistadoinscripcionesId').getStore().removeAll();
                                                                          Ext.getCmp('comboaniolectivolistadoinscId').clearValue();
                                                                      }
                                                                  },
                                                                  select:function(combo,record,index){
                                                                      var rowselectedCarrera = Ext.getCmp('combocarreralistadoinscId').getStore().getAt(0);
                                                                      Ext.getCmp('comboaniolectivolistadoinscId').getStore().load({
                                                                          params:{
                                                                              alumnoId:alumnoId,
                                                                              carreraId:Ext.getCmp('combocarreralistadoinscId').hiddenField.value//rowselectedCarrera.get('id')
                                                                          }
                                                                      });

                                                                  }
                                                              }
                                                          },
                                                          {   xtype:'combo'
                                                              ,fieldLabel:'Año Lectivo'
                                                              ,id:'comboaniolectivolistadoinscId'
                                                              ,valueField:'id'
                                                              ,editable:false
                                                              ,mode:'local'
                                                              ,triggerAction:'all'
                                                              ,displayField:'descripcion'
                                                              ,hiddenName:'aniolectivo_id'
                                                              ,store:new Ext.data.JsonStore({
                                                                  root:'rows',
                                                                  url:anioLectivoUrl,
                                                                  fields:['id','descripcion'],
                                                                  baseParams:{
                                                                      alumnoId:alumnoId
                                                                  },
                                                                  autoLoad:false
                                                              }),
                                                              listeners:{
                                                                  select:function(combobox,record,index){
                                                                      Ext.getCmp('gridlistadoinscripcionesId').getStore().load({
                                                                          params:{
                                                                              alumnoId:alumnoId,
                                                                              anioLectivoId:Ext.getCmp('comboaniolectivolistadoinscId').hiddenField.value,
                                                                              carreraId:Ext.getCmp('combocarreralistadoinscId').hiddenField.value
                                                                          }
                                                                      });
                                                                      rowselectedAnioLectivo = Ext.getCmp('combocarreralistadoinscId').getStore().getAt(0);
                                                                      verdetalle(0);
                                                                  }
                                                              }
                                                          },
                                                           new Ext.grid.GridPanel({
                                                              id:'gridlistadoinscripcionesId',
                                                              stripeRows:true,
                                                              store:storelistadoinscripciones,
                                                              title:'Datos Principales de Inscripción',
                                                              loadMask:true,
                                                              columns: [
                                                                  //nestedRowGrid,
                                                                  {header:'Nº de Insc.',width:70,hidden:false,dataIndex:'id'},
                                                                  {header: "Carrera",width:200,sortable:false,dataIndex:'carrera'},
                                                                  {header: "Año",width:150,sortable:false,dataIndex:"aniolectivo"},
                                                                  {header: "Fecha",width:60,sortable:true,dataIndex:"fecha",renderer: Ext.util.Format.dateRenderer('d/m/y')},
                                                                  {header: "Comprobante",width:70,dataIndex:'id',hidden:false
                                                                      ,renderer: function (val, meta, record) {
                                                                            return '<a target="_blank"  href="'+comprobanteUrl+'/?id='+record.data.id+'"><img style="margin-left:15px " src="'+pdfUrl+'"></a>';
                                                                        }
                                                                  },
                                                                  {header: "Detalle",width:70,dataIndex:'',hidden:false
                                                                      ,renderer: function(val,meta,record){
                                                                            return '<a onclick="verdetalle('+record.data.id+')"  href="#"><img style="margin-left:15px " src="'+refreshUrl+'"></a>';
                                                                      }
                                                                  }
                                                              ],
                                                              //stripeRows: true,
                                                              height:200,
                                                              width:640,
                                                              bbar: new Ext.PagingToolbar({
                                                                   pageSize: 10,
                                                                   store: storelistadoinscripciones,
                                                                   displayInfo:true,
                                                                   displayMsg: 'Visualizando registros {0} - {1} de {2}',
                                                                   emptyMsg: 'No hay registros para visualizar'
                                                               }),
                                                              //plugins:nestedRowGrid,
                                                              iconCls: 'icon-grid',
                                                              listeners:{
                                                              }
                                                          }) ,
                                                          new Ext.grid.GridPanel({
                                                              id:'gridlistadoInscDetalleId',
                                                              stripeRows:true,
                                                              loadMask:true,
                                                              store:storelistadoinscdet,
                                                              columns: [
                                                                  {header: "id",dataIndex:'id',hidden:true},
                                                                  {header: "Nº de Insc.",dataIndex:'cabid',width:80},
                                                                  {header: "Materia",width:200,sortable:false,dataIndex:'denominacion'},
                                                                  {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                                                                  {header: "Estado",width:100,sortable:false,dataIndex:"estado"},
                                                                  {header: "Nota Final", width:80,dataIndex:"notafinal",align:'right',renderer: Ext.util.Format.numberRenderer('00,00/i')}
                                                              ],
                                                              stripeRows: true,
                                                              height:200,
                                                              width:650,
                                                              loadMask:true,
                                                              title:'Detalle de Mis Inscripciones',
                                                              iconCls: 'icon-grid',
                                                              listeners:{
                                                              }
                                                          })

                                                      ]
                                                  }

                                              ]
                                            }
                                        ]
                                }
                            ]
                        }, {
                            expanded: true,
                            items: [

                                {
                                title: 'Mis Cuotas',
                                layout:'fit',
                                iconCls: 'x-icon-configuration',
                                tabTip: 'Configuration tabtip',
                                style: 'padding: 10px;',//,
                                items:[
                                ]
                                }, {
                                    title: 'Impresión de Cupón',
                                    iconCls: 'x-icon-impresion-recibos',
                                    tabTip: 'Impresión de Recibo Rapipago',
                                    style: 'padding: 10px;',
                                    items:[
                                        {
                                            xtype:'form',
                                            id:'formcuponpagoId',
                                            title:'Impresión de Cupón',
                                            labelWidth:150,
                                            style: 'margin:0 auto;margin-top:50px;',
                                            url:cuponpagogeneradorUrl,
                                            frame:true,
                                            width:500,
                                            items:[
                                                {
                                                    xtype:'textfield'
                                                    ,hidden:true
                                                    ,name:'matriculapar'
                                                    ,id:'matriculaparId'
                                                },{
                                                    xtype:'combo',
                                                    fieldLabel:'Carrera',
                                                    width:200,
                                                    mode:'local',
                                                    triggerAction:'all',
                                                    editable:false,
                                                    valueField:'id',
                                                    displayField:'denominacion',
                                                    hiddenName:'carreracuponpago_id',
                                                    store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:carreraUrl,
                                                        fields:['id','denominacion'],
                                                        baseParams:{
                                                            alumnoId: alumnoId
                                                        },
                                                        autoLoad:true
                                                    }),
                                                    name:'carreracuponpago',
                                                    id:'carreracuponpagoId',
                                                    listeners:{
                                                        select:function(combobox,record,index){
                                                            Ext.getCmp('griddescinccuponpagoId').store.removeAll();
                                                            Ext.getCmp('cuotacuponpagoId').store.removeAll();
                                                            Ext.getCmp('cuotacuponpagoId').clearValue();
                                                            Ext.getCmp('importecuotaId').setValue('');
                                                            Ext.getCmp('totalcuponId').setValue('');
                                                            matriculaseleccionadapagocuota = record.json.matricula;
                                                            Ext.getCmp('matriculaparId').setValue(record.json.matricula);
                                                            Ext.getCmp('cuotacuponpagoId').getStore().load({
                                                                params:{
                                                                    carrerapar:Ext.getCmp('carreracuponpagoId').hiddenField.value
                                                                }
                                                            });
                                                        }
                                                    }
                                                },{
                                                    xtype:'combo',
                                                    fieldLabel:'Cuota/Mes',
                                                    width:200,
                                                    name:'cuotacuponpago',
                                                    id:'cuotacuponpagoId',
                                                    mode:'local',
                                                    triggerAction:'all',
                                                    editable:false,
                                                    valueField:'id',
                                                    displayField:'descripcion',
                                                    hiddenName:'cuotacuponpago_id',
                                                    store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:cuotacuponpagoUrl,
                                                        fields:['id','descripcion','importe'],
                                                        autoLoad:false
                                                    }),
                                                    listeners:{
                                                        select: function(combobox,record,index){
                                                            var conn = new Ext.data.Connection();
                                                            Ext.getCmp('griddescinccuponpagoId').store.removeAll();

                                                            Ext.getCmp('importecuotaId').setValue('');
                                                            Ext.getCmp('totalcuponId').setValue('');
                                                            conn.request({
                                                                url:totalgralcuponUrl,
                                                                method:'POST',
                                                                params:{
                                                                    matriculapar:matriculaseleccionadapagocuota,
                                                                    cuotaid:record.data.id
                                                                },
                                                                success: function(resp,opt){
                                                                    var respuesta = Ext.decode(resp.responseText);
                                                                    if (respuesta) {
                                                                        if (respuesta.success){
                                                                            Ext.getCmp('totalcuponId').setValue(respuesta.totalGral);
                                                                        }
                                                                    }
                                                                }

                                                            });
                                                            Ext.getCmp('importecuotaId').setValue(record.data.importe);
                                                            Ext.getCmp('griddescinccuponpagoId').getStore().load({
                                                                params:{
                                                                    matriculapar:matriculaseleccionadapagocuota,
                                                                    cuotaid:record.data.id
                                                                }
                                                            });
                                                        }
                                                    }
                                                },{
                                                    xtype:'numberfield',
                                                    fieldLabel:'Importe de Cuota',
                                                    style:'text-align: right',
                                                    id:'importecuotaId',
                                                    disabled:true
                                                },new Ext.grid.GridPanel({
                                                    id:'griddescinccuponpagoId',
                                                    store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:incdescpagocuponUrl,
                                                        fields:[{name:'concepto'},{name:'monto'},{name:'tipo'}],
                                                        autoLoad:false
                                                    }),
                                                    columns: [
                                                        {header: "Concepto",width:250,sortable:false,dataIndex:'concepto'},
                                                        {header: "Tipo",width:100,sortable:false,dataIndex:'tipo'},
                                                        {header: "Monto",width:80,sortable:false,dataIndex:"monto"
                                                            ,align:'right',renderer: Ext.util.Format.numberRenderer('00,00/i')}

                                                    ],
                                                    stripeRows: true,
                                                    height:250,
                                                    width:500,
                                                    loadMask:true,
                                                    title:'Descuentos y Recargos'
                                                }),{
                                                    xtype:'numberfield',
                                                    fieldLabel:'Total del Cupón',
                                                    style:'text-align:right',
                                                    id:'totalcuponId',
                                                    disabled:true
                                                }

                                            ],buttons:[
                                                {
                                                    text:'Imprimir'
                                                    ,handler:function(){
                                                        var formCuponPago = Ext.getCmp('formcuponpagoId').getForm();
                                                        if(formCuponPago.isValid()){
                                                            loadMask.show();
                                                            formCuponPago.submit({
                                                                success: function(f,a){
                                                                    loadMask.hide();
                                                                    window.open(reportcuponpagoUrl+a.result.identificador,'CUPON','target=_blank')

                                                                },
                                                                failure: function(f,a){
                                                                    loadMask.hide();
                                                                    Ext.Msg.show({
                                                                        title:'Mensaje'
                                                                        , icon:Ext.MessageBox.INFO
                                                                        , msg:a.result.mensaje
                                                                        , buttons:Ext.MessageBox.OK
                                                                        , fn: function(btn){
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }/*, {
                                    title: 'Reimpresión de Cupón',
                                    iconCls: 'x-icon-listado-deudas',
                                    tabTip: 'Permite reimprimir cupones',
                                    style: 'padding: 10px;',
                                    items:[
                                        {
                                            xtype:'form',
                                            frame:true,
                                            style: 'margin:0 auto;margin-top:50px;',
                                            width:510,
                                            height:280,
                                            items:[
                                                new Ext.grid.GridPanel({
                                                    id:'gridcorrelcurId',
                                                    stripeRows:true,
                                                    store:new Ext.data.JsonStore({
                                                        root:'rows',
                                                        url:correlCursar,
                                                        fields:[{name:'id'},{name:'denominacion'},{name:'nivel'},{name:'seleccionada',type:'bool'}],
                                                        autoLoad:false
                                                    }),
                                                    columns: [
                                                        {header: "id",dataIndex:'id',hidden:true},
                                                        {header: "Denominación",width:200,sortable:false,dataIndex:'denominacion'},
                                                        {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                                                        {
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

                                                    title:'Materias a Inscribir',
                                                    iconCls: 'icon-grid',
                                                    listeners:{
                                                    }
                                                })
                                            ]
                                        }
                                    ]

                                }*//*, {
                                    title: 'Estado de Deudas',
                                    iconCls: 'x-icon-listado-deudas',
                                    tabTip: 'Listado de Deudas',
                                    style: 'padding: 10px;'//,
                                    //html: Ext.example.shortBogusMarkup
                                }*/
                            ]
                        },{
                            expanded:true,
                            items:[
                                {
                                    title:'Mi Estado Académico',
                                    iconCls:'',
                                    tabTip:'Detalle sobre mi estado academico',
                                    style: 'padding: 10px;'//,
                                },{
                                    title:'Materias Aprobadas',
                                    iconCls: 'x-icon-materias-aprobadas',
                                    tabTip:'Finales Aprobados',
                                    style: 'padding: 10px;',
                                    items:[
                                        {
                                            xtype:'form',
                                            id:'formmateriasaprobadasId',
                                            style: 'margin:0 auto;margin-top:50px;',
                                            frame:true,
                                            title:'Materias Aprobados',
                                            width:500,
                                            items:[
                                                {
                                                    xtype:'combo'
                                                    ,fieldLabel:'Carrera'
                                                    ,id:'combocarreramataprobadasId'
                                                    ,width:200
                                                    ,valueField:'id'
                                                    ,editable:false
                                                    ,mode:'local'
                                                    ,triggerAction:'all'
                                                    ,displayField:'denominacion'
                                                    ,hiddenName:'carrera_id'
                                                    ,store:new Ext.data.JsonStore({
                                                            root:'rows',
                                                            url:carreraUrl,
                                                            fields:['id','denominacion'],
                                                            baseParams:{
                                                                alumnoId: alumnoId
                                                            },
                                                            autoLoad:true
                                                    }),
                                                    listeners:{
                                                        select:function(combobox,record,index){
                                                            Ext.getCmp('gridmateriasaprobadasId').getStore().load();
                                                        }
                                                    }
                                                },
                                                {
                                                    layout:'column',
                                                    border:false,
                                                    items:[
                                                         {
                                                            layout:'form',
                                                            border:false,
                                                            items:[
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'Filtrar por Materia',
                                                                    id:'filtromateriaId',
                                                                    width:200,
                                                                    anchor:0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width:60,
                                                            border:false,
                                                            items:[
                                                                {
                                                                    xtype:'button',
                                                                    text:'Buscar',
                                                                    listeners:{
                                                                        click: function(){
                                                                            Ext.getCmp('gridmateriasaprobadasId').getStore().load();
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },new Ext.grid.GridPanel({
                                                    id:'gridmateriasaprobadasId',
                                                    store:storemateriasaprobadas,
                                                    columns: [
                                                        {header: "id",dataIndex:'id',hidden:true},
                                                        {header: "Carrera",width:150,sortable:false,dataIndex:'carrera'},
                                                        {header: "Nivel",width:150,sortable:false,dataIndex:"nivel"},
                                                        {header: "Materia",width:100,sortable:false,dataIndex:"materia"},
                                                        {header: "Nota Final",width:50,sortable:false,dataIndex:"notafinal"}
                                                    ],
                                                    height:350,
                                                    width:470,
                                                    loadMask:true,
                                                    bbar: new Ext.PagingToolbar({
                                                        pageSize: 10,
                                                        store: storemateriasaprobadas,
                                                        displayInfo:true,
                                                        displayMsg: 'Visualizando registros {0} - {1} de {2}',
                                                        emptyMsg: 'No hay registros para visualizar'
                                                    })

                                                })
                                            ]
                                        }
                                    ]
                                },{
                                    title:'Materias Regulares',
                                    iconCls: 'x-icon-materias-regulares',
                                    tabTip:'Cursado Regular',
                                    style: 'padding: 10px;',
                                    //------------------------------
                                    items:[
                                        {
                                            xtype:'form',
                                            id:'formmateriasregularesId',
                                            style: 'margin:0 auto;margin-top:50px;',
                                            frame:true,
                                            title:'Materias Regulares',
                                            width:500,
                                            items:[
                                                {
                                                    xtype:'combo'
                                                    ,fieldLabel:'Carrera'
                                                    ,id:'combocarreramatregularesId'
                                                    ,width:200
                                                    ,valueField:'id'
                                                    ,editable:false
                                                    ,mode:'local'
                                                    ,triggerAction:'all'
                                                    ,displayField:'denominacion'
                                                    ,hiddenName:'carrera_id'
                                                    ,store:new Ext.data.JsonStore({
                                                    root:'rows',
                                                    url:carreraUrl,
                                                    fields:['id','denominacion'],
                                                    baseParams:{
                                                        alumnoId: alumnoId
                                                    },
                                                    autoLoad:true
                                                }),
                                                    listeners:{
                                                        select:function(combobox,record,index){
                                                            Ext.getCmp('gridmateriasregularesId').getStore().load();
                                                        }
                                                    }
                                                },
                                                {
                                                    layout:'column',
                                                    border:false,
                                                    items:[
                                                        {
                                                            layout:'form',
                                                            border:false,
                                                            items:[
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'Filtrar por Materia',
                                                                    id:'filtromateriaregularId',
                                                                    width:200,
                                                                    anchor:0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width:60,
                                                            border:false,
                                                            items:[
                                                                {
                                                                    xtype:'button',
                                                                    text:'Buscar',
                                                                    listeners:{
                                                                        click: function(){
                                                                            Ext.getCmp('gridmateriasregularesId').getStore().load();
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },new Ext.grid.GridPanel({
                                                    id:'gridmateriasregularesId',
                                                    store:storemateriasregulares,
                                                    columns: [
                                                        {header: "id",dataIndex:'id',hidden:true},
                                                        {header: "Carrera",width:150,sortable:false,dataIndex:'carrera'},
                                                        {header: "Nivel",width:150,sortable:false,dataIndex:"nivel"},
                                                        {header: "Materia",width:100,sortable:false,dataIndex:"materia"}
                                                    ],
                                                    height:350,
                                                    width:470,
                                                    loadMask:true,
                                                    bbar: new Ext.PagingToolbar({
                                                        pageSize: 10,
                                                        store: storemateriasregulares,
                                                        displayInfo:true,
                                                        displayMsg: 'Visualizando registros {0} - {1} de {2}',
                                                        emptyMsg: 'No hay registros para visualizar'
                                                    })

                                                })
                                            ]
                                        }
                                    ]


                                }
                            ]
                        },{
                            expanded:true,
                            items:[
                                {
                                    title: 'Exámenes',
                                    tabTip:'Información sobre exámenes' ,
                                    style: 'padding: 10px'
                                },{
                                    title:'Fechas de Exámenes a Rendir',
                                    iconCls: 'x-icon-fechaexamen',
                                    tabTip:'Fechas de exámens',
                                    style:'padding: 10px' ,
                                    items:[
                                        {
                                          xtype:'form',
                                          id:'formfechasexamenesId',
                                          title:'Fechas de Exámenes',
                                          frame:true,
                                          height:400,
                                          width:700,
                                          style: 'margin:0 auto;margin-top:50px;',
                                          items:[
                                              new Ext.grid.GridPanel({
                                                  id:'gridfechasexamenesId',
                                                  store: storefechaexamenes,
                                                  columns: [
                                                      {header: "id",dataIndex:'id',hidden:true},
                                                      {header: "Materia",width:190,sortable:false,dataIndex:'materia'},
                                                      {header: "Docente",width:190,sortable:false,dataIndex:"docente"},
                                                      {header: "Fecha Examen",width:90,sortable:false,dataIndex:"fechaexamen",renderer: Ext.util.Format.dateRenderer('d/m/y')},
                                                      {header: "Tipo",width:110,sortable:false,dataIndex:"tipo"},
                                                      {header: "Modalidad",width:90,sortable:false,dataIndex:"modalidad"}
                                                  ],
                                                  height:350,
                                                  width:700,
                                                  loadMask:true
                                              })
                                          ]
                                        }
                                    ]
                                },{
                                    title:'Notas de Exámenes',
                                    tabTip:'Notas de exámenes',
                                    iconCls: 'x-icon-carga-notas',
                                    style:'padding: 10px',
                                    items:[
                                        {
                                            xtype:'form',
                                            style: 'margin:0 auto;margin-top:50px;',
                                            frame:true,
                                            width:700,
                                            height:400,
                                            title:'Notas de Exámenes',
                                            items:[
                                                new Ext.grid.GridPanel({
                                                    id:'gridfechasexamenesId',
                                                    store: storenotasexamenes,
                                                    columns: [
                                                        {header: "id",dataIndex:'id',hidden:true},
                                                        {header: "Materia",width:180,sortable:false,dataIndex:'materia'},
                                                        {header: "Docente",width:170,sortable:false,dataIndex:"docente"},
                                                        {header: "Fecha Examen",width:90,sortable:false,dataIndex:"fechaexamen",renderer: Ext.util.Format.dateRenderer('d/m/y')},
                                                        {header: "Tipo",width:110,sortable:false,dataIndex:"tipo"},
                                                        {header: "Modalidad",width:60,sortable:false,dataIndex:"modalidad"},
                                                        {header: "Nota",width:50,sortable:false,dataIndex:"nota",align:'right',renderer: Ext.util.Format.numberRenderer('00,00/i')}
                                                    ],
                                                    height:350,
                                                    width:680,
                                                    loadMask:true,
                                                    bbar: new Ext.PagingToolbar({
                                                        pageSize: 10,
                                                        store: storenotasexamenes,
                                                        displayInfo:true,
                                                        displayMsg: 'Visualizando registros {0} - {1} de {2}',
                                                        emptyMsg: 'No hay registros para visualizar'
                                                    })

                                                })
                                            ]
                                        }
                                    ]
                                }
                            ]

                        }
                ]
            },
            new Ext.BoxComponent({
                region:'west',
                width:100
            })

        ]
    });

    storemateriasaprobadas.on('beforeload',function(){
        storemateriasaprobadas.baseParams={
            alumnoId:alumnoId,
            carreraId:Ext.getCmp('combocarreramataprobadasId').hiddenField.value,
            materiaDeno:Ext.getCmp('filtromateriaId').getValue()
        }
    });

    Ext.getCmp('formalumnoId').getForm().load({
        url:alumnodataUrl
        ,success: function(f,a){
            Ext.getCmp('paisdomicilioId').setValue(a.result.data.paisDomicilio);
            Ext.getCmp('paisdomicilioId').hiddenField.value = a.result.data.paisdomicilio_id;
            Ext.getCmp('provinciadomicilioId').setValue(a.result.data.provinciaDomicilio);
            Ext.getCmp('provinciadomicilioId').hiddenField.value = a.result.data.provinciadomicilio_id ;
            Ext.getCmp('localidaddomicilioId').setValue(a.result.data.localidadDomicilio);
            Ext.getCmp('localidaddomicilioId').hiddenField.value = a.result.data.localidaddomicilio_id;
            Ext.getCmp('provinciadomicilioId').getStore().load({
                params:{'pais_id':Ext.getCmp('paisdomicilioId').hiddenField.value}
            });
            Ext.getCmp('localidaddomicilioId').getStore().load({
                params:{'provincia_id':Ext.getCmp('provinciadomicilioId').hiddenField.value}
            });


        }
        ,failure : function(f,a){

        }
    });

    Ext.getCmp('gridlistadoinscripcionesId').getStore().on('beforeload',function(){
        Ext.getCmp('gridlistadoinscripcionesId').baseParams={
            alumnoId:alumnoId,
            anioLectivoId:Ext.getCmp('comboaniolectivolistadoinscId').hiddenField.value,
            carreraId:Ext.getCmp('combocarreralistadoinscId').hiddenField.value
        }
    });

});