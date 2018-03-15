
// WEB_SOCKET = "ws://localhost:1337/";
WEB_SOCKET = "ws://localhost:1337/";

STUB_FILE = 'stub/0.txt';
STUB = false;

// setup gauge
var opts = {
  angle: 0.15, // The span of the gauge arc
  lineWidth: 0.44, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.06, // The thickness
    color: '#191919' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#9E0000',   // Colors
  colorStop: '#D70000',    // just experiment with them
  strokeColor: '#9b9b9b',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  
};
var target = document.getElementById('speedometer'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 20; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 81; // set animation speed (32 is default value)

// data handler
function runXHRstub(file){
  var xhr = new XMLHttpRequest();
  var engine = {speed:0};
  function _get_speed(){
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        engine.speed = parseInt(xhr.responseText);
      }
      gauge.set(engine.speed); // set actual value
      document.getElementById('speedvalue').innerHTML=engine.speed;
    }
  }
  function _get_data(get_func){
    xhr.open('GET', STUB_FILE);
    xhr.responseType = 'text';
    xhr.onload = get_func;
    xhr.send(null);
  }
  _get_data(xhr_get_speed);
  setInterval(function(){
    _get_data(xhr_get_speed);
  }, 1000);
}

function runWebSocket(file){
  var ws = new WebSocket(WEB_SOCKET);
  var engine = {speed:0};
  function _get_speed(data){
    info = JSON.parse(data.data);
    engine.speed = parseInt(info.speed);
    gauge.set(engine.speed); // set actual value
    document.getElementById('speedvalue').innerHTML=engine.speed;
  }
  function _get_data(get_func){
    ws.onmessage = get_func;
    ws.onopen = function(){
      ws.send("query");
    };
  }
  _get_data(_get_speed);
  setInterval(function(){
    _get_data(_get_speed);
  }, 1000);
}

if (STUB){
  runXHRstub();
} else {
  runWebSocket();
}

