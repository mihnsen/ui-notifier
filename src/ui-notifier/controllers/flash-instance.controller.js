angular.module('uiNotifier.directives')
  .controller('FlashInstanceController', function(uiFlash, $timeout, $log) {
    this.messages = [];
    this.option = uiFlash.getOptions();

    // Initial option from provider and directive config
    this.duration = this.duration || this.option.duration;
    this.limit = this.limit || this.option.limit;
    this.position = this.position || this.option.position;
    this.single = this.single || this.option.single;
    this.closeBtn = this.closeBtn || this.option.closeBtn;
    this.module = this.module || this.option.module;

    let hasSanitize = false;
    if (angular.module('ngSanitize')) {
      try {
        angular.module('uiNotifier').requires.push('ngSanitize');
        hasSanitize = true;
      } catch(err) {
        // TODO handle exception
        $log.info(err);
      }
    }

    this.htmlEnabled = () => {
      if ((this.html || this.option.html) && !hasSanitize) {
        const warn =
          'uiNotifier warning:\nngSanitize couldn\'t be located.' +
          ' Make sure the ngSanitize source is injected in your project.';
        $log.debug(warn);
        return false;
      }

      var html = this.html || this.option.html;
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
    this.add = (type, message, duration) => {
      if (this.single) {
        this.closeAll();
      }

      this._addItem(type, message, duration);
    };

    this._addItem = (type, message, duration) => {
      // Generate an unique id
      var id = Math.random().toString(36).substring(7);
      duration = duration || this.duration;

      if (this.limit > 0 && (this.messages.length > this.limit - 1)) {
        this.messages.shift();
      }

      this.messages.push({
        id: id,
        type: type,
        msg: message,
        duration: duration
      });

      if (duration > 0) {
        $timeout(() => {
          this.close(id);
        }, duration);
      }

      return id;
    };

    /**
     * close specify message with id
     * @param {String} id id of message
     */
    this.close = id => {
      this.messages = this.messages.filter((item) => {
        return item.id !== id;
      });
    };

    /**
     * close all messages
     */
    this.closeAll = () => {
      this.messages = [];
    };

    // Register instance
    uiFlash.register(this);
  });
