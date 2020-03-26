function functions_load() {

  var forms = getBy("Class", "ostyle");

  log("Forms:");
  log(forms);

  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("mousedown", mouse_down, true);
  }
  document.addEventListener("mouseup", mouse_up, true);
  document.addEventListener("mousemove", mouse_move, true);

  log("Loaded");
}

function getBy(type, Name) {
  switch (type) {
    case "Class":
      return document.getElementsByClassName(Name);
    case "id":
      return document.getElementById(Name);
  }
}

function getformbyevent(e, controls) {
  var forms = getBy("Class", "ostyle");
  for (i = 0; i < forms.length; i++) {
    if (e.target.parentNode.parentNode == forms[i] && e.target.className == "titlebar") {
      forms[i].parentNode.appendChild(forms[i]);
      var form = forms[i];
    }
    else if (e.target.parentNode.parentNode.parentNode == forms[i] && e.target.parentNode.parentNode.className == "controls" && controls == true) {
      forms[i].parentNode.appendChild(forms[i]);
      if (e.target.parentNode.parentNode.className == "controls")
        switch (e.target.className) {
          case "min":
            min(i);
            break;
          case "max":
            max();
            break;
          case "close":
            del();
            break;
        }
    }
  }
  return form;
}
function mouse_down(e) {
  f = getformbyevent(e);
  if (f != null && f.style.getPropertyValue("--normal") != 0) {
    offset = [f.offsetLeft - e.clientX, f.offsetTop - e.clientY];
  }
  else
    delete f;
}
function mouse_move(e) {
  if (typeof f !== "undefined") {
    var Posit = {
      x: e.clientX,
      y: e.clientY
    };
    f.style.left = Posit.x + offset[0] + "px";
    f.style.top = Posit.y + offset[1] + "px";
  }
}
function mouse_up(e) {
  getformbyevent(e, true);
  delete f;
  delete offset;
}

function add_info() {
  Render([ostyle_objects[4]], false);
  Render(save());
}

function save(callback) {
  var ostyles = getBy("Class", "ostyle");
  var save_objects = [];
  for (var i = 0; i < ostyles.length; i++) {
    var ostyle = ostyles[i];
    var controls = [];

    if (ostyle.style.left == "") var x = ostyle.style.getPropertyValue("--x");
    else var x = ostyle.style.left;

    if (ostyle.style.top == "") var y = ostyle.style.getPropertyValue("--y");
    else var y = ostyle.style.top;

    for (var ci = 0; ci < ostyle.lastElementChild.childNodes.length; ci++)
      if (ostyle.lastElementChild.childNodes[ci].firstElementChild != null)
        controls[ci] = ostyle.lastElementChild.childNodes[ci].firstElementChild.className;

    if (typeof ostyle.style.getPropertyValue("--normal") != null)
      var r_normal = ostyle.style.getPropertyValue("--normal");
    else
      var r_normal = " 1";

    if (ostyle.className != "ostyle icon")
      var r_title = ostyle.lastElementChild.lastElementChild.innerHTML;
    else {
      var r_title = "";
      var r_func = ostyle.firstElementChild.onclick;
    }

    var r_type = ostyle.classList[1];

    var obj = {
      type: r_type,
      normal: r_normal,
      size: [
        ostyle.style.width,
        ostyle.style.height
      ],
      position: [x, y],
      controls: controls,
      data: ostyle.firstElementChild.innerHTML,
      func: r_func,
      title: r_title
    };
    save_objects.push(obj);
  }

  if (typeof callback === "function") {
    callback(save_objects);
  }
  else
    return save_objects;
}

function del() {
  save(function (so) {
    id = so.length - 1;
    so.splice(id, 1);
    Render(so);
  });
}

function max() {
  save(function (so) {
    id = so.length - 1;
    if (so[id].normal == " 1") {
      var form = getBy("Class", "ostyle")[id];
      so[id].normal = " 0";
      so[id].size = [form.style.width, form.style.height];
      log(so[id].size);
    }
    else {
      so[id].normal = " 1";
    }
    Render(so);
  });
}

function min(id) {
  /*save(function() {
    save_objects.splice(id, 1);
    document.getElementById("desktop").innerHTML = "";
    Render(save_objects);
  });*/
  alert(id);
}