angular.module('uiNotifier.providers').provider('uiFlash', [function() {
  let instance = null;
  let option = {
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

  const getOptions = () => {
    return option;
  };

  const setOptions = (settings) => {
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

  this.$get = [() => {
    return {
      register,
      getOptions,
      setOptions,
      show,
      success,
      info,
      warning,
      error,
      close,
      closeAll,
    };
  }];
}]);
