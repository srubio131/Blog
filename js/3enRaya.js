
// Módulo del juego 3 en raya
var TresEnRaya = (function () {

    var _turno = 1;
    var _numJugadores = 1;   // 1--> Un Jugador, 2 --> Dos Jugadores
    var _tablero;
    var _nicksJugadores = [];


    /* Métodos privados*/

    // Obtiene el elemento td de la posición dada. (0,0)...(2,2)
    var tdByPosition = function(fila,columna) {
        fila += 1
        columna += 1
        var colums = $("table[id=tablero] tr td:nth-child("+columna+")");
        return $(colums[fila-1]);
    };

    var inicializar = function () {
        // Inicializar variables
        _turno = 1;
        _tablero = [['','',''],['','',''],['','','']];
        _nicksJugadores = [];

        // Limpiar el tablero
        $("table[id=tablero] td").each(function(index)
        {
           $(this).empty();
        });

        // Limpiar el panel de resultados
        $("div#resultados").empty();
        // Limpiar el input del nick
        $("input[name=nick]").removeAttr("value");
        // Inicializar el placeholder
        $("input[name=nick]").attr("placeholder", "Nick del jugador 1");
        // Inicializar nombre boton
        $("#btnJuego").val('Iniciar');
        // Mostrar el input si estaba oculto
        $('#txtNick').val('');
        $('#txtNick').show();
    };

    var imprimirMensaje = function (msg) {
        msg = msg || '';    // Valor por defecto
        var etiquetap = document.createElement("p");
        etiquetap.innerHTML = msg;
        $("div#resultados").append(etiquetap);
    };

    var hayGanador = function () {
        // Comprobar filas
        for(var fila=0;fila<3;fila++)
        {
            if(_tablero[fila][0] === "X" && _tablero[fila][1] === "X" && _tablero[fila][2] == "X")
                    return _nicksJugadores[0]; // Ha ganado el primer jugador
            else if(_tablero[fila][0] === "O" && _tablero[fila][1] === "O" && _tablero[fila][2] == "O")
                    return _nicksJugadores[1]; // Ha ganado el segundo jugador
        }
        // Comprobar columnas
        for(var col=0;col<3;col++)
        {
            if(_tablero[0][col] === "X" && _tablero[1][col] === "X" && _tablero[2][col]=="X")
                    return _nicksJugadores[0]; // Ha ganado el primer jugador
            else if(_tablero[0][col] === "O" && _tablero[1][col] === "O" && _tablero[2][col]=="O")
                    return _nicksJugadores[1]; // Ha ganado el segundo jugador
        }
        // Comprobar diagonales
        if((_tablero[0][0] === "X" && _tablero[1][1] === "X" && _tablero[2][2] == "X") || (_tablero[2][0] === "X" && _tablero[1][1] === "X" && _tablero[0][2]=="X"))
            return _nicksJugadores[0]; // Ha ganado el primer jugador
        else if((_tablero[0][0] === "O" && _tablero[1][1] === "O" && _tablero[2][2] == "O") || (_tablero[2][0] === "O" && _tablero[1][1] === "O" && _tablero[0][2]=="O"))
            return _nicksJugadores[1]; // Ha ganado el segundo jugador

        // No ha ganado nadie
        return '';
    };

    var finalizar = function (nickGanador) {
        var mensajeFin = "";

        if (nickGanador !== "")    // Hay ganador
            mensajeFin = "¡El ganador es: "+nickGanador+"!";
        else
            mensajeFin = "¡Estais empatados!";

        imprimirMensaje(mensajeFin);
    };

    var cargarOpciones = function() {
        var nick = $('#txtNick').val();
        // Seleccionado jugador1 y  nick insertado
        if($('#jugador1').is(':checked') && nick != "") {
            //Guardar nicks
            _nicksJugadores[0] = nick;
            _nicksJugadores[1] = "PC";
            // Cambiar nombre boton
            $("#btnJuego").val('Finalizar');
            // Guardar el numero de jugadores
            _numJugadores = 1;
            // Ocultar el input de nicks
            $('#txtNick').hide();
        }
        // Seleccionado jugador2 y nick insertado
        else if($('#jugador2').is(':checked') && nick != "") {
            // Guardar el numero de jugadores
            _numJugadores = 2;
            if($('#txtNick').attr('placeholder') == 'Nick del jugador 1') {
                // Guardar nick
                _nicksJugadores[0] = nick;
                // Cambiar placeholder para jugador 2
                $('#txtNick').attr('placeholder', 'Nick del jugador 2');
                // Vaciar input
                $('#txtNick').val('');
                // Cambir nombre boton
                $("#btnJuego").val('>> Siguiente');
            }
            else if($('#txtNick').attr('placeholder') == 'Nick del jugador 2') {
                // Guardar nick
                _nicksJugadores[1] = nick;
                // Cambir nombre boton
                $("#btnJuego").val('Finalizar');
                // Ocultar el input de nicks
                $('#txtNick').hide();
                // Imprimir texto turno
                imprimirMensaje('Turno de '+_nicksJugadores[0]);
            }
        }
    };

    var pintarSimbolo= function(td, fila, columna) {

        if ($(td).is(':empty')) {
            if (_turno % 2 != 0) {    // Es el jugador 1
                $(td).html('X');
                _tablero[fila][columna] = 'X';
                //$(td).off('click');
                if (_numJugadores == 1 & _turno < 9 & hayGanador() == '')
                    IAEasy();
                else if (_numJugadores == 2)
                    imprimirMensaje('Turno de ' + _nicksJugadores[1]);

            } else if (_turno % 2 == 0) {
                $(td).html('O');
                _tablero[fila][columna] = 'O';
                if (_numJugadores == 2)
                    imprimirMensaje('Turno de ' + _nicksJugadores[0]);
            }
            // Cambiar el turno del jugador
            _turno += 1;

            // Terminar el juego
            var nickGanador = hayGanador();
            // Ya no puedo hacer más movimientos
            if (_turno > 9)
                finalizar(nickGanador);
            else if (nickGanador != '') // Hay ganador
                finalizar(nickGanador);
        }
    };

    var IAEasy = function() {
        var huecoEncontrado = false;
        while (huecoEncontrado == false) {
            var frandom = Math.floor((Math.random() * 3)); // Número random de 0 a 2
            var crandom = Math.floor((Math.random() * 3)); // Número random de 0 a 2
            if (_tablero[frandom][crandom] !== "X" && _tablero[frandom][crandom] !== "O") {
                var td = tdByPosition(frandom,crandom)
                $(td).html('O');
                _tablero[frandom][crandom] = 'O';
                _turno += 1;
                huecoEncontrado = true;
            }
        }
    };

    /* Métodos públicos*/

    return {
        iniciarJuego: inicializar,
        cargarOpciones: cargarOpciones,
        pintarCelda: function(td, fila, columna) { pintarSimbolo(td, fila, columna) }
    }
})();
