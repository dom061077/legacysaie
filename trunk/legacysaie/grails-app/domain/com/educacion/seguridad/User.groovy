package com.educacion.seguridad

import com.educacion.alumno.Alumno

class User {

	transient springSecurityService

	String username
	String password
	boolean enabled
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
    Alumno alumno
    

	static constraints = {
		username blank: false, unique: true
		password blank: false
        alumno blank:false, nullable: false
	}

	static mapping = {
		password column: '`password`'
        alumno column: 'alumno',lazy: false

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
