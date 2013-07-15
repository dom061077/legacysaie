package com.educacion.alumno

import org.springframework.dao.DataIntegrityViolationException
import com.megatome.grails.RecaptchaService
import org.springframework.context.i18n.LocaleContextHolder as LCH
import org.springframework.context.MessageSource
import org.springframework.context.MessageSource



class AlumnoController {

    RecaptchaService recaptchaService
    MessageSource  messageSource


    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [alumnoInstanceList: Alumno.list(params), alumnoInstanceTotal: Alumno.count()]
    }

    def create() {
        Random randomLink = new Random()

        [alumnoInstance: new Alumno(params),randomlink:randomLink.nextInt(100000)]
    }

    def save() {
        def alumnoInstance = new Alumno(params)
        if (!alumnoInstance.save(flush: true)) {
            render(view: "create", model: [alumnoInstance: alumnoInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'alumno.label', default: 'Alumno'), alumnoInstance.id])
        redirect(action: "show", id: alumnoInstance.id)
    }

    def show(Long id) {
        def alumnoInstance = Alumno.get(id)
        if (!alumnoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'alumno.label', default: 'Alumno'), id])
            redirect(action: "list")
            return
        }

        [alumnoInstance: alumnoInstance]
    }

    def edit(Long id) {
        def alumnoInstance = Alumno.get(id)
        if (!alumnoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'alumno.label', default: 'Alumno'), id])
            redirect(action: "list")
            return
        }

        [alumnoInstance: alumnoInstance]
    }

    def update(Long id, Long version) {
        def alumnoInstance = Alumno.get(id)
        if (!alumnoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'alumno.label', default: 'Alumno'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (alumnoInstance.version > version) {
                alumnoInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'alumno.label', default: 'Alumno')] as Object[],
                          "Another user has updated this Alumno while you were editing")
                render(view: "edit", model: [alumnoInstance: alumnoInstance])
                return
            }
        }

        alumnoInstance.properties = params

        if (!alumnoInstance.save(flush: true)) {
            render(view: "edit", model: [alumnoInstance: alumnoInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'alumno.label', default: 'Alumno'), alumnoInstance.id])
        redirect(action: "show", id: alumnoInstance.id)
    }

    def delete(Long id) {
        def alumnoInstance = Alumno.get(id)
        if (!alumnoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'alumno.label', default: 'Alumno'), id])
            redirect(action: "list")
            return
        }

        try {
            alumnoInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'alumno.label', default: 'Alumno'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'alumno.label', default: 'Alumno'), id])
            redirect(action: "show", id: id)
        }
    }
    
    def existenumdoc(){
        
        def alumnoInstance = Alumno.findByNumeroDocumento(params.numdoc)
        def numeroDocumento
        if (alumnoInstance)
            numeroDocumento = alumnoInstance.numeroDocumento
        else
            numeroDocumento= "undefined"
        render(contentType:'text/json'){
            respuesta(numeroDocumento:numeroDocumento)
        }
    }
    
    //--------json method---------
    
    def savejson(){
        log.debug "Parámetros: $params"
        def success = true
        def errorList = []
        def mensaje = ''
        def mensajeerror=''
        def alumnoInstance
        if (!recaptchaService.verifyAnswer(session, request.getRemoteAddr(), params)) {
            log.debug "CAPTCHA FALSE-------------"
            mensaje = 'Error en el registro de datos'
            errorList << [msg: 'El código de verificación no coincide']
            success=false
        }else{
            alumnoInstance = new Alumno(params)
            if (!alumnoInstance.save(flush: true)) {
                success=false
                mensaje = 'Error en el registro de datos'
                alumnoInstance.errors.allErrors.each{
                    errorList << [msg:messageSource.getMessage(it, LCH.locale)]
                }
            }else{
                mensaje = 'Los datos se guardaron correctamente'

            }
        }
        recaptchaService.cleanUp(session)
        log.debug "Recaptcha clean it"
        log.debug errorList

        render(contentType: 'text/json'){
            respuesta success: success, msg :mensaje, errors: errorList
        }

    }
    
}
