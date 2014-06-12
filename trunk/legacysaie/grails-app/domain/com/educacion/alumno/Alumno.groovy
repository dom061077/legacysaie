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
    //boolean situacionAcademica
    SituacionAdministrativa situacionAdministrativa
    byte[] imagen

    User user

    TipoDocumentoIdentidad tipoDocumento
    static hasMany = [matriculas:Matricula]
    static constraints = {
        numeroDocumento(blank: false,nullable: false,maxSize: 8, minSize: 8)
        apellido(blank: false,nullable: false,maxSize: 50)
        nombre(blank: false,nullable: false, maxSize: 50)
        imagen(blank: true,nullable: true, maxSize:1024*300)


        tipoDocumento blank:true, nullable: true
        fechaNacimiento blank:true, nullable: true
        paisNacimiento blank:true, nullable: true, maxSize: 40
        provinciaNacimiento blank:true, nullable: true, maxSize: 40
        localidadNacimiento blank:true, nullable: true, maxSize: 40
        calleDomicilio blank:true, nullable: true, maxSize: 60
        numeroDomicilio blank:true, nullable: true, maxSize: 10
        barrioDomicilio blank:true, nullable: true, maxSize: 60
        paisDomicilio blank:true, nullable: true, maxSize: 40
        provinciaDomicilio blank:true, nullable: true, maxSize: 40
        localidadDomicilio blank:true, nullable: true, maxSize: 40
        telefonoParticular blank:true, nullable: true, maxSize: 25
        celularParticular blank:true, nullable: true, maxSize: 25
        email blank:true, nullable: true, maxSize: 60, unique:true
        telefonoAlternativo blank:true, nullable: true, maxSize: 25
        establecimiento blank:true, nullable: true, maxSize: 60
        titulo blank:true, nullable: true, maxSize: 100
        anioEgreso blank:true, nullable: true
        //situacionAcademica blank:true, nullable: true
        //legajo(column:legajo)
        lugarLaboral blank:true, nullable: true, maxSize: 50
        telefonoLaboral blank:true, nullable: true, maxSize: 25
        calleLaboral blank:true, nullable: true, maxSize: 60
        numeroDomicilioLaboral blank:true, nullable: true, maxSize: 10
        barrioLaboral blank:true, nullable: true, maxSize: 60
        paisLaboral blank:true, nullable: true, maxSize: 40
        provinciaLaboral blank:true, nullable: true, maxSize: 40
        localidadLaboral blank:true, nullable: true, maxSize: 40
        apellidoNombreTutor blank:true, nullable: true, maxSize: 60
        profesion blank:true, nullable: true, maxSize: 60
        parentescoTutor blank:true, nullable: true, maxSize: 50
        telefonoTutor blank:true, nullable: true, maxSize: 25
        calleTutor blank:true, nullable: true, maxSize: 60
        numeroDomicilioTutor blank:true, nullable: true, maxSize: 10
        barrioTutor blank:true, nullable: true, maxSize: 60
        paisTutor blank:true, nullable: true, maxSize: 40
        provinciaTutor blank:true, nullable: true, maxSize: 40
        localidadTutor blank:true, nullable: true, maxSize: 40
        apellidoNombreGarante blank:true, nullable: true , maxSize: 60
        profesionGarante blank:true, nullable: true, maxSize: 60
        parentescoGarante blank:true, nullable: true , maxSize: 50
        telefonoGarante blank:true, nullable: true, maxSize: 25
        calleGarante blank:true, nullable: true, maxSize: 60
        numeroDomiciolioGarante blank:true, nullable: true, maxSize: 10
        barrioGarante blank:true, nullable: true, maxSize: 60
        paisGarante blank:true, nullable: true, maxSize: 40
        provincia blank:true, nullable: true, maxSize: 40
        localidadGarante blank:true, nullable: true, maxSize: 40
        //falta mapear el campo sitacademica
        //situacionAcademica blank:true, nullable: true
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
        //situacionAcademica(column: 'situacionacademica')
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
