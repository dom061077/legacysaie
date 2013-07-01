package com.educacion.academico.carrera

class InscripcionController {

    def index() { }
    
    def listmisinscdet(int inscripcionId){

        def returnMap = [:]
        def recordList = []

        def inscripciones = InscripcionDetalle.createCriteria().list{
             inscripcion{
                 eq("id",inscripcionId)
             }
        }
        inscripciones.each{
            recordList << [id:it.id,denominacion:it.materia.denominacion,nivel:it.materia.nivel.descripcion,estado:it.estado,notafinal:it.notaFinal]
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total =inscripciones.size()
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
        inscripciones.each

        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total =inscripciones.size()


    }
}
