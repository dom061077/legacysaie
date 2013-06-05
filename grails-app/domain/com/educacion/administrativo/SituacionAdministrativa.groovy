package com.educacion.administrativo

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 5/06/13
 * Time: 7:33
 * To change this template use File | Settings | File Templates.
 */
class SituacionAdministrativa {
    int id
    String descripcion
    static constraints = {
    }

    static mapping = {
        table 'sitadministrativa'
        version false
        id column : 'sitadministrativa',generator: 'increment'
        descripcion column: 'descripcion'
    }
}
