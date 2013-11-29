<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="mainmobile">
    <title>Panel de Control de Administrador</title>
</head>
<body>
        <div data-role="content">
            <div class="ui-grid-b">
                <div class="ui-block-a">
                    <label> Nombre Real del Usuario: </label>
                </div>
                <div class="ui-block-b">
                    <h3> ${userInstance.realName} </h3>
                </div>
                <div class="ui-block-c">
                    <a id="buttoncambiarpassId" href="${createLink(controller:"user",action:"editpass")}" data-role="button" data-inline="true" data-icon="star">Cambiar Contraseña</a>
                </div>
            </div>
        </div>
</body>
</html>