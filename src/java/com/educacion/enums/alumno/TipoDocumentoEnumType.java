package com.educacion.enums.alumno;

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 30/05/13
 * Time: 12:15
 * To change this template use File | Settings | File Templates.
 */
public enum TipoDocumentoEnumType {

    DNI(),
    VISA("Visa"),
    AMEX("American Express");

    private final String debugName;

    private TipoDocumentoEnumType(String debugName) {
        this.debugName = debugName;
    }

    public String toString() {
        return debugName;
    }

    // ********************** Business Methods ********************** //

    public boolean isValid(CreditCard cc) {
        // TODO: Implement syntactical validation of credit card information.
        return true;
    }

}