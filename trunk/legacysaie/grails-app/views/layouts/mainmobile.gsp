<html>
	<head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><g:layoutTitle default="Grails"/></title>
        <!-- link rel="stylesheet" href="${resource(dir:'css',file:'Bootstrap.min.css')}" / -->
        <link rel="stylesheet" href="${resource(dir:'css',file:'jquery.mobile-1.3.2.css')}"/>
        <!--link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile.structure-1.2.0.min.css" / -->
        <link rel="stylesheet" href="${resource(dir:'css/mobile',file:'jquery.mobile.message.css')}"/>
        <link rel="stylesheet" href="${resource(dir:"css/jqueryvalidation",file:"validationEngine.jquery.css")}"/>
        <script type="text/javascript" src="${resource(dir:'js/jquery',file:'jquery-1.8.2.min.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/jqm',file:'jquery.mobile-1.3.2.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/jqm',file:'jquery.mobile.message.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/jquery/validation',file:'jquery.validationEngine.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/jquery/validation',file:'jquery.validationEngine-es.js')}"></script>


        <g:layoutHead/>
        <r:layoutResources />
    </head>
<body>
<div data-role="page" id="home" data-theme="c">
    <div data-role="header" data-theme="c">
        <h1>${(titlepage?titlepage:"Bienvenido")}</h1>
        <a href="${createLink(uri:"/logout")}"
           data-transition="flip"
           data-role="button"
           data-icon="gear"
           data-iconpos="notext"
           class="ui-btn-right"
           data-direction="reverse" data-ajax="false"></a>
    </div>

    <g:layoutBody/>



    <div data-role="footer" data-id="foo1" data-position="fixed">
        <div data-role="navbar" >
            <ul>
                <li><a id="menuinfoId" data-theme="c" href="${createLink(uri:"/panelControlAdmin/infousum")}">Info</a></li>
                <li><a href="b.html" data-theme="c">Alumnos</a></li>
                <li><a href="c.html" data-theme="c">Docentes</a></li>
            </ul>
        </div><!-- /navbar -->
    </div><!-- /footer -->
</div>

</body>

</html>