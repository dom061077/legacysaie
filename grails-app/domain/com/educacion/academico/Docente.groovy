package com.educacion.academico

import com.educacion.enums.SexoEnum
import com.alumno.alumno.TipoDocumentoIdentidad
import com.educacion.seguridad.User

class Docente {
    int id
    String apellido
    String nombre
    String pais
    String provincia
    String localidad
    String barrio
    String calle
    String numeroDomicilio
    String codigoPostal
    java.sql.Date fechaNacimiento
    SexoEnum sexo
    String email
    TipoDocumentoIdentidad tipoDocumentoIdentidad
    String numeroDocumento
    String telefonoCelular
    String telefonoMensaje
    String telefonoParticular
    
    User user 

    static constraints = {
        user (blank:true,nullable: true)
    }

    static mapping ={
        table 'docentes'
        version false
        id column:'docente'
        numeroDomicilio column:'numerodomicilio'
        codigoPostal column: 'codigoPostal'
        fechaNacimiento column : 'fechanacimiento'
        numeroDocumento column: 'numerodocumento'
        telefonoCelular column: 'telefonocelular'
        telefonoParticular column: 'telefonoparticular'
    }


}
