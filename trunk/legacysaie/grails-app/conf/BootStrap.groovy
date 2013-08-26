import com.educacion.seguridad.Role
import com.educacion.seguridad.User
import com.educacion.seguridad.RequestMap
import com.educacion.seguridad.UserRole
import com.educacion.alumno.Alumno
import com.educacion.academico.Docente

class BootStrap {

    def init = { servletContext ->
        createUsers()
    }
    def destroy = {
    }


    void createUsers(){
        def alumnoInstance = Alumno.get(12)
        def docenteInstance = Docente.get(2)
        def userDocente = User.findByUsername('userdocente')
        if(!userDocente){
            def docenteRole = new Role(authority: 'ROLE_DOCENTE').save(failOnError: true)
            userDocente = new User(username: 'userdocente',password: 'userdocente',enabled: true,docente: docenteInstance).save(failOnError: true)
            if (!userDocente.authorities.contains(docenteRole)) {
                UserRole.create(userDocente, docenteRole)
            }
        }
        def user = User.findByUsername('user')
        if(!user){
            if(docenteInstance)
                log.debug("EXISTE EN DOCENTE")

            def adminRole = new Role(authority:'ROLE_ALUMNO').save()
            user=new User(username:'user',password:'user',enabled:true,alumno: alumnoInstance).save(failOnError:true)

            new RequestMap(url: '/panelControl/**', configAttribute:'ROLE_ALUMNO').save(failOnError: true)
            new RequestMap(url: '/panelControlDocente/**',configAttribute:'ROLE_DOCENTE').save(failOnError: true)

            
            new RequestMap(url: '/js/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/css/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/images/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/login/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/logout/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/create', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/location/provinciasjson', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/location/paisesjson', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/location/localidadesjson', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/carrera/listjson/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/confirm/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/confirmproblem', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/loadconfirm/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            


            new RequestMap(url: '/carrera/cupocarrera', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/existenumdoc',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/tipoDocumentoIdentidad/cmbjson',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/enumsRendering/sexo',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/cmbjson',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/savejson',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/materiaspreinscribir',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/confirmpreinscripcion',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/alumno/comprobante/**',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/jasper/index/**',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/index/**',configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            //new RequestMap(url: '/alumno/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/j_spring_security_switch_user',configAttribute: 'ROLE_SWITCH_USER,IS_AUTHENTICATED_FULLY').save(failOnError:true)
            new RequestMap(url: '/**', configAttribute:'IS_AUTHENTICATED_REMEMBERED').save(failOnError:true)

            if (!user.authorities.contains(adminRole)) {
                UserRole.create(user, adminRole)
            }

        }
    }

}
