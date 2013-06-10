package com.educacion.location

class Provincia {
    int id
    String descripcion
    Pais pais
    static constraints = {
    }

    static mapping = {
        table 'provincias'
        version false
        pais (column: 'id_pais')
    }
}
