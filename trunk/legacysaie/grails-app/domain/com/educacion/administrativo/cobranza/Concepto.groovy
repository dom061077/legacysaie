package com.educacion.administrativo.cobranza

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 1/10/13
 * Time: 8:46
 * To change this template use File | Settings | File Templates.
 */
class Concepto {
    String id
    String descripcion
    boolean escuota

    static mapping = {
        version false
        id column:'concepto', generator:'assigned', type:'string'
    }
}
