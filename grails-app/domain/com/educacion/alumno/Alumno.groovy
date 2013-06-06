package com.educacion.alumno

import com.alumno.alumno.TipoDocumentoIdentidad
import com.educacion.enums.SexoEnum
//import com.educacion.academico.SituacionAcademica
import com.educacion.administrativo.SituacionAdministrativa


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
    String barrioDomicilio   //ultimo field
    String paisDomicilio
    String provinciaDomicilio
    String localidadDomicilio
    String telefonoParticular
    String celularParticular
    String email
    String telefonoAlternativo
    String establecimiento
    String titulo
    Integer anioEgreso
    //SituacionAcademica situacionAcademica
    String legajo
    String lugarLaboral
    String telefonoLaboral
    String calleLaboral
    String numeroDomicilioLaboral
    String barrioLaboral
    String paisLaboral
    String provinciaLaboral
    String localidadLaboral
    String apellidoNombreTutor
    String profesion
    String parentescoTutor
    String telefonoTutor
    String calleTutor
    String numeroDomicilioTutor
    String barrioTutor
    String paisTutor
    String provinciaTutor
    String localidadTutor
    String apellidoNombreGarante
    String profesionGarante
    String parentescoGarante
    String telefonoGarante
    String calleGarante
    String numeroDomiciolioGarante
    String barrioGarante
    String paisGarante
    String provincia
    String localidadGarante
    //falta mapear el campo sitacademica
    SituacionAdministrativa situacionAdministrativa
    byte[] imagen






    TipoDocumentoIdentidad tipoDocumento

    static constraints = {
        numeroDocumento(blank: false,nullable: false)
        apellido(blank: false,nullable: false)
        nombre(blank: false,nullable: false)
        imagen(blank: true,nullable: true, maxSize:1024*30)

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
        barrioDomicilio(column:  'barriodomicilio')
        paisDomicilio(column: 'paisdomicilio')
        provinciaDomicilio(column: 'provinciadomicilio')
        localidadDomicilio(column: 'localidaddomicilio')
        telefonoParticular(column: 'telefonoparticular')
        celularParticular(column: 'celularparticular')
        email(column: 'email')
        telefonoAlternativo(column: 'telefonoalternativo')
        establecimiento(column: 'establecimiento')
        titulo(column: 'titulo')
        anioEgreso(column: 'anioegreso')
        situacionAcademica(column: 'situacionacademica')
        //legajo(column:legajo)
        lugarLaboral(column: 'lugarlaboral')
        telefonoLaboral(column: 'telefonolaboral')
        calleLaboral(column: 'callelaboral')
        numeroDomicilioLaboral(column: 'numerolaboral')
        barrioLaboral(column: 'barriolaboral')
        paisLaboral(column:'paislaboral')
        provinciaLaboral(column: 'provincialaboral')
        localidadLaboral(column: 'localidadlaboral')
        apellidoNombreTutor(column: 'apenomtutor')
        profesion(column: 'profesion')
        parentescoTutor(column: 'parentescotutor')
        telefonoTutor(column: 'telefonotutor')
        calleTutor(column: 'calletutor')
        numeroDomicilioTutor(column: 'numerotutor')
        barrioTutor(column: 'barriotutor')
        paisTutor(column: 'paistutor')
        provinciaTutor(column:  'provinciatutor')
        localidadTutor(column: 'localidadtutor')
        apellidoNombreGarante(column: 'apenomgarante')
        profesionGarante(column: 'profesiongarante')
        parentescoGarante(column: 'parentescogarante')
        telefonoGarante(column: 'telefonogarante')
        calleGarante(column:'callegarante')
        numeroDomiciolioGarante(column: 'numerogarante')
        barrioGarante(column: 'barriogarante')
        paisGarante(column: 'paisgarante')
        provincia(column: 'provincia')
        localidadGarante(column: 'localidadgarante')
        //falta mapear el campo sitacademica
        situacionAdministrativa (column: 'sitadministrativa')



    }
}
