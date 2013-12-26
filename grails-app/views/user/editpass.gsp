<html>
<head>
  <meta name="layout" content="mainmobile">
  <!--script type="text/javascript" src="${resource(dir:'js/jquery',file:'jquery.validate.js')}"></script -->
  <title></title>
</head>
<body>

    <div class="${flash.message?'flash-message':''}">${flash.message}</div>

    <g:form id="formularioChangePassId" action="changepass">
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <!--label--> Nombre de Usuario: <!--/label-->
            </div>
            <div class="ui-block-b">
                <!--h3-->${userInstance.username}<!--/h3 -->
            </div>

            <div class="ui-block-a">
                <!--label--> Nombre Real de Usuario: <!--/label><br-->
            </div>
            <div class="ui-block-b">
                <!--h3 -->${userInstance.realName}<!--/h3 -->
            </div>
            <div class="ui-block-a">
                <input type="hidden" id="nombreusuarioId" name="id" />
                <!--label--> Contraseña Actual: <!--/label -->
            </div>
            <div class="ui-block-b">
                <input type="password" id="passwordanteriorId" name="passwordanterior" required>
            </div>
            <div class="ui-block-a">
                <label> Nueva Contraseña:</label>
            </div>
            <div class="ui-block-b">
                <input type="password" id="newpasswordId" name="newpassword" required>
            </div>
            <div class="ui-block-a">            
                <!--label--> Repita Nueva Contraseña:<!--/label-->
            </div>
            <div class="ui-block-b">
                <input type="password" id="repeatnewpasswordId" name="repeatnewpassword" required>
            </div>
        </div>    
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <input id="botonAceptar" id="botonAceptarId" type="submit" value="Confirmar" />
            </div>
            <div class="ui-block-b">
                <a href="${createLink(controller:'panelControlAdmin',action:'infousum')}" data-role="button" data-theme='b'  data-icon="back">Cancelar</a>
            </div>
        </div>
    </g:form>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.flash-message').message();
        });
    </script>

</body>
</html>