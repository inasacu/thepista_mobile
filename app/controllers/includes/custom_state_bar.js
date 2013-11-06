var args = arguments[0] || {};
$.barTitle.text = args.title || 'Title';

$.barLeftButton.addEventListener('touchstart', function(e) {
    this.backgroundColor = '#ff9900';
});

$.barLeftButton.addEventListener('touchend', function(e) {
   this.backgroundColor = '#5da423';
});