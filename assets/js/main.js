(function() {

  function init() {
    var layoutSelect = window.keyLayout.makeSelect();
    document.body.appendChild(layoutSelect);
    
    var kv = new window.KeyView();
    document.body.appendChild(kv.element());

    var tracer = new window.Tracer(kv);
    window.addEventListener('keydown', tracer.keydown.bind(tracer));
    window.addEventListener('keyup', tracer.keyup.bind(tracer));
  }

  window.addEventListener('load', init);

})();
