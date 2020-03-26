ostyle_objects = [
  {
    type: "icon",
    size: ["50px", "50px"],
    position: ["10px", "10px"],
    data: "<a>+</a>",
    func: add_info
  },
  {
    type: "icon",
    size: ["50px", "50px"],
    position: ["10px", "80px"],
    data: "<a>&#x1f4be;</a>",
    func: save
  },
  {
    type: "icon",
    size: ["70px", "50px"],
    position: ["10px", "150px"],
    data: "<a>reboot</a>",
    func: function() {
      document.getElementById("desktop").innerHTML = "";
      started = false;
      Render_start();
    }
  },
  {
    type: "icon",
    size: ["50px", "50px"],
    position: ["10px", "220px"],
    data: "<a>rest</a>",
    func: function() {
      document.getElementById("desktop").innerHTML = "";
      Render(save_objects);
    }
  },
  {
    type: "info",
    size: ["400px", "200px"],
    position: ["10px", "290px"],
    controls: ["close","min"],
    title: "<a>Info</a>",
    data: "<a>TestOstyleInfo</a>"
  },
  {
    type: "icon",
    size: ["50px", "50px"],
    position: ["80px", "10px"],
    data: "<a>icon</a>",
    func: function() {
      window.alert("Hello, I'm ostyle icon ;)");
    }
  }
];
