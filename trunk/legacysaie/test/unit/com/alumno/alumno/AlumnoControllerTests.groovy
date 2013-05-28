package com.alumno.alumno



import org.junit.*
import grails.test.mixin.*

@TestFor(AlumnoController)
@Mock(Alumno)
class AlumnoControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/alumno/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.alumnoInstanceList.size() == 0
        assert model.alumnoInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.alumnoInstance != null
    }

    void testSave() {
        controller.save()

        assert model.alumnoInstance != null
        assert view == '/alumno/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/alumno/show/1'
        assert controller.flash.message != null
        assert Alumno.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/alumno/list'

        populateValidParams(params)
        def alumno = new Alumno(params)

        assert alumno.save() != null

        params.id = alumno.id

        def model = controller.show()

        assert model.alumnoInstance == alumno
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/alumno/list'

        populateValidParams(params)
        def alumno = new Alumno(params)

        assert alumno.save() != null

        params.id = alumno.id

        def model = controller.edit()

        assert model.alumnoInstance == alumno
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/alumno/list'

        response.reset()

        populateValidParams(params)
        def alumno = new Alumno(params)

        assert alumno.save() != null

        // test invalid parameters in update
        params.id = alumno.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/alumno/edit"
        assert model.alumnoInstance != null

        alumno.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/alumno/show/$alumno.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        alumno.clearErrors()

        populateValidParams(params)
        params.id = alumno.id
        params.version = -1
        controller.update()

        assert view == "/alumno/edit"
        assert model.alumnoInstance != null
        assert model.alumnoInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/alumno/list'

        response.reset()

        populateValidParams(params)
        def alumno = new Alumno(params)

        assert alumno.save() != null
        assert Alumno.count() == 1

        params.id = alumno.id

        controller.delete()

        assert Alumno.count() == 0
        assert Alumno.get(alumno.id) == null
        assert response.redirectedUrl == '/alumno/list'
    }
}
