"use strict";

/* editor cursor position update */
function updateCursorPosition() {
    var position = editor.getCursorPosition();
    // indicate cursor postion elements
    document.getElementById("cur-row").innerText = position.row + 1;
    document.getElementById("cur-col").innerText = position.column + 1;
    document.getElementById("all-lines").innerText = editor.getSession().getLength();
}

/* editor control functions */
function topLine() {
    editor.navigateFileStart()
    editor.gotoPageUp();
    editor.focus();
}
function bottomLine() {
    editor.navigateFileEnd();
    editor.gotoPageDown();
    editor.focus();
}
function visibleTop() {
    editor.gotoLine(editor.getFirstVisibleRow());
    editor.gotoPageUp();
    editor.focus();
}
function visibleBottom() {
    editor.gotoLine(editor.getLastVisibleRow());
    editor.gotoPageDown();
    editor.focus();
}
function lineStart() {
    editor.navigateLineStart();
    editor.focus();
}
function lineEnd() {
    editor.navigateLineEnd();
    editor.focus();
}
function editorUndo() {
    editor.undo();
    editor.focus();
}
function editorRedo() {
    editor.redo();
    editor.focus();
}


/* code formatting (by js-beautify) */
function jsbeautify() {
    var mode = getModeStr(editor.getSession().getMode().$id);
    var formatCode = modeBeautify(mode, editor.session.getValue());
    if (formatCode === "Not applicable") {
        return;
    }
    else {
        editor.setValue(formatCode, -1);
        toastr.success("code formatted.<br>mode:" + mode);
    }
}

function modeBeautify(mode, editorValue) {
    var formatStr = "";

    switch (mode) {
        case "javascript":
            formatStr = js_beautify(editorValue);
            break;

        case "css":
            formatStr = css_beautify(editorValue);
            break;

        case "html":
            formatStr = html_beautify(editorValue);
            break;

        default:
            toastr.warning("only [html/css/javascript] code.<br>Please check the mode of the editor.");
            formatStr = "Not applicable";
    }

    return formatStr;
}

/* get editor mode */
function getModeStr(modeStr) {
    var mode = function () {
        var value = modeStr.split("/");
        return value[2];
    } ();
    return mode;
}