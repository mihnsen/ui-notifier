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
  angular.module('uiNofifier.directives', []);
  angular.module('uiNofifier.providers', []);
  angular.module('uiNotifier', [
    'uiNotifier.config',
    'uiNotifier.directives',
    'uiNotifier.providers',
    'ngSanitize'
  ]);
})(angular);
