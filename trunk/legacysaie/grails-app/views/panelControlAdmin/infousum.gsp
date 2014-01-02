<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="mainmobile">
    <title>Panel de Control de Administrador</title>
</head>
<body>
        <div class="${flash.message?'flash-message':''}">${flash.message}</div>
        <div data-role="content">
            <div class="ui-grid-b">
                <div class="ui-block-a">
                    <label> Nombre Real del Usuario: </label>
                </div>
                <div class="ui-block-b">
                    <h3> ${userInstance.realName} </h3>
                </div>
            </div>
            <div class="ui-grid-b">
                <div class="ui-block-a">
                    <a id="buttoncambiarpassId" href="${createLink(controller:"user",action:"editpass")}" data-role="button" data-inline="true" data-icon="star">Cambiar Contraseña</a>
                </div>
            </div>
        </div>
<script type="text/javascript">
    $(document).ready(function(){
        $('.flash-message').message({type:"info"});
    });
</script>

</body>
</html>