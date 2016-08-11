"use strict";

/* === others === */
/* select value change */
function selectChange(elemid, mode) {
    $(elemid).val(mode);
    $(elemid).selectmenu("refresh");
}

/* fontsize selector change */
function selectChange_fontsize(value) {
    $("#fontsize-control-nav").val(value);
    $("#fontsize-control").val(value);
    $("#fontsize-control-nav").selectmenu("refresh");
    $("#fontsize-control").selectmenu("refresh");
}

/* display editor/binaryfile area control */
function LControllerVisible(elemid, fromid, ctrlid, ischecked) {
    var target = document.getElementById(elemid);
    var fromtarget = document.getElementById(fromid);
    var fortarget = document.getElementById(ctrlid);
    if (ischecked) {
        target.style.display = "inline-block";
    }
    else if (!ischecked) {
        target.style.display = "none";
    }
    fortarget.checked = ischecked;
}