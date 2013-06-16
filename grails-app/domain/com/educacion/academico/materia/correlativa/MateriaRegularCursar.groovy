package com.educacion.academico.materia.correlativa

import com.educacion.academico.materia.Materia

class MateriaRegularCursar  implements Serializable  {
    Materia materiaBase
    Materia materiaCorrelativa

    static constraints = {
    }

    static mapping = {
        table 'materiasregularescursar'
        version false
        id composite:['materiaBase','materiaCorrelativa']
        materiaBase column: 'materiabase',type: 'string'
        materiaCorrelativa column: 'materiaregular',type:  'string'
    }
}
