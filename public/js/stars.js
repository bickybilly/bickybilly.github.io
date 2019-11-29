paper.install(window);
$(document).ready(function() {
    
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (!isMobile) {
        paper.setup('myCanvas');
                      
        var canvas = $("#myCanvas")
        var canW = canvas.width()
        var canH = canvas.height()

        //sparkle time
        var stars = [];
        var sparkles = [];

        function sparkle(numSparkles){
            project.activeLayer.removeChildren();
            //on start:
            for (var i = 0; i < numSparkles; i++ ){
                // Half as many stars
                stars.push(randomStar());
                sparkles.push(randomSparkle());
            }
        }

        //sparkle helper functions
                      
        function calcNumSparkles() {
              // based on area
              return (canW * canH) / 10000
        }

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
                opacity: 0.75
            });
            newSparkle.translate(randomNum(0,canW),randomNum(0,canH));
            newSparkle.rotate(45);
        }

        function randomStar(){
            var radius = randomNum(1,2);
            var newStar = new Path.Star({
                center: new Point(randomNum(0,canW),randomNum(0,canH)),
                radius1: radius,
                radius2: radius*randomNum(2,3),
                points: 4,
                fillColor: "white",
                opacity: 0.75,
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
                             
         function updateSize() {
             var parent = canvas.parent()
             canvas.height(parent.height())
             canvas.width(parent.width())
              canW = canvas.width()
              canH = canvas.height()
             view.viewSize = new Size(canW, canH);
             sparkle(calcNumSparkles());
         }
        
            

        //animation speed params
        var frame = 0;
        var sc = 1.1;
        var slowness = 5;
        var totalFrames = 10
                             
        //BEGIN: set size & call sparkle!
           updateSize()
            sparkle(calcNumSparkles());
        
        //new sparkles for every click
    //    $(window).click(function(event){
    //        sparkle(20);
    //    });
                             
        //new sparkles on window resize
        $(window).resize(function() {
            updateSize()
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
    }

});
