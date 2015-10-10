/*

Instructions: Call the 'addClickTracking()' function when the page has loaded like so:

addClickTracking({
	site_name: 'Baycrest',
	dev_mode: true,
	selection_mode: 'include',
	targets: ['#container a', '.info-box'] 
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

//Main function

function addClickTracking(options){

	//Default options
	var default_options = {
		site_name: '',
		targets: [],
		exclusions: [],
		log_event_data_to_console: true
	}

	//Apply defaults to undefined values
	options = (options === undefined)	? default_options : options;

	for(var property in default_options){
		if(!options.hasOwnProperty(property)){
			options.property = default_options.property;
		}
	}

	console.log(options)

}