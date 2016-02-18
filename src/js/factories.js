(angular => {
  'use strict';

  angular.module('app.factories', [])

  .factory('Loader', ['$rootScope', '$q', '_', '$ionicLoading', ($rootScope, $q, _, $ionicLoading) => {

    const promises = [];
    const messages = [];

    const emitChange = () => {
      if (messages.length === 0) {
        $ionicLoading.hide();
      } else {
        const msg = '<ion-spinner icon="spiral"></ion-spinner><br/>' + messages.join("<br>");
        $ionicLoading.show({
          template: msg
        });
      }
    };

    return (msg, target) => {

      const promise = target;

      promises.push(promise);
      messages.push(msg);

      promise.finally(() => {
        const index = promises.indexOf(promise);
        promises.splice(index, 1);
        messages.splice(index, 1);

        emitChange();
      });

      emitChange();
      return promise;
    };

  }])

  .factory('RetryService', ['$q', '$ionicPopup', ($q, $ionicPopup) => {

    const statusMessages = {
      0: "Nenhuma resposta do servidor, verifique sua conexão",
      4: "API inacessível",
      5: "Erro interno no servidor",
      403: "Você não tem permissão para acessar este recurso, faça login novamente"
    };

    const getMessageByStatus = status => {
      const statusPrefix = status.toString()[0] * 1;
      if (statusMessages[status]) {
        return statusMessages[status];
      }
      if (statusMessages[statusPrefix]) {
        return statusMessages[statusPrefix];
      }
      return false;
    };

    const execute = (target, deferred) => {
      target()
        .then(deferred.resolve)
        .catch(result => {

          let msg = result || "Erro";
          if (typeof result == 'object' && typeof result.status == 'number') {
            msg = getMessageByStatus(result.status) || result.statusText || "Erro";
          }

          $ionicPopup.confirm({
            title: 'Atenção',
            template: msg,
            cancelText: 'Cancelar'
          }).then(ok => {
            if (!ok) {
              throw("cancelled");
            }
            return execute(target, deferred);
          }).catch(deferred.reject);
        });
    };

    const retry = target => {
      const deferred = $q.defer();
      execute(target, deferred);
      return deferred.promise;
    };

    return retry;

  }]);

})(angular);
