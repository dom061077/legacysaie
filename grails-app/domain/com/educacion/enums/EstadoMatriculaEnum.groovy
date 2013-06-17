package com.educacion.enums

/**
 * Created by IntelliJ IDEA.
 * User: daniel
 * Date: 16/06/13
 * Time: 20:52
 * To change this template use File | Settings | File Templates.
 */
public enum EstadoMatriculaEnum {
    I("Iniciada"),
    G("Generada"),
    C("Confirmada"),
    T("Titular"),
    S("Suplente")

    String name

    public EstadoMatriculaEnum(String name){
        this.name=name
    }

    public static list(){
        [I,G,C,T,S]
    }
}
