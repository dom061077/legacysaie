<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <title></title>
   <script type="text/javascript">
       Ext.onReady(function(){
           Ext.QuickTips.init();
           new Ext.Panel({
               renderTo:'body',
               frame:true,
               height:450,
               html:'<%out << mensaje;%>',
               width:450
           });


       });


   </script>
</head>
<body>

</body>
</html>