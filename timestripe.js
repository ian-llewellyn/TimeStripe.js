function TimeStripe(dom_element) {
  this.element = dom_element;
  this.actor = 'height';
  this.unitsPerHour(100);
  this.scrolling = 'yes';

  //this.align('top');

  /*this.style({
    "width": "100%",
    "background-color": "rgba(128,0,0,0.3)",
    "border": "0 0 2px 0",
    "border-bottom": "solid red",
    "position": "absolute"
  });*/

  var ts_obj = this;
  window.onload = function() { ts_obj.updatePosition(); };
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

  return this;
}

TimeStripe.prototype.align = function(alignment) {
  alignment = typeof alignment !== 'undefined' ? alignment : 'top';

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

  return this;
}

TimeStripe.prototype.animate = function(property) {
  if ( typeof property !== 'undefined' ) {
    this.actor = property;
  } else {
    return this.actor;
  }

  return this;
}

TimeStripe.prototype.unitsPerHour = function(value) {
alert(value);
  if ( typeof value !== 'undefined' ) {
    this.hourSize = value;
  } else {
    return this.hourSize;
  }

  return this;
}

TimeStripe.prototype.scroll = function(value) {
  if ( typeof value !== 'undefined' ) {
    this.scrolling = value;
  } else {
    return this.scrolling;
  }

  return this;
}

TimeStripe.prototype.updatePosition = function() {
  // Adjust Bar Postition / Div Size
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  var value = (hour * this.hourSize) +
              ((minute / 60) * this.hourSize) +
              ((second / 3600) * this.hourSize);

  this.element.style.setProperty(this.actor, 'rotate(' + ( value % 360 ) + 'deg)');

  if ( this.scrolling == 'yes' ) this.scrollPage();

  var ts_obj = this;
  setTimeout(function() { ts_obj.updatePosition(); }, 1000);
}

TimeStripe.prototype.scrollPage = function() {
  var time_bar_pos = parseInt(this.element.style.height);

  if (time_bar_pos > 80) {
    window.scrollTo(0, time_bar_pos - 80);
  } else {
    window.scrollTo(0, 0);
  }
}
