package com.educacion.academico.carrera

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class CarreraController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        log.debug "listar carreras"
        params.max = Math.min(max ?: 10, 100)
        [carreraInstanceList: Carrera.list(params), carreraInstanceTotal: Carrera.count()]
    }

    def create() {
        [carreraInstance: new Carrera(params)]
    }

    def save() {
        def carreraInstance = new Carrera(params)
        if (!carreraInstance.save(flush: true)) {
            render(view: "create", model: [carreraInstance: carreraInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'carrera.label', default: 'Carrera'), carreraInstance.id])
        redirect(action: "show", id: carreraInstance.id)
    }

    def show(Long id) {
        def carreraInstance = Carrera.get(id)
        if (!carreraInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'carrera.label', default: 'Carrera'), id])
            redirect(action: "list")
            return
        }

        [carreraInstance: carreraInstance]
    }

    def edit(Long id) {
        def carreraInstance = Carrera.get(id)
        if (!carreraInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'carrera.label', default: 'Carrera'), id])
            redirect(action: "list")
            return
        }

        [carreraInstance: carreraInstance]
    }

    def update(Long id, Long version) {
        def carreraInstance = Carrera.get(id)
        if (!carreraInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'carrera.label', default: 'Carrera'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (carreraInstance.version > version) {
                carreraInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'carrera.label', default: 'Carrera')] as Object[],
                          "Another user has updated this Carrera while you were editing")
                render(view: "edit", model: [carreraInstance: carreraInstance])
                return
            }
        }

        carreraInstance.properties = params

        if (!carreraInstance.save(flush: true)) {
            render(view: "edit", model: [carreraInstance: carreraInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'carrera.label', default: 'Carrera'), carreraInstance.id])
        redirect(action: "show", id: carreraInstance.id)
    }

    def delete(Long id) {
        def carreraInstance = Carrera.get(id)
        if (!carreraInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'carrera.label', default: 'Carrera'), id])
            redirect(action: "list")
            return
        }

        try {
            carreraInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'carrera.label', default: 'Carrera'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'carrera.label', default: 'Carrera'), id])
            redirect(action: "show", id: id)
        }
    }
    
    def listjson(){
        def returnMap = [:]
        def recordList = []
        def carreras = Carrera.list()
        carreras?.each{
            recordList << [id:it.id,denominacion:it.denominacion]
        }
        returnMap.rows = recordList
        log.debug "JSON de carrera retornado: "+returnMap
        render returnMap as JSON

    }

    def listaniosjson(){
        def returnMap = [:]
        def recordList = []
        def anios
        if (params.carrera_id){
            anios = CarreraAnioLectivo.createCriteria().list {
                eq("id.carrera.id",params.carrera_id)
                order("id.anioLectivo.id","desc")
            }
            anios.each {
                recordList << [id: it.id,descripcion:it.anioLectivo.descripcion]
            }
        }
        returnMap.rows = recordList
        render returnMap as JSON
    }


    def cupocarrera(String carreraId,int anioLectivoId){
        def returnMap=[:]
        returnMap.success = true;
        def carrerasanios = CarreraAnioLectivo.createCriteria().list{
            eq("id.carrera.id",carreraId)
            eq("id.anioLectivo.id",anioLectivoId)
        }
        log.debug "Carreras anios size: "+carrerasanios.size()
        if (carrerasanios.size()>0){

            def carreraAnioLectivoInstance = carrerasanios.get(0)
            def cupo = carreraAnioLectivoInstance.cupo
            def cupoSuplente = carreraAnioLectivoInstance.cupoSuplente
            def cantMatriculas = Matricula.createCriteria().count{
                carrera{
                    eq("id",carreraId)
                }
                anioLectivo{
                    eq("id",anioLectivoId)
                }
                eq("ingresante",Short.valueOf("1"))
            }
            log.debug "CANTIDAD DE MATRICULAS DE INGRESANTES: "+ cantMatriculas
            if (cantMatriculas>=cupo+cupoSuplente)
                returnMap.success = false;
        }

        log.debug "JSON: "+returnMap
        render returnMap as JSON
    }

    def materiaspreinscripcion(def carrera){

    }

}
