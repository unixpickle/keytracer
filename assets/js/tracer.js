(function() {

  var FADE_TIME = 1000;
  var THICKNESS = 4;

  function Tracer(keyView) {
    this._keyView = keyView;
    this._lastKey = null;
    this._segments = [];
  }

  Tracer.prototype.keydown = function(e) {
    this._keyView.setPressed(codeFromEvent(e), true);
    var key = this._keyView.keyElement(codeFromEvent(e));
    if (key !== null && this._lastKey !== null &&
        key !== this._lastKey) {
      this._addSegment(this._lastKey, key);
    }
    this._lastKey = key;
  };

  Tracer.prototype.keyup = function(e) {
    this._keyView.setPressed(codeFromEvent(e), false);
  };

  Tracer.prototype._addSegment = function(start, end) {
    var seg = new Segment(start, end);
    this._keyView.element().appendChild(seg.element());
    this._segments.push(seg);
    if (this._segments.length === 1) {
      this._tick();
    }
  }

  Tracer.prototype._tick = function() {
    for (var i = 0; i < this._segments.length; ++i) {
      var seg = this._segments[i];
      if (!seg.step()) {
        this._keyView.element().removeChild(seg.element());
        this._segments.splice(i, 1);
        --i;
      }
    }
    if (this._segments.length > 0) {
      window.requestAnimationFrame(this._tick.bind(this));
    } else {
      this._lastKey = null;
    }
  };

  function Segment(start, end) {
    this._initTime = millis();
    this._p1 = centerOfRect(start);
    this._p2 = centerOfRect(end);
    this._element = window.svgUtil.createElement('line');
    window.svgUtil.setAttributes(this._element, {
      stroke: '#65bcd4',
      'stroke-width': THICKNESS,
      'stroke-linecap': 'round',
      x1: this._p1.x.toFixed(2),
      x2: this._p2.x.toFixed(2),
      y1: this._p1.y.toFixed(2),
      y2: this._p2.y.toFixed(2)
    });
  }

  Segment.prototype.element = function() {
    return this._element;
  }

  Segment.prototype.step = function() {
    var age = millis() - this._initTime;
    if (age > FADE_TIME || age < 0) {
      return false;
    }
    var frac = 1 - age/FADE_TIME;
    var thickness = THICKNESS * frac;
    window.svgUtil.setAttributes(this._element, {
      'stroke-width': thickness,
      opacity: frac.toFixed(3)
    });
    return true;
  };

  function centerOfRect(rect) {
    var x = parseFloat(rect.getAttribute('x'));
    var y = parseFloat(rect.getAttribute('y'));
    var width = parseFloat(rect.getAttribute('width'));
    var height = parseFloat(rect.getAttribute('height'));
    return {
      x: x + width/2,
      y: y + height/2
    }
  }

  function millis() {
    return new Date().getTime();
  }

  function codeFromEvent(e) {
    if (e.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      return -e.which;
    } else {
      return e.which;
    }
  }

  window.Tracer = Tracer;

})();
