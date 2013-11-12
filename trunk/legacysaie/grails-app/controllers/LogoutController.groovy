import org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils

class LogoutController {

    /**
     * Index action. Redirects to the Spring security logout uri.
     */
    def index = {
        // TODO put any pre-logout code here
        log.debug "INGRESANDO A INDEX"
        log.debug SpringSecurityUtils.securityConfig.logout.filterProcessesUrl
        //if (isNormal())
            redirect uri: SpringSecurityUtils.securityConfig.logout.filterProcessesUrl // '/j_spring_security_logout'
        //else{
        //    log.debug "REDIRECCIÓN A LOGIN MOBILE"
        //    redirect (controller: "login",action: "auth")
        //}
    }
}
