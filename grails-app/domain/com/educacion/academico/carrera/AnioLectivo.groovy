package com.educacion.academico.carrera

class AnioLectivo {
    int ind
    String descripcion
    int anio
    int estado

    static hasMany = [carreras:Carrera]

    static belongsTo = [Carrera]

    static constraints = {
    }

    static mapping = {
        table 'anioslectivos'
        id columns:'aniolectivo'
    }
}
