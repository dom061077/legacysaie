<%@ page import="com.educacion.academica.Carrera" %>



<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'id', 'error')} ">
	<label for="id">
		<g:message code="carrera.id.label" default="Id" />
		
	</label>
	<g:textField name="id" value="${carreraInstance?.id}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'denominacion', 'error')} ">
	<label for="denominacion">
		<g:message code="carrera.denominacion.label" default="Denominacion" />
		
	</label>
	<g:textField name="denominacion" value="${carreraInstance?.denominacion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'duracion', 'error')} ">
	<label for="duracion">
		<g:message code="carrera.duracion.label" default="Duracion" />
		
	</label>
	<g:textField name="duracion" value="${carreraInstance?.duracion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'modalidad', 'error')} required">
	<label for="modalidad">
		<g:message code="carrera.modalidad.label" default="Modalidad" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="modalidad" type="number" value="${carreraInstance.modalidad}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'titulo', 'error')} ">
	<label for="titulo">
		<g:message code="carrera.titulo.label" default="Titulo" />
		
	</label>
	<g:textField name="titulo" value="${carreraInstance?.titulo}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'validez', 'error')} ">
	<label for="validez">
		<g:message code="carrera.validez.label" default="Validez" />
		
	</label>
	<g:textField name="validez" value="${carreraInstance?.validez}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'perfilegresado', 'error')} ">
	<label for="perfilegresado">
		<g:message code="carrera.perfilegresado.label" default="Perfilegresado" />
		
	</label>
	<g:textField name="perfilegresado" value="${carreraInstance?.perfilegresado}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'ocupacional', 'error')} ">
	<label for="ocupacional">
		<g:message code="carrera.ocupacional.label" default="Ocupacional" />
		
	</label>
	<g:textField name="ocupacional" value="${carreraInstance?.ocupacional}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'estado', 'error')} required">
	<label for="estado">
		<g:message code="carrera.estado.label" default="Estado" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="estado" type="number" value="${carreraInstance.estado}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'aniosLectivos', 'error')} required">
	<label for="aniosLectivos">
		<g:message code="carrera.aniosLectivos.label" default="Anios Lectivos" />
		<span class="required-indicator">*</span>
	</label>
	<!-- g:select name="aniosLectivos" from="${com.educacion.academica.AnioLectivo.list()}" multiple="multiple" optionKey="id" size="5" required="" value="${carreraInstance?.aniosLectivos*.id}" class="many-to-many"/ -->
</div>

