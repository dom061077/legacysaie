import com.educacion.seguridad.Role
import com.educacion.seguridad.User
import com.educacion.seguridad.RequestMap
import com.educacion.seguridad.UserRole

class BootStrap {

    def init = { servletContext ->
        createUsers()
    }
    def destroy = {
    }


    void createUsers(){
        def user = User.findByUsername('admin')
        if(!user){
            def adminRole = new Role(authority:'ADMIN').save()
            new User(username:'user',password:'user',enabled:true).save(failOnError:true)
            user=new User(username:'admin',password:'123',enabled:true).save(failOnError:true)
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
