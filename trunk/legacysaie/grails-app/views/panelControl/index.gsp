<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">

    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'Portal.css')}"/>
    <link rel="stylesheet" href="${resource(dir:'js/extjs/ux/css',file:'GroupTab.css')}"/>


    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"GroupTab.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"GroupTabPanel.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portal.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"PortalColumn.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portlet.js")}"></script>
    <script type="text/javascript">
        var anioLectivoUrl='${createLink(uri:'/matricula/listaniolectivoporalumnojson')}';
        var carreraUrl = '${createLink(uri:'/matricula/listporalumnojson')}';
        var correlCursar='${createLink(uri:'/panelControl/listcorrelcursar')}';
        var correlFinal='${createLink(uri:'/panelControl/listcorrelrendir')}';
        var inscUrl = '${createLink(uri:'/inscripcion/listinscripciones')}';
        var username = '${userInstance.alumno.apellido} - ${userInstance.alumno.nombre}';
        var alumnoId = '${userInstance.alumno.id}';
    </script>
    <script type="text/javascript" src="${resource(dir:"js/paneldecontrol",file:"paneldecontrol.js")}"></script>
    <title></title>

</head>
<body>
         <div id="dummydiv"></div>
</body>
</html>