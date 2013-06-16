package com.educacion.academico.carrera

import com.educacion.academico.materia.Nivel

class Carrera {
    String id
    String denominacion
    String duracion
    int modalidad
    String titulo
    String validez
    String perfilEgresado
    String ocupacional
    short estado

    static hasMany = [anioslectivos:AnioLectivo,niveles:Nivel]



    static constraints = {
    }

    static mapping = {
        version false
        id column:'carrera', generator:'assigned',type:'string'
        perfilEgresado column:'perfilegresado'
        anioslectivos column:'aniolectivo', joinTable:'carreraaniolectivo'
        niveles column:'nivel',joinTable:'carreraniveles',type:'integer'


    }
}
