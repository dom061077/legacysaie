<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">

    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'Portal.css')}"/>
    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'GroupTab.css')}"/>
    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'RowEditor.css')}"/>

    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"GroupTab.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"GroupTabPanel.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portal.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"PortalColumn.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portlet.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"RowEditor.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"RowExpander.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/panelcontroldocente",file:"panelcontroldocente.js")+'?id='+randomlink}"></script>

    <style type="text/css">
    .x-icon-carga-notas{
        background-image: url('${resource(dir:"images/panelcontrol",file:"Report.png")}');
    }


    .x-icon-fechaexamen{
        background-image: url('${resource(dir:"images/panelcontrol",file:"Calendar.png")}');
    }


    .x-icon-change-pass{
        background-image: url('${resource(dir:"images/panelcontrol",file:"Key.png")}');
    }

    .x-icon-close-session {
        background-image: url('${resource(dir:"images/panelcontrol",file:"close_session.png")}');
    }


    .upload-icon {
        background: url('${resource(dir:'js/extjs/resources/images',file:'image_add.png')}') no-repeat 0 0 !important;
    }
    #fi-button-msg {
        border: 2px solid #ccc;
        padding: 5px 10px;
        background: #eee;
        margin: 5px;
        float: left;
    }
    </style>
    <script type="text/javascript">
        var docente = '${docenteInstance.apellido+', '+docenteInstance.nombre}';
        var docenteId = '${docenteInstance.id}';
        var logoUrl = '${resource(dir:'reports/images',file:'imagecomprobante.png')}';
        var fechaexamenUrl = '${createLink(uri:'/panelControlDocente/cargaexamenfechaslist')}';
        var docentemateriaUrl = '${createLink(uri:'/panelControlDocente/docentematerias')}';
        var aniolectivoUrl = '${createLink(uri:'/panelControlDocente/aniolectivonotas')}';
        var cerrarSesionUrl = '${createLink(uri:'/logout')}';
        var fechaexamenesnotasUrl = '${createLink(uri:'/panelControlDocente/cargaexamenfechas')}';
        var notasexamenesUrl = '${createLink(uri:'/panelControlDocente/notasexamen')}';
        var updatenotaUrl = '${createLink(uri:'/panelControlDocente/savenota')}';
        var reporteUrl = '${createLink(uri:'/panelControlDocente/reportealumnosexamenes/')}';
        var pdfUrl = '${resource(dir:'/images',file:'pdf.png')}';
        var usuarioId = '${userInstance?.id}';
        var changepasswordUrl = '${createLink(uri:'/panelControl/changepassword')}';

        var imagecableftUrl = '${resource(dir:'images',file:'lefthead.png')}';
        var imagecabrightUrl = '${resource(dir:'images',file:'righthead.png')}';

    </script>

    <title>Panel de control de Docente</title>
</head>
<body>
<div id="dummydiv"></div>
</body>
</html>