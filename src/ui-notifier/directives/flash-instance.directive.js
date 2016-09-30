angular.module('uiNotifier.directives')
  .directive('flashInstance', function (uiFlash, $timeout) {
    return {
      restrict: 'EAC',
      template: '',
      scope: true,
      bindToController: {
        limit: '='
      },
      controllerAs: 'ctrl',
      controller: function() {
        this.messages = [];
        this.duration = 5;
        var _self = this;

        /**
         * add and show message
         *
         * @param {String} type     type of message
         * @param {String | Html} message  messsage to show
         * @param {int} duration duration in second to show
         *
         * @return {String} id of message
         */
        this.add = function(type, message, duration) {
          // Generate an unique id
          var id = Math.random().toString(36).substring(7);
          duration = duration || _self.duration;

          if (_self.limit && (_self.messages.length > _self.limit - 1)) {
            _self.messages.shift();
          }

          _self.messages.push({
            id: id,
            type: type,
            msg: message,
            duration: duration
          });

          $timeout(function() {
            _self.close(id);
          }, duration * 1000);

          return id;
        };

        /**
         * close specify message with id
         * @param {String} id id of message
         */
        this.close = function(id) {
          _self.messages = _self.messages.filter(function(item) {
            return item.id !== id;
          });
        };

        /**
         * close all messages
         */
        this.closeAll = function() {
          _self.messages = [];
        };

        // Register instance
        uiFlash.register(this);
      }
    };
  });
