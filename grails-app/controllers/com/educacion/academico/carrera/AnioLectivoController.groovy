package com.educacion.academico.carrera

import grails.converters.JSON

class AnioLectivoController {

    def index() { }
    
    def listjson(){
        def returnMap = [:]
        def recordList = []
        
        def anios = AnioLectivo.list(sort: 'anio',order:'desc')
        anios.each {
            recordList << [id:it.id,descripcion:it.descripcion]
        }
        returnMap.rows = recordList
        log.debug returnMap
        render returnMap as JSON
    }
}
