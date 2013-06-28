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

class PanelControlController {
    def springSecurityService
    def index() {

        def userInstance = springSecurityService.currentUser
        [userInstance:userInstance]
    }

    
    private boolean validarCorrelativa(String materiaId,int alumnoId, int anioLectivoId,String carreraId,TipoInscripcionDetalleEnum tipoInsc ){
        log.info "obteniendo las correlativas de examen final"
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
}
