package com.educacion.academica;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 27/05/13
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */
public class AnioLectivo implements java.io.Serializable  {
    private Long id;
    private String descripcion;
    private Integer anio;
    private Integer estado;

    private Set<Carrera> carreras = new HashSet<Carrera>(0);

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public Set<Carrera> getCarreras() {
        return carreras;
    }

    public void setCarreras(Set<Carrera> carreras) {
        this.carreras = carreras;
    }
}
