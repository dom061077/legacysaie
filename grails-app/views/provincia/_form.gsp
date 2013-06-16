<%@ page import="com.educacion.location.Provincia" %>



<div class="fieldcontain ${hasErrors(bean: provinciaInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="provincia.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${provinciaInstance?.descripcion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: provinciaInstance, field: 'pais', 'error')} required">
	<label for="pais">
		<g:message code="provincia.pais.label" default="Pais" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="pais" name="pais.id" from="${com.educacion.location.Pais.list()}" optionKey="id" required="" value="${provinciaInstance?.pais?.id}" class="many-to-one"/>
</div>

