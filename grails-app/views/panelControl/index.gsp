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
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"Portlet.js")}"></script>
    <script type="text/javascript" src="${resource(dir:"js/extjs/ux",file:"RowExpander.js")}"></script>


    <style type="text/css">
        .x-icon-close-session {
            background-image: url('${resource(dir:"images/panelcontrol",file:"close_session.png")}');
        }
        .x-icon-insc-final {
            background-image:url('${resource(dir:"images/panelcontrol",file:"insc-final.gif")}');
        }
        .x-icon-insc-regular {
            background-image:url('${resource(dir:"images/panelcontrol",file:"insc-regular.gif")}');
        }
        .x-icon-insc-listado{
            background-image:url('${resource(dir:"images/panelcontrol",file:"insc-listado.png")}');
        }
        .x-icon-materias-aprobadas{
            background-image:url('${resource(dir:"images/panelcontrol",file:"mat-aprobada.gif")}');
        }
        .x-icon-materias-regulares{
            background-image:url('${resource(dir:"images/panelcontrol",file:"mat-regular.gif")}');
        }

        .x-icon-impresion-recibos{
            background-image:url('${resource(dir:"images/panelcontrol",file:"impresion-recibo.png")}');
        }
        .x-icon-listado-deudas{
            background-image:url('${resource(dir:"images/panelcontrol",file:"listado-deudas.gif")}');
        }


    </style>

    <script type="text/javascript">
        var cerrarSesionUrl = '${createLink(uri:'/logout')}';
        var anioLectivoUrl='${createLink(uri:'/matricula/listaniolectivoporalumnojson')}';
        var carreraUrl = '${createLink(uri:'/matricula/listporalumnojson')}';
        var correlCursar='${createLink(uri:'/panelControl/listcorrelcursar')}';
        var correlFinal='${createLink(uri:'/panelControl/listcorrelrendir')}';
        var materiasAprobadas = '${createLink(uri:'/panelControl/listmateriasaprobadas')}';
        var materiasRegulares = '${createLink(uri:'/panelControl/listmateriasregulares')}';
        var inscUrl = '${createLink(uri:'/inscripcion/listinscripciones')}';
        var inscDetUrl = '${createLink(uri:'/inscripcion/listinscdet')}' ;
        var submitCurUrl = '${createLink(uri:'/inscripcion/saveinscripcioncur')}';
        var submitFinUrl = '${createLink(uri:'/inscripcion/saveinscripcionfin')}';
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