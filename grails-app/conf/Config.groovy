// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

// if (System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }

import org.apache.log4j.Level
import org.apache.log4j.net.SMTPAppender
import org.apache.log4j.RollingFileAppender
import org.apache.log4j.DailyRollingFileAppender
//import org.apache.log4j.
//TimeBasedRollingPolicy

mail.error.server = 'smtp.gmail.com'
mail.error.port = 587
mail.error.username = 'mi@mail.com'
mail.error.password = 'mipassword'
mail.error.to = 'mi@mail.com'
mail.error.from = 'grails app test'
mail.error.subject = '[Application Error]'
mail.error.starttls = true
//mail.error.debug = true


grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination
grails.mime.file.extensions = true // enables the parsing of file extensions from URLs into the request format
grails.mime.use.accept.header = false
grails.mime.types = [
    all:           '*/*',
    atom:          'application/atom+xml',
    css:           'text/css',
    csv:           'text/csv',
    form:          'application/x-www-form-urlencoded',
    html:          ['text/html','application/xhtml+xml'],
    js:            'text/javascript',
    json:          ['application/json', 'text/json'],
    multipartForm: 'multipart/form-data',
    rss:           'application/rss+xml',
    text:          'text/plain',
    xml:           ['text/xml', 'application/xml']
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// What URL patterns should be processed by the resources plugin
grails.resources.adhoc.patterns = ['/images/*', '/css/*', '/js/*', '/plugins/*']
//grails.resources.adhoc.includes = []
//grails.resources.adhoc.excludes = ["*"]

//grails.json.legacy.builder = true

// The default codec used to encode data with ${}
grails.views.default.codec = "none" // none, html, base64
grails.views.gsp.encoding = "UTF-8"
grails.converters.encoding = "UTF-8"
// enable Sitemesh preprocessing of GSP pages
grails.views.gsp.sitemesh.preprocess = true
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart=false

//grails.plugins.springsecurity.active = false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

environments {
    development {
        grails.logging.jul.usebridge = true
    }
    production {
        grails.logging.jul.usebridge = false
        // TODO: grails.serverURL = "http://www.changeme.com"
    }
}

// log4j configuration
log4j = {
    // Example of changing the log pattern for the default console appender:
    //
    System.setProperty 'mail.smtp.port', mail.error.port.toString()
    System.setProperty 'mail.smtp.starttls.enable', mail.error.starttls.toString()


    def rollingFile = new RollingFileAppender(name: 'rollingFileAppender', layout: pattern(conversionPattern: "%d [%t] %-5p %c{2} %x - %m%n"))



    appenders {
        appender new DailyRollingFileAppender(
                name: 'dailyAppender',
                datePattern: "'.'yyyy-MM-dd",  // See the API for all patterns.
                fileName: "logs/${appName}.log",
                layout: pattern(conversionPattern:'%d [%t] %-5p %c{2} %x - %m%n')
        )

        console name:'stdout', layout:pattern(conversionPattern: '%c{2} %m%n')
        /*appender new SMTPAppender(name: 'smtp', to: mail.error.to, from: mail.error.from,
                subject: mail.error.subject, threshold: Level.ERROR,
                SMTPHost: mail.error.server, SMTPUsername: mail.error.username,
                SMTPDebug: mail.error.debug.toString(), SMTPPassword: mail.error.password,
                layout: pattern(conversionPattern:
                        '%d{[ dd.MM.yyyy HH:mm:ss.SSS]} [%t] %n%-5p %n%c %n%C %n %x %n %m%n'
                )) */
    }

    error  'org.codehaus.groovy.grails.web.pages',          // GSP
           'org.codehaus.groovy.grails.web.sitemesh',       // layouts
           'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
           'org.codehaus.groovy.grails.web.mapping',        // URL mapping
           'org.codehaus.groovy.grails.commons',            // core / classloading
           'org.codehaus.groovy.grails.plugins',            // plugins
           'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
           'org.springframework',
           'org.hibernate',
           'net.sf.ehcache.hibernate'

    //debug dailyAppender:['org.hibernate.SQL','grails.app.controllers']
    //trace dailyAppender: ['org.hibernate.type']

    //trace 'org.hibernate.type'
    //debug 'org.hibernate.SQL'
    debug  'grails.app.controllers.com'
    root {
        error 'stdout'/*, 'smtp'*/
       // additivity = true
        //debug 'stdout'
    }
}

// Added by the Spring Security Core plugin:
grails.plugins.springsecurity.userLookup.userDomainClassName = 'com.educacion.seguridad.User'
grails.plugins.springsecurity.userLookup.authorityJoinClassName = 'com.educacion.seguridad.UserRole'
grails.plugins.springsecurity.authority.className = 'com.educacion.seguridad.Role'
grails.plugins.springsecurity.requestMap.className = 'com.educacion.seguridad.RequestMap'
grails.plugins.springsecurity.securityConfigType = 'Requestmap'

grails.plugins.springsecurity.successHandler.defaultTargetUrl = '/login/authSucccessAjax'
grails.plugins.springsecurity.successHandler.alwaysUseDefault = true
grails.plugins.springsecurity.failureHandler.defaultFailureUrl = '/login/authFailExtJs?login_error=1'

grails {
    mail {
        host = "smtp.gmail.com"
        port = 465
        username = "dom061077@gmail.com"
        password = "******"
        props = ["mail.smtp.auth":"true",
                "mail.smtp.socketFactory.port":"465",
                "mail.smtp.socketFactory.class":"javax.net.ssl.SSLSocketFactory",
                "mail.smtp.socketFactory.fallback":"false"]

    }
}