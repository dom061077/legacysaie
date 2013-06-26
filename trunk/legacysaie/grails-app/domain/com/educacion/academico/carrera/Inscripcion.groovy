package com.educacion.academico.carrera

import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.enums.SuplenteEnum

class Inscripcion {
    int id
    Matricula matricula
    java.sql.Date fecha
    EstadoInscripcionEnum estado
    SuplenteEnum suplente

    static hasMany = [detalle:InscripcionDetalle]

    static constraints = {
    }

    static mapping = {
        version false
        id column:'inscripcion'
        matricula column: 'matricula'

    }

}
