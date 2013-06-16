package com.educacion.academico.materia.correlativa

import com.educacion.academico.materia.Materia

class MateriaAprobadaRendir  implements Serializable  {
    Materia materiaBase
    Materia materiaCorrelativa

    static constraints = {
    }

    static mapping = {
        table 'materiasaprobadasrendir'
        version false
        id composite:['materiaBase','materiaCorrelativa']
        materiaBase column: 'materiabase',type: 'string'
        materiaCorrelativa column: 'materiaaprobadarendir',type:  'string'
    }
}
