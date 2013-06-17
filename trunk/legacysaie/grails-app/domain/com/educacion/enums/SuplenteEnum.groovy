package com.educacion.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 14/06/13
 * Time: 8:40
 * To change this template use File | Settings | File Templates.
 */
public enum SuplenteEnum {
    T("Titular"),
    S("Suplente")

    String name

    public SuplenteEnum(String name){
        this.name = name
    }

    static List(){
        [T,S]
    }

}
