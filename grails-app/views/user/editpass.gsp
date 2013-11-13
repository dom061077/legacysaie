<html>
<head>
  <meta name="layout" content="mainmobile">
  <title></title>
</head>
<body>
    <g:form id="formularioChangePassId" action="changepass">

        <label> Nombre de Usuario: </label><br>
        <h3>${userInstance.username}</h3><br>
        <label> Nombre Real de Usuario: </label><br>
        <h3>${userInstance.realName}</h3></s><br>
        <input type="hidden" id="nombreusuarioId" name="id" />
        <label> Contraseña Anterior: </label>
        <input type="password" id="passwordanteriorId" name="passwordanterior" required>
        <label> Nueva Contraseña</label>
        <input type="password" id="newpasswordId" name="newpassword" required>


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
        /*$('#formularioChangePassId').submit(function(){
            var passwordanterior = $("#passwordanteriorId").val();
            var newpassword = $("#newpasswordId").val();
            $.post( postUrl, { j_username:datosUsuario ,j_password:datosPassword})
                    .done(function(respuestaServer) {
                        if(respuestaServer.success==true){
                            //$.mobile.changePage("#home")
                            window.location='<%out << createLink(uri:"/login/loginredirect")%>';

                        }else{
                            /// ejecutar una conducta cuando la validacion falla
                            $('#mensajeLoginErrorId').html(respuestaServer.error);
                            $.mobile.changePage('#errorLoginId');
                        }
                    },'json');
            return false;
        }); */

    </script>
</body>
</html>