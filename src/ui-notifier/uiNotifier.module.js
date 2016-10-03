(function (angular) {
  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('uiNotifier.config', [])
    .value('uiNotifier.config', {
      debug: true
    });

  // Modules
  angular.module('uiNotifier.providers', []);
  angular.module('uiNotifier.controller', []);
  angular.module('uiNotifier.directives', []);
  angular.module('uiNotifier', [
    'uiNotifier.config',
    'uiNotifier.directives',
    'uiNotifier.providers'
  ]);
})(angular);
