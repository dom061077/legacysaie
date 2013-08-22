package com.educacion.academico.examen

import com.educacion.academico.carrera.Carrera
import com.educacion.academico.materia.Nivel
import com.educacion.academico.carrera.AnioLectivo
import com.educacion.academico.materia.Materia
import com.educacion.academico.Docente
import com.educacion.enums.TipoCargaExamen
import com.educacion.enums.ModalidadCargaExamen

class CargaExamen {
    java.sql.Date fechaAlta
    java.sql.Date fechaExamen
    String titulo
    boolean promediable

    Carrera carrera
    Nivel nivel
    AnioLectivo anioLectivo
    Materia materia
    Docente docente
    TipoCargaExamen tipo
    ModalidadCargaExamen modalidad

    static hasMany = [detalle:Examen]

    static constraints = {

    }
    
    static mapping = {
        table 'cargaexamen'
        version false
        id column:'cargaexamen', generator: 'increment'
        fechaAlta column: 'fechaalta'
        fechaExamen column: 'fechaexamen'
        carrera column: 'carrera'
        nivel column: 'nivel'
        anioLectivo column: 'aniolectivo'
        materia column: 'materia'
        docente column: 'docente'
        tipo column: 'tipo'
        modalidad column: 'modalidad'
    }


}
