'use strict';

(function (angular) {
  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('uiNotifier.config', []).value('uiNotifier.config', {
    debug: true
  });

  // Modules
  angular.module('uiNotifier.providers', []);
  angular.module('uiNotifier.controller', []);
  angular.module('uiNotifier.directives', []);
  angular.module('uiNotifier', ['uiNotifier.config', 'uiNotifier.directives', 'uiNotifier.providers']);

  try {
    /* istanbul ignore else  */
    if (angular.module('ngSanitize')) {

      // Note on the requires array from module() source code:
      // Holds the list of modules which the injector will load before the current module is loaded.

      // A sort of lazy load for our dependency on ngSanitize, only if the module exists.
      angular.module('uiNotifier').requires.push('ngSanitize');
    }
  } catch (err) {
    // Ignore error, we'll disable any sanitize related functionality...
  }
})(angular);
'use strict';

angular.module('uiNotifier.directives').controller('FlashInstanceController', ['uiFlash', '$timeout', '$log', function (uiFlash, $timeout, $log) {
  var _this = this;

  this.messages = [];
  this.option = uiFlash.getOptions();

  // Initial option from provider and directive config
  this.duration = this.duration || this.option.duration;
  this.limit = this.limit || this.option.limit;
  this.position = this.position || this.option.position;
  this.single = this.single || this.option.single;
  this.closeBtn = this.closeBtn || this.option.closeBtn;
  this.module = this.module || this.option.module;

  var hasSanitize = false;
  if (angular.module('ngSanitize')) {
    try {
      angular.module('uiNotifier').requires.push('ngSanitize');
      hasSanitize = true;
    } catch (err) {
      // TODO handle exception
      $log.info(err);
    }
  }

  this.htmlEnabled = function () {
    if ((_this.html || _this.option.html) && !hasSanitize) {
      var warn = 'uiNotifier warning:\nngSanitize couldn\'t be located.' + ' Make sure the ngSanitize source is injected in your project.';
      $log.debug(warn);
      return false;
    }

    var html = _this.html || _this.option.html;
    return html ? true : false;
  };

  /**
   * add and show message
   *
   * @param {String} type     type of message
   * @param {String | Html} message  messsage to show
   * @param {int} duration duration in second to show
   *
   * @return {String} id of message
   */
  this.add = function (type, message, duration) {
    if (_this.single) {
      _this.closeAll();
    }

    _this._addItem(type, message, duration);
  };

  this._addItem = function (type, message, duration) {
    // Generate an unique id
    var id = Math.random().toString(36).substring(7);
    duration = duration || _this.duration;

    if (_this.limit > 0 && _this.messages.length > _this.limit - 1) {
      _this.messages.shift();
    }

    _this.messages.push({
      id: id,
      type: type,
      msg: message,
      duration: duration
    });

    if (duration > 0) {
      $timeout(function () {
        _this.close(id);
      }, duration);
    }

    return id;
  };

  /**
   * close specify message with id
   * @param {String} id id of message
   */
  this.close = function (id) {
    _this.messages = _this.messages.filter(function (item) {
      return item.id !== id;
    });
  };

  /**
   * close all messages
   */
  this.closeAll = function () {
    _this.messages = [];
  };

  // Register instance
  uiFlash.register(this);
}]);
'use strict';

angular.module('uiNotifier.providers').provider('uiFlash', [function () {
  var instance = null;
  var option = {
    position: 'top',
    duration: 3000,
    limit: 3,
    single: false,
    closeBtn: true,
    module: false,
    html: false
  };

  function register(container) {
    instance = container;
  }

  var getOptions = function getOptions() {
    return option;
  };

  var setOptions = function setOptions(settings) {
    option = angular.extend(option, settings);
  };

  function show(type, message, timeout) {
    if (!type) {
      type = 'info';
    }

    if (instance) {
      return instance.add(type, message, timeout);
    } else {
      throw Error('You must register a ui-flash-instance directive before show message');
    }
  }

  function closeAll() {
    if (instance) {
      instance.closeAll();
    }
  }

  function success(message, timeout) {
    return show('success', message, timeout);
  }

  function info(message, timeout) {
    return show('info', message, timeout);
  }

  function warning(message, timeout) {
    return show('warning', message, timeout);
  }

  function error(message, timeout) {
    return show('error', message, timeout);
  }

  this.$get = [function () {
    return {
      register: register,
      getOptions: getOptions,
      setOptions: setOptions,
      show: show,
      success: success,
      info: info,
      warning: warning,
      error: error,
      close: close,
      closeAll: closeAll
    };
  }];
}]);
'use strict';

angular.module('uiNotifier.directives').directive('uiFlashInstance', ['uiFlash', '$timeout', function (uiFlash, $timeout) {
  return {
    restrict: 'EA',
    template: '<div class="flash-instance flash-{{ ctrl.position }}" ng-class="{ \'flash-module\': ctrl.module }">\n          <div class="flash-track">\n            <div class="flash flash-{{ message.type }}" ng-repeat="message in ctrl.messages">\n              <button ng-hide="!ctrl.closeBtn" ng-click="ctrl.close(message.id)" class="flash-close">\n                <span> &times; </span>\n              </button>\n              <span class="msg" ng-if="!ctrl.htmlEnabled()">{{ message.msg }}</span>\n              <span class="msg" ng-if="ctrl.htmlEnabled()" ng-bind-html="message.msg"></span>\n            </div>\n          </div>\n        </div>',

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
    controllerAs: 'ctrl'
  };
}]);