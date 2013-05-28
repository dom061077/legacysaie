
<%@ page import="com.educacion.academica.Carrera" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'carrera.label', default: 'Carrera')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-carrera" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-carrera" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list carrera">
			
				<g:if test="${carreraInstance?.denominacion}">
				<li class="fieldcontain">
					<span id="denominacion-label" class="property-label"><g:message code="carrera.denominacion.label" default="Denominacion" /></span>
					
						<span class="property-value" aria-labelledby="denominacion-label"><g:fieldValue bean="${carreraInstance}" field="denominacion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.duracion}">
				<li class="fieldcontain">
					<span id="duracion-label" class="property-label"><g:message code="carrera.duracion.label" default="Duracion" /></span>
					
						<span class="property-value" aria-labelledby="duracion-label"><g:fieldValue bean="${carreraInstance}" field="duracion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.modalidad}">
				<li class="fieldcontain">
					<span id="modalidad-label" class="property-label"><g:message code="carrera.modalidad.label" default="Modalidad" /></span>
					
						<span class="property-value" aria-labelledby="modalidad-label"><g:fieldValue bean="${carreraInstance}" field="modalidad"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.titulo}">
				<li class="fieldcontain">
					<span id="titulo-label" class="property-label"><g:message code="carrera.titulo.label" default="Titulo" /></span>
					
						<span class="property-value" aria-labelledby="titulo-label"><g:fieldValue bean="${carreraInstance}" field="titulo"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.validez}">
				<li class="fieldcontain">
					<span id="validez-label" class="property-label"><g:message code="carrera.validez.label" default="Validez" /></span>
					
						<span class="property-value" aria-labelledby="validez-label"><g:fieldValue bean="${carreraInstance}" field="validez"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.perfilegresado}">
				<li class="fieldcontain">
					<span id="perfilegresado-label" class="property-label"><g:message code="carrera.perfilegresado.label" default="Perfilegresado" /></span>
					
						<span class="property-value" aria-labelledby="perfilegresado-label"><g:fieldValue bean="${carreraInstance}" field="perfilegresado"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.ocupacional}">
				<li class="fieldcontain">
					<span id="ocupacional-label" class="property-label"><g:message code="carrera.ocupacional.label" default="Ocupacional" /></span>
					
						<span class="property-value" aria-labelledby="ocupacional-label"><g:fieldValue bean="${carreraInstance}" field="ocupacional"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.estado}">
				<li class="fieldcontain">
					<span id="estado-label" class="property-label"><g:message code="carrera.estado.label" default="Estado" /></span>
					
						<span class="property-value" aria-labelledby="estado-label"><g:fieldValue bean="${carreraInstance}" field="estado"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${carreraInstance?.aniosLectivos}">
				<li class="fieldcontain">
					<span id="aniosLectivos-label" class="property-label"><g:message code="carrera.aniosLectivos.label" default="Anios Lectivos" /></span>
					
						<g:each in="${carreraInstance.aniosLectivos}" var="a">
						<span class="property-value" aria-labelledby="aniosLectivos-label"><g:link controller="anioLectivo" action="show" id="${a.id}">${a?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${carreraInstance?.id}" />
					<g:link class="edit" action="edit" id="${carreraInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
