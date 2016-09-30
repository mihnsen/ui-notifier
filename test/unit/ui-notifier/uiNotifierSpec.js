'use strict';

describe('uiNotifier', () => {
  var module;
  var dependencies = [];

  var hasModule = (module) => {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(() => {
    // Get module
    module = angular.module('uiNotifier');
    dependencies = module.requires;
  });

  it('should load config module', () => {
    expect(hasModule('uiNotifier.config')).toBeDefined();
  });

  it('should load directives module', () => {
    expect(hasModule('uiNotifier.directives')).toBeDefined();
  });

  it('should load providers module', () => {
    expect(hasModule('uiNotifier.providers')).toBeDefined();
  });
});
