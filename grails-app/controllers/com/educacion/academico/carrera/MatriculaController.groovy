package com.educacion.academico.carrera

import grails.converters.JSON

class MatriculaController {

    def index() { }

    def listporalumnojson(int alumnoId){
        def returnMap = [:]
        def recordList = []

        def matriculas = Matricula.createCriteria().list(){
            alumno{
                eq("id",alumnoId)
            }
            carrera{
                order("denominacion","asc")
            }
        }
        matriculas.each {
            recordList << [id:it.carrera.id,denominacion:it.carrera.denominacion]
        }
        returnMap.rows = recordList
        log.debug returnMap
        render returnMap as JSON

    }
    
    def listaniolectivoporalumnojson(int alumnoId,String carreraId){
        def returnMap = [:]
        def recordList = []
        def matriculas = Matricula.createCriteria().list (){
            alumno{
                eq("id",alumnoId)
            }
            carrera{
                eq("id",carreraId)
            }
            anioLectivo{
                order("anio","asc")
            }
        }
        matriculas.each{
            recordList << [id: it.anioLectivo.id,descripcion:it.anioLectivo.descripcion]
        }
        returnMap.rows = recordList
        render returnMap as JSON
    }

}
