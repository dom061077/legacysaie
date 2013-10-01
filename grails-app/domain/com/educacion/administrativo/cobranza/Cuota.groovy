package com.educacion.administrativo.cobranza

import com.educacion.academico.carrera.AnioLectivo
import com.educacion.academico.carrera.Carrera

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 1/10/13
 * Time: 9:07
 * To change this template use File | Settings | File Templates.
 */
class Cuota {
    int id
    short mes
    short anio
    Carrera carrera
    java.sql.Date vencimiento
    java.sql.Date limiteDescuento
    Double importe
    short todas

    static mapping = {
        version false
        table 'cuotas'
        anioLectivo column: 'anio'
        carrera column:'carrera'
        limiteDescuento column:'limitedescuento'
    }
}
