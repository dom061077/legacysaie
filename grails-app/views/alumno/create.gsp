<%@ page import="com.educacion.alumno.Alumno" %>
<!doctype html>
<html>
	<head>
        <link rel="stylesheet" href="${resource(dir:'js/extjs/resources/css',file:'ext-ux-wiz.css')}"/>
        <link rel="stylesheet" href="${resource(dir: 'js/extjs/plugins/fileuploadfield/css',file:'fileuploadfield.css')}"/>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'CardLayout.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'Wizard.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'Header.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/wizard',file:'Card.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs/plugins/fileuploadfield',file:'FileUploadField.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/alumno',file: 'register.js')}"></script>

		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'alumno.label', default: 'Alumno')}" />
		<title><g:message code="default.create.label" args="[entityName]" /></title>
        <style type="text/css">
            .upload-icon {
                                 background: url('${resource(dir:'js/extjs/resources/images',file:'image_add.png')}') no-repeat 0 0 !important;
                             }
            #fi-button-msg {
                border: 2px solid #ccc;
                padding: 5px 10px;
                background: #eee;
                margin: 5px;
                float: left;
            }
        </style>
	</head>
	<body>
	</body>
</html>
