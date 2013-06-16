package com.educacion.academico

import com.educacion.academico.carrera.Carrera
import com.educacion.academico.materia.Nivel

class Division {
    int id
    String descripcion
    String descripcionturno
    String letra
    String turno
    Carrera carrera
    Nivel nivel
    Aula aula

    static constraints = {
    }
}
