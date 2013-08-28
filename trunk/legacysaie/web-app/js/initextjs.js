


Ext.onReady(function(){

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