// Módulo para dibujar en un canvas
var MiCanvas = (function () {

    var _contextoCanvas;

    /* Métodos publicos*/
    var dibujarRectangulo = function (x,y,width,height) {
        _contextoCanvas.strokeRect(x,y,width,height);
        _contextoCanvas.fillRect(x-5,y-5,width,height);
        _contextoCanvas.fillRect(x-10,y-10,width,height);
    };

    var dibujarLinea = function(xIni,yFin, x,y) {
        _contextoCanvas.beginPath();
        _contextoCanvas.moveTo(xIni,yFin);
        _contextoCanvas.lineTo(x,y);
        _contextoCanvas.stroke();
    };

    var dibujarArco = function(x, y, radio,	startAngle,	endAngle, antihorario) {
        _contextoCanvas.beginPath();
        _contextoCanvas.arc(x, y, radio, (Math.PI/180)*startAngle, (Math.PI/180)*endAngle, antihorario);
        _contextoCanvas.stroke();
    };

    var dibujarGradiente = function(xIni, yIni, xFin, yFin) {
        var lingrad = _contextoCanvas.createLinearGradient(xIni, yIni, xFin, yFin);
        lingrad.addColorStop(0, '#f1da36');
        lingrad.addColorStop(0.75, '#EFE7AE');

        _contextoCanvas.fillStyle=lingrad;
        _contextoCanvas.fillRect(xIni, yIni, xFin, yFin);
    };

    var dibujarTexto = function(texto,x,y) {
        _contextoCanvas.textAlign = "left";
        _contextoCanvas.font = "25px sans-serif"
        _contextoCanvas.fillText(texto,x,y);
    };

    var dibujarImagen = function(urlImage,x,y) {
        var img = new Image();
        img.onload = function() {
            _contextoCanvas.drawImage(img, x, y);
        };
        img.src = urlImage;
    };

    return {
        inicializarCanvas : function(canvas) {
                                _contextoCanvas = canvas.getContext("2d");
                                _contextoCanvas.fillStyle = 'white';       // Valores por defecto
                                _contextoCanvas.strokeStyle = 'black';     // Valores por defecto
        },
        setFillColor : function(color) { _contextoCanvas.fillStyle = color; },
        setStrokeColor : function(color) { _contextoCanvas.strokeStyle = color; },
        setLineWidth : function(width) { _contextoCanvas.lineWidth=width; },
        setShadow: function() { _contextoCanvas.shadowOffsetX = 10;
                                _contextoCanvas.shadowOffsetY = 10;
                                _contextoCanvas.shadowBlur = 5;
                                _contextoCanvas.shadowColor = 'black';
        },
        unsetShadow: function() { _contextoCanvas.shadowOffsetX = 0;
                                _contextoCanvas.shadowOffsetY = 0;
        },
        nuevoRectangulo: function(x,y,width,height) { dibujarRectangulo(x,y,width,height); },
        nuevaLinea: function(xIni,yFin, x,y) { dibujarLinea(xIni,yFin, x,y) },
        nuevoArco: function(x, y, radio, startAngle, endAngle, antihorario) { dibujarArco(x, y, radio,	startAngle,	endAngle, antihorario); },
        nuevoGradiente: function(xIni, yIni, xFin, yFin) { dibujarGradiente(xIni, yIni, xFin, yFin); },
        nuevoTexto: function(texto,x,y) { dibujarTexto(texto,x,y); },
        nuevaImagen: function(urlImage,x,y) { dibujarImagen(urlImage,x,y); }
    }
})();
