package com.educacion.academico.examen

import org.springframework.dao.DataIntegrityViolationException

class ExamenController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        //redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [examenInstanceList: Examen.list(params), examenInstanceTotal: Examen.count()]
    }

    def create() {
        [examenInstance: new Examen(params)]
    }

    def save() {
        def examenInstance = new Examen(params)
        if (!examenInstance.save(flush: true)) {
            render(view: "create", model: [examenInstance: examenInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'examen.label', default: 'Examen'), examenInstance.id])
        redirect(action: "show", id: examenInstance.id)
    }

    def show(Long id) {
        def examenInstance = Examen.get(id)
        if (!examenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'examen.label', default: 'Examen'), id])
            redirect(action: "list")
            return
        }

        [examenInstance: examenInstance]
    }

    def edit(Long id) {
        def examenInstance = Examen.get(id)
        if (!examenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'examen.label', default: 'Examen'), id])
            redirect(action: "list")
            return
        }

        [examenInstance: examenInstance]
    }

    def update(Long id, Long version) {
        def examenInstance = Examen.get(id)
        if (!examenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'examen.label', default: 'Examen'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (examenInstance.version > version) {
                examenInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'examen.label', default: 'Examen')] as Object[],
                          "Another user has updated this Examen while you were editing")
                render(view: "edit", model: [examenInstance: examenInstance])
                return
            }
        }

        examenInstance.properties = params

        if (!examenInstance.save(flush: true)) {
            render(view: "edit", model: [examenInstance: examenInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'examen.label', default: 'Examen'), examenInstance.id])
        redirect(action: "show", id: examenInstance.id)
    }

    def delete(Long id) {
        def examenInstance = Examen.get(id)
        if (!examenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'examen.label', default: 'Examen'), id])
            redirect(action: "list")
            return
        }

        try {
            examenInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'examen.label', default: 'Examen'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'examen.label', default: 'Examen'), id])
            redirect(action: "show", id: id)
        }
    }
}
