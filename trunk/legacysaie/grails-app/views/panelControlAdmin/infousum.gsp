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
                <a id="buttoncambiarpassId" href="${createLink(controller:"user",action:"editpass")}" data-role="button" data-inline="true" data-icon="star">Cambiar Contraseña</a>
        </div>
</body>
</html>