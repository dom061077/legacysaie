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

    <div data-role="header" data-theme="d">
        <h1>Ingreso Cruz Roja</h1>
    </div>

    <div data-role="content">
        <form id="formulario" >

            <label> Usuario </label>
            <input type="text" id="j_username" name="j_username" required>

            <label> Contraseña </label>
            <input type="password" id="j_password" name="j_password" required>

            <input type="submit" value="Ingresar" id="botonLogin">

        </form>
    </div>

</div>

<div data-role="dialog" id="errorLoginId" data-theme="c">
    <div data-role="header">
        <h3>Error de Ingreso</h3>
    </div>
    <div data-role="content">
        <div id="mensajeLoginErrorId"></div>
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
    <div data-role="footer" data-id="foo1" data-position="fixed">
        <div data-role="navbar">
            <ul>
                <li><a id="menuinfoId" href="#">Info</a></li>
                <li><a href="b.html">Friends</a></li>
                <li><a href="c.html">Albums</a></li>
                <li><a href="d.html">Emails</a></li>
            </ul>
        </div><!-- /navbar -->
    </div><!-- /footer -->
</div>



<script>
    var postUrl = "<%out << postUrl %>";
    $('#menuinfoId').click(function(){
        $.mobile.changePage("");
    });
    $('#formulario').submit(function() {
        // recolecta los valores que inserto el usuario
        var datosUsuario = $("#j_username").val();
        var datosPassword = $("#j_password").val();
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
    })

</script>
</body>
</html>