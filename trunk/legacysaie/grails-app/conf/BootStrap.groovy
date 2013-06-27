import com.educacion.seguridad.Role
import com.educacion.seguridad.User
import com.educacion.seguridad.RequestMap
import com.educacion.seguridad.UserRole
import com.educacion.alumno.Alumno

class BootStrap {

    def init = { servletContext ->
        createUsers()
    }
    def destroy = {
    }


    void createUsers(){
        def alumnoInstance = Alumno.get(12)
        def user = User.findByUsername('user')
        if(!user){
            def adminRole = new Role(authority:'ADMIN').save()
            user=new User(username:'user',password:'user',enabled:true,alumno: alumnoInstance).save(failOnError:true)
            new RequestMap(url: '/js/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/css/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/images/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/login/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/logout/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save(failOnError:true)
            new RequestMap(url: '/**', configAttribute:'IS_AUTHENTICATED_REMEMBERED').save(failOnError:true)
            new RequestMap(url: '/j_spring_security_switch_user',configAttribute: 'ROLE_SWITCH_USER,IS_AUTHENTICATED_FULLY').save(failOnError:true)
            if (!user.authorities.contains(adminRole)) {
                UserRole.create(user, adminRole)
            }

        }
    }

}
