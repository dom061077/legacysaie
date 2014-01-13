<html>
<head>
  <meta name="layout" content="mainmobile">
  <link rel="stylesheet" href="${resource(dir:"css/jqueryvalidation",file:"validationEngine.jquery.css")}"/>
  <script type="text/javascript" src="${resource(dir:'js/jquery/validation',file:'jquery.validationEngine-es.js')}"></script>
  <script type="text/javascript" src="${resource(dir:'js/jquery/validation',file:'jquery.validationEngine.js')}"></script>
  <title></title>
</head>
<body>

    <div class="${flash.message?'flash-message':''}">${flash.message}</div>

    <form id="formularioChangePassId" action="changepass" class="formular" method="post" >
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
                <input type="password" id="passwordanteriorId" name="passwordanterior" data-validation-placeholder="This is a placeholder" class="validate[required] text-input"/>
            </div>
            <div class="ui-block-a">
                <label> Nueva Contraseña:</label>
            </div>
            <div class="ui-block-b">
                <input type="password" id="newpasswordId" name="newpassword" data-validation-placeholder="This is a placeholder" class="validate[required] text-input">
            </div>
            <div class="ui-block-a">            
                <!--label--> Repita Nueva Contraseña:<!--/label-->
            </div>
            <div class="ui-block-b">
                <input type="password" id="repeatnewpasswordId" name="repeatnewpassword" data-validation-placeholder="This is a placeholder" class="validate[required] text-input">
            </div>
        </div>    
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <input id="botonAceptar" id="botonAceptarId" type="submit" value="Confirmar" />
            </div>
            <div class="ui-block-b">
                <a href="${createLink(controller:'panelControlAdmin',action:'infousum')}" data-role="button" data-theme='c'  data-icon="back">Cancelar</a>
            </div>
        </div>
    </form>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.flash-message').message({type:"error"});
            $('#formularioChangePassId').validationEngine();
        });
    </script>

</body>
</html>