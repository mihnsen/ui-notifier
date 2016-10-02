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
