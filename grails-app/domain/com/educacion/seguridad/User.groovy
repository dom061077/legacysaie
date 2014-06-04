package com.educacion.seguridad

import com.educacion.alumno.Alumno
import com.educacion.academico.Docente

class User {

	transient springSecurityService

	String username
	String password
    String realName
	boolean enabled
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
    Alumno alumno
    Docente docente
    String email


	static constraints = {
		username blank: false, unique: true
		password blank: false
        alumno blank:true, nullable: true
        docente blank: true,nullable: true
        realName blank:true,nullable:true
        email(blank: true,nullable:true,unique:true)
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
