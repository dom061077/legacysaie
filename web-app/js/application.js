/*var floatingmessage;
if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
            floatingmessage = $('<div>Cargando... </div>').floatingMessage({
                position : "bottom-left",
                height : 15
            });

		}).ajaxStop(function() {
                floatingmessage.floatingMessage("destroy");
		});
	})(jQuery);
} */
    $(document).ready(function(){
        $.ajaxPrefilter(function( options, _, jqXHR ) {

            jqXHR.success(function(msg) {
                if(msg.accessdenied)
                    $('<div title="Mensaje"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>Tiene el acceso denegado a alguna funcionalidad</div>').dialog({
                        modal: true,
                        buttons: {
                            Ok: function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    });
                if(msg.loginredirect)
                    $('<div title="Mensaje"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>SesiÃ³n caducada</div>').dialog({
                        modal: true,
                        buttons: {
                            Ok: function() {
                                $( this ).dialog( "close" );
                                window.location=urlsesion;
                            }
                        }
                    });

            });

            jqXHR.error(function(jqXHR, status, error){
                 if(jqXHR.status==401)
                    window.location = urlsession;
            });


        });
    });
