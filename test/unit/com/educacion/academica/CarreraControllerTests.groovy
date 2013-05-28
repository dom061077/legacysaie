package com.educacion.academica



import org.junit.*
import grails.test.mixin.*

@TestFor(CarreraController)
@Mock(Carrera)
class CarreraControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/carrera/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.carreraInstanceList.size() == 0
        assert model.carreraInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.carreraInstance != null
    }

    void testSave() {
        controller.save()

        assert model.carreraInstance != null
        assert view == '/carrera/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/carrera/show/1'
        assert controller.flash.message != null
        assert Carrera.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/carrera/list'

        populateValidParams(params)
        def carrera = new Carrera(params)

        assert carrera.save() != null

        params.id = carrera.id

        def model = controller.show()

        assert model.carreraInstance == carrera
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/carrera/list'

        populateValidParams(params)
        def carrera = new Carrera(params)

        assert carrera.save() != null

        params.id = carrera.id

        def model = controller.edit()

        assert model.carreraInstance == carrera
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/carrera/list'

        response.reset()

        populateValidParams(params)
        def carrera = new Carrera(params)

        assert carrera.save() != null

        // test invalid parameters in update
        params.id = carrera.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/carrera/edit"
        assert model.carreraInstance != null

        carrera.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/carrera/show/$carrera.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        carrera.clearErrors()

        populateValidParams(params)
        params.id = carrera.id
        params.version = -1
        controller.update()

        assert view == "/carrera/edit"
        assert model.carreraInstance != null
        assert model.carreraInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/carrera/list'

        response.reset()

        populateValidParams(params)
        def carrera = new Carrera(params)

        assert carrera.save() != null
        assert Carrera.count() == 1

        params.id = carrera.id

        controller.delete()

        assert Carrera.count() == 0
        assert Carrera.get(carrera.id) == null
        assert response.redirectedUrl == '/carrera/list'
    }
}
