/*
==================================
Google Analytics Click Event Tracker v2.0.0
By: Scratch Marketing
Support: IE9+


Instructions: Call the 'addClickTracking()' function after the page has loaded like so:

addClickTracking({
	site_name: 'Scratch',
	targets: ['a'],
	exclusions: ['#main-footer a', '#main-header a'],
	show_console_logs: true
});

This will automatically add event tracking to all specified targets.
==================================
*/

//////////////////////
//jQuery simulations//
//////////////////////

function qs(selector){ //Simulates jQuery $(el)
	return document.querySelector(selector);
}

function qsa(selector){ //Simulates jQuery $(el)
	//If argument is a string, run queryselectorall on it
	if(typeof selector === 'string' || typeof selector === 'undefined'){
		selector = (arguments.length === 1 && selector.length > 0) ? selector : 'no tag'; //Create empty nodelist if no parameter is given
		return document.querySelectorAll(selector);
	}

	//If argument is a Node, return a nodelist with that node inside it
	else{
		var el = selector;
		return el.toNodeList();
	}
}

Node.prototype.toNodeList = function(){
	//Converts node to nodelist.
	//(useful for using all the following nodelist methods
	//without needing to make seperate ones specifically for nodes)
	this.setAttribute('wrapNodeList', '');
	var list = document.querySelectorAll('[wrapNodeList]');
	this.removeAttribute('wrapNodeList');
	return list;
}

NodeList.prototype.each = function(callback){ //Simulates jQuery $(el).each(); 
	for(var i=0;i < this.length;i++){
		callback.call(this[i]);
	}
}

NodeList.prototype.onClick = function(callback){ //Simulates jQuery $(el).click();
	this.each(function(){
		this.addEventListener('click', callback);
	});
}

NodeList.prototype.attr = function(attribute, desired_value){ //Simulates jQuery $(el).attr();
	var return_value;
	var node_list = this;
	if(arguments.length === 1){
		this.each(function(){
			var x = this.getAttributeNode(attribute);
			return_value = (x == null) ? undefined : x.value;
		});
	}else{
		this.each(function(){
			this.setAttribute(attribute, desired_value);
			return_value = node_list;
		});
	}
	return return_value;
}

////////////////////
//Helper functions//
////////////////////

function copyMissingProperties(obj_source, obj_target){
//Copy properties from obj_source to obj_target if they're undefined in obj_target

	obj_target = (obj_target === undefined)	? obj_source : obj_target;

	for(var property in obj_source){
		if(!obj_target.hasOwnProperty(property)){
			obj_target[property] = obj_source[property];
		}
	}

	return obj_target;

}

function labelElement(el, attr){
	if(attr === 'text'){
		var text_arr = el.textContent.split(' ');
		text_arr = text_arr.splice(0, 4);

		return text_arr.join(' ');
	}else if(attr === undefined){
		return '<LABEL>'
	}else{
		return el.attributes[attr].value.replace(/(-|_)/g, ' ');
	}
}

function getElementCategory(el){
	var valid_attrs = ['data-ga-category', 'id'];

	valid_attrs.forEach(function(attribute){

	});

}

function createTargetSelector(targets, exclusions){ 
//Take two css selector arrays and output a selector string that targets
//everything in the first array but excludes everything in the second.

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

/////////////////
//Main function//
/////////////////

function addClickTracking(options){

	//Default options
	var default_options = {
		site_name: '',
		targets: [],
		exclusions: [],
		show_console_logs: false
	}

	//Apply default options
	options = copyMissingProperties(default_options, options);

	var selector = createTargetSelector(options.targets, options.exclusions);

	qsa(selector).onClick(function(){
		console.log(this.textContent);
	});

	return getElementLabel(qsa(selector)[0]);

}

var test_ga = "ga('send', {\n\thitType: 'event',\n\teventCategory: 'Videos',\n\teventLabel: 'Fall Campaign'\n});"