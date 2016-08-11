/* jQuery */
$(function () {
    /* === UI === */
    /* button */
    $("input[type=submit], button").button();
    $("input[type=checkbox], input[type=radio]").checkboxradio({
        icon: false
    });
    /* select */
    /* mode control */
    $("#mode-control").selectmenu({
        change: function (e) {
            editor.getSession().setMode("ace/mode/" + $(e.target).val());
            editor.focus();
        }
    });
    $("#mode-control-nav").selectmenu({
        change: function (e) {
            editor.getSession().setMode("ace/mode/" + $(e.target).val());
            editor.focus();
        }
    });
    /* font size control */
    $("#fontsize-control").selectmenu({
        change: function (e) {
            editor.setFontSize(parseInt($(e.target).val()));
            toastr.info("fontsize:" + $(e.target).val());
            selectChange("#fontsize-control", $(e.target).val());
            selectChange("#fontsize-control-nav", $(e.target).val());
            editor.focus();
        }
    });
    $("#fontsize-control-nav").selectmenu({
        change: function (e) {
            editor.setFontSize(parseInt($(e.target).val()));
            toastr.info("fontsize:" + $(e.target).val());
            selectChange("#fontsize-control", $(e.target).val());
            selectChange("#fontsize-control-nav", $(e.target).val());
            editor.focus();
        }
    });

    /* tooltip */
    $(document).tooltip();
    /* control group */
    $("#panel-header").controlgroup();
    $("#panel-header-m").controlgroup();
    $("#line-control").controlgroup();
    $("#panel-line-control").controlgroup();
    /* drawer */
    $(document).ready(function () {
        $(".drawer").drawer();
    });

    /* === ready === */
    /* ace editor menu open */
    $("#btn-editormenu").click(function (e) {
        editor.execCommand("showSettingsMenu");
    });
    $("#btn-editormenu-nav").click(function (e) {
        editor.execCommand("showSettingsMenu");
    });
});

/* other fn */
; (function ($) {

    /* ace editor menu open */
    $.fn.editorMenuOpen = function () {
        $(this).click(function (e) {
            editor.execCommand("showSettingsMenu");
        });
    }

})(jQuery);


