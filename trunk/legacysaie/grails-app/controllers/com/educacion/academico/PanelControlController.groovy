package com.educacion.academico

import com.educacion.academico.materia.Materia
import com.educacion.enums.TipoInscripcionDetalleEnum
import com.educacion.academico.materia.correlativa.MateriaAprobadaCursar
import com.educacion.academico.materia.correlativa.MateriaRegularCursar
import com.educacion.academico.carrera.InscripcionDetalle
import com.educacion.enums.EstadoInscripcionDetalleEnum
import com.educacion.academico.materia.correlativa.MateriaRegularRendir
import com.educacion.academico.materia.correlativa.MateriaAprobadaRendir

import grails.converters.JSON
import com.educacion.enums.EstadoInscripcionEnum
import com.educacion.academico.examen.Examen
import com.educacion.enums.EstadoExamen
import com.educacion.seguridad.User
import org.springframework.context.i18n.LocaleContextHolder
import com.educacion.administrativo.cobranza.Cuota
import com.educacion.administrativo.cobranza.DescuentosFijos
import com.educacion.academico.carrera.Matricula
import com.educacion.administrativo.cobranza.CuponPago
import com.educacion.administrativo.cobranza.Descuento

class PanelControlController {
    static final String CODIGOBARRA_EMPRESA="0044"
    static final String CODIGOBARRA_IDENTIFICADORCUENTA="0000000000"
    static final String CODIGOBARRA_IDENTIFICADORCONCEPTO="1"

    def springSecurityService
    def index() {
        Random randomLink = new Random()
        def userInstance = springSecurityService.currentUser
        [userInstance:userInstance,randomlink: randomLink.nextInt(100000)]
    }

    
    private boolean validarCorrelativa(String materiaId,int alumnoId, int anioLectivoId,String carreraId,TipoInscripcionDetalleEnum tipoInsc ){
        boolean flagvalida = true
        def listMateriasCorre
        def inscsDetalle


        if(tipoInsc == TipoInscripcionDetalleEnum.C ){
            listMateriasCorre = MateriaAprobadaCursar.createCriteria().list{
                eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.R)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }
            listMateriasCorre = MateriaRegularCursar.createCriteria().list{
                eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.A)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }

            inscsDetalle = InscripcionDetalle.createCriteria().list(){
                inscripcion{
                    ne("estado",EstadoInscripcionEnum.N)
                    matricula{
                        alumno{
                            eq("id",alumnoId)
                        }
                        anioLectivo{
                            eq("id",anioLectivoId)
                        }
                        carrera{
                            eq("id",carreraId)
                        }
                    }
                }
                materia{
                    eq("id",materiaId)
                }
                or{
                    eq("estado",EstadoInscripcionDetalleEnum.I)
                    eq("estado",EstadoInscripcionDetalleEnum.R)
                }
                eq("tipoInscripcion",TipoInscripcionDetalleEnum.C)
            }
            if (inscsDetalle.size()>0)
               flagvalida = false

        }
        
        if (tipoInsc == TipoInscripcionDetalleEnum.L || tipoInsc == TipoInscripcionDetalleEnum.R){
            listMateriasCorre = MateriaAprobadaRendir.createCriteria().list{
                eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.R)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }
            listMateriasCorre = MateriaRegularRendir.createCriteria().list{
               eq("id.materiaBase.id",materiaId)
            }
            listMateriasCorre.each{
                inscsDetalle = InscripcionDetalle.createCriteria().list {
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoId)
                            }
                            anioLectivo{
                                eq("id",anioLectivoId)
                            }
                            carrera{
                                eq("id",carreraId)
                            }
                        }
                    }
                    materia{
                        eq("id",materiaId)
                    }
                    eq("estado",EstadoInscripcionDetalleEnum.A)
                }
                if (inscsDetalle.size()==0)
                    flagvalida = false
            }
            inscsDetalle = InscripcionDetalle.createCriteria().list(){
                inscripcion{
                    ne("estado",EstadoInscripcionEnum.N)
                    matricula{
                        alumno{
                            eq("id",alumnoId)
                        }
                        anioLectivo{
                            eq("id",anioLectivoId)
                        }
                        carrera{
                            eq("id",carreraId)
                        }
                    }
                }
                materia{
                    eq("id",materiaId)
                }
                or{
                    eq("estado",EstadoInscripcionDetalleEnum.I)
                    eq("estado",EstadoInscripcionDetalleEnum.A)
                }
            }
            if (inscsDetalle.size()>0)
                    flagvalida=false

            inscsDetalle = InscripcionDetalle.createCriteria().list {
                inscripcion{
                    ne("estado",EstadoInscripcionEnum.N)
                    matricula{
                        alumno{
                            eq("id",alumnoId)
                        }
                        anioLectivo{
                            eq("id",anioLectivoId)
                        }
                        carrera{
                            eq("id",carreraId)
                        }
                    }
                }
                materia{
                    eq("id",materiaId)
                }
                eq("estado",EstadoInscripcionDetalleEnum.R)
            }
            if(inscsDetalle.size()==0){
                flagvalida = false
            }
        }



        return flagvalida
    }

    def listcorrelcursar(){
        def returnMap = [:]
        def recordList = []

        def materias = Materia.createCriteria().list {
            carrera{
                eq("id",params.carreraId)
            }
            order("denominacion","asc")
        }
        boolean flagValida
        materias.each {
            flagValida=false
            flagValida = validarCorrelativa(it.id,params.alumnoId.toString().toInteger().intValue(),params.anioLectivoId.toString().toInteger().intValue(),params.carreraId,TipoInscripcionDetalleEnum.C)
            if(flagValida){
                recordList << [id:it.id, denominacion: it.denominacion,seleccionda:false]
            }
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total = recordList.size()
        render returnMap as JSON
    }

    def listcorrelrendir(){
        def returnMap = [:]
        def recordList = []

        def materias = Materia.createCriteria().list {
            carrera{
                eq("id",params.carreraId)
            }
            order("denominacion","asc")
        }
        boolean flagValida
        materias.each {
            flagValida=false
            flagValida = validarCorrelativa(it.id,params.alumnoId.toString().toInteger().intValue(),params.anioLectivoId.toString().toInteger().intValue(),params.carreraId,TipoInscripcionDetalleEnum.R)
            if(flagValida){
                recordList << [id:it.id,nivel:it.nivel.descripcion, denominacion: it.denominacion,seleccionda:false]
            }
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total = recordList.size()
        render returnMap as JSON
    }

    def listmateriasaprobadas(/*def carreraId,def alumnoId,def materiaDeno,int limit,int start*/){
       def returnMap = [:]
       def recordList = []
       def pagingConfig = [max: params.limit as Integer ?:10 , offset: params.start as Integer ?:0]


       def materiasAprobadas = InscripcionDetalle.createCriteria().list(pagingConfig){
            inscripcion{
                matricula{
                    alumno{
                        eq("id",params.alumnoId.toString().toInteger())
                    }
                    carrera{
                        eq("id",params.carreraId)
                    }
                }
            }
            if(params.materiaDeno){
               materia{
                   ilike("denominacion","%"+params.materiaDeno+"%")
               }
            }

            eq("estado",EstadoInscripcionDetalleEnum.A)
       }

       def totalRegistros = InscripcionDetalle.createCriteria().count{
           inscripcion{
               matricula{
                   alumno{
                       eq("id",params.alumnoId.toString().toInteger())
                   }
                   carrera{
                       eq("id",params.carreraId)
                   }
               }
           }
           eq("estado",EstadoInscripcionDetalleEnum.A)
           if(params.materiaDeno){
               materia{
                   ilike("denominacion","%"+params.materiaDeno+"%")
               }
           }

       }

       materiasAprobadas?.each {
           recordList << [id:it.id,carrera:it.inscripcion.matricula.carrera.denominacion,nivel: it.materia.nivel.descripcion,materia:it.materia.denominacion,notafinal:it.notaFinal]
       }
       returnMap.rows=recordList
       returnMap.success = true
       returnMap.total = totalRegistros
       render returnMap as JSON
    }

    def listmateriasregulares() {
        def returnMap = [:]
        def recordList = []
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        
        def materiasRegulares = InscripcionDetalle.createCriteria().list(pagingConfig){
            inscripcion{
                matricula{
                    alumno{
                        eq("id",params.alumnoId.toString().toInteger())
                    }
                    carrera{
                        eq("id",params.carreraId)
                    }
                }
            }
            if(params.materiaDeno){
                materia{
                    ilike("denominacion","%"+params.materiaDeno+"%")
                }
            }

            eq("estado",EstadoInscripcionDetalleEnum.R)
        }

        def totalRegistros = InscripcionDetalle.createCriteria().count(){
            inscripcion{
                matricula{
                    alumno{
                        eq("id",params.alumnoId.toString().toInteger())
                    }
                    carrera{
                        eq("id",params.carreraId)
                    }
                }
            }
            if(params.materiaDeno){
                materia{
                    ilike("denominacion","%"+params.materiaDeno+"%")
                }
            }

            eq("estado",EstadoInscripcionDetalleEnum.R)
        }
        materiasRegulares.each{
            recordList << [id:it.id,carrera:it.inscripcion.matricula.carrera.denominacion,nivel: it.materia.nivel.descripcion,materia: it.materia.denominacion]
        }
        returnMap.rows=recordList
        returnMap.success = true
        returnMap.total = totalRegistros
        render returnMap as JSON
    }

    def fechasexamenes(){
        def returnMap = [:]
        def recordList = []
        def listExamenes
        def alumnoInstance = springSecurityService.currentUser?.alumno
        if (alumnoInstance){
            listExamenes = Examen.createCriteria().list{
                cargaExamen{
                    le("fechaExamen",new java.sql.Date((new Date()).getTime()))
                }
                inscripcionDetalle{
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoInstance.id)
                            }
                        }
                    }
                }
                eq("estado",EstadoExamen.I)
            }
            listExamenes.each{
                recordList << [id: it.id,materia: it.inscripcionDetalle.materia.denominacion,docente:it.cargaExamen.docente.apellido+', '+it.cargaExamen.docente.nombre,fechaexamen:it.cargaExamen.fechaExamen,tipo:it.cargaExamen.tipo.name,modalidad:it.cargaExamen.modalidad.name]

            }
        }
        returnMap.rows = recordList
        returnMap.total = listExamenes.size()
        render returnMap as JSON
    }

    def notasexamenes(){
        def returnMap=[:]
        def recordList=[]
        def alumnoInstance = springSecurityService.currentUser?.alumno
        def listExamenes
        def totalRegistros
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]
        if (alumnoInstance){
            listExamenes = Examen.createCriteria().list(pagingConfig){
                cargaExamen{
                    le("fechaExamen",new java.sql.Date((new Date()).getTime()))
                }
                inscripcionDetalle{
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoInstance.id)
                            }
                        }
                    }
                }
                ne("estado",EstadoExamen.I)
                cargaExamen{
                        order("fechaExamen","desc")
                }


            }
            totalRegistros = Examen.createCriteria().count(){
                cargaExamen{
                    le("fechaExamen",new java.sql.Date((new Date()).getTime()))
                }
                inscripcionDetalle{
                    inscripcion{
                        matricula{
                            alumno{
                                eq("id",alumnoInstance.id)
                            }
                        }
                    }
                }
                ne("estado",EstadoExamen.I)
            }
            listExamenes.each{
                recordList << [id: it.id,materia: it.inscripcionDetalle.materia.denominacion,docente:it.cargaExamen.docente.apellido+', '+it.cargaExamen.docente.nombre,fechaexamen:it.cargaExamen.fechaExamen,tipo:it.cargaExamen.tipo.name,modalidad:it.cargaExamen.modalidad.name,nota:it.nota]

            }

        }
        returnMap.rows = recordList
        returnMap.total = totalRegistros
        render returnMap as JSON
    }

    def changepassword(){
        def usuarioInstance = User.get(params.id)
        def returnMap=[:]
        def errorList = []
        returnMap.success = false
        returnMap.mensaje = "La contraseña no pudo cambiarse"
        if (usuarioInstance){
            if (!params.newpassword.equals(params.repeatnewpassword)){
                errorList  << [msg: "La nueva contraseña no coincide con su confirmación"]
            }else{
                if (!params.newpassword.matches(".*[a-zA-Z].*") || !params.newpassword.matches(".*[1-9!@#\$%^&*()-_=+].*")){
                    errorList << [msg: "La contraseña debe combinar letras con al menos un número o caracter especial  (!@#\$%^&*()-_=+)"]
                }else{
                    usuarioInstance.password = params.newpassword
                    if (usuarioInstance.save(flush: true)){
                        returnMap.success = true
                        returnMap.mensaje = "La contraseña se modificó correctamente"
                    }else{
                        usuarioInstance.errors.allErrors.each{
                            errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        }
                    }
                }
            }
        }else{
            errorList << [msg: "Usuario no encontrado"]
        }
        returnMap.errors = errorList
        render returnMap as JSON
    }

    private String generatePassword(){
        String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder builder = new StringBuilder();
        log.debug "BASE ALFANUMERICA"+ ALPHA_NUMERIC_STRING
        def count = 8
        while (count-- != 0) {
            int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

    def cuotascuponpago(String carrerapar){
        def returnMap = [:]
        def recordList = []
        def cuotas=[]
        def cuotasCarreras = Cuota.createCriteria().list{
            carrera{
                    eq("id",carrerapar)
            }
            ge("vencimiento",new java.sql.Date(new Date().getTime()))
        }
        def cuotasSinCarrera = Cuota.createCriteria().list{
            isNull("carrera")
            ge("vencimiento",new java.sql.Date(new Date().getTime()))
        }
        cuotas.addAll(cuotasCarreras)
        cuotas.addAll(cuotasSinCarrera)
        
        cuotas.each{
            recordList << [id: it.id,descripcion:(it.mes.toString()+"/"+it.anio.toString())]
        }
        returnMap.success = true
        returnMap.rows = recordList

        render returnMap as JSON
    }

    def descinccuponpago(int matriculapar){
        def returnMap = [:]
        def recordList = []
        def descuentos = DescuentosFijos.createCriteria().list {
            matricula {
                eq("id",matriculapar)
            }
        }
        
        descuentos.each{
            recordList << [concepto: it.descuento.descripcion,monto:it.descuento.importe,tipo:(it.descuento.sumaoresta.equals("1")?"Incremento":"Descuento")]
        }
        
        returnMap.success = true
        returnMap.rows = recordList
        render returnMap as JSON
    }


    def generarcupon(int matriculapar,int cuotacuponpago_id){
        def returnMap = [:]
        def errorList = []
        def cuponPagoInstance
        def cuotaInstance = Cuota.get(cuotacuponpago_id)
        def matriculaInstance = Matricula.get(matriculapar)
        def vencimientoRecargo
        def flagReturn = false
        def mensajeReturn

        def cupones = CuponPago.createCriteria().list{
            matricula{
                eq("id",matriculapar)
            }
            cuota{
                eq("id",cuotacuponpago_id)
            }
        }

        if (cupones.size()>0){
            cuponPagoInstance = cupones.get(0)
            flagReturn = true
            mensajeReturn = "Se generó el cupón"
            returnMap.identificador = cuponPagoInstance.id
        }else{

            if (cuotaInstance && matriculaInstance){
                def descuentosFijos = DescuentosFijos.createCriteria().list{
                    matricula{
                        eq("id",matriculapar.toInteger())
                    }
                }
                def recargos = 0
                def descuentos = 0
                descuentosFijos.each{
                    if(it.descuento.sumaoresta=="1"){
                        if(it.descuento.importe==null)
                          recargos = recargos + cuotaInstance.importe*it.descuento.porcentaje/100
                        else
                          recargos = recargos + it.descuento.importe
                    }else{
                        if(it.descuento.importe==null)
                            descuentos = descuentos + cuotaInstance.importe*it.descuento.porcentaje/100
                        else
                            descuentos = descuentos + it.descuento.importe
                    }
                }

                def montoTotal = cuotaInstance.importe + recargos - descuentos
                def descuentoCuota = Descuento.findByIncrementoCuota(true)
                if (descuentoCuota.importe!=null)
                    vencimientoRecargo = descuentoCuota.importe;
                else{
                    vencimientoRecargo = cuotaInstance.importe*descuentoCuota?.porcentaje/100
                }
                def importe2 = montoTotal + vencimientoRecargo
                def importe3 = montoTotal + vencimientoRecargo + vencimientoRecargo
                Calendar cal = Calendar.getInstance()
                cal.setTime(cuotaInstance.getVencimiento())
                cal.add(Calendar.DATE,30)
                def vencimiento1 = cuotaInstance.getVencimiento()
                def vencimiento2 = new java.sql.Date(cal.getTime().getTime())
                cal.add(Calendar.DATE,30)
                def vencimiento3 = new java.sql.Date(cal.getTime().getDate())


                def codigoBarras = CODIGOBARRA_EMPRESA+CODIGOBARRA_IDENTIFICADORCONCEPTO+(100000000+matriculaInstance.id).toString().substring(1,9)+new java.text.SimpleDateFormat("ddMMyy").format(cuotaInstance.getVencimiento()?.getTime())+String.format("%.2f",100000+cuotaInstance.importe).replace('.','').replace(',','').substring(1,8)+"30"+String.format("%.2f",100000+importe2).replace('.','').replace(',','').substring(1,8)+"30"+String.format("%.2f",100000+importe3).replace('.','').replace(',','').substring(1,8)+CODIGOBARRA_IDENTIFICADORCUENTA
                def codigoBarrasSecuencia="1"
                for (int i=1;i <= 13;i++){
                    codigoBarrasSecuencia+="3579"
                }
                codigoBarrasSecuencia = codigoBarrasSecuencia + "3"

                double totalAlgoritmo=0
                int digitoResultante
                log.debug ('Codigo de barras:'+codigoBarras+' codigo de barras secuencia: '+codigoBarrasSecuencia)
                for (int i=0;i <= 53; i++){
                    totalAlgoritmo+=Integer.parseInt(codigoBarras[i])*Integer.parseInt(codigoBarrasSecuencia[i])
                }
                digitoResultante = (totalAlgoritmo / 2) % 10
                codigoBarras+=digitoResultante.toString()
                totalAlgoritmo += digitoResultante * 5
                digitoResultante = (totalAlgoritmo / 2) % 10
                codigoBarras+=digitoResultante.toString()
                cuponPagoInstance = new CuponPago(matricula: matriculaInstance, cuota: cuotaInstance,vencimiento1: cuotaInstance.vencimiento, vencimiento2: vencimiento2, vencimiento3: vencimiento3,importe1: cuotaInstance.importe, importe2: importe2, importe3: importe3,codigoBarras: codigoBarras)
                if (cuponPagoInstance.save(flush:true)){
                    flagReturn = true
                    mensajeReturn = "Se generó el cupón"
                    returnMap.identificador = cuponPagoInstance.id
                }else{
                    flagReturn = false
                    returnMap.mensaje = "Error al generar el cupón"
                    cuponPagoInstance.errors.allErrors.each{
                        errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                    }

                }
            }else{
                mensajeReturn = "Matrícula no encontrada"
            }
        }
        returnMap.errors = errorList
        returnMap.success = flagReturn
        returnMap.mensaje = mensajeReturn
        render returnMap as JSON
    }

    def impresioncuponpago(int id){
        def cuponPagoInstance = CuponPago.get(id)
        def list = new ArrayList()
        String reportPath = servletContext.getRealPath("/reports/")
        if (cuponPagoInstance){
            log.debug cuponPagoInstance.matricula.carrera.denominacion
            log.debug cuponPagoInstance.matricula.alumno.apellido
            log.debug cuponPagoInstance.cuota.mes
            log.debug cuponPagoInstance.codigoBarrasConvertido
            list.add(cuponPagoInstance)
        }
        params.put("_format","PDF")
        params.put("_file","cuponrapipago")
        params.put("_name","cuponrapipago")
        params.put("REPORTPATH",reportPath)
        chain(controller:'jasper',action:'index',model:[data:list],params:params)

    }

}
