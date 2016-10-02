var app = angular.module('App', ['uiNotifier', 'ngSanitize']);
app.run(function(uiFlash) {
  uiFlash.setOptions({
    duration: 5000,
    limit: 5,
    position: 'bottom'
  });
});

app.controller('UINotifierDemoCtrl', ['$scope', 'uiFlash', function($scope, uiFlash) {
  'use strict';

  this.msg = '<strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>';
  this.option = {
    position: 'top',
    duration: 3000,
    limit: 3,
    single: false,
    closeBtn: true,
    module: false,
    html: true
  };

  this.showSuccess = function() {
    uiFlash.success(this.msg)
  };

  this.showInfo = function() {
    uiFlash.info(this.msg)
  };

  this.showWarning = function() {
    uiFlash.warning(this.msg)
  };

  this.showError = function() {
    uiFlash.error(this.msg)
  };


  // Data demo
  this.positions = ['top', 'bottom'];
  this.durations = [
    { label: 3000, value: 3000 },
    { label: 5000, value: 5000 },
    { label: 10000, value: 10000 },
    { label: 'unlimited', value: -1 },
  ];
  this.limits = [
    { label: 3, value: 3},
    { label: 5, value: 5},
    { label: 'unlimited', value: -1 }
  ];
  this.singles = [true, false];
}]);
