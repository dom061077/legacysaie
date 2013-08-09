<%@ page import="com.educacion.alumno.Alumno" %>
<!doctype html>
<html>
<head>
  <script src="${resource(dir:"js/alumno",file:"confirm.js")}"></script>
  <title>Confirmación de la Preinscripción</title>
  <script type="text/javascript">
            var carreraUrl = '${createLink(uri: '/carrera/listjson')}';
            var cupoUrl = '${createLink(uri:'/carrera/cupocarrera')}';
            var aniolectivoId = ${aniolectivoInstance?.id};
            var aniolectivoDesc = '${aniolectivoInstance?.descripcion}';
  </script>
</head>
<body>

</body>
</html>