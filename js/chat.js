
// Módulo para Chat
var Chat = (function () {

    var _serverUrl;
    var _idChat;
    var _tipoChat; // 'ajax' ó 'webSockets'
    var _nick;
    var _intervalID;
    var	socket;
    var _pamelMensajes;

    /* Métodos privados*/
    function imprimirMensaje(m) {
        var etiquetap = document.createElement("p");
        etiquetap.innerHTML = m;
        $(_pamelMensajes).append(etiquetap);
    }

    /* Métodos publicos*/
    var unirse = function () {

        switch(_tipoChat) {
            case 'ajax':
                $.ajax({
                    method: "GET",
                    url: _serverUrl + "unirmeChat",
                    data: {nick: _nick},
                    dataType: "json",
                    success: function (data) {
                        _idChat = data.idChat;
                        _intervalID = window.setInterval(obtenerMensajes, 1000);
                    }
                });
                break;
            case 'webSockets':
                    socket = new WebSocket(_serverUrl+'?nick='+_nick);
                    socket.onmessage = function (event) {
                        imprimirMensaje(event.data);
                    };
                    /*socket.onopen = function (event) {
                        mandarMensaje()
                    };*/
                    socket.onerror = function (event) {
                        imprimirMensaje(event.data);
                    };
                    break;
        }
    };

    var obtenerMensajes = function() {
        switch(_tipoChat) {
            case 'ajax':
                $.ajax({
                    method:	"GET",
                    url:	_serverUrl	+	"getMensajes",
                    data:	{ idChat: _idChat },
                    dataType:	"json",
                    success: function (data)
                    {
                        if(data.returnMessage == 'ok' & data.mensajes.length > 0) {
                            for (var i=0; i<data.mensajes.length; i++) {
                                if (data.mensajes[i] != undefined)
                                    imprimirMensaje(data.mensajes[i]);
                            }
                        }
                    }
                });
                break;
        }
    };

    var mandarMensaje = function(msg) {
        switch(_tipoChat) {
            case 'ajax':
                var self = this;
                $.ajax({
                    method:	"GET",
                    url:	_serverUrl	+	"addMensaje",
                    data:	{ idChat: _idChat, mensaje: msg },
                    dataType:	"json",
                    success: function (data) {}
                });
                break;
            case 'webSockets':
                socket.send(msg);
        }
    };

    var desconectar = function() {
        switch(_tipoChat) {
            case 'ajax':
                $.ajax({
                    method:	"GET",
                    url:	_serverUrl	+	"desconectar",
                    data:	{ idChat: _idChat },
                    dataType:	"json",
                    success: function (data)
                    {
                        if(data.returnMessage == 'ok') {
                            // Detener timer de obtener mensajes
                            window.clearInterval(_intervalID);
                            imprimirMensaje(_nick+' se ha desconectado.');
                        }
                    }
                });
                break;
            case 'webSockets':
                if (socket.readyState != 3) // CLOSED
                {
                    socket.close();
                    imprimirMensaje(_nick+' se ha desconectado.');
                }
                break;
        }
    };

    return {
        unirseChat: function(nick, tipo, panelMensajes, url) {
                        _nick = nick;
                        _tipoChat = tipo;
                        _serverUrl = url;
                        _pamelMensajes = panelMensajes;
                        unirse();
                    },
        mandarMensaje: function(msg) { mandarMensaje(msg); },
        desconectarChat: desconectar
    }
})();