package com.educacion.academico

import com.educacion.academico.materia.Materia
import com.educacion.enums.TipoInscripcionDetalleEnum
import com.educacion.academico.materia.correlativa.MateriaAprobadaCursar
import com.educacion.academico.materia.correlativa.MateriaRegularCursar
import com.educacion.academico.carrera.InscripcionDetalle
import com.educacion.enums.EstadoInscripcionDetalleEnum
import com.educacion.academico.materia.correlativa.MateriaRegularRendir
import com.educacion.academico.materia.correlativa.MateriaAprobadaRendir
import com.educacion.academico.carrera.Carrera
import grails.converters.JSON
import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.academico.examen.Examen
import com.educacion.enums.EstadoExamen
import com.educacion.seguridad.User
import org.springframework.context.i18n.LocaleContextHolder

class PanelControlController {
    def springSecurityService
    def index() {
        Random randomLink = new Random()
        def userInstance = springSecurityService.currentUser
        [userInstance:userInstance,randomlink: randomLink.nextInt(100000)]
    }

    
    private boolean validarCorrelativa(String materiaId,int alumnoId, int anioLectivoId,String carreraId,TipoInscripcionDetalleEnum tipoInsc ){
        boolean flagvalida = true
        def listMateriasCorre
        def inscsDetalle


        if(tipoInsc == TipoInscripcionDetalleEnum.C ){
            listMateriasCorre = MateriaAprobadaCursar.createCriteria().list{
                eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.R)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }
            listMateriasCorre = MateriaRegularCursar.createCriteria().list{
                eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.A)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }

            inscsDetalle = InscripcionDetalle.createCriteria().list(){
                inscripcion{
                    ne("estado",EstadoInscripcionEnum.N)
                    matricula{
                        alumno{
                            eq("id",alumnoId)
                        }
                        anioLectivo{
                            eq("id",anioLectivoId)
                        }
                        carrera{
                            eq("id",carreraId)
                        }
                    }
                }
                materia{
                    eq("id",materiaId)
                }
                or{
                    eq("estado",EstadoInscripcionDetalleEnum.I)
                    eq("estado",EstadoInscripcionDetalleEnum.R)
                }
                eq("tipoInscripcion",TipoInscripcionDetalleEnum.C)
            }
            if (inscsDetalle.size()>0)
               flagvalida = false

        }
        
        if (tipoInsc == TipoInscripcionDetalleEnum.L || tipoInsc == TipoInscripcionDetalleEnum.R){
            listMateriasCorre = MateriaAprobadaRendir.createCriteria().list{
                eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.R)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }
            listMateriasCorre = MateriaRegularRendir.createCriteria().list{
               eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.A)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }
            inscsDetalle = InscripcionDetalle.createCriteria().list(){
                inscripcion{
                    ne("estado",EstadoInscripcionEnum.N)
                    matricula{
                        alumno{
                            eq("id",alumnoId)
                        }
                        anioLectivo{
                            eq("id",anioLectivoId)
                        }
                        carrera{
                            eq("id",carreraId)
                        }
                    }
                }
                materia{
                    eq("id",materiaId)
                }
                or{
                    eq("estado",EstadoInscripcionDetalleEnum.I)
                    eq("estado",EstadoInscripcionDetalleEnum.A)
                }
            }
            if (inscsDetalle.size()>0)
                    flagvalida=false

            inscsDetalle = InscripcionDetalle.createCriteria().list {
                inscripcion{
                    ne("estado",EstadoInscripcionEnum.N)
                    matricula{
                        alumno{
                            eq("id",alumnoId)
                        }
                        anioLectivo{
                            eq("id",anioLectivoId)
                        }
                        carrera{
                            eq("id",carreraId)
                        }
                    }
                }
                materia{
                    eq("id",materiaId)
                }
                eq("estado",EstadoInscripcionDetalleEnum.R)
            }
            if(inscsDetalle.size()==0){
                flagvalida = false
            }
        }



        return flagvalida
    }

    def listcorrelcursar(){
        def returnMap = [:]
        def recordList = []

        def materias = Materia.createCriteria().list {
            carrera{
                eq("id",params.carreraId)
            }
            order("denominacion","asc")
        }
        boolean flagValida
        materias.each {
            flagValida=false
            flagValida = validarCorrelativa(it.id,params.alumnoId.toString().toInteger().intValue(),params.anioLectivoId.toString().toInteger().intValue(),params.carreraId,TipoInscripcionDetalleEnum.C)
            if(flagValida){
                recordList << [id:it.id, denominacion: it.denominacion,seleccionda:false]
            }
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total = recordList.size()
        render returnMap as JSON
    }

    def listcorrelrendir(){
        def returnMap = [:]
        def recordList = []

        def materias = Materia.createCriteria().list {
            carrera{
                eq("id",params.carreraId)
            }
            order("denominacion","asc")
        }
        boolean flagValida
        materias.each {
            flagValida=false
            flagValida = validarCorrelativa(it.id,params.alumnoId.toString().toInteger().intValue(),params.anioLectivoId.toString().toInteger().intValue(),params.carreraId,TipoInscripcionDetalleEnum.R)
            if(flagValida){
                recordList << [id:it.id,nivel:it.nivel.descripcion, denominacion: it.denominacion,seleccionda:false]
            }
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total = recordList.size()
        render returnMap as JSON
    }

    def listmateriasaprobadas(/*def carreraId,def alumnoId,def materiaDeno,int limit,int start*/){
       def returnMap = [:]
       def recordList = []
       def pagingConfig = [max: params.limit as Integer ?:10 , offset: params.start as Integer ?:0]


       def materiasAprobadas = InscripcionDetalle.createCriteria().list(pagingConfig){
            inscripcion{
                matricula{
                    alumno{
                        eq("id",params.alumnoId.toString().toInteger())
                    }
                    carrera{
                        eq("id",params.carreraId)
                    }
                }
            }
            if(params.materiaDeno){
               materia{
                   ilike("denominacion","%"+params.materiaDeno+"%")
               }
            }

            eq("estado",EstadoInscripcionDetalleEnum.A)
       }

       def totalRegistros = InscripcionDetalle.createCriteria().count{
           inscripcion{
               matricula{
                   alumno{
                       eq("id",params.alumnoId.toString().toInteger())
                   }
                   carrera{
                       eq("id",params.carreraId)
                   }
               }
           }
           eq("estado",EstadoInscripcionDetalleEnum.A)
           if(params.materiaDeno){
               materia{
                   ilike("denominacion","%"+params.materiaDeno+"%")
               }
           }

       }

       materiasAprobadas?.each {
           recordList << [id:it.id,carrera:it.inscripcion.matricula.carrera.denominacion,nivel: it.materia.nivel.descripcion,materia:it.materia.denominacion,notafinal:it.notaFinal]
       }
       returnMap.rows=recordList
       returnMap.success = true
       returnMap.total = totalRegistros
       render returnMap as JSON
    }

    def listmateriasregulares() {
        def returnMap = [:]
        def recordList = []
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        
        def materiasRegulares = InscripcionDetalle.createCriteria().list(pagingConfig){
            inscripcion{
                matricula{
                    alumno{
                        eq("id",params.alumnoId.toString().toInteger())
                    }
                    carrera{
                        eq("id",params.carreraId)
                    }
                }
            }
            if(params.materiaDeno){
                materia{
                    ilike("denominacion","%"+params.materiaDeno+"%")
                }
            }

            eq("estado",EstadoInscripcionDetalleEnum.R)
        }

        def totalRegistros = InscripcionDetalle.createCriteria().count(){
            inscripcion{
                matricula{
                    alumno{
                        eq("id",params.alumnoId.toString().toInteger())
                    }
                    carrera{
                        eq("id",params.carreraId)
                    }
                }
            }
            if(params.materiaDeno){
                materia{
                    ilike("denominacion","%"+params.materiaDeno+"%")
                }
            }

            eq("estado",EstadoInscripcionDetalleEnum.R)
        }
        materiasRegulares.each{
            recordList << [id:it.id,carrera:it.inscripcion.matricula.carrera.denominacion,nivel: it.materia.nivel.descripcion,materia: it.materia.denominacion]
        }
        returnMap.rows=recordList
        returnMap.success = true
        returnMap.total = totalRegistros
        render returnMap as JSON
    }

    def fechasexamenes(){
        def returnMap = [:]
        def recordList = []
        def listExamenes
        def alumnoInstance = springSecurityService.currentUser?.alumno
        if (alumnoInstance){
            listExamenes = Examen.createCriteria().list{
                cargaExamen{
                    le("fechaExamen",new java.sql.Date((new Date()).getTime()))
                }
                inscripcionDetalle{
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoInstance.id)
                            }
                        }
                    }
                }
                eq("estado",EstadoExamen.I)
            }
            listExamenes.each{
                recordList << [id: it.id,materia: it.inscripcionDetalle.materia.denominacion,docente:it.cargaExamen.docente.apellido+', '+it.cargaExamen.docente.nombre,fechaexamen:it.cargaExamen.fechaExamen,tipo:it.cargaExamen.tipo.name,modalidad:it.cargaExamen.modalidad.name]

            }
        }
        returnMap.rows = recordList
        returnMap.total = listExamenes.size()
        render returnMap as JSON
    }

    def notasexamenes(){
        def returnMap=[:]
        def recordList=[]
        def alumnoInstance = springSecurityService.currentUser?.alumno
        def listExamenes
        def totalRegistros
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        if (alumnoInstance){
            listExamenes = Examen.createCriteria().list(pagingConfig){
                cargaExamen{
                    le("fechaExamen",new java.sql.Date((new Date()).getTime()))
                }
                inscripcionDetalle{
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoInstance.id)
                            }
                        }
                    }
                }
                ne("estado",EstadoExamen.I)
                cargaExamen{
                        order("fechaExamen","desc")
                }


            }
            totalRegistros = Examen.createCriteria().count(){
                cargaExamen{
                    le("fechaExamen",new java.sql.Date((new Date()).getTime()))
                }
                inscripcionDetalle{
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoInstance.id)
                            }
                        }
                    }
                }
                ne("estado",EstadoExamen.I)
            }
            listExamenes.each{
                recordList << [id: it.id,materia: it.inscripcionDetalle.materia.denominacion,docente:it.cargaExamen.docente.apellido+', '+it.cargaExamen.docente.nombre,fechaexamen:it.cargaExamen.fechaExamen,tipo:it.cargaExamen.tipo.name,modalidad:it.cargaExamen.modalidad.name,nota:it.nota]

            }

        }
        returnMap.rows = recordList
        returnMap.total = totalRegistros
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
