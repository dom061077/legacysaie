package com.educacion.academico

class Institucion {
    String institucion
    String direccion
    String telefono
    String email
    byte[] imagen
    String cp
    String provincia
    String cuit
    String ingregsosBrutos
    String codigoIVA
    String web
    boolean preinscripcionAbierta

    static constraints = {
    }

    static mapping = {
        table  'institucion'
        version false
        ingresosBrutos column : 'ingresosbrutos'
        codigoIVA  column:'codigoiva'
        preinscripcionAbierta column: 'preinscripcionabierta'
    }
}
