<html>
<head>
	<meta name='layout' content='main'/>
	<title><g:message code="springSecurity.login.title"/></title>
    <script type="text/javascript">
        var postLoginUrl = '${postUrl}';
        var homeUrl = '${createLink(uri:'/panelControl')}';
    </script>
    <script type="text/javascript" src="${resource(dir:'js/login',file:'login.js')}"></script>
    <script type="text/javascript">
        var homeUrl = '';
    </script>
</head>

<body>
    <div id='loginId'>
    </div>
</body>
</html>
