package legacysaie

class HomeController {
    def springSecurityService
    def index() {
        log.debug "INGRESO AL CONTROLLER HOME"
        def userInstance = springSecurityService.currentUser
        def controllerUri

        if (isNormal()){
            render(view: '/index')
            if (userInstance.alumno)
                controllerUri='panelControl'
            if (userInstance.docente)
                controllerUri='panelControlDocente'
            if (!userInstance.alumno && !userInstance.docente)
                controllerUri='panelControlAdmin'
        }else{
            userInstance = springSecurityService.currentUser
            controllerUri
            if (userInstance.alumno)
                controllerUri='panelControlm'
            if (userInstance.docente)
                controllerUri='panelControlDocente'
            if (!userInstance.alumno && !userInstance.docente)
                controllerUri='panelControlAdmin'
        }
        redirect(controller: controllerUri,action:'index')
    }
}
