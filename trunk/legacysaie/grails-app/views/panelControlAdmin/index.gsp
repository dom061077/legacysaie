

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
        var mailUrl = '${resource(dir:'/images',file:'email.png')}';
        var usuarioalumnoformUrl = '${createLink(uri:'/panelControlAdmin/usuarioalumnoform')}';
        var usuariodocenteformUrl = '${createLink(uri:'/panelControlAdmin/usuariodocenteform')}';
        var sendemailalumnoUrl = '${createLink(uri:'/panelControlAdmin/enviarcorreousuarioalumno')}';
        var sendemaildocenteUrl = '${createLink(uri:'/panelControlAdmin/enviarcorreousuariodocente')}';
        var cerrarSesionUrl = '${createLink(uri:'/logout')}';
        var usuarioId = '${userInstance?.id}';
        var changepasswordUrl = '${createLink(uri:'/panelControlAdmin/changepassword')}';


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
        var imagecableftUrl = '${resource(dir:'images',file:'lefthead.png')}';
        var imagecabrightUrl = '${resource(dir:'images',file:'righthead.png')}';

        

    </script>


  <title>Panel de Control de Administrador</title>
</head>
<body>

</body>
</html>