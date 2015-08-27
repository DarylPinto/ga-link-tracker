function addClickTracking(site_name, param2, param3, param4){ //Add click event tracking to each link.

	//==== HOW TO USE THIS FUNCTION:====

	//Calling this function automatically adds google analytics event tracking to every link on the page. There are also options to target or omit specific links.
	//Every link's containing element must have a 'data-ga-name' attribute. A popup will show up identifing
	//the element that needs the attribute if it is not present. (For example, links in the navigation section will need their parent container to have data-ga-name="navigation")
	//here are the jQuery selectors for what is considered a "containing" element:
	var containers = '*[data-ga-name], div[id], div[class]';

	//Options:
	//========
	//Param 1: site_name: String. Name of website
	//Param 2: dev_mode: Boolean. If true, show pop-up with click event info. If false, send the info.
	//Param 3: selection_type: 'include' or 'exclude'. If set to 'include', only target links set in the next parameter, if set to 'exclude', target every link except those set in the next paramater
	//Param 4: link_list: Array. jQuery selectors that you want to 'include' or 'exclude' (as set by previous parameter). e.g. ['.sidebar', '.footer']
	//

	//==================================

	var dev_mode;
	var selection_type;
	var link_list;

	//Handle parameters 2,3 or 4 being optional (can be used in interchanging order or not at all)
	dev_mode = (typeof param2 === 'boolean') ? param2 : dev_mode;
	dev_mode = (typeof param3 === 'boolean') ? param3 : dev_mode;
	dev_mode = (typeof param4 === 'boolean') ? param4 : dev_mode;
	selection_type = (typeof param2 === 'string') ? param2 : selection_type;
	selection_type = (typeof param3 === 'string') ? param3 : selection_type;
	selection_type = (typeof param4 === 'string') ? param4 : selection_type;
	link_list = ( $.isArray(param2) ) ? param2 : link_list;
	link_list = ( $.isArray(param3) ) ? param3 : link_list;
	link_list = ( $.isArray(param4) ) ? param4 : link_list;

	//Assign defaults if nothing is provided
	link_list = ( link_list == null ) ? [] : link_list.map(function(element){return element + ' a'}).toString();
	dev_mode = ( dev_mode == null ) ? false : dev_mode;
	selection_type = ( selection_type == null ) ? 'exclude' : selection_type;

	//Links to iterate through
	var targeted_links = ( selection_type === 'exclude' ) ? $('a').not(link_list) : $(link_list);

	$(targeted_links).each(function(){ //For every link targeted
		if( $(this).text() != '' ){ //Identify link by it's text. (or its ID if there's no text, or its class if there's no ID)
			var tagEnd = $(this).text();
		}else if( $(this).attr('id') != undefined ){
			var tagEnd = $(this).attr('id').replace(/(-|_)/g, ' ');
		}else if( $(this).attr('class') != undefined ){
			var tagEnd = $(this).attr('class').replace(/(-|_)/g, ' ');
		}

		var tag = $(this).closest(containers).attr('data-ga-name') + ' - ' + tagEnd; //Link name in google analytics is: 'Containing element - Link'
		tag = ( $(this).attr('class') === 'button' && $(this).text() != '' ) ? tag + ' button' : tag; //If link has "button" as a class, concatenate " button" to end of link name
		
		$(this).click(function(){ //For every clicked link

			if(dev_mode){  //If dev_mode is true, 
				if( $(this).closest(containers).attr('data-ga-name') === undefined){ //Show a popup alerting the developer that the element containing the link has no data-ga-name attribute
					if( $(this).closest(containers).attr('id') != undefined ){
						var parent_identifier = 'with id: "' + $(this).closest(containers).attr('id') + "'";
					}else if( $(this).closest(containers).attr('class') != undefined ){
						var parent_identifier = 'with class: "' + $(this).closest(containers).attr('class') + "'";
					}else{
						var parent_identifier = '"' + $(this).closest(containers).prop('tagName') + '"';
					}
					alert('WARNING: Containing element ' + parent_identifier + ' is missing data-ga-name attribute!');
				}else{ //show a popup with the google analytics function attached to the link that's clicked
					alert("===GA Click event===\n\nga('send', 'event', '" + site_name + "', '" +  tag + "');");
				}
			}else{ //If dev_mode is false (which is default), call google analytics function
				ga('send', 'event', site_name, tag);
			}

		});
	});
}
