package com.educacion.academico.materia

import com.educacion.academico.carrera.Carrera

class Materia {
    String id
    String denominacion
    String descripcion
    int duracion
    short estado
    Carrera carrera
    Nivel nivel
    short promocional
    TipoMateria tipoMateria
    short troncal
    short porcentajeAsistencia
    Integer cantidadAusentesLibre
    short cantidadReincorporaciones


    static constraints = {
        cantidadAusentesLibre(nullable:true,blank:true)
    }
    
    static mapping = {
        table 'materias'
        version false
        id column:'materia',generator: 'assigned', type:'string'
        porcentajeAsistencia column:'porcentajeasistencia'
        cantidadAusentesLibre column: 'cantidadausenteslibre'
        cantidadReincorporaciones column: 'cantidadreincorporaciones'
        carrera column: 'carrera'
        nivel column:'nivel'
        tipoMateria column:'tipomateria'

    }
}
