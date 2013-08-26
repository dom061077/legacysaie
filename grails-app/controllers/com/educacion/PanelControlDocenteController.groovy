package com.educacion

import com.educacion.academico.examen.CargaExamen
import grails.converters.JSON

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


}
