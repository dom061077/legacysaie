<html>
<head>
  <meta name="layout" content="mainmobile">
  <script type="text/javascript" src="${resource(dir:'js/jquery',file:'jquery.validate.js')}"></script>
  <title></title>
</head>
<body>
    <g:form id="formularioChangePassId" action="changepass">
        <label> Nombre de Usuario: </label><br>
        <h3>${userInstance.username}</h3><br>
        <label> Nombre Real de Usuario: </label><br>
        <h3>${userInstance.realName}</h3></s><br>
        <input type="hidden" id="nombreusuarioId" name="id" />
        <label> Contraseña Actual: </label>
        <input type="password" id="passwordanteriorId" name="passwordanterior" class="required">
        <label> Nueva Contraseña:</label>
        <input type="password" id="newpasswordId" name="newpassword" class="required">
        <label> Repita Nueva Contraseña:</label>
        <input type="password" id="repeatnewpasswordId" name="repeatnewpassword" class="required">
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <input id="botonAceptar" id="botonAceptarId" type="submit" value="Confirmar" />
            </div>
            <div class="ui-block-b">
                <a href="#" data-role="button" data-rel="back" data-icon="back">Cancelar</a>
            </div>
        </div>
    </g:form>

    <script>
        (function($) {
            $('#page').live('pageinit', function(){
                var form = $('FORM');
                form.bind('submit', function() {
                    form.validate();
                    if (form.valid()) {
                        alert("form is valid!");
                    } else {
                        alert("bad form!");
                    }
                    return false;
                });
            });
        })(jQuery);
    </script>
</body>
</html>