$(document).ready(function(){

   var stage = new Kinetic.Stage({
        container: 'workarea',
        width: 1200,
        height: 768
      });

    var layer = new Kinetic.Layer();
    var allCircles = [];
    var listOfPositions = [];
    var listOfMotionFunctions = [];
    var NUM_CIRCLES = 50;

    for (var i=0; i < NUM_CIRCLES; i++) {

      var pos = getRandomLocation(stage.getWidth()/2, stage.getHeight()/2);
      var circle = new Kinetic.Circle({
        x: pos.x,
        y: pos.y,
        radius: getRandomRadius(1,4),
        fill: getRandomColor()
      });

      // add the shape to the layer
      layer.add(circle);

      // add the layer to the stage
      stage.add(layer);
      allCircles.push(circle);
      listOfPositions.push(getRandomLocation(stage.getWidth(), stage.getHeight()));
      listOfMotionFunctions.push({xFunc: getRandomMotionFunction(), yFunc: getRandomMotionFunction()});
    }

    // Add animations
    var velocity = 150;
    var period = 25000;

    var anim = new Kinetic.Animation(function(frame) {
      for (var i=0; i<allCircles.length; i++) {
        var pos = listOfPositions[i];
        var motions = listOfMotionFunctions[i];

        xVal = motions.xFunc(velocity, frame.time, period) + pos.x;
        yVal = motions.yFunc(velocity, frame.time, period) + pos.y;

        allCircles[i].setX(xVal);
        allCircles[i].setY(yVal);
      }
    }, layer);
    anim.start();
});

var getRandomMotionFunction = function() {
  var val = Math.round(Math.random() * 3);
  switch(val) {
    case 0:
      return function(velocity, frameTime, period) {
                return velocity * Math.sin(frameTime * 2 * (Math.PI / period))
              };
      break;
    case 1:
      return function(velocity, frameTime, period) {
                return velocity * Math.cos(frameTime * 2 * (Math.PI / period))
              };
      break;
    case 2:
      return function(velocity, frameTime, period) {
                return velocity * Math.sin(-1 * frameTime * 2 * (Math.PI / period))
              };
      break;
    case 3:
      return function(velocity, frameTime, period) {
                return velocity * Math.cos(-1 * frameTime * 2 * (Math.PI / period))
              };
      break;
    default:
      return function(velocity, frameTime, period) {
                return velocity * Math.sin(frameTime * 2 * (Math.PI / period))
              };
      break;
  };
};

var getRandomLocation =  function(width, height) {
  var x = Math.round(Math.random() * width);
  var y = Math.round(Math.random() * height);
  return {x: x, y: y};
};

var getRandomColor = function() {
  var colors = ["rgb(122, 241, 251)", "rgb(255, 223, 0)", "rgb(189, 153, 167)", "rgb(231, 95, 28)", "rgb(92, 87, 84)"];
  var num = Math.round(Math.random() * 5);
  return colors[num-1];
};

var getRandomRadius = function(max, min) {
   return Math.round(Math.random() * (max - min) + min);
};
