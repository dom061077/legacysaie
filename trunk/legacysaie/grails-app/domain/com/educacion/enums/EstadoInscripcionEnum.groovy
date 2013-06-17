package com.educacion.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 14/06/13
 * Time: 8:31
 * To change this template use File | Settings | File Templates.
 */
public enum EstadoInscripcionEnum {
    A("Aspirante"),
    G("Generada"),
    S("Aspirante Suplente"),
    N("Anulada")


    String name

    public EstadoInscripcionEnum(String name){
        this.name = name
    }

    static List(){
        [A,G,S,N]
    }
}
