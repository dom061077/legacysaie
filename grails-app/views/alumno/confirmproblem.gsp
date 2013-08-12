<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <meta name="layout" content="main">

  <title>Error de Confirmación</title>
   <script type="text/javascript">
       Ext.onReady(function(){
           Ext.QuickTips.init();
           new Ext.FormPanel({
               title:'Error de confirmacion'
               ,frame:true
               ,renderTo:'mensajeId'
               ,height:250
               ,width:350
               ,style: 'margin:0 auto;margin-top:100px;'
               ,html:'<%out<< mensaje%>'
           });

       });
   </script>
   <style type="text/css">
       h1.tituloerror{
           font-size: 14px;
       }
   </style>

</head>
<body>
    <div id="mensajeId"></div>


</body>
</html>