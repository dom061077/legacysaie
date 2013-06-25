package com.educacion.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 14/06/13
 * Time: 8:34
 * To change this template use File | Settings | File Templates.
 */
public enum EstadoInscripcionDetalleEnum {
    I("Iniciada"),
    A("Aprobada"),
    R("Regular"),
    D("Desaprobada"),
    S("Ausente"),
    N("Anulada")

    String name

    public EstadoInscripcionDetalleEnum(String name){
        this.name = name
    }

    static List(){
        [I,A,R,D,S,N]
    }
}
