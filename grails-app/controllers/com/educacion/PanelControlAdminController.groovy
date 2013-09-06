package com.educacion

import com.educacion.academico.carrera.Matricula
import com.educacion.enums.EstadoMatriculaEnum
import grails.converters.JSON

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
            }
        }
        returnMap.rows = recordList
        returnMap.total = totalRegistros
        render returnMap as JSON
    }
}
