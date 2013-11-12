<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="mainmobile">
    <title>Panel de Control de Administrador</title>
</head>
<body>
        <div data-role="content">
                <label> Nombre Real del Usuario: </label>
                <h3> ${userInstance.realName} </h3>
                <a id="buttoncambiarpassId" href="#" data-role="button" data-inline="true" data-icon="star">Cambiar Contraseña</a>
        </div>
        <div data-role="content" id="formchangepassId">
            <form id="formulariochangepassId">
                <label>Nombre de Usuario:</label>
                <h3>${userInstance.username}</h3>
                <input type="hidden" id="nombreusuarioId" name="id"/>
                <label>Contraeña anterior:</label>
                <input type="password" name="passwordanterior" id="passwordanteriorId" />
                <label>Nueva Contraeña:</label>
                <input type="password" name="repeatnewpassword" id="repeatnewpasswordId" />
                <input type="submit" value="Confirmar"/>
            </form>
        </div>
    <script>
        $('#buttoncambiarpassId').click(function(){
            $.mobile.changePage("#pagechangepassId");
         });
    </script>
</body>
</html>