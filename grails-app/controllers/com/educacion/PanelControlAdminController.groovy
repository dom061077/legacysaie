package com.educacion

import com.educacion.academico.carrera.Matricula
import com.educacion.enums.EstadoMatriculaEnum
import grails.converters.JSON
import com.educacion.academico.Docente
import com.educacion.seguridad.User
import com.educacion.alumno.Alumno
import org.springframework.transaction.TransactionStatus
import org.springframework.context.i18n.LocaleContextHolder

class PanelControlAdminController {
    def springSecurityService
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
                recordList << [id:it.id,numerodocumento:it.alumno.numeroDocumento,nombrealumno:it.alumno.apellido+', '+it.alumno.nombre,email:it.alumno.email,tieneusuario:(it.alumno.user==null?false:true)]
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
            recordList << [id:it.id,numerodocumento: it.numeroDocumento,nombredocente:it.apellido+", "+it.nombre,email: it.email,tieneusuario: (it.user==null?false:true)]
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
    
    def enviarcorreousuario(long id){
        def returnMap = [:]
        def errorList = []
        def alumnoInstance = Alumno.get(id)
        def usuarioInstance
        if (alumnoInstance){
            usuarioInstance = new User(username:alumnoInstance.numeroDocumento,realName:alumnoInstance.apellido+', '+alumnoInstance.nombre,enabled: true,alumno: alumnoInstance)
            if (!alumnoInstance.user){
                    if (!usuarioInstance.save(flush:true)){
                        status.setRollbackOnly()
                        returnMap.success = false
                        returnMap.mensaje = "Error al confirmar el correo"
                        usuarioInstance.errors.allErrors.each{
                            errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        }
                        returnMap.errors = errorList
                    }else{
                        
                    }
            }
            String emailContent = """
                        Para acceder al panel de control de alumno sus credenciales son:
                        Usuario: ${usuarioInstance.username}
                        Contraseña: ${usuarioInstance.password}
                    """
            try{
                sendMail{
                    to alumnoInstance.email.toString()
                    subject "Usuario Colegio Cruz Roja"
                    html emailContent
                }
                returnMap.success = true
                returnMap.mensaje = "Correo enviado a la dirección: "+alumnoInstance.email
            }catch(Exception e){
                returnMap.success = false
                returnMap.mensaje = "Error al confirmar el correo"
                errorList << [msg: "Servicio de correo no disponible"]

            }
        }

        render returnMap as JSON
    }

}
