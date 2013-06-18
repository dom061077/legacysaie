package com.educacion.academico.carrera

import com.educacion.enums.EstadoMatriculaEnum
import com.educacion.enums.SuplenteEnum
import com.educacion.alumno.Alumno

class Matricula {
    int id
    java.sql.Date fecha
    EstadoMatriculaEnum estado
    String comprobante
    short ingresante
    SuplenteEnum suplente

    Carrera carrera
    Alumno alumno
    AnioLectivo anioLectivo


    static constraints = {
    }

    static mapping = {
        version false
        id column:'matricula'
        carrera column:'carrera'
        alumno column : 'alumno'
        anioLectivo column: 'aniolectivo'

    }

}
