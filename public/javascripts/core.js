var directory = angular.module('directory', [])

.controller('directoryController', [
    '$scope', '$http',
    function ($scope) {
        var socket = io.connect();

        $scope.updateQuery = function (query) {
            socket.emit('query', { query: query },
                function processResponse(results) {
                    $scope.results = results;
                })
        }
}]);
