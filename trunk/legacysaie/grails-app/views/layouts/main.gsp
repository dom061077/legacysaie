<html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Grails"/></title>
        <%Random randomLink = new Random();
          randomLink.nextInt(100000)
        %>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'Alien.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
		<!-- link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css" -->
		<!-- link rel="stylesheet" href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css" -->
        <link rel="stylesheet" href="${resource(dir:'js/extjs/resources/css',file:'ext-all.css')}"/>
        <link rel="stylesheet" href="${resource(dir:'js/extjs/resources/css',file:'xtheme-gray.css')}"/>
        <script type="text/javascript" src="${resource(dir:'js/jquery/jquery-1.6.2.min.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/adapter/jquery',file:'ext-jquery-adapter.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs',file:'ext-all.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js',file:'initextjs.js')+'?id='+randomLink}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/locale',file:'ext-lang-es.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/ux',file:'CheckColumn.js')}"></script>
        <script type="text/javascript">
            var loginurl = '${createLink(uri:'/login')}';
            var provurl = '${createLink(uri:'/location/provinciasjson')}';
            <%
				out << "var blankimagePath='"+"${resource(dir:'js')}';";

			%>
            Ext.BLANK_IMAGE_URL =blankimagePath+ '/extjs/resources/images/default/s.gif';
        </script>

		<g:layoutHead/>
        <style type="text/css">
        </style>
		<r:layoutResources />
	</head>
	<body>
        <header>
		    <div id="grailsLogo" role="banner"><a href=""><!-- img src="${resource(dir: 'images', file: 'grails_logo.png')}" alt="Grails"/ --></a></div>
        </header>
        <section>
		    <g:layoutBody/>
        </section>
        <footer>
            <div class="footer" role="contentinfo"></div>
            <div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/></div>
            <g:javascript library="application"/>
            <r:layoutResources />
        </footer>
	</body>
</html>