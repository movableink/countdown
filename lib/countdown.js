Countdown = function(type, el, options) {
  var fiveDays = 5 * 24 * 60 * 60 * 1000;
  options = options || {};
  this.to = options.to || (new Date((new Date()).getTime() + fiveDays));
  this.type = type;
  this.el = el;
  this.leadingZeros = options.leadingZeros || 0;
}

Countdown.prototype = {
  run: function() {
    if(this.interval) return; // already running

    var self = this;
    this.update();
    this.interval = setInterval(this.update.bind(this), 1000);
  },

  update: function() {
    var value = this[this.type](); // TODO
    this.el.innerHTML = this.pad(value);
  },

  stop: function() {
    if(this.interval) clearInterval(this.interval);
  },

  seconds: function() {
    return this.totalSeconds() % 60;
  },

  minutes: function() {
    return this.totalMinutes() % 60;
  },

  hours: function() {
    return this.totalHours() % 24;
  },

  days: function() {
    return Math.floor(this.totalHours() / 24);
  },

  now: function() {
    return new Date();
  },

  totalSeconds: function() {
    return Math.floor(Math.max(this.to.getTime() - this.now().getTime(), 0) / 1000);
  },

  totalMinutes: function() {
    return Math.floor(this.totalSeconds() / 60);
  },

  totalHours: function() {
    return Math.floor(this.totalMinutes() / 60);
  },

  // Pad a number with zeroes
  pad: function(number) {
    number += "";
    while(number.length < this.leadingZeros) {
      number = "0" + number;
    }
    return number;
  }
}
