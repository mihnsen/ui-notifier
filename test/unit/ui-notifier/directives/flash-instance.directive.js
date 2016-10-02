describe('flash-instance', () => {
  let $rootScope;
  let $compile;
  let scope;

  beforeEach(angular.mock.module('uiNotifier.directives'));

  // inject services
  beforeEach(angular.mock.inject((_$rootScope_, _$compile_) => {
    $rootScope = _$rootScope_;
    $compile = _$compile_;

    scope = $rootScope.$new();
  }));

  /*
  it('should throw an error if used without ng-model', () => {
    expect(() => {
      TestUtil.compile('<flash-instance>');
    }).not.toThrow();
  });

  it('when checked should have sw-radio-input class', () => {
    const radioCtrl = TestUtil.compile(`<sw-radio ng-value="'default'" ng-model='model'>`, scope);

    scope.$apply('model = "default"');

    expect(radioCtrl.hasClass('sw-radio-checked')).toBeTruthy();
  });

  it('when not checked should not have sw-radio-input class', () => {
    const radioCtrl = TestUtil.compile(`<sw-radio ng-value="'default'" ng-model="model">`, scope);

    scope.$apply('model = "otherValue"');

    expect(radioCtrl.hasClass('sw-radio-checked')).toBeFalsy();
  });
  */
});
