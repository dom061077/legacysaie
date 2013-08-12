package com.educacion.alumno

import org.springframework.dao.DataIntegrityViolationException
//import com.megatome.grails.RecaptchaService
import org.springframework.context.i18n.LocaleContextHolder as LCH
import org.springframework.context.MessageSource
import org.springframework.context.MessageSource
import com.educacion.academico.carrera.AnioLectivo
import grails.converters.JSON
import com.educacion.location.Pais
import com.educacion.location.Provincia
import com.educacion.location.Localidad
import org.springframework.transaction.TransactionStatus
import com.educacion.academico.carrera.Matricula
import com.educacion.enums.EstadoMatriculaEnum
import com.educacion.enums.SuplenteEnum
import com.educacion.academico.carrera.CarreraAnioLectivo
import com.educacion.academico.carrera.Carrera


class AlumnoController {

    def recaptchaService
    def springSecurityService
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
        def aniosLectivos = AnioLectivo.createCriteria().list{
            eq("estado",1)
            order("anio","desc")
        }
        def anioLectivoInstance = aniosLectivos.get(0)
        [alumnoInstance: new Alumno(params),randomlink:randomLink.nextInt(100000),aniolectivoInstance:anioLectivoInstance]
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
    def updatejsonpc(){
        log.debug "Parametros: $params"
        def success = true
        def mensaje = ''
        def returnMap = [:]
        def errorList = []
        def oldimagen
        
        def alumnoInstance = Alumno.get(params.id)
        if (alumnoInstance){
            oldimagen = alumnoInstance.imagen
            alumnoInstance.properties = params
            def imagen = request.getFile('imagenphoto')
            if (!imagen.isEmpty()){
                log.debug "HAY IMAGEN SELECCIONADA, clase del archivo: "+imagen.class
                alumnoInstance.imagen = imagen.getBytes()
            }else
                alumnoInstance.imagen = oldimagen
            if (!alumnoInstance.save(flush: true)){
                success = false
                mensaje = 'Error en el registro de datos'
                alumnoInstance.errors.allErrors.each{
                    errorList << [msg:messageSource.getMessage(it,LCH.locale)]
                }
            }else{
                mensaje = 'Los datos se guardaron correctamente'
            }
        }else{
            success = false
            mensaje='No se encontró el registro a modificar'
        }
        returnMap.success = success
        returnMap.mensaje = mensaje
        returnMap.errors = errorList
        //render returnMap as JSON
        def json = new JSON(returnMap)
        //render //"""{success:false,mensaje:'error',errors:[]}"""
        render json.toString()
    }
    
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
                /*def carrerasanios = CarreraAnioLectivo.createCriteria().list{
                    eq("id.carrera.id",params.carreraId)
                    eq("id.anioLectivo.id",params.anioLectivoId.toString().toInteger())
                }
                def carreraAnioLectivoInstance = carrerasanios.get(0)

                def cantMatriculas = Matricula.createCriteria().count{
                    carrera{
                        eq("id",params.carrera_id)
                    }
                    anioLectivo{
                        eq("id",params.aniolectivo)
                    }
                    eq("ingresante",Short.valueOf("1"))
                }
                if (carreraAnioLectivoInstance.cupo+carreraAnioLectivoInstance.cupoSuplente<cantMatriculas+1){
                    status.setRollbackOnly()
                    success = false
                    mensaje = 'Error en el registro de datos'
                    errorList << [msg: "No hay cupo disponible para la carrera"]
                }else{
                    def anioLectivoInstance = AnioLectivo.load(params.aniolectivo.toString().toInteger())
                    def carreraInstance = Carrera.load(params.carrera)
                    def matriculaInstance = new Matricula(anioLectivo: anioLectivoInstance,carrera:carreraInstance,alumno: alumnoInstance)
                    matriculaInstance.estado = EstadoMatriculaEnum.I
                    if (cantMatriculas+1 > carreraAnioLectivoInstance.cupo)
                        matriculaInstance.suplente = 1
                    else
                        matriculaInstance.suplente = 0
                    if (!matriculaInstance.save(flush: true)){
                        status.setRollbackOnly()
                        success=false
                        mensaje = 'Error en el registro de datos'
                        matriculaInstance.errors.allErrors.each{
                            errorList << [msg:messageSource.getMessage(it, LCH.locale)]
                        }
                    }
                }*/
                //alumnoInstance.
                log.debug "Datos del alumno, id: ${alumnoInstance.id}, apellido: ${alumnoInstance.apellido}, nombre: ${alumnoInstance.nombre}"
                log.debug "EMAIL: ${alumnoInstance.email}"
                alumnoInstance.registerconfirm = springSecurityService.encodePassword(alumnoInstance.id.toString()+alumnoInstance.numeroDocumento)
                alumnoInstance.save(flush: true)
                String emailContent = """
                    Usted se ha registrado en la base de datos del colegio Cruz Roja con Nro de Documento: ${alumnoInstance.numeroDocumento}, apellido: ${alumnoInstance.apellido}, nombre: ${alumnoInstance.nombre}.
                    Para continuar con la inscripción haga click en el siguiente link
                    ${request.scheme}://${request.serverName}:${request.serverPort}${request.contextPath}/alumno/confirm/${alumnoInstance.registerconfirm}
                """

                sendMail{
                    to alumnoInstance.email.toString()
                    subject "Respuesta de Colegio Cruz Roja"
                    body emailContent
                }

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

    def renderimage(int id){
        def alumnoInstance = Alumno.get(id)
        byte[] image = alumnoInstance?.imagen
        response.outputStream << image
    }


    
    def showjson(int id){
        def returnMap=[:]
        def alumnoInstance = Alumno.get(id)
        
        returnMap.data = [:]
        returnMap.success = true
        returnMap.data.id = alumnoInstance?.id
        returnMap.data.tipoDocumento = alumnoInstance.tipoDocumento.descripcion
        returnMap.data.numeroDocumento = alumnoInstance.numeroDocumento
        returnMap.data.apellido = alumnoInstance.apellido
        returnMap.data.nombre = alumnoInstance.nombre
        returnMap.data.sexo = alumnoInstance.sexo.name
        returnMap.data.fechaNacimiento = g.formatDate(format: "dd/MM/yyyy",date:alumnoInstance.fechaNacimiento)
        returnMap.data.paisNacimiento = alumnoInstance.paisNacimiento
        returnMap.data.provinciaNacimiento = alumnoInstance.provinciaNacimiento
        returnMap.data.localidadNacimiento = alumnoInstance.localidadNacimiento

        returnMap.data.calleDomicilio = alumnoInstance.calleDomicilio
        returnMap.data.numeroDomicilio = alumnoInstance.numeroDomicilio
        returnMap.data.barrioDomicilio = alumnoInstance.barrioDomicilio
        returnMap.data.paisDomicilio = alumnoInstance.paisDomicilio
        returnMap.data.paisdomicilio_id = Pais.findByDescripcion(alumnoInstance.paisDomicilio).id
        returnMap.data.provinciaDomicilio = alumnoInstance.provinciaDomicilio
        returnMap.data.provinciadomicilio_id = Provincia.findByDescripcion(alumnoInstance.provinciaDomicilio).id
        returnMap.data.localidadDomicilio = alumnoInstance.localidadDomicilio
        returnMap.data.localidaddomicilio_id = Localidad.findByDescripcion(alumnoInstance.localidadDomicilio).id
        returnMap.data.celularParticular = alumnoInstance.celularParticular
        returnMap.data.telefonoParticular = alumnoInstance.telefonoParticular
        returnMap.data.telefonoAlternativo = alumnoInstance.telefonoAlternativo

        returnMap.data.email = alumnoInstance.email
        returnMap.data.lugarLaboral = alumnoInstance.lugarLaboral
        returnMap.data.telefonoLaboral = alumnoInstance.telefonoLaboral
        returnMap.data.calleLaboral = alumnoInstance.calleLaboral
        returnMap.data.numeroDomicilioLaboral = alumnoInstance.numeroDomicilioLaboral
        returnMap.data.barrioLaboral = alumnoInstance.barrioLaboral
        returnMap.data.paisLaboral = alumnoInstance.paisLaboral
        returnMap.data.paislaboral_id = Pais.findByDescripcion(alumnoInstance.paisLaboral).id
        returnMap.data.provinciaLaboral = alumnoInstance.provinciaLaboral
        returnMap.data.provincialaboral_id = Provincia.findByDescripcion(alumnoInstance.provinciaLaboral).id
        returnMap.data.localidadLaboral = alumnoInstance.localidadLaboral
        returnMap.data.localidadlaboral_id = Localidad.findByDescripcion(alumnoInstance.localidadLaboral).id
        returnMap.data.lugarLaboral = alumnoInstance.lugarLaboral



        render returnMap as JSON
    }
    
    /*def confirm(){
        def matriculaInstance
        def anioLectivoInstance
        def carreraInstance
        def inscripcionInstance
        def inscdetInstance

        def alumnoInstance = Alumno.findByRegisterconfirm(params.id)
        if (alumnoInstance){
            def carrerasanios = CarreraAnioLectivo.createCriteria().list{
             eq("id.carrera.id",carreraId)
             eq("id.anioLectivo.id",anioLectivoId)
             }
             def carreraAnioLectivoInstance = carrerasanios.get(0)

             def cantMatriculas = Matricula.createCriteria().count{
                 carrera{
                     eq("id",params.carrera_id)
                 }
                 anioLectivo{
                     eq("id",params.aniolectivo)
                 }
                 eq("ingresante",Short.valueOf("1"))
             }
             if (carreraAnioLectivoInstance.cupo+carreraAnioLectivoInstance.cupoSuplente<cantMatriculas+1){
                 status.setRollbackOnly()
                 success = false                                 ´ç
                 mensaje = 'Error en el registro de datos'
                 errorList << [msg: "No hay cupo disponible para la carrera"]
             }else{
                 anioLectivoInstance = AnioLectivo.load(params.aniolectivo.toString().toInteger())
                 carreraInstance = Carrera.load(params.carrera)
                 matriculaInstance = new Matricula(anioLectivo: anioLectivoInstance,carrera:carreraInstance,alumno: alumnoInstance)
                 matriculaInstance.estado = EstadoMatriculaEnum.I
                 if (cantMatriculas+1 > carreraAnioLectivoInstance.cupo)
                     matriculaInstance.suplente = 1
                 else
                     matriculaInstance.suplente = 0
                 if (!matriculaInstance.save(flush: true)){
                     status.setRollbackOnly()
                     success=false
                     mensaje = 'Error en el registro de datos'
                     matriculaInstance.errors.allErrors.each{
                         errorList << [msg:messageSource.getMessage(it, LCH.locale)]
                     }
                 }else{

                 }
             }
        }
    }*/

    def confirm(){
        log.debug "ingresando al metodo confirm"
        def alumnoInstance = Alumno.findByRegisterconfirm(params.id)
        Random randomLink = new Random()
        def anioLectivoInstance
        if(alumnoInstance){
            if (alumnoInstance.confirmado){
                render(view: "confirmproblem",model: [mensaje: "El alumno ya tiene confirmada la preinscripcion. Por favor, comuniquese con el colegio"])
                return
            }
            def aniosLectivos = AnioLectivo.createCriteria().list{
                eq("estado",1)
                order("anio","desc")
            }
            anioLectivoInstance = aniosLectivos.get(0)
        }else{
            log.debug("confirmacion no encontrada")
            render(view: 'confirmproblem',model: [mensaje:"<h4>El link no corresponde a un alumno preinscripto</h4>"])
        }
        return[alumnoInstance:alumnoInstance,anioLectivoInstance: anioLectivoInstance,randomlink: randomLink]
    }
    
}
