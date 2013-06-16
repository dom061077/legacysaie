package com.educacion.academico.materia

import com.educacion.academico.carrera.Carrera

class Nivel {
    int id
    String descripcion
    int introductorio
    int anio

    static hasMany = [carreras:Carrera]

    static belongsTo = [Carrera]

    static constraints = {
    }

    static mapping = {
        table 'niveles'
        version false
        id column : 'nivel'

    }
}
