var barCount = 106;
var loops =
    function() {
        var result = [];
        for (var i = 0; i < 16; i++) {
            result.push([]);
        }
        return result;
    }();

strobeApp.controller('loopsController', ['$scope', function($scope) {
    $scope.loops = loops;
    $scope.barCount = barCount;
    $scope.selectedAction = {};
    $scope.code = "";

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
        loop.forEach((c) => {
            if (c.start <= cell.start && c.end >= cell.end) {
                isRedundant = true;
                return;
            }
        });

        if (isRedundant) {
            return;
        }

        var cellsToMerge = $.grep(loop, (o) => {
            if (o.end == cell.start || o.start == cell.end) {
                return true;
            }
        });

        if (cellsToMerge && cellsToMerge.length > 0) {
            cellsToMerge.forEach(c => {
                if (c.end == cell.start) {
                    cell.start = c.start
                } else {
                    cell.end = c.end;
                }

                loop.splice(loop.indexOf(c), 1)
            });
        }

        loop.push(cell);
        $scope.selectAction(cell, loop.indexOf(cell));
    }

    $scope.removeAction = function(o, i, j) {
        $scope.loops[i].splice(j, 1);
    }

    $('#codeModal').on('show.bs.modal', function(){
        $scope.submit();
    });
    
    $scope.submit = function(){
        var text = "";
        var arr = [];
        $scope.loops.forEach((loop,i)=>{
            loop.forEach((c)=>{
                arr.push({i:i, t:c.start, s:1});
                arr.push({i:i, t:c.end, s:0});
            });
        });

        for (var i = 0; i < $scope.barCount; i++) {
            var bitsOnBar = arr.filter(a=> a.t == i);
            if(bitsOnBar.length > 0){
                text += text.length > 0 ? '|' : '';
                text += i + ':';
                bitsOnBar.forEach((b) => {
                    text += (text[text.length - 1] != ':' ? ',' : '') + b.i + '-' + b.s; 
                });
            }
        }

        $scope.code = text;
        $scope.$apply();
    }

    document.body.onmousedown = function() {
        $scope.isMouseClicked = true;
    }

    document.body.onmouseup = function() {
        $scope.isMouseClicked = false;
    }
}]);
strobeApp.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});
// document.addEventListener('keydown', (event) => {
//     if (event.key == 'Control')
//         ctrl = true;

//     if (event.key == 'Shift')
//         shift = true;
// });

// document.addEventListener('keydown', (event) => {
//     if (event.key == 'Control')
//         ctrl = false;

//     if (event.key == 'Shift')
//         shift = false;
// });