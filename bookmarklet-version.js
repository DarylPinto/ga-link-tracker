//Append jQuery to <head> if not already present
if(typeof jQuery === 'undefined'){
	var jquery_script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js';
	document.head.appendChild(jquery_script);
}

//Link CSS
$('head').append('<link rel="stylesheet" href="C:\\Users\\Daryl\\Documents\\GitHub\\ga-link-tracker\\css\\main.css">');

//Attach approrpriate elements to page
var ga_tracker_panel = document.createElement('div');
$(ga_tracker_panel).attr('id', 'ga-tracker-panel');