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
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
		<!-- link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css" -->
		<!-- link rel="stylesheet" href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css" -->
        <link rel="stylesheet" href="${resource(dir:'js/extjs/resources/css',file:'ext-all.css')}"/>
        <script type="text/javascript" src="${resource(dir:'js/extjs/adapter/ext',file:'ext-base.js')}"></script>

        <script type="text/javascript" src="${resource(dir:'js/extjs',file:'ext-all.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js',file:'initextjs.js')}"></script>
		<g:layoutHead/>
        <style type="text/css">
            body {
                background: #ffffff;
                color: #333333;
                margin: 0 auto;
                max-width: 960px;
                overflow-x: hidden; /* prevents box-shadow causing a horizontal scrollbar in firefox when viewport < 960px wide */
                -moz-box-shadow: 0 0 0.3em #255b17;
                -webkit-box-shadow: 0 0 0.3em #255b17;
                box-shadow: 0 0 0.3em #255b17;
            }
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