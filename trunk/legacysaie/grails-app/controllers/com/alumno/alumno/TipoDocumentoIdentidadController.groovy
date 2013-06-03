package com.alumno.alumno

import org.springframework.dao.DataIntegrityViolationException

class TipoDocumentoIdentidadController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [tipoDocumentoIdentidadInstanceList: TipoDocumentoIdentidad.list(params), tipoDocumentoIdentidadInstanceTotal: TipoDocumentoIdentidad.count()]
    }

    def create() {
        [tipoDocumentoIdentidadInstance: new TipoDocumentoIdentidad(params)]
    }

    def save() {
        def tipoDocumentoIdentidadInstance = new TipoDocumentoIdentidad(params)
        if (!tipoDocumentoIdentidadInstance.save(flush: true)) {
            render(view: "create", model: [tipoDocumentoIdentidadInstance: tipoDocumentoIdentidadInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), tipoDocumentoIdentidadInstance.id])
        redirect(action: "show", id: tipoDocumentoIdentidadInstance.id)
    }

    def show(Long id) {
        def tipoDocumentoIdentidadInstance = TipoDocumentoIdentidad.get(id)
        if (!tipoDocumentoIdentidadInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), id])
            redirect(action: "list")
            return
        }

        [tipoDocumentoIdentidadInstance: tipoDocumentoIdentidadInstance]
    }

    def edit(Long id) {
        def tipoDocumentoIdentidadInstance = TipoDocumentoIdentidad.get(id)
        if (!tipoDocumentoIdentidadInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), id])
            redirect(action: "list")
            return
        }

        [tipoDocumentoIdentidadInstance: tipoDocumentoIdentidadInstance]
    }

    def update(Long id, Long version) {
        def tipoDocumentoIdentidadInstance = TipoDocumentoIdentidad.get(id)
        if (!tipoDocumentoIdentidadInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (tipoDocumentoIdentidadInstance.version > version) {
                tipoDocumentoIdentidadInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad')] as Object[],
                          "Another user has updated this TipoDocumentoIdentidad while you were editing")
                render(view: "edit", model: [tipoDocumentoIdentidadInstance: tipoDocumentoIdentidadInstance])
                return
            }
        }

        tipoDocumentoIdentidadInstance.properties = params

        if (!tipoDocumentoIdentidadInstance.save(flush: true)) {
            render(view: "edit", model: [tipoDocumentoIdentidadInstance: tipoDocumentoIdentidadInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), tipoDocumentoIdentidadInstance.id])
        redirect(action: "show", id: tipoDocumentoIdentidadInstance.id)
    }

    def delete(Long id) {
        def tipoDocumentoIdentidadInstance = TipoDocumentoIdentidad.get(id)
        if (!tipoDocumentoIdentidadInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), id])
            redirect(action: "list")
            return
        }

        try {
            tipoDocumentoIdentidadInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'tipoDocumentoIdentidad.label', default: 'TipoDocumentoIdentidad'), id])
            redirect(action: "show", id: id)
        }
    }
}
