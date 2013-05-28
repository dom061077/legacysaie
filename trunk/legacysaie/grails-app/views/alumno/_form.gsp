<%@ page import="com.alumno.alumno.Alumno" %>




<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'numeroDocumento', 'error')} ">
	<label for="numeroDocumento">
		<g:message code="alumno.numeroDocumento.label" default="Numero Documento" />
		
	</label>
	<g:textField name="numeroDocumento" value="${alumnoInstance?.numeroDocumento}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'apellido', 'error')} ">
	<label for="apellido">
		<g:message code="alumno.apellido.label" default="Apellido" />
		
	</label>
	<g:textField name="apellido" value="${alumnoInstance?.apellido}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'nombre', 'error')} ">
	<label for="nombre">
		<g:message code="alumno.nombre.label" default="Nombre" />
		
	</label>
	<g:textField name="nombre" value="${alumnoInstance?.nombre}"/>
</div>

