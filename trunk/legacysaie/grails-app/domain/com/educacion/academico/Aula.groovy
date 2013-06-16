package com.educacion.academico

class Aula {
    int id
    int cupo
    String estado
    String localizacion
    String nombre


    static constraints = {
    }

    static mapping = {
        version false
        id column : 'aula'

    }
}
