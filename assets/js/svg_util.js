(function() {

  window.svgUtil = {
    namespace: 'http://www.w3.org/2000/svg',
    setAttributes: function(elem, attrs) {
      var keys = Object.keys(attrs);
      for (var i = 0, len = keys.length; i < len; ++i) {
        elem.setAttribute(keys[i], attrs[keys[i]]);
      }
    },
    createElement: function(tagName) {
      return document.createElementNS(this.namespace, tagName);
    }
  };

})();
