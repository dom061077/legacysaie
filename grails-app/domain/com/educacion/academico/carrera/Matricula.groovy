package com.educacion.academico.carrera

import com.educacion.enums.EstadoMatriculaEnum
import com.educacion.enums.SuplenteEnum
import com.educacion.alumno.Alumno

class Matricula {
    int id
    java.sql.Date fecha = new java.sql.Date((new Date()).getTime())
    EstadoMatriculaEnum estado
    String comprobante
    short ingresante
    SuplenteEnum suplente

    Carrera carrera
    Alumno alumno
    AnioLectivo anioLectivo


    static constraints = {
        comprobante nullable: true, blank: true
    }

    static mapping = {
        version false
        id column:'matricula',generator:'increment'
        carrera column:'carrera'
        alumno column : 'alumno'
        anioLectivo column: 'aniolectivo'
        

    }

}
