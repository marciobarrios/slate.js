// Basic mappings and bindings for moving screens around

// Global configs: https://github.com/jigish/slate/wiki/Global-Configs
// Layouts doc: https://github.com/jigish/slate/wiki/Layouts
// Some examples: https://github.com/mikegrb/slate.js/blob/master/.slate.js
//                https://github.com/jigish/dotfiles/blob/master/slate.js
//                https://github.com/krismolendyke/slate.js/blob/master/slate.js


// CONFIGS
S.configAll({
  "defaultToCurrentScreen": true,
  "orderScreensLeftToRight" : true
});

// Monitors (external up, internal down)
var externalScreen = "0",
    internalScreen = "1";


// OPERATIONS

// fullscreen
var fullscreen = S.operation("move", {
  "x"     : "screenOriginX",
  "y"     : "screenOriginY",
  "width" : "screenSizeX",
  "height": "screenSizeY"
});

// fullscreen in external monitor
var fullscreenExternal = S.operation("move", {
  "screen": externalScreen,
  "x"     : "screenOriginX",
  "y"     : "screenOriginY",
  "width" : "screenSizeX",
  "height": "screenSizeY"
});

// left half screen
var leftHalf = S.operation("move", {
  "x"     : "screenOriginX",
  "y"     : "screenOriginY",
  "width" : "screenSizeX/2",
  "height": "screenSizeY"
});

// right half screen
var rightHalf = S.operation("move", {
  "x"     : "screenOriginX+screenSizeX/2",
  "y"     : "screenOriginY",
  "width" : "screenSizeX/2",
  "height": "screenSizeY"
});


// LAYOUTS
var externalMonitorLayout = slate.layout("externalMonitor", {
  "Google Chrome": {
    "operations": [function(windowObject) {
      var title = windowObject.title();

      if (title !== undefined && title.match(/devtools/)) {
        windowObject.doOperation(fullscreenExternal);
      } else {
        windowObject.doOperation(fullscreen);
      }
    }],
    "ignore-fail": true,
    "repeat"     : true
  },
  "iTerm": {
    "operations": [fullscreen],
    "sort-title": true,
    "repeat"    : true
  }
});


// BINDS
S.bindAll({
  "l:ctrl;alt;cmd"    : slate.operation("layout", { "name" : externalMonitorLayout }),
  "m:ctrl;alt;cmd"    : fullscreen,
  "left:ctrl;alt;cmd" : leftHalf,
  "right:ctrl;alt;cmd": rightHalf
});


// DEFAULTS
// default the layout so it activates when I plug in an external monitor.
slate.default(2, externalMonitorLayout);
