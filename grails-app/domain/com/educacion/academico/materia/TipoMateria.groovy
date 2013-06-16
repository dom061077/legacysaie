package com.educacion.academico.materia

class TipoMateria {
    String id
    String descripcion

    static constraints = {
    }

    static mapping = {
        table 'tipomateria'
        version: false
        id column:'tipomateria', generator: 'assigned', type:'string'

    }
}
