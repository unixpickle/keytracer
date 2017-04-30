(function() {

  function init() {
    var kv = new window.KeyView();
    document.body.appendChild(kv.element());

    var tracer = new window.Tracer(kv);
    window.addEventListener('keydown', tracer.keydown.bind(tracer));
  }

  window.addEventListener('load', init);

})();
