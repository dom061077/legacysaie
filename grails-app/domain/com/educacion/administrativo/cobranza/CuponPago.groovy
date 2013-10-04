package com.educacion.administrativo.cobranza

import com.educacion.academico.carrera.Matricula
import com.educacion.administrativo.cobranza.Cuota

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 1/10/13
 * Time: 9:36
 * To change this template use File | Settings | File Templates.
 */
class CuponPago {
    int id
    java.sql.Date fechaAlta = new java.sql.Date(new java.util.Date().getTime())
    Matricula matricula
    Cuota cuota
    int numero
    java.sql.Date vencimiento1
    java.sql.Date vencimiento2
    java.sql.Date vencimiento3
    Double importe1
    Double importe2
    Double importe3
    boolean pagado = false
    String codigoBarras
    
    static mapping = {
        version false
        table 'cuponpago'
        id column:'cuponpago'
        matricula column:'matricula'
        fechaAlta column:'fechaalta'
        cuota column:'idcuotas'
        codigoBarras column: 'codigobarras'
    }

    def sigNumero(){
        def max = CuponPago.executeQuery('select max(numero)+1 from CuponPago')[0]
        if (max == null)
            max = 1
        return max
    }

    def beforeInsert = {
        numero = sigNumero()
    }
}
