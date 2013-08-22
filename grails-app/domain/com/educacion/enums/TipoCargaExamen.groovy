package com.educacion.enums

public enum TipoCargaExamen {
    //si el tipo de cargaexamen es PRACTICO(P) O PARCIAL (C) el tipo de inscripcion a filtrar es Cursar(C)
    // si el tipo de cargaexamen es FINAL(F) el tipo de inscrpcion a filtrar es Rendir(R) O Rendir Libre(L)
    P("EXAMEN PRACTICO"),
    C("EXAMEN PARCIAL"),
    F("EXAMEN FINAL")
    String name
    
    public TipoCargaExamen(String name){
        this.name = name
    }
    
    static list(){
        [P,C,F]
    }
}