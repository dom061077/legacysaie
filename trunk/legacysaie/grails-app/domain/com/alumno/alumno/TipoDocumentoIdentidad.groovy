package com.alumno.alumno

class TipoDocumentoIdentidad {
    int id
    String descripcion
    static constraints = {
    }

    static mapping = {
        table 'tiposdocumentoidentidad'
        version false
        id column : 'tipodocumento',generator: 'increment'
        descripcion column: 'descripcion'
    }
}
