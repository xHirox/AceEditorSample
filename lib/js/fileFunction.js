"use strict";

/* === file control == */
/* fileAPI check */
function fileAPICheck() {
    var APIChecker;
    if (window.File) {
        APIChecker = true;
    }
    else {
        APIChecker = false;
        toastr.warning("The File APIs are not fully supported in this browser.");
    }
    return APIChecker;
}

/* extension check */
function extCheck(filename) {
    var value = "";
    var ext = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
    switch (ext) {
        case ("html"):
            value = "html";
            break;
        case ("htm"):
            value = "html";
            break;
        case ("js"):
            value = "javascript";
            break;
        case ("ts"):
            value = "typescript";
            break;
        case ("css"):
            value = "css";
            break;
        case ("json"):
            value = "json";
            break;
        case ("php"):
            value = "php";
            break;
        case ("cs"):
            value = "csharp";
            break;
        case ("java"):
            value = "java";
            break;
        case ("rb"):
            value = "ruby";
            break;
        case ("xml"):
            value = "xml";
            break;
        case ("txt"):
            value = "text";
            break;
        default:
            value = "text";
            break;
    }
    return value;
}

/* revease to extension */
function revExtCheck(filemode) {
    var value = "";
    switch (filemode) {
        case ("html"):
            value = "html";
            break;
        case ("htm"):
            value = "html";
            break;
        case ("javascript"):
            value = "js";
            break;
        case ("typescript"):
            value = "ts";
            break;
        case ("css"):
            value = "css";
            break;
        case ("json"):
            value = "json";
            break;
        case ("php"):
            value = "php";
            break;
        case ("csharp"):
            value = "cs";
            break;
        case ("java"):
            value = "java";
            break;
        case ("ruby"):
            value = "rb";
            break;
        case ("xml"):
            value = "xml";
            break;
        case ("text"):
            value = "txt";
            break;
        default:
            value = "txt";
            break;
    }
    return value;
}

/* === file open === */
/* text file read */
function fileOpen() {
    if (editchange) {
        var conf = confirm("Save Changes?");
        if (conf) {
            fileSave();
            return;
        }
    }
    var checker = fileAPICheck();
    if (!checker) {
        return;
    }
    document.getElementById("btn-open").addEventListener("change", function (e) {
        var input = document.getElementById("btn-open").files[0];
        var ext = extCheck(input.name);
        var reader = new FileReader();

        reader.addEventListener("progress", function (event) {
            for (var i = 0; i < (event.loaded / event.total * 100); i++) {
                document.getElementById("open-progress").innerText = Math.floor(event.loaded / event.total * 100) + "%";
            }

        }, true);

        reader.readAsText(input, "UTF-8");

        reader.addEventListener("load", function (ev) {
            editor.setValue(reader.result, -1);
            var fileinfo = [
                "name: " + input.name,
                "type: " + input.type,
                "size(KB): " + Math.round((input.size / 1024) * 100) / 100,
                "last modified: " + input.lastModifiedDate.toLocaleDateString(),
                "urn: " + input.urn
            ];
            var info = fileinfo.join("<br>");

            document.getElementById("open-filename").innerText = input.name;
            editor.getSession().setMode("ace/mode/" + ext);
            toastr.success(info);
            editchange = false;
        }, true);

        reader.addEventListener("error", function (evt) {
            document.getElementById("open-filename").innerText = "File Read Error";
            var errmsg = [
                "",
                "NOT_FOUND_ERR\nファイルが見つかりません",
                "SECURITY_ERR\nセキュリティエラー",
                "ABORT_ERR\nファイルの読込が中断されました",
                "NOT_READABLE_ERR\nファイルの読み込み権限がありません",
                "ENCODING_ERR\nサイズ制限を超えました"
            ];
            toastr.error(errmsg[reader.error.code]);
            return;
        }, true);

        editor.focus();

    }, false);
}

/* === file save === */
function fileSave() {
    var savetext = editor.getSession().getValue();
    var ext = revExtCheck(function () {
        var value = editor.getSession().getMode().$id;
        var mode = value.split("/");
        return mode[2];
    } ());
    var blob = new Blob([savetext], { type: "text/" + ext });

    var dl_a = document.createElement("a");
    dl_a.href = URL.createObjectURL(blob);
    dl_a.tartget = "_blank";
    dl_a.download = function () {
        var fname = document.getElementById("open-filename").innerText;

        if (fname.startsWith("*")) {
            fname = fname.substring(1);

        }
        fname = fname.replace("File: ", "");
        if (fname === "Untitled") {
            fname += "." + ext;
            var today = moment();
            today = today.format("YYYYMMDD");
            fname = today + "_" + fname;
        }
        return fname;
    } ();
    dl_a.click();

    URL.revokeObjectURL(blob);

    toastr.success("saved.")
}