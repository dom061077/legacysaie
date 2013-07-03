package com.educacion.academico.carrera

import grails.converters.JSON
import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.enums.EstadoInscripcionDetalleEnum
import com.educacion.enums.TipoInscripcionDetalleEnum
import org.springframework.context.i18n.LocaleContextHolder
import com.educacion.academico.materia.Materia
import org.springframework.context.MessageSource

class InscripcionController {
    MessageSource  messageSource
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

    def saveinscripcioncur(){
        log.debug "Parametros: $params"
        def inscInstance = new Inscripcion()
        def matriculaInstance = Matricula.load(params.matriculacursado.toString().toInteger())
        def materiaInstance
        def success = true
        def mensaje = ''
        def errorList = []
        inscInstance.matricula = matriculaInstance
        matriculaInstance.fecha = new java.sql.Date((new Date()).getTime())
        inscInstance.estado = EstadoInscripcionEnum.G
        def detalleInscJson = JSON.parse(params.insccursadomaterias)
        detalleInscJson.each{
            if (it.seleccionada){
                //EstadoInscripcionDetalleEnum estado
                //TipoInscripcionDetalleEnum tipoInscripcion
                materiaInstance = Materia.load(it.id.toString().toInteger())
                inscInstance.addToDetalle(new InscripcionDetalle(materia: materiaInstance,estado: EstadoInscripcionDetalleEnum.I,tipoInscripcion:TipoInscripcionDetalleEnum.C,notaFinal:0))
            }
        }
        if (!inscInstance.save(flush: true)){
            success = false
            mensaje = 'Error en el registro de datos'
            inscInstance.errors.allErrors.each{
                errorList << errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
            }
        }else{
            mensaje = 'Los datos se guardaron correctamente'
        }
        render(contentType: 'text/json'){
            respuesta success: success, msg :mensaje, errors: errorList
        }
    }

    def saveinscripcionfin(){
        def inscInstance = new Inscripcion()
        log.debug "parametros: "+params

    }



}
