package com.educacion.seguridad

import org.springframework.dao.DataIntegrityViolationException
import org.springframework.context.i18n.LocaleContextHolder
import grails.converters.JSON

class UserController {

    def springSecurityService

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [userInstanceList: User.list(params), userInstanceTotal: User.count()]
    }

    def create() {
        [userInstance: new User(params)]
    }

    def save() {
        def userInstance = new User(params)
        if (!userInstance.save(flush: true)) {
            render(view: "create", model: [userInstance: userInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'user.label', default: 'User'), userInstance.id])
        redirect(action: "show", id: userInstance.id)
    }

    def show(Long id) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        [userInstance: userInstance]
    }

    def edit(Long id) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        [userInstance: userInstance]
    }

    def update(Long id, Long version) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (userInstance.version > version) {
                userInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'user.label', default: 'User')] as Object[],
                          "Another user has updated this User while you were editing")
                render(view: "edit", model: [userInstance: userInstance])
                return
            }
        }

        userInstance.properties = params

        if (!userInstance.save(flush: true)) {
            render(view: "edit", model: [userInstance: userInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'user.label', default: 'User'), userInstance.id])
        redirect(action: "show", id: userInstance.id)
    }

    def delete(Long id) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        try {
            userInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "show", id: id)
        }
    }

    def  editpass(){
        def userInstance = springSecurityService.currentUser
        [userInstance:userInstance,titlepage:"Cambio de Contraseña"]
    }

    def changepass(){
        log.debug "INGRESANDO AL METODO changepass"
        def usuarioInstance = springSecurityService.currentUser
        if (usuarioInstance){
            if (!params.newpassword.equals(params.repeatnewpassword)){
                //errorList  << [msg: "La nueva contraseña no coincide con su confirmación"]
                log.debug "CONTRASEÑAS NO COINCIDEN"
                render(view: 'editpass',model: [userInstance:usuarioInstance])
            }else{
                if (!params.newpassword.matches(".*[a-zA-Z].*") || !params.newpassword.matches(".*[1-9!@#\$%^&*()-_=+].*")){
                    //errorList << [msg: "La contraseña debe combinar letras con al menos un número o caracter especial  (!@#\$%^&*()-_=+)"]
                    render(view: 'editpass',model:[userInstance:usuarioInstance])
                }else{
                    usuarioInstance.password = params.newpassword
                    if (usuarioInstance.save(flush: true)){
                        //returnMap.success = true
                        //returnMap.mensaje = "La contraseña se modificó correctamente"
                    }else{
                        usuarioInstance.errors.allErrors.each{
                            //errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        }
                    }
                }
            }
        }else{
            //errorList << [msg: "Usuario no encontrado"]
        }


    }

}
