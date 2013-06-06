package com.educacion.academico

class SituacionAcademica {
    int id
    String descripcion

    static constraints = {
    }

    static mapping = {
        table 'situacionacademica'
        version false
        id column : 'situacionacademica'
        descripcion(column:'descripcion')
    }
}
