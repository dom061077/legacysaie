package com.educacion.academico.materia.correlativa

import com.educacion.academico.materia.Materia

class MateriaAprobadaCursar implements Serializable {
    Materia materiaBase
    Materia materiaCorrelativa

    static constraints = {
    }

    static mapping = {
        table 'materiasaprobadascursar'
        version false
        id composite:['materiaBase','materiaCorrelativa']
        materiaBase column: 'materiabase',type: 'string'
        materiaCorrelativa column: 'materiaaprobadacursar',type:  'string'
    }
}

