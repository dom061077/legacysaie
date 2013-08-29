<html>
<head>
	<meta name='layout' content='main'/>
	<title><g:message code="springSecurity.login.title"/></title>
    <script type="text/javascript">
        var postLoginUrl = '${postUrl}';
        var homeUrl = '${createLink(uri:'/login/loginredirect')}';
    </script>
    <%
        Random randomLink = new Random()
    %>
    <script type="text/javascript" src="${resource(dir:'js/login',file:'login.js')}?id=<%out << (randomLink.nextInt(100000)).toString()%>"></script>
    <script language="Javascript">
        var toolTip;
        function capLock(e){
            kc = e.keyCode?e.keyCode:e.which;
            sk = e.shiftKey?e.shiftKey:((kc == 16)?true:false);
            if(((kc >= 65 && kc <= 90) && !sk)||((kc >= 97 && kc <= 122) && sk))
                document.getElementById('divMayus').style.visibility = 'visible';
            else
                document.getElementById('divMayus').style.visibility = 'hidden';
        }
    </script>
</head>

<body>
    <div id='loginId'>
    </div>
</body>
</html>
