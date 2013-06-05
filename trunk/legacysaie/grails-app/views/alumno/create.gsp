<%@ page import="com.educacion.alumno.Alumno" %>
<!doctype html>
<html>
	<head>
        <script type="text/javascript" src="${resource(dir:'js/alumno',file: 'register.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'CardLayout.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'Wizard.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'Header.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'Card.js')}"></script>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'alumno.label', default: 'Alumno')}" />
		<title><g:message code="default.create.label" args="[entityName]" /></title>
	</head>
	<body>
	</body>
</html>
