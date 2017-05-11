(function() {

  var CODES = [
    192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 219, 221, 8,
    9, 222, 188, 190, 80, 89, 70, 71, 67, 82, 76, 191, 187, 220,
    20, 65, 79, 69, 85, 73, 68, 72, 84, 78, 83, 189, 13,
    16, 186, 81, 74, 75, 88, 66, 77, 87, 86, 90, -16,
  ];

  var layoutNames = ['Dvorak', 'QWERTY'];
  var layouts = {
    Dvorak: [].concat(
      '`1234567890[]'.split(''),
      ['delete', 'tab'],
      '\',.pyfgcrl/=\\'.split(''),
      [''],
      'aoeuidhtns-'.split(''),
      ['return', 'shift'],
      ';qjkxbmwvz'.split(''),
      ['shift']),
    QWERTY: [].concat(
      '`1234567890-='.split(''),
      ['delete', 'tab'],
      'qwertyuiop[]\\'.split(''),
      [''],
      'asdfghjkl;\''.split(''),
      ['return', 'shift'],
      'zxcvbnm,./'.split(''),
      ['shift'])
  };

  window.keyLayout = {
    options: function() {
      return layoutNames;
    },

    current: function() {
      return window.localStorage.keyLayout || 'QWERTY';
    },

    setCurrent: function(layout) {
      window.localStorage.keyLayout = layout;
      for (var i = 0, len = this._listeners.length; i < len; ++i) {
        this._listeners[i]();
      }
    },

    map: function() {
      var charList = layouts[this.current()];
      if (!charList) {
        return {};
      }
      var res = {};
      for (var i = 0, len = CODES.length; i < len; ++i) {
        res[CODES[i]] = charList[i];
      }
      return res
    },

    makeSelect: function() {
      var select = document.createElement('select');
      for (var i = 0, len = layoutNames.length; i < len; ++i) {
        var name = layoutNames[i];
        var option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      }
      select.value = this.current();
      select.addEventListener('change', function() {
        this.setCurrent(select.value);
      }.bind(this));
      return select;
    },

    addListener: function(listener) {
      this._listeners.push(listener);
      var last = this.current();
      window.addEventListener("storage", function () {
        var updated = this.current();
        if (updated !== last) {
          last = updated;
          listener();
        }
      }, false);
    },
    _listeners: []
  };

})();
