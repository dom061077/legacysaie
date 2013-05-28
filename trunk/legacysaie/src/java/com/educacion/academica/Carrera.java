package com.educacion.academica;

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 27/05/13
 * Time: 10:15
 * To change this template use File | Settings | File Templates.
 */
import java.util.HashSet;
import java.util.Set;


public class Carrera implements java.io.Serializable  {
    private String id;
    private String denominacion;
    private String duracion;
    private Integer modalidad;
    private String titulo;
    private String validez;
    private String perfilegresado;
    private String ocupacional;
    private Integer estado;

    private Set<AnioLectivo> aniosLectivos = new HashSet<AnioLectivo>(0);


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public Integer getModalidad() {
        return modalidad;
    }

    public void setModalidad(Integer modalidad) {
        this.modalidad = modalidad;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getValidez() {
        return validez;
    }

    public void setValidez(String validez) {
        this.validez = validez;
    }

    public String getPerfilegresado() {
        return perfilegresado;
    }

    public void setPerfilegresado(String perfilegresado) {
        this.perfilegresado = perfilegresado;
    }

    public String getOcupacional() {
        return ocupacional;
    }

    public void setOcupacional(String ocupacional) {
        this.ocupacional = ocupacional;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public Set<AnioLectivo> getAniosLectivos() {
        return aniosLectivos;
    }

    public void setAniosLectivos(Set<AnioLectivo> aniosLectivos) {
        this.aniosLectivos = aniosLectivos;
    }
}
