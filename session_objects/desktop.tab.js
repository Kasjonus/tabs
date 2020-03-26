objects = [
  {
    type: "info",
    size: ["400px", "200px"],
    position: ["20%", "10%"],
    controls: ["close","min"],
    title: "<a>TabOS</a>",
    data: "<a>Test informaction 1</a>"
  },
  {
    type: "icon",
    size: ["50px", "50px"],
    position: ["80px", "80px"],
    data: "TabOS",
    func: function() {
      alert("Test icon 1");
    }
  },
  {
    type: "form",
    normal: 1,
    size: ["400px", "200px"],
    position: ["60%", "5%"],
    controls: ["close","max","min"],
    title: "<a>TabOS</a>",
    data: "<h2 onclick=\"window.alert('Test form 1');\">Form 1<h2>",
  }
];