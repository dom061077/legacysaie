
<%@ page import="com.educacion.academico.carrera.Carrera" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'carrera.label', default: 'Carrera')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-carrera" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-carrera" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="duracion" title="${message(code: 'carrera.duracion.label', default: 'Duracion')}" />
					
						<g:sortableColumn property="modalidad" title="${message(code: 'carrera.modalidad.label', default: 'Modalidad')}" />
					
						<g:sortableColumn property="ocupacional" title="${message(code: 'carrera.ocupacional.label', default: 'Ocupacional')}" />
					
						<g:sortableColumn property="perfilEgresado" title="${message(code: 'carrera.perfilEgresado.label', default: 'Perfil Egresado')}" />
					
						<g:sortableColumn property="titulo" title="${message(code: 'carrera.titulo.label', default: 'Titulo')}" />
					
						<g:sortableColumn property="validez" title="${message(code: 'carrera.validez.label', default: 'Validez')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${carreraInstanceList}" status="i" var="carreraInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${carreraInstance.id}">${fieldValue(bean: carreraInstance, field: "duracion")}</g:link></td>
					
						<td>${fieldValue(bean: carreraInstance, field: "modalidad")}</td>
					
						<td>${fieldValue(bean: carreraInstance, field: "ocupacional")}</td>
					
						<td>${fieldValue(bean: carreraInstance, field: "perfilEgresado")}</td>
					
						<td>${fieldValue(bean: carreraInstance, field: "titulo")}</td>
					
						<td>${fieldValue(bean: carreraInstance, field: "validez")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${carreraInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
