package com.educacion.administrativo.cobranza

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 1/10/13
 * Time: 13:41
 * To change this template use File | Settings | File Templates.
 */
class Descuento {
    int id
    String descripcion
    String sumaoresta
    Float porcentaje
    Double importe
    boolean incrementoCuota
    boolean pagoAnticipado

    static mapping = {
        table 'descuentos'
        version false
        incrementoCuota column: 'incrementocuota'
        pagoAnticipado column: 'pagoanticipado'
    }
}
