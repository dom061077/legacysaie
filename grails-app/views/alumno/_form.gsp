<%@ page import="com.educacion.alumno.Alumno" %>



<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'apellido', 'error')} ">
	<label for="apellido">
		<g:message code="alumno.apellido.label" default="Apellido" />

	</label>
	<g:textField name="apellido" value="${alumnoInstance?.apellido}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'fechaNacimiento', 'error')} required">
	<label for="fechaNacimiento">
		<g:message code="alumno.fechaNacimiento.label" default="Fecha Nacimiento" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="fechaNacimiento" precision="day"  value="${alumnoInstance?.fechaNacimiento}"  />
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'nombre', 'error')} ">
	<label for="nombre">
		<g:message code="alumno.nombre.label" default="Nombre" />

	</label>
	<g:textField name="nombre" value="${alumnoInstance?.nombre}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'numeroDocumento', 'error')} ">
	<label for="numeroDocumento">
		<g:message code="alumno.numeroDocumento.label" default="Numero Documento" />

	</label>
	<g:textField name="numeroDocumento" value="${alumnoInstance?.numeroDocumento}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'sexo', 'error')} required">
	<label for="sexo">
		<g:message code="alumno.sexo.label" default="Sexo" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="sexo" from="${com.educacion.enums.SexoEnum?.values()}" keys="${com.educacion.enums.SexoEnum.values()*.name()}" required="" value="${alumnoInstance?.sexo?.name()}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: alumnoInstance, field: 'tipoDocumento', 'error')} required">
	<label for="tipoDocumento">
		<g:message code="alumno.tipoDocumento.label" default="Tipo Documento" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="tipoDocumento" name="tipoDocumento.id" from="${com.alumno.alumno.TipoDocumentoIdentidad.list()}" optionKey="id" required="" value="${alumnoInstance?.tipoDocumento?.id}" class="many-to-one"/>
</div>

