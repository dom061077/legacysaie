package com.educacion.academico.carrera

import grails.converters.JSON

class InscripcionController {

    def index() { }
    
    def listinscdet(int inscripcionId){

        def returnMap = [:]
        def recordList = []

        def inscripciones = InscripcionDetalle.createCriteria().list{
             inscripcion{
                 eq("id",inscripcionId)
             }
        }
        inscripciones.each{
            recordList << [id:it.id,denominacion:it.materia.denominacion,nivel:it.materia.nivel.descripcion,estado:it.estado.name,notafinal:it.notaFinal]
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total =inscripciones.size()
        render returnMap as JSON
    }

    def listinscripciones(int alumnoId){
        def returnMap = [:]
        def recordList = []
        def inscripciones = Inscripcion.createCriteria().list(){
            matricula{
                alumno{
                    eq("id",alumnoId)
                }
            }
        }
        inscripciones.each{
            recordList << [id: it.id,carrera:it.matricula.carrera.denominacion,aniolectivo:it.matricula.anioLectivo.descripcion,fecha:it.fecha]
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total =inscripciones.size()
        render returnMap as JSON
    }

    def saveinscripcion(){
        def inscInstance = new Inscripcion()
        inscInstance

    }


}
