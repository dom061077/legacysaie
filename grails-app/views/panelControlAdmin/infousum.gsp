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
        <a href="index.html" data-role="button" data-inline="true" data-icon="star">Cambiar Contraseña</a>
</div>

<div data-role="content">
    <form id="formulariochangepassId">
        <input type="text" id="usuarioidId" value="${userInstance.id}" />
        <label>Nombre de Usuario</label>
        <h3>${userInstance.username}</h3>
        <label>Nombre de Usuario</label>
        <input type="hidden" id="nombreusuarioId" name="id"/>
        <label>Contraeña anterior</label>
        <input type="password" name="passwordanterior" id="passwordanteriorId" />
        <label>Nueva Contraeña</label>
        <input type="password" name="repeatnewpassword" id="repeatnewpasswordId" />

    </form>
</div>

</body>
</html>