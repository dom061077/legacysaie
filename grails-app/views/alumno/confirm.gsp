<%@ page import="com.educacion.alumno.Alumno" %>
<!doctype html>
<html>
<head>
  <meta name="layout" content="main">
  <script src="${resource(dir:"js/alumno",file:"confirm.js")+'?id'+randomlink}"></script>
  <title>Confirmación de la Preinscripción</title>
  <script type="text/javascript">
            var carreraUrl = '${createLink(uri: '/carrera/listjson')}';
            var cupoUrl = '${createLink(uri:'/carrera/cupocarrera')}';
            var aniolectivoId = ${anioLectivoInstance?.id};
            var aniolectivoDesc = '${anioLectivoInstance?.descripcion}';
            var confirmUrl = '${createLink(controller:'alumno',action:'')}';
  </script>
</head>
<body>
  <div id="formId"></div>
</body>
</html>