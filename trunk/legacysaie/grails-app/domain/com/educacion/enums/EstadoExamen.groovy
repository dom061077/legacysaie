package com.educacion.enums


public enum EstadoExamen {
    //A(APROBADO),D(DESAPROBADO),S(AUSENTE)
    A("APROBADO"),
    D("DESAPROBADO"),
    S("AUSENTE")
    
    String name
    
    public EsatdoExamen(String name){
        this.name = name
    }
    
    static list(){
        [A,D,S]
    }
}