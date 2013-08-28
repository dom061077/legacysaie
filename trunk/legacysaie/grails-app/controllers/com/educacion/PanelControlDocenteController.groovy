package com.educacion

import com.educacion.academico.examen.CargaExamen
import grails.converters.JSON
import com.educacion.academico.carrera.AnioLectivo

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

    def carganotaslist(){
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
            recordList << [id: it.id,descripcion: it.id+" - "+formatDate(format: "dd/MM/yyyy",date: it.fechaAlta)]
        }
        
        returnMap.rows=recordList
        render returnMap as JSON
    }

    def cargaexamenlist(){
        def returnMap = [:]

        returnMap.rows = []
        render returnMap as JSON
    }

}
