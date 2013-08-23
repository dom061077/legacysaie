package com.educacion

class PanelControlDocenteController {

    def index() {
        Random randomLink = new Random()
        [randomlink: randomLink.nextInt(100000)]
    }


}
