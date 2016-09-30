angular.module('uiNotifier.providers').provider('uiFlash', function() {
  var instance = null;

  function register(container) {
    instance = container;
  }

  function show(type, message, duration) {
    if (!type) {
      type = 'info';
    }

    if (instance) {
      instance.add(type, message, duration);
    } else {
      throw Error('You must add a notify-instance directive before show message');
    }
  }

  function closeAll() {
    if (instance) {
      instance.closeAll();
    } else {
      throw Error('You must add a sw-notify-instance directive before show message');
    }
  }

  function success(message, duration) {
    show('success', message, duration);
  }

  function error(message, duration) {
    show('error', message, duration);
  }

  function info(message, duration) {
    show('info', message, duration);
  }

  return {
    register: register,
    show: show,
    error: error,
    success: success,
    info: info,
    close: close,
    closeAll: closeAll,
  };
});
