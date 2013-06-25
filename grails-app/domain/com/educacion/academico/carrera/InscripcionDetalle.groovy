package com.educacion.academico.carrera

import com.educacion.academico.materia.Materia
import com.educacion.enums.EstadoInscripcionDetalleEnum
import com.educacion.enums.TipoInscripcionDetalleEnum
import com.educacion.academico.materia.Nivel
import com.educacion.academico.Division

class InscripcionDetalle {
    int id
    Materia materia
    EstadoInscripcionDetalleEnum estado
    TipoInscripcionDetalleEnum tipoInscripcion
    Nivel nivel
    Division division
    Float notaFinal
    Inscripcion inscripcion

    static belongsTo = [inscripcion:Inscripcion]


    static constraints = {
    }

    static mapping = {
        table 'inscripciondetalle'
        version false
        notaFinal column:'notafinal'
        division column: 'division'

    }
}
