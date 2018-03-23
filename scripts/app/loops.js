var barCount = 106;
var loops = 
function(){
    var result = [];
    for(var i = 0; i < 16; i++){
        result.push([]);
    }
    return result;
}();

strobeApp.controller('loopsController', ['$scope', function($scope) {
    $scope.loops = loops;
    $scope.barCount = barCount;
    $scope.selectedAction = {};
   
    $scope.selectAction = function(o, i) {
        if ($scope.selectedAction == o && $scope.selectedAction.loopIndex == i) {
            $scope.selectedAction = {};
        } else {
            $scope.selectedAction = o;
            $scope.selectedAction.loopIndex = i;
        }
        $scope.selectedBar = {};
    }

    $scope.addAction = function(loopIndex, start, end) {
        var loop = $scope.loops[loopIndex];
        var cell = { start: start, end: end };
        var isRedundant;
        loop.forEach((c)=>{
            if(c.start <= cell.start && c.end >= cell.end){
                isRedundant = true;
                return;
            }
        });

        if(isRedundant){
            return;
        }

        var cellsToMerge = $.grep(loop, (o)=>{
                if(o.end == cell.start || o.start == cell.end){
                    return true;
                }
        });

        if(cellsToMerge && cellsToMerge.length > 0){
           cellsToMerge.forEach(c => {
               if(c.end == cell.start){
                   cell.start = c.start
               }
               else{
                   cell.end = c.end;
               }

               loop.splice(loop.indexOf(c), 1)
           });
        }     

        loop.push(cell);
        $scope.selectAction(cell, loop.indexOf(cell));
    }

    $scope.removeAction = function() {
        var i = $scope.loops[$scope.selectedAction.loopIndex].indexOf($scope.selectedAction);
        $scope.loops[$scope.selectedAction.loopIndex].splice(i, 1);
        $scope.selectedAction = {};
    }

    $scope.test = function() {
        console.log('resized!');
    }

    // $scope.loops.forEach((l) => {
    //     for (let index = 0; index < barCount; index++) {
    //         if(Math.random()>.8){
    //             $scope.addAction($scope.loops.indexOf(l), index, index + 1)
    //         }        
    //     }
    // });

    document.body.onmousedown = function() { 
        $scope.isMouseClicked = true;
      }

      document.body.onmouseup = function() {
        $scope.isMouseClicked = false;
      }
}]);

document.addEventListener('keydown', (event) => {
    if(event.key == 'Control')
        ctrl = true;

    if(event.key == 'Shift')
        shift = true;
});

document.addEventListener('keydown', (event) => {
    if(event.key == 'Control')
        ctrl = false;

    if(event.key == 'Shift')
        shift = false;
});