package com.educacion

import com.educacion.academico.carrera.Matricula
import com.educacion.enums.EstadoMatriculaEnum
import grails.converters.JSON
import com.educacion.academico.Docente
import com.educacion.seguridad.User
import com.educacion.alumno.Alumno
import org.springframework.transaction.TransactionStatus
import org.springframework.context.i18n.LocaleContextHolder
import com.educacion.seguridad.Role
import com.educacion.seguridad.UserRole
import com.educacion.seguridad.User
import org.springframework.context.MessageSource

class PanelControlAdminController {
    def springSecurityService
    MessageSource  messageSource
    def index() {
        def userInstance = springSecurityService.currentUser
        [userInstance:userInstance]
    }

    def usuariosalumnos(){
        def returnMap = [:]
        def recordList = []
        def matriculas
        def totalRegistros
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        if (params.carrera_id && params.aniolectivo_id){
            matriculas = Matricula.createCriteria().list(pagingConfig){
                carrera{
                    eq("id",params.carrera_id)
                }
                anioLectivo{
                    eq("id",params.aniolectivo_id.toString().toInteger())
                }
                eq("estado",EstadoMatriculaEnum.C)
                alumno{
                    or{
                        ilike("apellido","%"+params.filtronombre+"%")
                        ilike("nombre","%"+params.filtronombre+"%")
                    }
                }
            }

            matriculas.each{
                recordList << [id:it.id,numerodocumento:it.alumno.numeroDocumento,nombrealumno:it.alumno.apellido+', '+it.alumno.nombre,email:it.alumno.email,tieneusuario:(it.alumno.user==null?"No":"Si")]
            }
            totalRegistros = Matricula.createCriteria().count(){
                carrera{
                    eq("id",params.carrera_id)
                }
                anioLectivo{
                    eq("id",params.aniolectivo_id.toString().toInteger())
                }
                eq("estado",EstadoMatriculaEnum.C)
                alumno{
                    or{
                        ilike("apellido","%"+params.filtronombre+"%")
                        ilike("nombre","%"+params.filtronombre+"%")
                    }
                }

            }
        }
        returnMap.rows = recordList
        returnMap.total = totalRegistros
        render returnMap as JSON
    }

    def usuariosdocentes(){
        def returnMap = [:]
        def recordList = []
        def totalRegistros
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        def docentes = Docente.createCriteria().list(pagingConfig){
            if(params.filtronombre){
                or{
                    ilike("apellido","%"+params.filtronombre+"%")
                    ilike("nombre","%"+params.filtronombre+"%")
                }
            }
        }
        
        totalRegistros = Docente.createCriteria().count(){
            if(params.filtronombre){
                or{
                    ilike("apellido","%"+params.filtronombre+"%")
                    ilike("nombre","%"+params.filtronombre+"%")
                }
            }
        }
        docentes.each{
            recordList << [id:it.id,numerodocumento: it.numeroDocumento,nombredocente:it.apellido+", "+it.nombre,email: it.email,tieneusuario: (it.user==null?"No":"Si")]
        }

        returnMap.rows = recordList
        returnMap.total = totalRegistros
        
        render returnMap as JSON
    }


    def usuarioalumnoform(long id){
        def returnMap = [:]
        def matriculaInstance = Matricula.get(id)
        if (matriculaInstance){
            returnMap.success = true
            returnMap.data = [:]
            returnMap.data.id = matriculaInstance.alumno.id
            returnMap.data.documentoalumno = matriculaInstance.alumno.numeroDocumento
            returnMap.data.apellidoalumno = matriculaInstance.alumno.apellido
            returnMap.data.nombrealumno = matriculaInstance.alumno.nombre
            returnMap.data.emailalumno = matriculaInstance.alumno.email
            returnMap.data.tieneusuarioalumno =(matriculaInstance.alumno.user == null? false:true)
        }else{
            returnMap.success = false
            returnMap.mensaje = "Error al recuperar datos"
        }
        
        render returnMap as JSON
    }

    def usuariodocenteform(long id){
        def returnMap = [:]
        def docenteInstance = Docente.get(id)
        if (docenteInstance){
            returnMap.success = true
            returnMap.data = [:]
            returnMap.data.id = docenteInstance.id
            returnMap.data.documentodocente = docenteInstance.numeroDocumento
            returnMap.data.apellidodocente = docenteInstance.apellido
            returnMap.data.nombredocente = docenteInstance.nombre
            returnMap.data.emaildocente = docenteInstance.email
            returnMap.data.tieneusuariodocente = (docenteInstance.user == null? false:true)
        }else{
            returnMap.success = false
            returnMap.mensaje = "Error al recuperar datos"
        }

        render returnMap as JSON
    }

    def enviarcorreousuariodocente(long id){
        def returnMap = [:]
        def errorList = []
        def docenteInstance = Docente.get(id)
        def usuarioInstance
        def rawPassword = generatePassword()
        if (docenteInstance){
            if (!docenteInstance.user){
                User.withTransaction{TransactionStatus status->
                    usuarioInstance = new User(username:docenteInstance.numeroDocumento,password: rawPassword,realName:docenteInstance.apellido+', '+docenteInstance.nombre,enabled: true,docente: docenteInstance)
                    if (!usuarioInstance.save(flush: true)){
                        docenteInstance.user = usuarioInstance
                        docenteInstance.save()
                        log.debug "Error al guardar usuarioInstance: "+usuarioInstance.errors.allErrors
                        status.setRollbackOnly()
                        returnMap.success = false
                        returnMap.mensaje = "Error al confirmar el correo"
                        usuarioInstance.errors.allErrors.each{
                            errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        }
                        returnMap.errors = errorList
                    }else{
                        def alumnoRole = Role.findByAuthority("ROLE_ALUMNO")
                        log.debug "VINCULANDO ROLE CON USUARIO"
                        UserRole.create(usuarioInstance,alumnoRole)
                    }
                }
            }else{
                docenteInstance.user.username = docenteInstance.numeroDocumento
                docenteInstance.user.password = rawPassword
                docenteInstance.save(flush: true)
            }
            String emailContent = """
                            Para acceder al panel de control de alumno sus credenciales son: <br>
                            Usuario: <h1>${docenteInstance.user.username} </h1> <br>
                            Contraseña: <h1> ${rawPassword} </h1>
                        """
            try{
                sendMail{
                    to docenteInstance.email.toString()
                    subject "Usuario Alumno - Colegio Cruz Roja"
                    html emailContent
                }
                returnMap.success = true
                returnMap.mensaje = "Correo enviado a la dirección: "+docenteInstance.email
            }catch(Exception e){
                log.debug e.message
                returnMap.success = false
                returnMap.mensaje = "Error al confirmar el correo"
                errorList << [msg: "Servicio de correo no disponible"]

            }
        }
        returnMap.errors = errorList
        render returnMap as JSON
    }
    
    def enviarcorreousuarioalumno(long id){
        def returnMap = [:]
        def errorList = []
        def alumnoInstance = Alumno.get(id)
        def usuarioInstance
        def rawPassword = generatePassword()
        if (alumnoInstance){
            if (!alumnoInstance.user){
                User.withTransaction{TransactionStatus status->
                    usuarioInstance = new User(username:alumnoInstance.numeroDocumento,password: rawPassword,realName:alumnoInstance.apellido+', '+alumnoInstance.nombre,enabled: true,alumno: alumnoInstance)
                    if (!usuarioInstance.save(flush: true)){
                        alumnoInstance.user = usuarioInstance
                        alumnoInstance.save()
                        log.debug "Error al guardar usuarioInstance: "+usuarioInstance.errors.allErrors
                        status.setRollbackOnly()
                        returnMap.success = false
                        returnMap.mensaje = "Error al confirmar el correo"
                        usuarioInstance.errors.allErrors.each{
                            errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        }
                        returnMap.errors = errorList
                        returnMap.success = false
                        log.debug "ERROR AL CONFIRMAR USUARIO ALUMNO: "+usuarioInstance.errors.allErrors
                        returnMap.errors = errorList
                        render returnMap as JSON
                        return
                    }else{
                        def alumnoRole = Role.findByAuthority("ROLE_ALUMNO")
                        log.debug "VINCULANDO ROLE CON USUARIO"
                        UserRole.create(usuarioInstance,alumnoRole)
                        alumnoInstance.user = usuarioInstance
                    }
                }
            }else{
                alumnoInstance.user.username = alumnoInstance.numeroDocumento
                alumnoInstance.user.password = rawPassword
                alumnoInstance.save(flush: true)
            }
            String emailContent = """
                            Para acceder al panel de control de alumno sus credenciales son:
                            Usuario: ${alumnoInstance.user.username}
                            Contraseña: ${rawPassword}
                        """
            try{
                sendMail{
                    to alumnoInstance.email.toString()
                    subject "Usuario Alumno - Colegio Cruz Roja"
                    html emailContent
                }
                returnMap.success = true
                returnMap.mensaje = "Correo enviado a la dirección: "+alumnoInstance.email
            }catch(Exception e){
                log.debug e.message
                returnMap.success = false
                returnMap.mensaje = "Error al confirmar el correo"
                errorList << [msg: "Servicio de correo no disponible"]

            }
        }
        log.debug "Returnado el  JSON: "+ returnMap
        returnMap.errors = errorList
        render returnMap as JSON
    }

    def changepassword(){
        def usuarioInstance = User.get(params.id)
        def returnMap=[:]
        def errorList = []
        returnMap.success = false
        returnMap.mensaje = "La contraseña no pudo cambiarse"
        if (usuarioInstance){
            if (!params.newpassword.equals(params.repeatnewpassword)){
                errorList  << [msg: "La nueva contraseña no coincide con su confirmación"]
            }else{
                if (!params.newpassword.matches(".*[a-zA-Z].*") || !params.newpassword.matches(".*[1-9!@#\$%^&*()-_=+].*")){
                    errorList << [msg: "La contraseña debe combinar letras con al menos un número o caracter especial  (!@#\$%^&*()-_=+)"]
                }else{
                    usuarioInstance.password = params.newpassword
                    if (usuarioInstance.save(flush: true)){
                        returnMap.success = true
                        returnMap.mensaje = "La contraseña se modificó correctamente"
                    }else{
                        usuarioInstance.errors.allErrors.each{
                            errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        }
                    }
                }
            }
        }else{
            errorList << [msg: "Usuario no encontrado"]
        }
        returnMap.errors = errorList
        render returnMap as JSON
    }

    private String generatePassword(){
            String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder builder = new StringBuilder();
            log.debug "BASE ALFANUMERICA"+ ALPHA_NUMERIC_STRING
            def count = 8
            while (count-- != 0) {
                int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
                builder.append(ALPHA_NUMERIC_STRING.charAt(character));
            }
            return builder.toString();
    }

}
