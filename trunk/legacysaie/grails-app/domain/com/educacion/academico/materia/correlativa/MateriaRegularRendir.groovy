package com.educacion.academico.materia.correlativa

import com.educacion.academico.materia.Materia

class MateriaRegularRendir  implements Serializable  {
    Materia materiaBase
    Materia materiaCorrelativa

    static constraints = {
    }

    static mapping = {
        table 'materiasregularesrendir'
        version false
        id composite:['materiaBase','materiaCorrelativa']
        materiaBase column: 'materiabase',type: 'string'
        materiaCorrelativa column: 'materiaregularrendir',type:  'string'
    }
}
