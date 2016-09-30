'use strict';

describe('uiNotifier.providers.uiFlash', function() {
  var uiFlash;

  // load the module
  beforeEach(angular.mock.module('uiNotifier.providers', function($provide) {
  }));

  beforeEach(inject(function(_uiFlash_) {
    uiFlash = _uiFlash_;
  }));

  it('should be defined', function() {
    expect(uiFlash).toBeDefined();
    // expect(uiFlash.success).toBeDefined();
  });
});
