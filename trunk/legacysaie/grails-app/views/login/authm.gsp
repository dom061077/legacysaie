<%--
  Created by IntelliJ IDEA.
  User: danielmedina
  Date: 7/11/13
  Time: 13:06
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${resource(dir:'css',file:'jquery.mobile-1.3.2.css')}"/>
    <script type="text/javascript" src="${resource(dir:'js/jquery',file:'jquery-1.6.2.min.js')}"></script>
    <script type="text/javascript" src="${resource(dir:'js/jqm',file:'jquery.mobile-1.3.2.js')}"></script>

  <title></title>
</head>
<body>
<div data-role="page" id="inicio">

    <div data-role="header">
        <h1>Autenticacion de Usuario</h1>
    </div>

    <div data-role="content">
        <form id="formulario" >

            <label> Usuario </label>
            <input type="text" id="nombredeusuario" name="nombredeusuario">

            <label> Password </label>
            <input type="password" id="clave" name="clave" >

            <input type="submit" value="Login" id="botonLogin">

        </form>
    </div>

</div>

<div data-role="page" id="home">

    <div data-role="header">
        <h1>Bienvenido</h1>
    </div>

    <div data-role="content">
        <h2> Bienvenido a la aplicacion </h2>
        <h3> Su usuario y password son válidos</h3>
    </div>

</div>

<script>

  /*  $('#formulario').submit(function() {


        // recolecta los valores que inserto el usuario
        var datosUsuario = $("#nombredeusuario").val()
        var datosPassword = $("#clave").val()

        archivoValidacion = "http://revolucion.mobi/ejemplos/phonegap/envioFormulario/validacion_de_datos.php?jsoncallback=?"

        $.getJSON( archivoValidacion, { usuario:datosUsuario ,password:datosPassword})
                .done(function(respuestaServer) {

                    alert(respuestaServer.mensaje + "\nGenerado en: " + respuestaServer.hora + "\n" +respuestaServer.generador)

                    if(respuestaServer.validacion == "ok"){

                        /// si la validacion es correcta, muestra la pantalla "home"
                        $.mobile.changePage("#home")

                    }else{

                        /// ejecutar una conducta cuando la validacion falla
                    }

                })
        return false;
    })                  */

</script>
</body>
</html>