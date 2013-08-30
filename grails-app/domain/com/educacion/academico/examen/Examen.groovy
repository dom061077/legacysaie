package com.educacion.academico.examen

import java.text.DecimalFormat
import com.educacion.academico.carrera.InscripcionDetalle
import com.educacion.enums.EstadoExamen

class Examen {

   Float nota
   EstadoExamen estado

   CargaExamen cargaExamen
   InscripcionDetalle inscripcionDetalle 
    
   static belongsTo = [cargaExamen:CargaExamen]

   static mapping = {
       version false
       id column:'examen', generator: 'increment'
       cargaExamen column: 'cargaexamen'
       inscripcionDetalle column: 'inscripciondetalle'
       estado column: 'estado'
   }

}
