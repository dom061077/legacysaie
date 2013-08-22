package com.educacion.enums

public enum ModalidadCargaExamen {
    //O(ORAL),E(ESCRITO),M(MIXTO)
    O("ORAL"),
    E("ESCRITO"),
    M("MIXTO")
    
    String name
    
    public ModalidadCargaExamen(String name){
        this.name = name
    }
    
    static list(){
        [O,E,M]
    }

}