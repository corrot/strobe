var scenes = [{
        id: 0,
        title: 'scene 1',
        timeline: {}
    },
    {
        id: 1,
        title: 'scene 2',
        timeline: {}
    },
    {
        id: 2,
        title: 'scene 3',
        timeline: {}
    },
    {
        id: 3,
        title: 'scene 4',
        timeline: {}
    }
];

var strobeApp = angular.module('strobeApp', []);

strobeApp.controller('strobeController', ['$scope', function($scope) {
    $scope.scenes = scenes;

    //turn on or off without keeping state
    $scope.toggleScene = function(o) {
        if (o.isActive && o.isSolo) {
            $scope.toggleSolo(o);
        }

        o.isActive = !o.isActive;
    }

    //turn only selected track, keep state for all other tracks
    $scope.toggleSolo = function(o) {
        if (!o.isSolo) {
            var pausedBySolos = [];
            $scope.scenes.forEach(s => {
                if (s.isActive && !s.isSolo && s != o) {
                    pausedBySolos.push(s);
                    s.isActive = false;
                }
            });

            $scope.pausedBySolo = pausedBySolos;

            o.isActive = true;
            o.isSolo = true;

        } else {
            if ($scope.pausedBySolo) {
                $scope.pausedBySolo.forEach(s => {
                    s.isActive = true;
                })
            }

            o.isSolo = false;
        }
    }
}]);
