package com.alumno.alumno;

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 24/05/13
 * Time: 12:38
 * To change this template use File | Settings | File Templates.
 */
public class Alumno implements java.io.Serializable  {
    private Long id;

    private String numeroDocumento;
    private String apellido;
    private String nombre;
    private Integer anioEgreso;

    public Long getId() {
        return id;
    }

    public Integer getAnioEgreso(){
        return this.anioEgreso;
    }

    public void setAnioEgreso(Integer anioEgreso1){
        this.anioEgreso = anioEgreso1;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}