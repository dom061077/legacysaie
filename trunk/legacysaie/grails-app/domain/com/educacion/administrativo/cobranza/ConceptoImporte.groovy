package com.educacion.administrativo.cobranza

import com.educacion.administrativo.cobranza.Concepto

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 1/10/13
 * Time: 8:54
 * To change this template use File | Settings | File Templates.
 */
class ConceptoImporte {
    int id
    Concepto concepto
    Double importe
    java.sql.Date vigencia
    
    static mapping = {
        version false
        id column:'conceptoimporte'
        table  'conceptoimporte'
        concepto column:'concepto'
    }
}
