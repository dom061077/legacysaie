package com.educacion.location

import grails.converters.JSON

class LocationController {

    def paisesjson(){
        def returnMap = [:]
        def recordList = []

        def paises = Pais.createCriteria().list(sort: 'descripcion',order:'asc'){}
        paises.each {
            recordList << [id: it.id, descripcion: it.descripcion]
        }
        
        returnMap.rows = recordList
        
        render returnMap as JSON
    }

    def provinciasjson(){
        def returnMap = [:]
        def recordList = []
        //returnMap.success = true
        def provincias = null
        if (params.pais_id){
            provincias = Provincia.createCriteria().list(sort: 'descripcion',order: 'asc') {
                    pais{
                        eq('id',params.pais_id.toString().toInteger())
                    }
            }
            provincias.each{
                recordList << [id:it.id, descripcion: it.descripcion]
            }
        }
        returnMap.rows = recordList

        render returnMap as JSON
    }
    
    def localidadesjson(){
        def returnMap = [:]
        def recordList = []
        def localidades = null
        if(params.provincia_id){
            localidades = Localidad.createCriteria().list(sort: 'descripcion',order: 'asc'){

                    provincia{
                        eq('id',params.provincia_id.toString().toInteger())
                    }
            }
        }
        localidades.each {
            recordList << [id: it.id,descripcion: it.descripcion+' ( COD.POSTAL: '+it.codigoPostal+')']
        }
        returnMap.rows = recordList
        render returnMap as JSON
    }
}
