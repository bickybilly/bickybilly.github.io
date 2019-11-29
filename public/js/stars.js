paper.install(window);
$(document).ready(function() {

    var windowW = $(window).width();

    paper.setup('myCanvas');

    //sparkle time
    var stars = [];
    var sparkles = [];

    function sparkle(numSparkles){
        project.activeLayer.removeChildren();
        //on start:
        for (var i = 0; i < numSparkles; i++ ){
            stars.push(randomStar());
            sparkles.push(randomSparkle());
        }
    }

    //sparkle helper functions

    function randomNum(min, max){
        return Math.floor((Math.random() * (max+1)) + min);
    }

    function randomSparkle(){
        var newSparkle = new CompoundPath({
            children: [
            new Path.Line(new Point(10, 10), new Point(20,20)),
            new Path.Line(new Point(20,10), new Point(10,20))
            ],
            strokeColor: "#ADD8E6",
        });
        newSparkle.translate(randomNum(0,600),randomNum(0,1000));
        newSparkle.rotate(45);
    }

    function randomStar(){
        var radius = randomNum(1,2);
        var newStar = new Path.Star({
            center: new Point(randomNum(0,600),randomNum(0,600)),
            radius1: radius,
            radius2: radius*randomNum(2,3),
            points: 4,
            fillColor: "white",
            opacity: 0.8,
            shadowColor: new Color(0,0,0,1),
            shadowBlur: 6
        });
        newStar.onMouseDrag = onMouseDrag;
        newStar.rotate(45);
        return newStar;
    }
    function scaleAll(arr, factor){
        for (var i = 0; i < arr.length; i++){
            arr[i].scale(factor)
        }
    }

    function unScaleAll(arr, factor){
        for (var i = 0; i < arr.length; i++){
            arr[i].scale(arr[i].scaling.x/factor)
        }
    }

    //overloading paperjs methods
    function onMouseDrag(event){
        this.position += event.delta;
    }

    //animation speed params
    var frame = 0;
    var sc = 1.1;
    var slowness = 5;
    var totalFrames = 10
                         
    //call sparkle!
    sparkle(20);
    
    //new sparkles for every click
//    $(window).click(function(event){
//        sparkle(20);
//    });
                         
    //new sparkles on window resize
    $(window).resize(function() {
       sparkle(20);
    });

    view.onFrame = function(event){
        if ((event.count%slowness)==0){
            if (frame < totalFrames/2){
                scaleAll(stars, sc);
                frame++;
            }
            else if (frame < totalFrames - 1){
                unScaleAll(stars, sc);
                frame++;
            }
            else{
                unScaleAll(stars, sc);
                frame = 0;
            }
        }
    }

});
