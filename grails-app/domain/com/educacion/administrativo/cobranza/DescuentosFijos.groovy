package com.educacion.administrativo.cobranza

import com.educacion.academico.carrera.Matricula

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 1/10/13
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */
class DescuentosFijos {
    int id
    Matricula matricula
    java.sql.Date fecha
    Descuento descuento
    static mapping = {
        table 'descuentosfijos'
        version false
        matricula column: 'matricula'
        descuento columno:'descuento'
    }
}
