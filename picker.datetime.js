(function (factory) {
    if (typeof define === 'function' && define.amd) {
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.pickadatetime = function (options) {
        var _wrap = '<div class="picker-wrap"></div>';
        var _pickers = '<div class="hidden-picker"><input type="text" class="date"/><input type="text" class="time"/></div><div class="output"></div>';
        $(this).wrap(_wrap).after(_pickers);
        var _date = $(this).next('.hidden-picker').children('.date');
        var _time = $(this).next('.hidden-picker').children('.time');
        var _output = $(this).next('.hidden-picker').next('.output');

        var datepicker = _date.pickadate({
                container: _output,
                onSet: function(item) {
                    if ( 'select' in item ) setTimeout( timepicker.open, 0 )
                }
            }).pickadate('picker');

        var timepicker = _time.pickatime({
                container: _output,
                onRender: function() {
                    $('<button class="picker-back">返回日期</button>').
                        on('click', function() {
                            timepicker.close()
                            datepicker.open()
                        }).prependTo( this.$root.find('.picker__box') )
                },
                onSet: function(item) {
                    if ( 'select' in item ) setTimeout( function() {
                        $datetime.
                            off('focus').
                            val( datepicker.get() + ' ' + timepicker.get() ).
                            focus().
                            on('focus', datepicker.open)
                    }, 0 )
                }
            }).pickatime('picker');

        var $datetime = $(this).on('focus', datepicker.open).on('click', function(event) {
            event.stopPropagation();
            datepicker.open();
        });
    };
}));