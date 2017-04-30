(function() {

  function init() {
    var kv = new window.KeyView();
    document.body.appendChild(kv.element());
  }

  window.addEventListener('load', init);

})();
