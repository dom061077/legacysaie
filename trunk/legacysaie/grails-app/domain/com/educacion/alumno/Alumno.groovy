package com.educacion.alumno

import com.alumno.alumno.TipoDocumentoIdentidad
import com.educacion.enums.SexoEnum


class Alumno {
    int id
    String numeroDocumento
    String apellido
    String nombre
    SexoEnum sexo
    java.sql.Date fechaNacimiento
    String paisNacimiento
    String provinciaNacimiento
    String localidadNacimiento
    String calleDomicilio
    String numeroDomicilio
    String barrioDomicilio



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
        fechaNacimiento column:  'fechanacimiento'
        paisNacimiento (column: 'paisnacimiento')
        provinciaNacimiento(column: 'provincianacimiento')
        localidadNacimiento(column:'localidadnacimiento')
        calleDomicilio(column: 'calledomicilio')
        numeroDomicilio(column: 'numerodomicilio')
        barrioDomicilio(column:  'barriodomiciolio')



    }
}
