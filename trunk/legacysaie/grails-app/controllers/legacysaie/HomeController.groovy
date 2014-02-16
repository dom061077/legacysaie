package legacysaie

class HomeController {
    def springSecurityService
    def index() {
        log.debug "INGRESO AL CONTROLLER HOME"
        if (isNormal())
            render(view: '/index')
        else{
        def userInstance = springSecurityService.currentUser
        def controllerUri
            if (userInstance.alumno)
                controllerUri='panelControlm'
            if (userInstance.docente)
                controllerUri='panelControlDocente'
            if (!userInstance.alumno && !userInstance.docente)
                controllerUri='panelControlAdmin'
            redirect(controller: controllerUri,action:'index')

        }

    }
}
