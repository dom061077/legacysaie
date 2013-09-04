


Ext.onReady(function(){
    Ext.BLANK_IMAGE_URL =blankimagePath+ '/extjs/resources/images/default/s.gif';
    Ext.form.TextFieldRemoteVal = function(config){
        Ext.form.TextFieldRemoteVal.superclass.constructor.call(this, config);
        if( this.urlRemoteVal ) {
            if( this.remoteValidation == 'onValidate' ) {
                this.on('valid', this.startRemoteVal.createDelegate(this));
            }else if( this.remoteValidation == 'onBlur' ) {
                this.on('blur', this.startRemoteVal.createDelegate(this));
            }
        }
    };

    Ext.extend(Ext.form.TextFieldRemoteVal, Ext.form.TextField, {
        remoteValidation: null, /* 'onValidate' or 'onBlur' */
        urlRemoteVal: null,
        timeout: 30,
        method: 'POST',
        badServerRespText: 'Error: bad server response during validation',
        badComText: 'Error: validation unavailable',

        // redefinition
        onRender : function(ct){
            Ext.form.TextFieldRemoteVal.superclass.onRender.call(this, ct);

            this.remoteCheckIcon = ct.createChild({tav:'div', cls:'x-form-remote-wait'});
            this.remoteCheckIcon.hide();
        },

        // private
        alignRemoteCheckIcon : function(){
            this.remoteCheckIcon.alignTo(this.el, 'tl-tr', [2, 2]);
        },

        // private
        getParams: function() {
            var tfp = (this.name||this.id)+'='+this.getValue();
            var p = (this.paramsRemoteVal?this.paramsRemoteVal:'');
            if(p){
                if(typeof p == "object")
                    tfp += '&' + Ext.urlEncode(p);
                else if(typeof p == 'string' && p.length)
                    tfp += '&' + p;
            }
            return tfp;
        },

        // public
        startRemoteVal: function() {
            var v = this.getValue();
            // don't start a remote validation if the value doesn't change (getFocus/lostFocus for example)
            if( this.lastValue != v ) {
                this.lastValue = v;
                if( this.transaction ) {
                    this.abort();
                }
                this.alignRemoteCheckIcon();
                this.remoteCheckIcon.show();
                var params = this.getParams();
                this.transaction = Ext.Ajax.request(
                    {method:this.method,
                    url:this.urlRemoteVal + (this.method=='GET' ? '?' + params : ''),
                    success: this.successRemoteVal, failure: this.failureRemoteVal,
                    scope: this,
                    timeout: (this.timeout*1000),
                    params:params
                });
            }
            // but if remote validation error, show it! (because validateValue reset it)
            else if( !this.isValid ) {
                this.markInvalid(this.currentErrorTxt);
            }
        },

        // public
        abort : function(){
            if(this.transaction){
                Ext.Ajax.abort(this.transaction);
            }
        },

        // private
        successRemoteVal: function(response) {
            this.transaction = null;
            this.remoteCheckIcon.hide();
            var result = this.processResponse(response);
            if(result) {
                if(result.errors) {
                    this.currentErrorTxt = result.errors;
                    this.markInvalid(this.currentErrorTxt);
                    this.isValid = false;
                } else {
                    this.isValid = true;
                }
            }else{
                this.currentErrorTxt = this.badServerRespText;
                this.markInvalid(this.currentErrorTxt);
                this.isValid = false;
            }
        },

        // private
        failureRemoteVal: function(response) {
            this.transaction = null;
            this.remoteCheckIcon.hide();
            this.currentErrorTxt = this.badComText;
            this.markInvalid(this.currentErrorTxt);
            this.isValid = false;
        },

        // private
        processResponse: function(response) {
            return (!response.responseText ? false : Ext.decode(response.responseText));
        }

    });



            Ext.override(Ext.data.Store,{
                listeners:{
                    exception: function (dataproxy, tipo, action, options, response,  arg ) {
                        if(response.status==401){
                            window.location = loginurl;
                        }else{
                            if(response.status==0){
                                Ext.Msg.show({
                                    title:'Error'
                                    , icon:Ext.MessageBox.ERROR
                                    , msg:'Error de comunicación, verifique su conexión a la web'
                                    , buttons:Ext.MessageBox.OK
                                    , fn: function(btn){
                                     }
                                });
                            }else{
                                Ext.Msg.show({
                                    title:'Error'
                                    , icon:Ext.MessageBox.ERROR
                                    , msg:'Error general, intente más tarde y verifique su conexión a la web'
                                    , buttons:Ext.MessageBox.OK
                                    , fn: function(btn){
                                    }
                                });
                            }
                        }
                    }
                }
            });


            Ext.form.ComboBox.prototype.doQuery = function(q, forceAll){
                q = Ext.isEmpty(q) ? '' : q;
                var qe = {
                    query: q,
                    forceAll: forceAll,
                    combo: this,
                    cancel:false
                };
                if(this.fireEvent('beforequery', qe)===false || qe.cancel){
                    return false;
                }
                q = qe.query;
                forceAll = qe.forceAll;
                if(forceAll === true || (q.length >= this.minChars)){
                    if(this.lastQuery !== q){
                        this.lastQuery = q;
                        if(this.mode == 'local'){
                            this.selectedIndex = -1;
                            if(forceAll){
                                this.store.clearFilter();
                            }else{
                                this.store.filter(this.displayField, q, true); // supply the anyMatch option
                            }
                            this.onLoad();
                        }else{
                            this.store.baseParams[this.queryParam] = q;
                            this.store.load({
                                params: this.getParams(q)
                            });
                            this.expand();
                        }
                    }else{
                        this.selectedIndex = -1;
                        this.onLoad();
                    }
                }
            };

            /*var msgBox = Ext.MessageBox.show({
                title: 'Sesión Inactiva',
                msg: 'Por favor ingrese de nuevo.',
                progressText: 'Exiting in 5...',
                progress: true,
                closable: false
            });

            /*Ext.TaskMgr.start({
                run: function(count) {
                    if(count == 5) {
                        window.location = '';
                    }
                    msgBox.updateProgress(count/5,'Exiting in '+(5-count)+'...');
                },
                interval: 1000
            });
            */



});