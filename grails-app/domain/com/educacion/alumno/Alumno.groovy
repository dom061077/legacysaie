package com.educacion.alumno

import com.alumno.alumno.TipoDocumentoIdentidad

class Alumno {
    int id
    String numeroDocumento
    String apellido
    String nombre

    TipoDocumentoIdentidad tipoDocumento

    static constraints = {
    }

    static mapping = {
        table 'alumnos'
        version false

        id column:'alumno',generator:'increment'
        numeroDocumento column:'numerodocumento'
        apellido column: 'apellido'
        nombre column: 'nombre'
        tipoDocumento column: 'tipodocumento'



    }
}
