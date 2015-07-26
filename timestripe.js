function TimeStripe(dom_element) {
  this.element = dom_element;
  this.actor = 'height';
  this.pixelsPerHour = 100;
  this.scrolling = 'yes';

  this.align('left');

  this.style({
    "width": "100%",
    "background-color": "rgba(128,0,0,0.3)",
    "border": "0 0 2px 0",
    "border-bottom": "solid red",
    "position": "absolute",
    "top": 0
  });

  var ts_obj = this;
  window.onload = function() { ts_obj.updateBar(); };
}

TimeStripe.prototype.style = function(styleObject) {
  styleObject = typeof styleObject !== 'undefined' ? styleObject : null;

  if ( styleObject === null ) {
    throw Error('TimeStripe cannot yet retrieve styles.');
  }

  for ( var attribute in styleObject ) {
    var value = styleObject[attribute];
    this.element.style.setProperty(attribute, value);
  }
}

TimeStripe.prototype.align = function(alignment) {
  alignment = typeof alignment !== 'undefined' ? alignment : 'left';

  switch ( alignment ) {
  case 'left':
    this.animate('width');
    this.style({"top": 0, "left": 0});
    break;
  case 'right':
    this.animate('width')
    this.style({"top": 0, "right": 0});
    break;
  case 'top':
    this.animate('height')
    this.style({"top": 0, "left": 0});
    break;
  case 'bottom':
    this.animate('height')
    this.style({"bottom": 0, "left": 0});
    break;
  }
}

TimeStripe.prototype.animate = function(property) {
  if ( typeof property !== 'undefined' ) {
    this.actor = property;
  } else {
    return this.actor;
  }
}

TimeStripe.prototype.pixelsPerHour = function(value) {
  if ( typeof value !== 'undefined' ) {
    this.pixelsPerHour = value;
  } else {
    return this.pixelsPerHour;
  }
}

TimeStripe.prototype.scroll = function(value) {
  if ( typeof value !== 'undefined' ) {
    this.scrolling = value;
  } else {
    return this.scrolling;
  }
}

TimeStripe.prototype.updateBar = function() {
  var hour_size = 100; // Include the thickness of top and bottom borders.

  // Adjust Bar Postition / Div Size
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();

  var height = (hour * hour_size) + ((minute / 60) * hour_size);

  this.element.style.height = height;

  if ( this.scrolling == 'yes' ) this.scrollPage();

  var ts_obj = this;
  setTimeout(function() { ts_obj.updateBar(); }, 30000);
}

TimeStripe.prototype.scrollPage = function() {
  var time_bar_pos = parseInt(this.element.style.height);

  if (time_bar_pos > 80) {
    while ( window.pageYOffset != (time_bar_pos - 80) ) {
      window.scrollTo(0, time_bar_pos - 80);
    }
  } else {
    window.scrollTo(0, 0);
  }
}
