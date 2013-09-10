

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">

    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'Portal.css')}"/>
    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'GroupTab.css')}"/>
    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'RowEditor.css')}"/>
    <%
        Random randomLink = new Random()
        def random = randomLink.nextInt(100000)
    %>

    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"GroupTab.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"GroupTabPanel.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portal.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"PortalColumn.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portlet.js")+'?id='+randomlink}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"RowEditor.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"RowExpander.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/panelcontroladmin",file:"panelcontroladmin.js")+'?id='+random}"></script>

    <script type="text/javascript">
        var usuario = '${userInstance?.realName}';
        var usuariosalumnosUrl = '${createLink(uri:'/panelControlAdmin/usuariosalumnos')}';
        var carreraUrl = '${createLink(uri:'/carrera/listjson')}';
        var anioslectivosUrl = '${createLink(uri:'/carrera/listaniosjson')}';
        var usuariosdocentesUrl = '${createLink(uri:'/panelControlAdmin/usuariosdocentes')}';
        var pdfUrl = '${resource(dir:'/images',file:'pdf.png')}';
        var usuarioalumnoformUrl = '${createLink(uri:'/panelControlAdmin/usuarioalumnoform')}';
        var sendemailUrl = '${createLink(uri:'/panelControlAdmin/enviarcorreousuario')}';


        /*var docenteId = '${docenteInstance?.id}';
        var logoUrl = '${resource(dir:'reports/images',file:'imagecomprobante.png')}';
        var fechaexamenUrl = '${createLink(uri:'/panelControlDocente/cargaexamenfechaslist')}';
        var docentemateriaUrl = '${createLink(uri:'/panelControlDocente/docentematerias')}';
        var aniolectivoUrl = '${createLink(uri:'/panelControlDocente/aniolectivonotas')}';
        var cerrarSesionUrl = '${createLink(uri:'/logout')}';
        var fechaexamenesnotasUrl = '${createLink(uri:'/panelControlDocente/cargaexamenfechas')}';
        var notasexamenesUrl = '${createLink(uri:'/panelControlDocente/notasexamen')}';
        var updatenotaUrl = '${createLink(uri:'/panelControlDocente/savenota')}';
        var reporteUrl = '${createLink(uri:'/panelControlDocente/reportealumnosexamenes/')}';
        */

        

    </script>


  <title></title>
</head>
<body>

</body>
</html>