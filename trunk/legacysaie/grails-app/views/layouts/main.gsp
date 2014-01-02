<%@ page contentType="text/html;charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Grails"/></title>
        <%Random randomLink = new Random();
          randomLink.nextInt(100000)
        %>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
		<!-- link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css" -->
		<!-- link rel="stylesheet" href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css" -->
        <link rel="stylesheet" href="${resource(dir:'js/extjs/resources/css',file:'ext-all.css')}"/>
        <link rel="stylesheet" href="${resource(dir:'js/extjs/resources/css',file:'xtheme-gray.css')}"/>
        <link rel="stylesheet" href="${resource(dir:'css/jquery-ui',file:'jquery-ui-1.8.11.custom.css')}"/>
        <script type="text/javascript" src="${resource(dir:'js/jquery/jquery-1.6.2.min.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/jquery/jquery-ui.min.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/jquery/jquery.floatingmessage.js')}"></script>
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
            <div style="padding-left: 15px;padding-top: 15px;">
                <div style="float:left;"  id="grailsLogo" role="banner"><a href=""><img  src="${resource(dir: 'images', file: 'lefthead.png')}" alt="Cruz Roja"/></a>
                </div>
                <div style="padding-left: 15px ;float: left; font-weight: normal;font-size: 1.25em;text-align: center">
                    Cruz Roja - Argentina <br>
                    Filial Córdoba
                </div>
            </div>
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