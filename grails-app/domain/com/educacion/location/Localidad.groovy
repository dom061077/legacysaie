package com.educacion.location

class Localidad {
    int id
    String descripcion
    Provincia provincia
    int codigoPostal

    static constraints = {
    }

    static mapping = {
        table 'localidades'
        version false
        provincia(column:'id_provincia')
        codigoPostal(column: 'codigo_postal')
    }
}
