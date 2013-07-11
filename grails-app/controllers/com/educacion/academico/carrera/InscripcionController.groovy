package com.educacion.academico.carrera

import grails.converters.JSON
import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.enums.EstadoInscripcionDetalleEnum
import com.educacion.enums.TipoInscripcionDetalleEnum
import org.springframework.context.i18n.LocaleContextHolder
import com.educacion.academico.materia.Materia
import org.springframework.context.MessageSource
import com.educacion.enums.SuplenteEnum

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
            order("fecha","desc")
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
        inscInstance.fecha = new java.sql.Date((new Date()).getTime())
        inscInstance.estado = EstadoInscripcionEnum.G
        inscInstance.suplente = SuplenteEnum.T
        def detalleInscJson = JSON.parse(params.insccursadomaterias)
        InscripcionDetalle inscDetInstance
        detalleInscJson.each{
            if (it.seleccionada){
                //EstadoInscripcionDetalleEnum estado
                //TipoInscripcionDetalleEnum tipoInscripcion
                inscDetInstance = new InscripcionDetalle()
                materiaInstance = Materia.load(it.id)
                inscInstance.addToDetalle(new InscripcionDetalle(materia: materiaInstance,estado: EstadoInscripcionDetalleEnum.I,tipoInscripcion:TipoInscripcionDetalleEnum.C,notaFinal:0))
                //inscInstance.addToDetalle(new Object())

            }
        }
        if (!inscInstance.save(flush: true)){
            success = false
            mensaje = 'Error en el registro de datos'
            inscInstance.errors.allErrors.each{
                errorList << errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
            }
        }else{
            log.debug "SE GUARDO CORRECTAMENTE....."
            mensaje = 'Los datos se guardaron correctamente'
        }
        def response = [:]
        response.success = success
        response.errors = errorList
        response.msg = mensaje
        render response as JSON
    }

    def saveinscripcionfin(){
        def inscInstance = new Inscripcion()
        log.debug "parametros: "+params

    }



}
