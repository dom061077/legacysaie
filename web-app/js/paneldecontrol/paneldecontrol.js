Ext.onReady(function(){
    Ext.QuickTips.init();
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

    function habilitaUpdateAlumno(){
        Ext.getCmp('boxfotoId').hide();
        Ext.getCmp('imagenId').show();
        Ext.getCmp('imagenId').setWidth(200);
        //Ext.getCmp('').
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
        tpl: new Ext.XTemplate('<div class="detailData">','','</div>'),
        listeners:
        {
            expand:function(ex,record,body,rowIndex){
                processRowExpander(record,body,rowIndex);
            },
            collapse : function(ex,record,body,rowIndex){

            }
        }
    });



    var storelistadoinscdet = new Ext.data.JsonStore({
        root:'rows',
        url:inscDetUrl,
        fields:[{name:'id'},{name:'denominacion'},{name:'nivel'},{name:'estado'},{name:'notafinal',type:'float'}],
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


    function processRowExpander(record, body, rowIndex){
        if(Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
            var innerRowDiv=Ext.DomQuery.select("div.detailData",body)[0];
            var nestedGrid = new Ext.grid.GridPanel({
                id:'gridlistadoInscDetalleId',
                stripeRows:true,
                store:storelistadoinscdet,
                columns: [
                    {header: "id",dataIndex:'id',hidden:true},
                    {header: "Materia",width:200,sortable:false,dataIndex:'denominacion'},
                    {header: "Nivel",width:100,sortable:false,dataIndex:"nivel"},
                    {header: "Estado",width:100,sortable:false,dataIndex:"estado"},
                    {header: "Nota Final", width:80,dataIndex:"notafinal",align:'right',renderer: Ext.util.Format.numberRenderer('00,00/i')}
                ],
                stripeRows: true,
                height:250,
                width:500,
                loadMask:true,

                title:'Detalle de Mis Inscripciones',
                iconCls: 'icon-grid',
                listeners:{
                },
                renderTo: innerRowDiv,
                listeners: {
                    cellclick: function(grid,rowIndex, columnIndex,e){
                        e.stopEvent();
                    },
                    headerclick:function(grid,columnIndex,e){
                        e.stopEvent();
                    }
                }
            });
            storelistadoinscdet.load({
                params:{
                    inscripcionId:record.data.id
                }
            });

        }
    }

    Ext.QuickTips.init();
    var storelistadoinscripciones = new Ext.data.JsonStore({
        root:'rows',
        url:inscUrl,
        baseParams:{
          alumnoId:alumnoId
        },
        fields:[{name:'id'},{name:'carrera'},{name:'aniolectivo'},{name:'fecha',type:'date'}],
        autoLoad:false
    });
    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[
            {
                xtype: 'grouptabpanel',
                tabWidth: 200,
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
                                            ,style: 'margin:0 auto;margin-top:100px;'
                                            ,height:450
                                            ,width:450
                                            ,items:[
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
                                                                    xtype:'textfield',
                                                                    fieldLabel:'Sexo',
                                                                    name:'sexo',
                                                                    id:'sexoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield',
                                                                    fieldLabel:'Fecha Nacimiento',
                                                                    name:'fechaNacimiento',
                                                                    id:'fechanacimientoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield',
                                                                    fieldLabel:'País Nacimiento',
                                                                    store:paisesStore,
                                                                    width:200,
                                                                    allowBlank:false,
                                                                    name:'paisNacimiento',
                                                                    id:'paisnacimientoId'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield',
                                                                    fieldLabel:'Provincia Nacimiento',
                                                                    msgTarget:'under',
                                                                    width:200,
                                                                    name:'provinciaNacimiento',
                                                                    id:'provincianacimiento_id'
                                                                    ,disabled:true
                                                                },{
                                                                    xtype:'textfield',
                                                                    fieldLabel:'Localidad Nacimiento',
                                                                    name:'localidadNacimiento',
                                                                    width:200,
                                                                    id:'localidadnacimiento_id'
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
                                                                    name: 'imagen',
                                                                    buttonText: '',
                                                                    layout:'form',
                                                                    anchor: '0',
                                                                    buttonCfg: {
                                                                        iconCls: 'upload-icon'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        ,{
                                                            title:'Domicilio'
                                                            ,items:[
                                                                {
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Calle'
                                                                    ,name:'calleDomicilio'
                                                                    ,id:'calledomicilioId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Nro.Domicilio'
                                                                    ,name:'numeroDomiclio'
                                                                    ,id:'numerodomicilioId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Barrio'
                                                                    ,name:'barrioDomicilio'
                                                                    ,id:'barriodomicilioId'
                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'País Domicilio'
                                                                    ,mode:'local'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,hiddenName:'paisdomicilio_id'
                                                                    ,store:paisesStore
                                                                    ,name:'paisdomicilio'
                                                                    ,id:'paisdomicilioId'
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
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,store:provinciaStore
                                                                    ,hiddenName:'provinciadomicilio_id'
                                                                    ,name:'provinciadomicilio'
                                                                    ,id:'provinciadomicilioId'
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
                                                                    ,name:'localidaddomicilio'
                                                                    ,id:'localidaddomicilioId'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,hiddenName:'localidaddomicilio_id'
                                                                    ,mode:'local'
                                                                    ,store:localidadStore
                                                                }
                                                            ]
                                                        }
                                                        ,{
                                                            title:'Contacto'
                                                            ,items:[
                                                                {
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Particular'
                                                                    ,name:'telefonoParticular'
                                                                    ,id:'telefonoparticularId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Celular'
                                                                    ,name:'celularParticular'
                                                                    ,id:'telefonocelularId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Alternativo'
                                                                    ,name:'telefonoAlternativo'
                                                                    ,id:'telefonoalternativoId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'E-mail'
                                                                    ,name:'email'
                                                                    ,id:'emailId'
                                                                }
                                                            ]
                                                        }
                                                        ,{
                                                            title:'Datos Laborales'
                                                            ,items:[
                                                                {
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Lugar Laboral'
                                                                    ,name:'lugarlaboral'
                                                                    ,id:'lugarlaboralId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Teléfono Laboral'
                                                                    ,name:'telefonoLaboral'
                                                                    ,id:'telefonolaboralId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Calle'
                                                                    ,name:'calleLaboral'
                                                                    ,id:'callelaboralId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Número'
                                                                    ,name:'numeroLaboral'
                                                                    ,id:'numerolaboralId'
                                                                },{
                                                                    xtype:'textfield'
                                                                    ,fieldLabel:'Barrio Laboral'
                                                                    ,name:'barrioLaboral'
                                                                    ,id:'barrriolaboralId'
                                                                },{
                                                                    xtype:'combo'
                                                                    ,fieldLabel:'País Laboral'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,hiddenName:'paislaboral_id'
                                                                    ,mode:'local'
                                                                    ,store:paisesStore
                                                                    ,name:'paislaboral'
                                                                    ,id:'paislaboralId'
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
                                                                    ,hiddenName:'provincialaboral_id'
                                                                    ,store:provinciaStore
                                                                    ,name:'provincialaboral'
                                                                    ,id:'provinncialaboralId'
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
                                                                    ,name:'localidadlaboral'
                                                                    ,id:'localidadlaboralId'
                                                                    ,valueField:'id'
                                                                    ,displayField:'descripcion'
                                                                    ,mode:'local'
                                                                    ,store:localidadStore
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
                                                    ,id:'guararbtnId'
                                                    ,handler:function(){
                                                        Ext.getCmp('boxfotoId').show();
                                                        Ext.getCmp('imagenId').hide();
                                                        //Ext.getCmp('imagenId').setWidth(200);
                                                    }
                                                },{
                                                    text:'Cancelar'
                                                }
                                            ]

                                        }
                                    ]
                                },{
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
                                                    ,style: 'margin:0 auto;margin-top:100px;'
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
                                                            xtype:'textfield'
                                                            ,hidden:true
                                                            ,name:'matriculacursado'
                                                            ,id:'matriculacursadoId'
                                                        },
                                                        {
                                                            xtype:'combo'
                                                            ,fieldLabel:'Carrera'
                                                            ,id:'combocarreraId'
                                                            ,valueField:'id'
                                                            ,mode:'local'
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
                                                            ,valueField:'id'
                                                            ,mode:'local'
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
                                                                /*afterrender: function(combo){
                                                                    var rowselected = combo.getStore().getAt(0);
                                                                    combo.setValue(rowselected.get('descripcion'));
                                                                }, */
                                                                select:function(combobox,record,index){
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

                                                    ],
                                                    buttons:[
                                                        {
                                                            text:'Inscribir en Final',
                                                            handler: function(){

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
                                                    ,style: 'margin:0 auto;margin-top:100px;'
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
                                                        ,valueField:'id'
                                                        ,mode:'local'
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
                                                        ,mode:'local'
                                                        ,displayField:'descripcion'
                                                        ,hiddenName:'aniolectivo_id'
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
                                                ],buttons:[
                                                        {
                                                            text:'Inscribir en Cursado',
                                                            handler: function(){
                                                                var rowselectedMatricula = Ext.getCmp('comboaniolectivocurId').getStore().getAt(0);
                                                                Ext.getCmp('matriculacursadoId').setValue(rowselectedMatricula.get('matricula'));
                                                                Ext.getCmp('insccursadomateriasId').setValue(getRowsDataCursar());
                                                                Ext.getCmp('formcursadoId').getForm().submit({
                                                                    success: function(f,resp){
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
                                                      style: 'margin:0 auto;margin-top:100px;',
                                                      id:'formlistadoinscId',
                                                      frame:true,
                                                      width:650,
                                                      height:450,
                                                      title:'Mis Inscripciones',
                                                      items:[
                                                          {
                                                              xtype:'combo'
                                                              ,fieldLabel:'Carrera'
                                                              ,id:'combocarreralistadoinscId'
                                                              ,valueField:'id'
                                                              ,mode:'local'
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
                                                                              carreraId:rowselectedCarrera.get('id')
                                                                          }
                                                                      });

                                                                  }
                                                              }
                                                          },
                                                          {   xtype:'combo'
                                                              ,fieldLabel:'Año Lectivo'
                                                              ,id:'comboaniolectivolistadoinscId'
                                                              ,valueField:'id'
                                                              ,mode:'local'
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
                                                                  }
                                                              }
                                                          },


                                                           new Ext.grid.GridPanel({
                                                              id:'gridlistadoinscripcionesId',
                                                              stripeRows:true,
                                                              store:storelistadoinscripciones,
                                                              columns: [
                                                                  nestedRowGrid,

                                                                  {header: "id",dataIndex:'id',hidden:true},
                                                                  {header: "Carrera",width:200,sortable:false,dataIndex:'carrera'},
                                                                  {header: "Año",width:150,sortable:false,dataIndex:"aniolectivo"},
                                                                  {header: "Fecha",width:100,sortable:false,dataIndex:"fecha",renderer: Ext.util.Format.dateRenderer('d/m/y')}
                                                              ],
                                                              stripeRows: true,
                                                              height:400,
                                                              width:600,
                                                              loadMask:true,
                                                              plugins:nestedRowGrid,
                                                              iconCls: 'icon-grid',
                                                              listeners:{
                                                              },
                                                              bbar: new Ext.PagingToolbar({
                                                                  pageSize: 10,
                                                                  store: storelistadoinscripciones,
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
                                    title: 'Impresión de Recibos',
                                    iconCls: 'x-icon-impresion-recibos',
                                    tabTip: 'Impresión de Recibo Rapipago',
                                    style: 'padding: 10px;'//,
                                    //html: Ext.example.shortBogusMarkup
                                }, {
                                title: 'Estado de Deudas',
                                iconCls: 'x-icon-listado-deudas',
                                tabTip: 'Listado de Deudas',
                                style: 'padding: 10px;'//,
                                //html: Ext.example.shortBogusMarkup
                                }
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
                                            style: 'margin:0 auto;margin-top:100px;',
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
                                                    ,mode:'local'
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
                                            style: 'margin:0 auto;margin-top:100px;',
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
                                                    ,mode:'local'
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
                        }
                ]
            }
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
    });

    Ext.getCmp('gridlistadoinscripcionesId').getStore().on('beforeload',function(){
        Ext.getCmp('gridlistadoinscripcionesId').baseParams={
            alumnoId:alumnoId,
            anioLectivoId:Ext.getCmp('comboaniolectivolistadoinscId').hiddenField.value,
            carreraId:Ext.getCmp('combocarreralistadoinscId').hiddenField.value
        }
    });

});