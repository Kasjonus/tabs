ver = "alpha0111";
create_log = true;
document.addEventListener("DOMContentLoaded", loader, false);

function log(input) {
  if (create_log == true) console.log(input);
}

function load_Scripts(uris, callback) {
  if (!uris instanceof Array || uris.length < 1) {
    return false;
  }
  function add(i) {
    var uri = uris[i],
      s = document.createElement("script");
    s.src = uri + "?v=" + ver;
    document.head.appendChild(s);
    if (uris[++i]) {
      s.onload = function () {
        add(i);
      };
    } else if (typeof callback === "function") {
      s.onload = callback;
    }
  }
  add(0);
}

function load_style(uri, callback) {

  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = uri + "?v=" + ver;
  document.head.appendChild(style);

  if (typeof callback === "function") {
    script.onload = callback;
  }
}

function loader() {
  load_style("css/style.css");
  load_Scripts(
    ["js/functions.js", "session_objects/desktop.tab.js", "js/controls.tab.js"],
    Render_start
  );
}

var started = false;

function Render_start() {
  if (create_log === true && started === false) {
    Render(ostyle_objects);
    started = true;
  }
  Render(objects, false);
  Render(save());
}

function Render(objs, clean) {
  if (clean != false)
    document.getElementById("desktop").innerHTML = "";
  for (var id = 0; id < objs.length; id++) {
    var infor = objs[id];
    var obj = document.createElement("div");
    obj.className = "ostyle";
    if (infor.type != "icon")
      if (infor.normal == " 0")
        var normal = "--normal: 0; --fs: 100%; resize: none; width: calc(" + infor.size[0] + " * var(--normal) + var(--fs)); height: calc(" + infor.size[1] + " * var(--normal) + var(--fs)); ";
      else
        var normal = "--normal: 1; --fs: 0px; resize: both; width: " + infor.size[0] + "; height: " + infor.size[1] + "; ";
    else
      var normal = "--normal: 1; --fs: 0px; resize: none; width: " + infor.size[0] + "; height: " + infor.size[1] + "; ";


    obj.style = ("--x: " + infor.position[0] + "; --y: " + infor.position[1] + "; " + normal);

    var objc = document.createElement("div");
    objc.className = "content";
    obj.appendChild(objc);

    obj.className += (" " + infor.type);
    objc.className += (" " + infor.type);
    objc.innerHTML = infor.data;
    if (infor.func != "") objc.onclick = infor.func;

    if (typeof infor.controls != "undefined") {
      var controls = document.createElement("div");
      controls.className = "controls";

      for (var i = 0; i < (infor.controls.length); i++) {
        if (infor.controls[i] != "") {
          var control = document.createElement("div");
          control.className = "control";
          control.tabIndex = "0";
          var span = document.createElement("span");
          span.className = infor.controls[i];
          control.className += ("_" + infor.controls[i]);
          control.appendChild(span);
          controls.appendChild(control);
        }
      }

      if (infor.title != "") {
        var control = document.createElement("div");
        control.className = "titlebar";
        control.style = "--c: " + (infor.controls.length - 1) + ";";
        control.innerHTML = infor.title;
        controls.appendChild(control);
      }

      obj.appendChild(controls);
    }

    document.getElementById("desktop").appendChild(obj);
  }
  functions_load();
}