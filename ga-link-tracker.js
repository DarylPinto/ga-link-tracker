function addClickEvents(site_name, param2, param3){ //Add click event tracking to each link.

	//==== HOW TO USE THIS FUNCTION:====

	//Calling this function automatically adds google analytics event tracking to every link on the page besides those specified by ignored_links parameter (See below for further details)
	//Every link's parent container element must have a 'data-ga-name' attribute. A popup will show up identifing
	//the link that needs the attribute if it is not present. (For example, links in the navigation section will need their parent container to have data-ga-name="navigation")
	//jQuery selectors for what is considered a "containing" element
	var containers = 'div[id], div[class], main, header, footer, section, article, aside, nav, body, html';

	//Options:
	//========
	//Param 1: site_name: String. Name of website
	//Param 2: dev_mode: Boolean. If true, show pop-up with click event info. If false, send the info.
	//Param 3: ignored_links: Array. jQuery selectors that you do not want to attach click tracking to. e.g. ['.sidebar a', '.footer a']
	//

	//==================================

	var dev_mode;
	var ignored_links;

	//Handle parameters 2 or 3 being optional (can be used in interchanging order or not at all)
	dev_mode = (typeof param2 === 'boolean') ? param2 : dev_mode;
	dev_mode = (typeof param3 === 'boolean') ? param3 : dev_mode;
	ignored_links = ( $.isArray(param2) ) ? param2 : ignored_links;
	ignored_links = ( $.isArray(param3) ) ? param3 : ignored_links;

	ignored_links = ( ignored_links == null ) ? [] : ignored_links.toString();
	dev_mode = ( dev_mode == null ) ? false : dev_mode;

	//console.log(site_name + ' | ' + dev_mode + ' | ' + ignored_links)

	$('a').not(ignored_links).each(function(){ //For every link (besides those specifically ignored)
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