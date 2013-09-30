package com.educacion

import com.educacion.academico.examen.CargaExamen
import grails.converters.JSON
import com.educacion.academico.carrera.AnioLectivo
import com.educacion.academico.examen.Examen
import com.educacion.seguridad.User
import org.springframework.context.i18n.LocaleContextHolder

class PanelControlDocenteController {
    def springSecurityService
    def index() {

        Random randomLink = new Random()
        def userInstance = springSecurityService.currentUser
        def docenteInstance = userInstance.docente
        [randomlink: randomLink.nextInt(100000),docenteInstance : docenteInstance]
    }

    def fechasexamen(){
        def returnMap = [:]
        def recordList = [:]
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        def cargasexamen = CargaExamen.createCriteria().list(pagingConfig){
            docente{
                eq("id",params.id.toString().toInteger())
            }
        }
        def totalRegistros = CargaExamen.createCriteria().count(){
            docente{
                eq("id",params.id.toString().toInteger())
            }

        }
        returnMap.rows=recordList
        returnMap.success = true
        returnMap.total = 0
        render returnMap as JSON

    }

    def docentematerias(){
        def returnMap = [:]
        def recordList = [:]

        def materias = CargaExamen.createCriteria().list(){
            docente{
                eq("id",params.docente_id.toString().toInteger())
            }
            anioLectivo{
                eq("id",params.aniolectivo_id.toString().toInteger())
            }
        }
        materias.each {
            recordList << [id: it.id,denominacion:it.materia.denominacion]
            
        }
        returnMap.success = true
        returnMap.rows=recordList
        render returnMap as JSON
    }

    def aniolectivonotas(){

        def returnMap = [:]
        def recordList = []
        def anioslist = AnioLectivo.list()
        anioslist.each{
            recordList << [id:it.id,descripcion:it.descripcion]

        }
        returnMap.rows=recordList
        render returnMap as JSON
    }

    def cargaexamenfechaslist(){
        def returnMap = [:]
        def recordList = []
        log.debug "Parametros: $params"
        java.text.DateFormat df = new java.text.SimpleDateFormat("dd/MM/yyyy")
        java.util.Date fecha
        java.sql.Date fechasqldesde,fechasqlhasta

        

        def cargas = CargaExamen.createCriteria().list{
            docente{
                eq("id",params.docente_id.toString().toInteger())
            }
            /*anioLectivo{
                eq("id",params.aniolectivo_id.toString().toInteger())
            }*/
            if (params.fechadesde && params.fechahasta){
                fecha = df.parse(params.fechadesde)
                fechasqldesde = new java.sql.Date(fecha.getTime())
                fecha = df.parse(params.fechahasta)
                fechasqlhasta = new java.sql.Date(fecha.getTime())
                ge("fechaExamen",fechasqldesde)
                le("fechaExamen",fechasqlhasta)
            }

        }
        cargas.each{
            recordList << [id: it.id,fecha: formatDate(format: "dd/MM/yyyy",date: it.fechaExamen),carrera:it.carrera.denominacion,aniolectivo:it.anioLectivo.descripcion,materia:it.materia.denominacion, titulo: it.titulo, tipo:it.tipo.name, modalidad:it.modalidad.name]
        }

        returnMap.rows=recordList
        render returnMap as JSON
    }

    def cargaexamenfechas(){
        def returnMap = [:]
        def recordList = []
        def cargas = CargaExamen.createCriteria().list{
            docente{
                eq("id",params.docente_id.toString().toInteger())
            }
            anioLectivo{
                eq("id",params.aniolectivo_id.toString().toInteger())
            }
        }
        cargas.each{
            recordList << [id: it.id,descripcion: it.id+'-'+ formatDate(format: "dd/MM/yyyy",date: it.fechaExamen)+', '+it.tipo.name+', '+it.modalidad.name]
        }
        
        returnMap.rows=recordList
        render returnMap as JSON
    }

    def notasexamen(){
        def returnMap = [:]
        def recordList=[]
        
        def list = Examen.createCriteria().list {
            cargaExamen{
                eq("id",params.cargaexamen_id.toString().toLong())
            }
        }
        list?.each{
            recordList << [id: it.id,nombrealumno:it.inscripcionDetalle.inscripcion.matricula.alumno.apellido+', '+it.inscripcionDetalle.inscripcion.matricula.alumno.nombre,nota:it.nota]
        }
        returnMap.rows = recordList
        render returnMap as JSON
    }

    def savenota(){
        def returnMap = [:]
        def examenInstance = Examen.get(params.id)
        examenInstance.nota = params.nota.toString().toFloat()
        if(examenInstance.save(flush: true)){
            returnMap.success=true
        }else{
            returnMap.success=false
        }
        render returnMap as JSON
    }
    
    def reportealumnosexamenes(){
        log.debug "PARAMETRO CARGAEXAMEN: ${params.id}"
        def cargaExamenInstance = CargaExamen.get(params.id)
        def listExamenes = Examen.createCriteria().list {
            cargaExamen{
                eq("id",params.id.toString().toLong())
            }
            inscripcionDetalle{
                materia{
                    order("denominacion","desc")
                }
            }
        }
        listExamenes.each {
            log.debug it.inscripcionDetalle.inscripcion.matricula.alumno.apellido
        }
        String reportsDirPath = servletContext.getRealPath("/reports/");
        params.put("SUBREPORT_DIR", reportsDirPath+"/");
        params.put("_format","PDF")
        params.put("_file","listadofechaexamen")
        params.put("_name","listadofechaexamen")
        params.put("CARGAEXAMEN",cargaExamenInstance?.id)
        params.put("ANIOLECTIVO",cargaExamenInstance?.anioLectivo?.descripcion)
        params.put("CARRERA",cargaExamenInstance?.carrera?.denominacion)
        params.put("MATERIA",cargaExamenInstance?.materia?.denominacion)
        params.put("TIPO",cargaExamenInstance?.tipo?.name)
        params.put("MODALIDAD",cargaExamenInstance?.modalidad?.name)
        params.put("FECHAEXAMEN",new java.text.SimpleDateFormat("dd/MM/yyyy").format(cargaExamenInstance?.fechaExamen?.getTime()))
        chain(controller:'jasper',action:'index',model:[data:listExamenes],params:params)

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
