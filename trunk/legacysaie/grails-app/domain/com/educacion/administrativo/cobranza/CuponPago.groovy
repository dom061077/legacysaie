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

    String getCodigoBarrasConvertido(){
        int sumaDigitoVerif = 0;
        int posicion = 1;
        String textoFinal = "";
        String texto = codigoBarras
        
        for (int i = texto.length() - 1; i > -1; i--)
        {
            //sumaDigitoVerif = sumaDigitoVerif + Convert.ToInt32(texto.Substring(i, 1)) * (posicion % 2 == 0 ? 1 : 3);
            sumaDigitoVerif = sumaDigitoVerif + texto.substring(i,1).toInteger() * (posicion % 2 == 0 ? 1 : 3);
            posicion++;
        }
        //aqui agrego el dígito verificador a la cadena original/
        texto = texto + (sumaDigitoVerif % 10 == 0 ? 0 : (10 - sumaDigitoVerif % 10)).ToString();
        //DigitoVerificador_tmp = (sumaDigitoVerif % 10 == 0 ? 0 : (10 - sumaDigitoVerif % 10)).ToString();

        //la longitud de la cadena debe ser par
        if (texto.length() % 2 != 0)
            texto = "0" + texto;

        //Convierto los caracteres

        for (int i = 0; i < texto.Length; i += 2)
        {
            //if (Convert.ToInt32(texto.Substring(i, 2)) < 50)
            if (Convert.ToInt32(texto.Substring(i, 2)) < 50)
                textoFinal = textoFinal + (char)(Convert.ToInt32(texto.Substring(i, 2)) + 48);
            else
                textoFinal = textoFinal + (char)(Convert.ToInt32(texto.Substring(i, 2)) + 142);
        }
        textoFinal = "(" + textoFinal + ")";
        return textoFinal;

    }

    static transients = ['codigoBarrasConvertido']
    
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
