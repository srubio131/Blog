$(document).ready(function() {
    inicializarTresEnRaya ();
    inicializarChat();
    inicializarGeo();
    dibujarCanvas();

    $('article').on("drop", function() {
        dibujarCanvas();
        inicializarGeo();
        inicializarTresEnRaya ();
    });

    $('article').on("dragend", function() {
        dibujarCanvas();
    });

    inicializarDragAndDrop();
});

function inicializarTresEnRaya ()
{
    // Inicializar juego
    TresEnRaya.iniciarJuego();

    // Manejar el botón de juego
    $('#btnJuego').click(function() {
        if($('#btnJuego').val() == 'Finalizar')
            TresEnRaya.iniciarJuego();
        else
            TresEnRaya.cargarOpciones();
    });

    // Manejar clicks en el tablero
    $('#tablero tr td').click(function() {
        var self = this;
        if ($(self).val() === '' && $('#btnJuego').val() == 'Finalizar')
        {
            var columna = $(this).parent().children().index($(this));
            var fila = $(this).parent().parent().children().index($(this).parent());
            TresEnRaya.pintarCelda(self, fila, columna);
        }
    });
}

function inicializarChat()
{
    var serverUrl;

    // Manejar el botón de juego
    $('#btnChat').click(function() {
        var nick = $('#txtNickChat').val();
        if($('#btnChat').val() == 'Iniciar' && nick != "") {
            inicializar();
            var tipoChat;
            if ($('#ajax').is(':checked')) {
                tipoChat = 'ajax';
                serverUrl = "http://chatdiri2016.azurewebsites.net/";
            }
            else {
                tipoChat = 'webSockets';
                serverUrl = "ws://chatdiri2016.azurewebsites.net/WSChat";
            }
            // Unirse al chat
            Chat.unirseChat(nick, tipoChat, $('div#panelMensajes'), serverUrl);
            // Cambiar el nombre del botón
            $('#btnChat').val('Enviar');
        }
        else if ($('#btnChat').val() == 'Enviar' && nick != "") {
            Chat.mandarMensaje(nick);
        }
        // Limpiar el input del nick
        $("#txtNickChat").val('');
    });

    $('#btnFinChat').click(function() {
        Chat.desconectarChat();
        $('#btnChat').val('Iniciar');
    });

    /* Funciones */
    function inicializar () {
        // Limpiar el panel de mensajes
        $("div#panelMensajes").empty();
        // Limpiar el input del nick
        $("input[name=nickChat]").removeAttr("value");
        // Inicializar nombre boton
        $("#btnChat").val('Iniciar');
    };
}

function inicializarGeo()
{
    var content = $("#geomap")[0];
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(objPosition)
        {
            Geolocalizacion.inicializar(objPosition.coords.latitude, objPosition.coords.longitude, $("#geomap"));

        }, function(objPositionError) {
            switch (objPositionError.code)
            {
                case objPositionError.PERMISSION_DENIED:
                    content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
                    break;
                case objPositionError.POSITION_UNAVAILABLE:
                    content.innerHTML = "No se ha podido acceder a la información de su posición.";
                    break;
                case objPositionError.TIMEOUT:
                    content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
                    break;
                default:
                    content.innerHTML = "Error desconocido.";
            }
        }, {
            maximumAge: 75000,
            timeout: 15000
        });
    }
    else
    {
        content.innerHTML = "Su navegador no soporta la API de geolocalización.";
    }
}

function dibujarCanvas()
{
    console.log('entro');
    var canvas = $('#unCanvas')[0];
    var it = 10;

    // Inicializar canvas
    MiCanvas.inicializarCanvas(canvas);

    // Gradiente
    MiCanvas.nuevoGradiente(0,0,300,300);

    // Rectangulos
    MiCanvas.setFillColor('black');
    MiCanvas.setStrokeColor('red');
    for(var i=0; i < it;i++)
        MiCanvas.nuevoRectangulo(i+5,i+5,30,30);

    MiCanvas.setFillColor('white');
    MiCanvas.setStrokeColor('black');
    for(var i=canvas.width; i > 250; i--)
        MiCanvas.nuevoRectangulo(i-50,i-50,30,30);

    // Líneas
    MiCanvas.nuevaLinea(0,150,150,300);
    MiCanvas.setLineWidth(5);
    MiCanvas.nuevaLinea(150,0,300,150);

    // Arcos
    MiCanvas.setShadow();   // Activar el sombreado
    MiCanvas.nuevoArco(100,100,30,0,180,true);
    MiCanvas.nuevoArco(170,100,30,0,180,true);
    MiCanvas.nuevoArco(135,100,35,0,180,false);
    MiCanvas.unsetShadow(); // Desactivar el sombreado

    // Texto
    MiCanvas.nuevoTexto("¡Hola Canvas!",0,275);

    // Imagen
    MiCanvas.nuevaImagen("https://www.angularjs.org/favicon.ico", 220, 10);
}

function inicializarDragAndDrop()
{
    // Habilitar drag&drop en los articulos
    $('article').attr('draggable','true');

    // Hacer todos los articles draggables
    var draggables = $("article[draggable]");
    DragAndDrop.hacerDraggable(draggables);
}
