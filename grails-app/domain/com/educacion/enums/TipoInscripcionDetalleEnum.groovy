package com.educacion.enums

public enum TipoInscripcionDetalleEnum {

    C("Cursar"),
    R("Rendir"),
    L("Rendir Libre")

    String name

    public TipoInscripcionDetalleEnum(String name){
        this.name=name
    }

    public static List(){
        [C,R,L]
    }
}
