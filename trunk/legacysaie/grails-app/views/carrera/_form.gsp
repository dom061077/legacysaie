<%@ page import="com.educacion.academico.carrera.Carrera" %>



<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'anioslectivos', 'error')} ">
	<label for="anioslectivos">
		<g:message code="carrera.anioslectivos.label" default="Anioslectivos" />
		
	</label>
	<g:select name="anioslectivos" from="${com.educacion.academico.carrera.AnioLectivo.list()}" multiple="multiple" optionKey="id" size="5" value="${carreraInstance?.anioslectivos*.id}" class="many-to-many"/>
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

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'niveles', 'error')} ">
	<label for="niveles">
		<g:message code="carrera.niveles.label" default="Niveles" />
		
	</label>
	<g:select name="niveles" from="${com.educacion.academico.materia.Nivel.list()}" multiple="multiple" optionKey="id" size="5" value="${carreraInstance?.niveles*.id}" class="many-to-many"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'ocupacional', 'error')} ">
	<label for="ocupacional">
		<g:message code="carrera.ocupacional.label" default="Ocupacional" />
		
	</label>
	<g:textField name="ocupacional" value="${carreraInstance?.ocupacional}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: carreraInstance, field: 'perfilEgresado', 'error')} ">
	<label for="perfilEgresado">
		<g:message code="carrera.perfilEgresado.label" default="Perfil Egresado" />
		
	</label>
	<g:textField name="perfilEgresado" value="${carreraInstance?.perfilEgresado}"/>
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

