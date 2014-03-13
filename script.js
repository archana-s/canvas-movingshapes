$(document).ready(function(){

   var stage = new Kinetic.Stage({
        container: 'workarea',
        width: 1200,
        height: 768
      });

    var layer = new Kinetic.Layer();
    var allCircles = [];
    var listOfPositions = [];
    var NUM_CIRCLES = 10;

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
    }

    // Add animations
    var velocity = 150;
    var period = 5000;

    var anim = new Kinetic.Animation(function(frame) {
      for (var i=0; i<allCircles.length; i++) {

        var pos = listOfPositions[i];

        if (i % 2 === 0) {
          xVal = (velocity * Math.sin((-1) * frame.time * 2 * (Math.PI / period))) + pos.x;
          yVal = (velocity * Math.sin(frame.time * 2 * (Math.PI / period))) + pos.y;
        }
        else {
          xVal = velocity * Math.cos(frame.time * 2 * (Math.PI / period)) + pos.x;
          yVal = velocity * Math.cos(frame.time * 2 * (Math.PI / period)) + pos.y;
        }

        allCircles[i].setX(xVal);
        allCircles[i].setY(yVal);
      }
    }, layer);
    anim.start();
});

var getRandomMotionFunction = function(velocity, frameTime, period) {
  var val = Math.round(Math.random() * 4);
  switch(val) {
    case 0:
      return velocity * Math.sin(frameTime * 2 * (Math.PI / period));
      break;
    case 1:
      return velocity * Math.cos(frame.time * 2 * (Math.PI / period));
      break;
    case 2:
      return velocity * Math.sin(-1 * frameTime * 2 * (Math.PI / period));
      break;
    case 3:
      return velocity * Math.cos(-1 * frameTime * 2 * (Math.PI / period));
      break;
    default:
      return velocity * Math.sin(frameTime * 2 * (Math.PI / period));
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
