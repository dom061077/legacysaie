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
import com.educacion.academico.materia.Materia
import com.educacion.academico.carrera.Inscripcion
import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.academico.carrera.InscripcionDetalle
import com.educacion.enums.EstadoInscripcionDetalleEnum
import com.educacion.enums.TipoInscripcionDetalleEnum


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


    /*def existenumdoc(){
        log.debug "Parametros: "+params
        def returnMap = [:]
        def alumnoInstance = Alumno.findByNumeroDocumento(params.numerodocumento)
        if (alumnoInstance){
            returnMap.success=false
            returnMap.errors = "Ya existe el número de documento"   
        }else{
            returnMap.errors = ""
            returnMap.success=true
        }
        render returnMap as JSON
    }  */
    
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
        params.nombre = params.nombre.toString().toString().replace("+"," ")
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
            log.debug "Datos del alumno, id: ${alumnoInstance.id}, apellido: ${alumnoInstance.apellido}, nombre: ${alumnoInstance.nombre}"
            log.debug "EMAIL: ${alumnoInstance.email}"
            Alumno.withTransaction {TransactionStatus status->
                alumnoInstance.registerconfirm = springSecurityService.encodePassword(alumnoInstance.id.toString()+alumnoInstance.numeroDocumento)
                if (!alumnoInstance.save(flush: true)) {
                    status.setRollbackOnly()
                    success=false
                    mensaje = 'Error en el registro de datos'
                    alumnoInstance.errors.allErrors.each{
                        errorList << [msg:messageSource.getMessage(it, LCH.locale)]
                    }
                }else{
                    String emailContent = """
                        Usted se ha registrado en la base de datos del colegio Cruz Roja con <br>
                        Nro de Documento: <h1>${alumnoInstance.numeroDocumento}</h1> <br>
                        Apellido y Nombre:<h1> ${alumnoInstance.apellido}, ${alumnoInstance.nombre}</h1>.<br>
                        Para continuar con la inscripción haga click en el siguiente link: <br>
                        ${request.scheme}://${request.serverName}:${request.serverPort}${request.contextPath}/alumno/confirm/${alumnoInstance.registerconfirm}
                        Si no puede hacer click, copie y pegue el link en la barra de direcciones y luego pulse enter.
                    """
                    try{
                        sendMail{
                            to alumnoInstance.email.toString()
                            subject "Respuesta Pre-Inscripción de Colegio Cruz Roja"
                            html emailContent
                        }
                        mensaje = 'Los datos se guardaron correctamente. <br> Revise el correo electrónico que ingresó y siga los pasos indicados alli para completar la preinscripción <br> Si no recibe ningún correo dirijase al colegio'
                    }catch(Exception e){
                        status.setRollbackOnly()
                        success = false
                        mensaje = 'Error al enviar el E-mail. El servicio de correo no está funcionando correctamente'
                    }
                }
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
        returnMap.data.paisdomicilio_id =(alumnoInstance.paisDomicilio!=null?Pais.findByDescripcion(alumnoInstance.paisDomicilio)?.id:0)
        returnMap.data.provinciaDomicilio = alumnoInstance.provinciaDomicilio
        returnMap.data.provinciadomicilio_id = (alumnoInstance.provinciaDomicilio!=null?Provincia.findByDescripcion(alumnoInstance.provinciaDomicilio)?.id:0)
        returnMap.data.localidadDomicilio = alumnoInstance.localidadDomicilio
        returnMap.data.localidaddomicilio_id = (alumnoInstance.localidadDomicilio!=null?Localidad.findByDescripcion(alumnoInstance.localidadDomicilio).id:0)
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
        returnMap.data.paislaboral_id = (alumnoInstance.paisLaboral!=null?Pais.findByDescripcion(alumnoInstance.paisLaboral)?.id:0)
        returnMap.data.provinciaLaboral = alumnoInstance.provinciaLaboral
        returnMap.data.provincialaboral_id = (alumnoInstance.provinciaLaboral!=null?Provincia.findByDescripcion(alumnoInstance.provinciaLaboral)?.id:0)
        returnMap.data.localidadLaboral = alumnoInstance.localidadLaboral
        returnMap.data.localidadlaboral_id = (alumnoInstance.localidadLaboral!=null?Localidad.findByDescripcion(alumnoInstance.localidadLaboral).id:0)
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
            log.debug "estado de confirmado: "+alumnoInstance.confirmado
            if (alumnoInstance.confirmado==1){
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
        return[alumnoInstance:alumnoInstance,anioLectivoInstance: anioLectivoInstance,randomlink: randomLink.nextInt(100000)]
    }

    def loadconfirm(){
        def returnMap = [:]
        def alumnoInstance = Alumno.findByRegisterconfirm(params.id)
        def anioLectivoInstance
        def carreraanios
        def carreraAnioLectivoInstance
        log.debug "PARAMETROS: $params"
        if(alumnoInstance){
            if (!alumnoInstance.confirmado){
                returnMap.success = true
                def aniosLectivos = AnioLectivo.createCriteria().list{
                    eq("estado",1)
                    order("anio","desc")
                }
                anioLectivoInstance = aniosLectivos.get(0)
                returnMap.data = [:]
                returnMap.data.keyconfirm = alumnoInstance.registerconfirm
                returnMap.data.aniolectivo = anioLectivoInstance?.id
                returnMap.data.numerodocumento = alumnoInstance.numeroDocumento
                returnMap.data.apellido = alumnoInstance.apellido
                returnMap.data.nombre = alumnoInstance.nombre
                returnMap.data.aniolectivodesc = anioLectivoInstance?.descripcion
            }else{
                returnMap.success = false
                returnMap.mensaje = "La preinscripcion del alumno ya está confirmada"
            }

        }else{
            returnMap.success = false
            returnMap.mensaje = "La clave de confirmación no corresponde a un registro de alumno válido"
        }
        render returnMap as JSON
    }

    def materiaspreinscribir(String carreraId){
        def materias = Materia.createCriteria().list{
            tipoMateria{
                eq("id","00002")
            }
            carrera{
                eq("id",carreraId)
            }
        }
        def returnMap = [:]
        def recordList=[]
        materias.each{
            recordList << [id:it.id,denominacion:it.denominacion,seleccionada:false]
        }

        returnMap.rows=recordList
        returnMap.success = true
        returnMap.total = materias.size()
        render returnMap as JSON
    }

    def confirmpreinscripcion(){
        log.debug "PARAMETROS: $params"
        def alumnoInstance = Alumno.findByRegisterconfirm(params.keyconfirm)
        def returnMap = [:]
        def success=true
        def errorList = []
        def mensaje
        def detalleInscJson = JSON.parse(params.materias)
        if (!recaptchaService.verifyAnswer(session, request.getRemoteAddr(), params)) {
            log.debug "CAPTCHA FALSE-------------"
            mensaje = 'Error en el registro de datos'
            errorList << [msg: 'El código de verificación no coincide']
            success=false
        }else{
                if(alumnoInstance){
                    if(detalleInscJson.size()>0){
                            def flagdetalle = false
                            detalleInscJson.each{
                                log.debug "DETALLE MATERIAS JSON: "+it
                                if(it.seleccionada){
                                    flagdetalle = true
                                }
                            }
                            if(flagdetalle){
                                Inscripcion.withTransaction{ TransactionStatus status ->
                                    def carrerasanios = CarreraAnioLectivo.createCriteria().list{
                                        eq("id.carrera.id",params.carrera_id)
                                        eq("id.anioLectivo.id",params.aniolectivo.toString().toInteger())
                                    }

                                    if(carrerasanios.size()<=0){
                                        status.setRollbackOnly()
                                        success = false
                                        mensaje = "Error en el registro de datos"
                                        errorList << [msg: "El año lectivo de la carrera no está activado. Comuníquese con el colegio"]
                                        return
                                    }

                                    def carreraAnioLectivoInstance = carrerasanios.get(0)

                                    def cantMatriculas = Matricula.createCriteria().count{
                                        carrera{
                                            eq("id",params.carrera_id)
                                        }
                                        anioLectivo{
                                            eq("id",params.aniolectivo.toString().toInteger())
                                        }
                                        eq("ingresante",Short.valueOf("1"))
                                    }
                                    if (carreraAnioLectivoInstance.cupo+carreraAnioLectivoInstance.cupoSuplente<cantMatriculas+1){
                                        status.setRollbackOnly()
                                        success = false
                                        mensaje = 'Error en el registro de datos'
                                        errorList << [msg: "No hay cupo disponible para la carrera"]
                                    }else{
                                        //def anioLectivoInstance = AnioLectivo.load(params.aniolectivo.toString().toInteger())
                                        //def carreraInstance = Carrera.load(params.carrera)
                                        def matriculaInstance = new Matricula(anioLectivo: carreraAnioLectivoInstance.anioLectivo,carrera:carreraAnioLectivoInstance.carrera,alumno: alumnoInstance)
                                        matriculaInstance.estado = EstadoMatriculaEnum.I
                                        if (cantMatriculas+1 > carreraAnioLectivoInstance.cupo)
                                            matriculaInstance.suplente = SuplenteEnum.S
                                        else
                                            matriculaInstance.suplente = SuplenteEnum.T
                                        if (!matriculaInstance.save(flush: true)){
                                            status.setRollbackOnly()
                                            success=false
                                            mensaje = 'Error en el registro de datos'
                                            matriculaInstance.errors.allErrors.each{
                                                errorList << [msg:messageSource.getMessage(it, LCH.locale)]
                                            }
                                        } else{
                                            def inscripcionInstance = new Inscripcion(matricula: matriculaInstance)
                                            if(matriculaInstance.suplente.equals(SuplenteEnum.S)){
                                                inscripcionInstance.estado = EstadoInscripcionEnum.S
                                                inscripcionInstance.suplente = SuplenteEnum.S
                                            }else{
                                                inscripcionInstance.estado = EstadoInscripcionEnum.A
                                                inscripcionInstance.suplente = SuplenteEnum.T
                                            }

                                            def materiaInstance
                                            InscripcionDetalle inscDetInstance
                                            detalleInscJson.each{
                                                if (it.seleccionada){
                                                    //EstadoInscripcionDetalleEnum estado
                                                    //TipoInscripcionDetalleEnum tipoInscripcion
                                                    inscDetInstance = new InscripcionDetalle()
                                                    materiaInstance = Materia.load(it.id)
                                                    inscripcionInstance.addToDetalle(new InscripcionDetalle(materia: materiaInstance,estado: EstadoInscripcionDetalleEnum.I,tipoInscripcion:TipoInscripcionDetalleEnum.C,notaFinal:0))
                                                    //inscInstance.addToDetalle(new Object())
                                                }
                                            }
                                            if(!inscripcionInstance.save(flush:true)){
                                                status.setRollbackOnly()
                                                success=false
                                                mensaje = 'Error en el registro de datos'
                                                matriculaInstance.errors.allErrors.each{
                                                    errorList << [msg:messageSource.getMessage(it, LCH.locale)]
                                                }
                                            }else{
                                                alumnoInstance.confirmado=true
                                                if (alumnoInstance.save(flush:true)){
                                                    String emailContent = """
                                                            Su preinscripción ya fue confirmada. <br>
                                                            Para imprimir el comprobante de haga  click en el siguiente link: <br>
                                                            ${request.scheme}://${request.serverName}:${request.serverPort}${request.contextPath}/alumno/comprobante/${alumnoInstance.registerconfirm}
                                                            Si no puede hacer click, copie y pegue el link en la barra de direcciones y luego pulse enter.
                                                    """

                                                    try{
                                                        sendMail{
                                                            to alumnoInstance.email.toString()
                                                            subject "Respuesta de Colegio Cruz Roja - Comprobante e Pre-inscripción"
                                                            html emailContent
                                                        }
                                                        mensaje = 'La preinscripción se confirmó correctamente.<br>Revise su correo electrónico para obtener el comprobante de preinscripción';
                                                    }catch(Exception e){
                                                        status.setRollbackOnly()
                                                        success = false
                                                        mensaje = 'Error al enviar el E-mail. La preinscripción no pudo confirmarse'
                                                    }

                                                }

                                            }
                                        }
                                    }
                                }
                            }else{
                                success=false
                                mensaje='Error en el registro de datos'
                                errorList << [msg: 'Por favor seleccione las materias a preinscribir']
                            }
                    }else{
                            success=false
                            mensaje='Error en el registro de datos'
                            errorList << [msg: 'Por favor seleccione las materias a preinscribir']
                    }
                }else{
                   success=false
                   mensaje='Error en el registro de datos'
                    errorList << [msg: 'La confirmación de correo electrónico no corresponde a ningún alumno preinscripto']
                }
        }
        returnMap.success = success
        returnMap.errors = errorList
        returnMap.msg = mensaje
        render returnMap as JSON
    }

    def comprobante(){
        log.debug "INGRESEANDO A COMPROBANTE"
        def inscripciones = Inscripcion.createCriteria().list {
            matricula{
               alumno{
                eq("registerconfirm",params.id)
               }
            }
            order("id","asc")
        }
        def inscripcionInstance = inscripciones.get(0)
        def matriculaInstance
        if (inscripcionInstance){
            log.debug inscripcionInstance.matricula.alumno.apellido
            log.debug inscripcionInstance.matricula.carrera.denominacion
            inscripcionInstance.detalle.each{
                log.debug it.materia.denominacion
            }
        }
        String reportsDirPath = servletContext.getRealPath("/reports/");
        params.put("SUBREPORT_DIR", reportsDirPath+"/");
        log.debug("Parametros: $params")
        //_format=PDF&_name=ordenReservaInstance&_file=OrdenReserva
        params.put("_format","PDF")
        params.put("_file","comprobantematricula")
        params.put("_name","comprobantematricula")
        params.put("tipoinscripcion_param","Solicita Matriculación en las siguientes materias de la carrera")
        params.put("titulo","PREINSCRIPCION "+inscripcionInstance.matricula.anioLectivo.anio)
        def list = new ArrayList()
        list.add(inscripcionInstance)
        chain(controller:'jasper',action:'index',model:[data:list],params:params)

    }

    def comprobanteinsc(){
        def inscripcionInstance = Inscripcion.get(params.id)
        inscripcionInstance?.matricula?.anioLectivo.descripcion
        inscripcionInstance?.matricula?.alumno?.apellido
        inscripcionInstance?.matricula?.carrera?.denominacion
        def list = new ArrayList()
        list.add(inscripcionInstance)
        params.put("_format","PDF")
        params.put("_file","comprobantematricula")
        params.put("_name","comprobante")
        def tipoInscripcion_param
        def titulo
        inscripcionInstance.detalle.each {
            if(it.tipoInscripcion.equals(TipoInscripcionDetalleEnum.C)){
                tipoInscripcion_param = "Solicita Inscripción para Cursar en las siguientes materias de la carrera "
                titulo = "Inscripción de Cursado"
            }
            if(it.tipoInscripcion.equals(TipoInscripcionDetalleEnum.R)){
                tipoInscripcion_param = "Solicita Inscripción para Rendir en las siguientes materias de la carrera "
                titulo = "Inscripción para Rendir Final"
            }
            if(it.tipoInscripcion.equals(TipoInscripcionDetalleEnum.L)){
                tipoInscripcion_param = "Solicita Inscripción para Rendir Libre en las siguientes materias de la carrera "
                titulo = "Inscripción para Rendir Libre"
            }
            it.materia.denominacion

        }
        params.put("tipoinscripcion_param",tipoInscripcion_param)
        params.put("titulo",titulo)
        chain(controller:'jasper',action:'index',model:[data:list],params:params)
    }
}
