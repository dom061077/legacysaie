<%@ page import="com.educacion.academico.materia.Materia" %>



<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'cantidadAusentesLibre', 'error')} required">
	<label for="cantidadAusentesLibre">
		<g:message code="materia.cantidadAusentesLibre.label" default="Cantidad Ausentes Libre" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="cantidadAusentesLibre" type="number" value="${materiaInstance.cantidadAusentesLibre}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'cantidadReincorporaciones', 'error')} required">
	<label for="cantidadReincorporaciones">
		<g:message code="materia.cantidadReincorporaciones.label" default="Cantidad Reincorporaciones" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="cantidadReincorporaciones" type="number" value="${materiaInstance.cantidadReincorporaciones}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'carrera', 'error')} required">
	<label for="carrera">
		<g:message code="materia.carrera.label" default="Carrera" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="carrera" name="carrera.id" from="${com.educacion.academico.carrera.Carrera.list()}" optionKey="id" required="" value="${materiaInstance?.carrera?.id}" class="many-to-one"/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'denominacion', 'error')} ">
	<label for="denominacion">
		<g:message code="materia.denominacion.label" default="Denominacion" />
		
	</label>
	<g:textField name="denominacion" value="${materiaInstance?.denominacion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="materia.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${materiaInstance?.descripcion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'duracion', 'error')} required">
	<label for="duracion">
		<g:message code="materia.duracion.label" default="Duracion" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="duracion" type="number" value="${materiaInstance.duracion}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'estado', 'error')} required">
	<label for="estado">
		<g:message code="materia.estado.label" default="Estado" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="estado" type="number" value="${materiaInstance.estado}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'nivel', 'error')} required">
	<label for="nivel">
		<g:message code="materia.nivel.label" default="Nivel" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="nivel" name="nivel.id" from="${com.educacion.academico.materia.Nivel.list()}" optionKey="id" required="" value="${materiaInstance?.nivel?.id}" class="many-to-one"/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'porcentajeAsistencia', 'error')} required">
	<label for="porcentajeAsistencia">
		<g:message code="materia.porcentajeAsistencia.label" default="Porcentaje Asistencia" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="porcentajeAsistencia" type="number" value="${materiaInstance.porcentajeAsistencia}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'promocional', 'error')} required">
	<label for="promocional">
		<g:message code="materia.promocional.label" default="Promocional" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="promocional" type="number" value="${materiaInstance.promocional}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'tipoMateria', 'error')} ">
	<label for="tipoMateria">
		<g:message code="materia.tipoMateria.label" default="Tipo Materia" />
		
	</label>
	<g:textField name="tipoMateria" value="${materiaInstance?.tipoMateria}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: materiaInstance, field: 'troncal', 'error')} required">
	<label for="troncal">
		<g:message code="materia.troncal.label" default="Troncal" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="troncal" type="number" value="${materiaInstance.troncal}" required=""/>
</div>

