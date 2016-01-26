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
	show_console_logs: false
});

This will automatically add click event tracking to all specified elements.
==================================
*/

//////////////////////
//jQuery simulations//
//////////////////////

NodeList.prototype.toArray = function(){
	//Converts NodeList to Array (Allows use of familiar Array.prototype functions)
	return Array.prototype.slice.call(this);
}

function qs(selector){
	return document.querySelector(selector);
}

function qsa(selector){ //Simulates jQuery $(el)
	var el_array = [];

	//If argument is a string run document.querySelectorAll on it.
	if(typeof selector === 'string' || typeof selector === 'undefined'){
		el_array = document.querySelectorAll(selector).toArray();
	}
	//If argument is a DOM element, return it inside an array
	else{
		var el = selector;
		el_array.push(el);
	}

	return el_array;
}

Array.prototype.onClick = function(callback){ //Simulates jQuery $(el).click();
	this.forEach(function(){
		this.addEventListener('click', callback);
	});
}

Array.prototype.parents = function(selector){
	var parent_array = [];

	this.forEach(function(el){

		var parent = el.parentNode;

		if(parent_array.indexOf(parent) === -1){
			parent_array.push(parent);	
		}

		//Keep adding parents until html element is reached
		while(parent != qs('html') ){
			parent = parent.parentNode;

			if(parent_array.indexOf(parent) === -1){
				parent_array.push(parent);	
			}

		}

		//Filter by selector
		if(selector != undefined){

			parent_array = parent_array.filter(function(el){
				return qsa(selector).indexOf(el) > -1;
			});

		}

	});

	return parent_array;
}

Array.prototype.attr = function(attribute, desired_value){ //Simulates jQuery $(el).attr();
	var return_value;
	var node_array = this;
	if(arguments.length === 1){
		this.forEach(function(el){
			var x = el.getAttributeNode(attribute);
			return_value = (x == null) ? undefined : x.value;
		});
	}else{
		this.forEach(function(el){
			el.setAttribute(attribute, desired_value);
			return_value = node_array;
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
	}else if(attr === undefined || el.attributes[attr] === undefined){
		return '<LABEL>';
	}else{
		return el.attributes[attr].value.replace(/(-|_)/g, ' ');
	}
}

function getElementCategory(el){
	var valid_attrs = ['id', 'data-ga-category'];

	var category;
	
	valid_attrs.forEach(function(attribute){
		category = qsa(el).attr(attribute);
	});

	return category;

}

function getFullElementLabel(el){
	
	

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

	//Generate CSS selector to target desired elements
	var selector = createTargetSelector(options.targets, options.exclusions);

	qsa(selector).onClick(function(){
		console.log(this.textContent);
	});

	//return getFullElementLabel( qsa(selector)[0] );

}

var test_ga = "ga('send', {\n\thitType: 'event',\n\teventCategory: 'Videos',\n\teventLabel: 'Fall Campaign'\n});"