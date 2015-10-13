/*

Instructions: Call the 'addClickTracking()' function when the page has loaded like so:

addClickTracking({
	site_name: 'Scratch',
	targets: ['a'],
	exclusions: ['#main-footer a', '#main-header a'],
	show_console_logs: true
});

This will automatically add event tracking to all specified targets

*/


//jQuery simulations

function qs(selector){
	return document.querySelector(selector);
}

function qsa(selector){ //Simulates jQuery $(el)
	return document.querySelectorAll(selector);
}

NodeList.prototype.onClick = function(callback){ //Simulates jQuery $(el).click();
	for(var i=0;i < this.length;i++){
		this[i].addEventListener('click', callback);
	}
}

NodeList.prototype.attr = function(attribute, desired_value){ //Simulates jQuery $(el).attr();
	if(arguments.length === 1){
		for(var i=0;i < this.length;i++){
			var x = this[i].getAttributeNode(attribute);
			return (x == null) ? null : x.value;
		}
	}else{
		for(var i=0;i < this.length;i++){
			this[i].setAttribute(attribute, desired_value);
		}
	}
}

//Helper functions

function copyMissingProperties(obj_source, obj_target){ //Copies properties from obj_source to obj_target if they're undefined in obj_target

	obj_target = (obj_target === undefined)	? obj_source : obj_target;

	for(var property in obj_source){
		if(!obj_target.hasOwnProperty(property)){
			obj_target[property] = obj_source[property];
		}
	}

	return obj_target;

}

function createTargetSelector(targets, exclusions){

	if(exclusions.length > 0){
		exclusions = exclusions.map(function(selector){
			return ':not('+selector+')';
		});
		targets = targets.map(function(selector){
			return selector + exclusions.join('');
		});
	}

	return targets.join(', ');

}

//Main function

function addClickTracking(options){

	//Default options
	var default_options = {
		site_name: '',
		targets: [],
		exclusions: [],
		show_console_logs: true
	}

	//Apply default options
	options = copyMissingProperties(default_options, options);

	var selector = createTargetSelector(options.targets, options.exclusions);

	return qsa(selector);

}