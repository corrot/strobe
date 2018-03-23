var loops = [
    {
        barCount: 16,
        data:[
            {
                start: 0,
                end: 1
            },
            {
                start: 2,
                end: 4
            }
        ]
    },
    {
        barCount: 16,
        data:[
            {
                start: 1,
                end: 2
            },
            {
                start: 3,
                end: 9
            }
        ]
    },
    {
        barCount: 16,
        data:[
            {
                start: 0,
                end: 1
            },
            {
                start: 2,
                end: 3
            },
            {
                start: 4,
                end: 7
            }
        ]
    },
];


strobeApp.controller('loopsController', ['$scope', function($scope) {
    $scope.loops = loops;
    
    $scope.selectedAction = {};
    $scope.selectAction = function(o, i){
        $scope.selectedAction = o;
        $scope.selectedAction.loopIndex = i;
    }

    $scope.selectedBar = {};
    $scope.selectBar = function(i, j){
        $scope.selectedBar = {
            loopIndex: i,
            barIndex: j
        }
    }

    $scope.addAction = function(){
        $scope.loops[$scope.selectedBar.loopIndex].data.push({start: $scope.selectedBar.barIndex, end: $scope.selectedBar.barIndex+1})
    }

    $scope.removeAction = function(){
        var i = $scope.loops[$scope.selectedAction.loopIndex].data.indexOf($scope.selectedAction);
        $scope.loops[$scope.selectedAction.loopIndex].data.splice(i, 1);
    }
}]);