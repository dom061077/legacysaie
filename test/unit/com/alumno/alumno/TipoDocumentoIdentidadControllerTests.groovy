package com.alumno.alumno



import org.junit.*
import grails.test.mixin.*

@TestFor(TipoDocumentoIdentidadController)
@Mock(TipoDocumentoIdentidad)
class TipoDocumentoIdentidadControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/tipoDocumentoIdentidad/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.tipoDocumentoIdentidadInstanceList.size() == 0
        assert model.tipoDocumentoIdentidadInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.tipoDocumentoIdentidadInstance != null
    }

    void testSave() {
        controller.save()

        assert model.tipoDocumentoIdentidadInstance != null
        assert view == '/tipoDocumentoIdentidad/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/tipoDocumentoIdentidad/show/1'
        assert controller.flash.message != null
        assert TipoDocumentoIdentidad.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/tipoDocumentoIdentidad/list'

        populateValidParams(params)
        def tipoDocumentoIdentidad = new TipoDocumentoIdentidad(params)

        assert tipoDocumentoIdentidad.save() != null

        params.id = tipoDocumentoIdentidad.id

        def model = controller.show()

        assert model.tipoDocumentoIdentidadInstance == tipoDocumentoIdentidad
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/tipoDocumentoIdentidad/list'

        populateValidParams(params)
        def tipoDocumentoIdentidad = new TipoDocumentoIdentidad(params)

        assert tipoDocumentoIdentidad.save() != null

        params.id = tipoDocumentoIdentidad.id

        def model = controller.edit()

        assert model.tipoDocumentoIdentidadInstance == tipoDocumentoIdentidad
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/tipoDocumentoIdentidad/list'

        response.reset()

        populateValidParams(params)
        def tipoDocumentoIdentidad = new TipoDocumentoIdentidad(params)

        assert tipoDocumentoIdentidad.save() != null

        // test invalid parameters in update
        params.id = tipoDocumentoIdentidad.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/tipoDocumentoIdentidad/edit"
        assert model.tipoDocumentoIdentidadInstance != null

        tipoDocumentoIdentidad.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/tipoDocumentoIdentidad/show/$tipoDocumentoIdentidad.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        tipoDocumentoIdentidad.clearErrors()

        populateValidParams(params)
        params.id = tipoDocumentoIdentidad.id
        params.version = -1
        controller.update()

        assert view == "/tipoDocumentoIdentidad/edit"
        assert model.tipoDocumentoIdentidadInstance != null
        assert model.tipoDocumentoIdentidadInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/tipoDocumentoIdentidad/list'

        response.reset()

        populateValidParams(params)
        def tipoDocumentoIdentidad = new TipoDocumentoIdentidad(params)

        assert tipoDocumentoIdentidad.save() != null
        assert TipoDocumentoIdentidad.count() == 1

        params.id = tipoDocumentoIdentidad.id

        controller.delete()

        assert TipoDocumentoIdentidad.count() == 0
        assert TipoDocumentoIdentidad.get(tipoDocumentoIdentidad.id) == null
        assert response.redirectedUrl == '/tipoDocumentoIdentidad/list'
    }
}
