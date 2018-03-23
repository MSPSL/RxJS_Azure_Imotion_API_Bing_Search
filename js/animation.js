var docElm = document.documentElement;
var results = document.getElementById("results")

var clientWidth = docElm.clientWidth,
    clientHeight = docElm.clientHeight;

// Stream of all mousemove events

var mouseMove$ = Rx.Observable.fromEvent(docElm, 'mousemove').map(function (event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
});

// Apply values to styles
mouseMove$.subscribe(function (pos) {
  var rotX = pos.y / clientHeight * -50 + 25;
  var rotY = pos.x / clientWidth * 50 - 25;

  results.style.cssText = '\n    transform: rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg);\n  ';
});