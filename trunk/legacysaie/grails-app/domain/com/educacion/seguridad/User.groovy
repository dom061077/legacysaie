package com.educacion.seguridad

import com.educacion.alumno.Alumno
import com.educacion.academico.Docente

class User {

	transient springSecurityService

	String username
	String password
	boolean enabled
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
    Alumno alumno
    Docente docente


	static constraints = {
		username blank: false, unique: true
		password blank: false
        alumno blank:true, nullable: true
        docente blank: true,nullable: true
	}

	static mapping = {
		password column: '`password`'
        alumno column: 'alumno',lazy: false
        docente column: 'docente',lazy: false

	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
}
