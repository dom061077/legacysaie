package com.educacion.rendering

import com.educacion.location.Provincia
import grails.converters.JSON
import com.educacion.enums.SexoEnum

class EnumsRenderingController {

    def index() {render "index" }

    def sexo(){
        def returnMap = [:]
        def recordList = []
        def sexos = null
        /*if (params.pais_id){
            provincias = Provincia.createCriteria().list(sort: 'descripcion',order: 'asc') {
                pais{
                    eq('id',params.pais_id.toString().toInteger())
                }
            }
            provincias.each{
                recordList << [id:it.id, descripcion: it.descripcion]
            }
        }*/
        sexos=SexoEnum.list()
        sexos.each{
            recordList << [id:it.toString(),descripcion:it.name]
        }
        returnMap.rows = recordList

        render returnMap as JSON

    }

}
