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


    <link rel="stylesheet" href="${resource(dir:"css/jqueryvalidation",file:"validationEngine.jquery.css")}"/>
    <script type="text/javascript" src="${resource(dir:'js/jquery/validation',file:'jquery.validationEngine-es.js')}"></script>
    <script type="text/javascript" src="${resource(dir:'js/jquery/validation',file:'jquery.validationEngine.js')}"></script>

    <title></title>
</head>
<body>
<div data-role="page" id="inicio">

    <div data-role="header" data-theme="c">
        <h1>Ingreso Cruz Roja</h1>
    </div>

    <div data-role="content" data-theme="c">
        <form id="formulario" onsubmit="return jQuery(this).validationEngine('validate');" method="post" class="formular" >

            <label> Usuario </label>
            <input type="text" id="j_username" name="j_username" class="validate[required] text-input"/>

            <label> Contraseña </label>
            <input type="password" id="j_password" name="j_password"  class="validate[required] text-input"/>

            <input  class="submit"  type="submit" value="Ingresar" id="botonLogin" />

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