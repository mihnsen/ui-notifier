angular.module('uiNotifier.directives')
  .directive('uiFlashInstance', ['uiFlash', '$timeout', function (uiFlash, $timeout) {
    return {
      restrict: 'EA',
      template:
        `<div class="flash-instance flash-{{ ctrl.position }}" ng-class="{ 'flash-module': ctrl.module }">
          <div class="flash-track">
            <div class="flash flash-{{ message.type }}" ng-repeat="message in ctrl.messages">
              <button ng-hide="!ctrl.closeBtn" ng-click="ctrl.close(message.id)" class="flash-close">
                <span> &times; </span>
              </button>
              <span class="msg" ng-if="!ctrl.htmlEnabled()">{{ message.msg }}</span>
              <span class="msg" ng-if="ctrl.htmlEnabled()" ng-bind-html="message.msg"></span>
            </div>
          </div>
        </div>`,

      scope: true,
      bindToController: {
        limit: '=?',
        duration: '=?',
        single: '=?',
        closeBtn: '=?',
        position: '=?',
        module: '=?',
        html: '=?'
      },
      controller: 'FlashInstanceController',
      controllerAs: 'ctrl',
    };
  }]);
