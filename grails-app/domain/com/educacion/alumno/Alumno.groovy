package com.educacion.alumno

import com.alumno.alumno.TipoDocumentoIdentidad
import com.educacion.enums.SexoEnum
//import com.educacion.academico.SituacionAcademica
import com.educacion.administrativo.SituacionAdministrativa
import com.educacion.academico.carrera.Matricula
import com.educacion.seguridad.User


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
    String registerconfirm
    boolean confirmado
    //falta mapear el campo sitacademica
    SituacionAdministrativa situacionAdministrativa
    byte[] imagen

    User user

    TipoDocumentoIdentidad tipoDocumento
    static hasMany = [matriculas:Matricula]
    static constraints = {
        numeroDocumento(blank: false,nullable: false)
        apellido(blank: false,nullable: false)
        nombre(blank: false,nullable: false)
        imagen(blank: true,nullable: true, maxSize:1024*300)


        tipoDocumento blank:true, nullable: true
        fechaNacimiento blank:true, nullable: true
        paisNacimiento blank:true, nullable: true
        provinciaNacimiento blank:true, nullable: true
        localidadNacimiento blank:true, nullable: true
        calleDomicilio blank:true, nullable: true
        numeroDomicilio blank:true, nullable: true
        barrioDomicilio blank:true, nullable: true
        paisDomicilio blank:true, nullable: true
        provinciaDomicilio blank:true, nullable: true
        localidadDomicilio blank:true, nullable: true
        telefonoParticular blank:true, nullable: true
        celularParticular blank:true, nullable: true
        email blank:true, nullable: true
        telefonoAlternativo blank:true, nullable: true
        establecimiento blank:true, nullable: true
        titulo blank:true, nullable: true
        anioEgreso blank:true, nullable: true
        //situacionAcademica blank:true, nullable: true
        //legajo(column:legajo)
        lugarLaboral blank:true, nullable: true
        telefonoLaboral blank:true, nullable: true
        calleLaboral blank:true, nullable: true
        numeroDomicilioLaboral blank:true, nullable: true
        barrioLaboral blank:true, nullable: true
        paisLaboral blank:true, nullable: true
        provinciaLaboral blank:true, nullable: true
        localidadLaboral blank:true, nullable: true
        apellidoNombreTutor blank:true, nullable: true
        profesion blank:true, nullable: true
        parentescoTutor blank:true, nullable: true
        telefonoTutor blank:true, nullable: true
        calleTutor blank:true, nullable: true
        numeroDomicilioTutor blank:true, nullable: true
        barrioTutor blank:true, nullable: true
        paisTutor blank:true, nullable: true
        provinciaTutor blank:true, nullable: true
        localidadTutor blank:true, nullable: true
        apellidoNombreGarante blank:true, nullable: true
        profesionGarante blank:true, nullable: true
        parentescoGarante blank:true, nullable: true
        telefonoGarante blank:true, nullable: true
        calleGarante blank:true, nullable: true
        numeroDomiciolioGarante blank:true, nullable: true
        barrioGarante blank:true, nullable: true
        paisGarante blank:true, nullable: true
        provincia blank:true, nullable: true
        localidadGarante blank:true, nullable: true
        //falta mapear el campo sitacademica
        situacionAdministrativa blank:true, nullable: true
        registerconfirm blank: true, nullable:  true
        anioEgreso blank: true, nullable: true
        
        user blank:true, nullable: true
        legajo blank:true, nullable: true
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
