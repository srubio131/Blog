// Módulo de geolocalización
var Geolocalizacion = (function () {

    var _lat;
    var _lon;

    var inicializar = function(lat, lon, mapa) {
        _lat = lat;
        _lon = lon;
        dibujarMapa(mapa);
    }

    var dibujarMapa = function(mapa) {
        var	gLatLng	= new google.maps.LatLng(_lat, _lon);
        var	opciones	=	{
            zoom:	    18,	//	0	=	mapa	del	mundo
            center:	    gLatLng,
            mapTypeId:	google.maps.MapTypeId.SATELLITE
        };
        var	divMap = $(mapa)[0];
        var	gMap   = new google.maps.Map(divMap, opciones);
        var	marker = new google.maps.Marker({position: gLatLng, map: gMap});
    }

    return {
        inicializar: function(lat, lon, mapa){ inicializar(lat, lon, mapa) }
    }
})();