
<%@ page import="com.educacion.academico.materia.Materia" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'materia.label', default: 'Materia')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-materia" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-materia" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list materia">
			
				<g:if test="${materiaInstance?.cantidadAusentesLibre}">
				<li class="fieldcontain">
					<span id="cantidadAusentesLibre-label" class="property-label"><g:message code="materia.cantidadAusentesLibre.label" default="Cantidad Ausentes Libre" /></span>
					
						<span class="property-value" aria-labelledby="cantidadAusentesLibre-label"><g:fieldValue bean="${materiaInstance}" field="cantidadAusentesLibre"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.cantidadReincorporaciones}">
				<li class="fieldcontain">
					<span id="cantidadReincorporaciones-label" class="property-label"><g:message code="materia.cantidadReincorporaciones.label" default="Cantidad Reincorporaciones" /></span>
					
						<span class="property-value" aria-labelledby="cantidadReincorporaciones-label"><g:fieldValue bean="${materiaInstance}" field="cantidadReincorporaciones"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.carrera}">
				<li class="fieldcontain">
					<span id="carrera-label" class="property-label"><g:message code="materia.carrera.label" default="Carrera" /></span>
					
						<span class="property-value" aria-labelledby="carrera-label"><g:link controller="carrera" action="show" id="${materiaInstance?.carrera?.id}">${materiaInstance?.carrera?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.denominacion}">
				<li class="fieldcontain">
					<span id="denominacion-label" class="property-label"><g:message code="materia.denominacion.label" default="Denominacion" /></span>
					
						<span class="property-value" aria-labelledby="denominacion-label"><g:fieldValue bean="${materiaInstance}" field="denominacion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.descripcion}">
				<li class="fieldcontain">
					<span id="descripcion-label" class="property-label"><g:message code="materia.descripcion.label" default="Descripcion" /></span>
					
						<span class="property-value" aria-labelledby="descripcion-label"><g:fieldValue bean="${materiaInstance}" field="descripcion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.duracion}">
				<li class="fieldcontain">
					<span id="duracion-label" class="property-label"><g:message code="materia.duracion.label" default="Duracion" /></span>
					
						<span class="property-value" aria-labelledby="duracion-label"><g:fieldValue bean="${materiaInstance}" field="duracion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.estado}">
				<li class="fieldcontain">
					<span id="estado-label" class="property-label"><g:message code="materia.estado.label" default="Estado" /></span>
					
						<span class="property-value" aria-labelledby="estado-label"><g:fieldValue bean="${materiaInstance}" field="estado"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.nivel}">
				<li class="fieldcontain">
					<span id="nivel-label" class="property-label"><g:message code="materia.nivel.label" default="Nivel" /></span>
					
						<span class="property-value" aria-labelledby="nivel-label"><g:link controller="nivel" action="show" id="${materiaInstance?.nivel?.id}">${materiaInstance?.nivel?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.porcentajeAsistencia}">
				<li class="fieldcontain">
					<span id="porcentajeAsistencia-label" class="property-label"><g:message code="materia.porcentajeAsistencia.label" default="Porcentaje Asistencia" /></span>
					
						<span class="property-value" aria-labelledby="porcentajeAsistencia-label"><g:fieldValue bean="${materiaInstance}" field="porcentajeAsistencia"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.promocional}">
				<li class="fieldcontain">
					<span id="promocional-label" class="property-label"><g:message code="materia.promocional.label" default="Promocional" /></span>
					
						<span class="property-value" aria-labelledby="promocional-label"><g:fieldValue bean="${materiaInstance}" field="promocional"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.tipoMateria}">
				<li class="fieldcontain">
					<span id="tipoMateria-label" class="property-label"><g:message code="materia.tipoMateria.label" default="Tipo Materia" /></span>
					
						<span class="property-value" aria-labelledby="tipoMateria-label"><g:fieldValue bean="${materiaInstance}" field="tipoMateria"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${materiaInstance?.troncal}">
				<li class="fieldcontain">
					<span id="troncal-label" class="property-label"><g:message code="materia.troncal.label" default="Troncal" /></span>
					
						<span class="property-value" aria-labelledby="troncal-label"><g:fieldValue bean="${materiaInstance}" field="troncal"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${materiaInstance?.id}" />
					<g:link class="edit" action="edit" id="${materiaInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
