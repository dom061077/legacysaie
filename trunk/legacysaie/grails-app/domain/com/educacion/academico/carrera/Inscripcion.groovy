package com.educacion.academico.carrera

import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.enums.SuplenteEnum

class Inscripcion {
    int id
    Matricula matricula
    java.sql.Date fecha = new java.sql.Date((new Date()).getTime())
    EstadoInscripcionEnum estado
    SuplenteEnum suplente
    List getDetalle2(){
        ArrayList list = new ArrayList()
        int fil=0
        detalle.each{
            fil++
            if(fil>8)
                list.add(it)
        }
        return list
    }
    List getDetalle1(){
        ArrayList list = new ArrayList()
        int fil=0
        detalle.each{
            list.add(it)
            fil++
            if(fil>8)
                return list
            return list
        }
        return list

    }



    static transients = ['detalle1','detalle2']

    static hasMany = [detalle:InscripcionDetalle]

    static constraints = {
    }

    static mapping = {
        version false
        id column:'inscripcion',generator:'increment'
        matricula column: 'matricula'

    }

}
