package com.educacion.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 4/06/13
 * Time: 13:38
 * To change this template use File | Settings | File Templates.
 */
public enum SexoEnum {
    M("Masculino"),
    F("Femenino")
    String name
    public SexoEnum(String name){
        this.name=name
    }

    static list(){
        [M,F]
    }

}
