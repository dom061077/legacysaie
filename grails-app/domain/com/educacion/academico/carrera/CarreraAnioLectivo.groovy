package com.educacion.academico.carrera

class CarreraAnioLectivo implements Serializable{
    Carrera carrera
    AnioLectivo anioLectivo
    int cupo
    int cupoSuplente
    Double costoMatricula
    java.sql.Date fechaInicio
    java.sql.Date fechaFin

    static constraints = {

    }
    
    static mapping = {
        table 'carreraaniolectivo'
        version false
        id composite:['carrera','anioLectivo']
        cupoSuplente column:'cuposuplente'
        costoMatricula column:'costomatricula'
        fechaInicio column:'fechainicio'
        fechaFin column: 'fechafin'
        carrera column: 'carrera',type: 'string'
        anioLectivo column:  'aniolectivo'
    }
}
