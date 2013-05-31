package com.educacion.enums.alumno;

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 30/05/13
 * Time: 12:15
 * To change this template use File | Settings | File Templates.
 */
public enum TipoDocumentoEnumType {

    DNI(1),
    CI(2),
    LE(3),
    LC(4),
    PASAPORTE(5);

    private final Integer value;

    private TipoDocumentoEnumType(int debugName) {
        this.value = debugName;
    }

    public String toString() {
        return value.toString();
    }
    
    public Integer getValue(){
        return value;
    }

    // ********************** Business Methods ********************** //

    /*public boolean isValid(CreditCard cc) {
        // TODO: Implement syntactical validation of credit card information.
        return true;
    } */

}