
// Módulo para hacer elementos draggables
var DragAndDrop = (function () {

    var _draggables;
    var _self;

    var addEventListeners = function() {
        $.each(_draggables, function (i, item) {
            item.addEventListener('dragstart', dragStart);
            item.addEventListener('dragenter', dragEnter);
            item.addEventListener('dragover', dragOver);
            item.addEventListener('dragleave', dragLeave);
            item.addEventListener('drop', drop);
            item.addEventListener('dragend', dragEnd);
        });
    };

    function dragStart(e) {
        this.style.opacity = '0.4';
        _self = this;
       e.dataTransfer.effectAllowed = 'move';
       e.dataTransfer.setData('text/html', this.innerHTML);
    };

    function dragEnter (e) {
        //	Nada para evitar "bug"
    };

    function dragOver(e) {
        this.classList.add('over');
        if (e.preventDefault) {	//	Compatibilidad	con	IE
            e.preventDefault();
        }
        return false;
    };

    function dragLeave(e) {
        this.classList.remove('over');
    };

    function drop (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if	(_self	!=	this)	{
            _self.innerHTML	= this.innerHTML;
            this.innerHTML	= e.dataTransfer.getData('text/html');
        }

        return	false;
    };

    function dragEnd (e) {
        this.style.opacity = '1.0';
        $.each(_draggables, function (i, item)	{	//	Limpiar	clase
            item.classList.remove('over');
        });
    };

    return {
        hacerDraggable: function(draggables) {
                            _draggables = draggables;
                            addEventListeners();
        }
    }
})();