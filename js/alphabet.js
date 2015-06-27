$(function(){
	var letters; // declare global variable
	$.ajax({ // setup request
		beforeSend: function(xhr){ // before requesting data
			if(xhr.overrideMimeType){ // if supported
				xhr.overrideMimeType("application/json"); // set MIME to prevent errors
			}
		}
	});

	//function that collects data from json file
	function loadTimetable(){ // declare function
		$.getJSON('data/alphabet.json').done(function(data){ // try to collect json data and if successful
			letters = data; // store in a variable
		}).fail(function(){ // if it fails, show message
			$("alphabet_list").html("sorry, we could not load timetable");
		});
	}

	loadTimetable();

	// click on the event to load a timetable
	$("#alphabet_list").on('click', '.alphabet li a', function(e){ // click on link
		e.preventDefault();
		var loc = this.id.toUpperCase(); // gets id value and puts it in upper case because
		// it corresponds to the object value in json "A", "B"

		// what ever link was clicked, it loads the object in the array the letter 
		//represents of the json object onto the webpage
		var newContent = ''; 
		for (var i = 0; i<letters[loc].length; i++){
			newContent += '<h1>' + letters[loc][i].word + '</h1>';
			newContent += '<p>' + letters[loc][i].definition + '</p>';
		}

		$('#letter_words').html('<div>' + newContent + '</div>');
		
	});

	//primary navigation
	$("a").on('click', function (e){ // when link is clicked
		e.preventDefault();
		var url = this.href; // holds url of page to load

		// remove active class and add it to the clicked item
		$("a.active").removeClass("active"); 
		$(this).addClass("active");

		//loads the new word and only changes that section of the page instead of whole page
		$("#letter_words div").remove();

		// load the url and the div content. it is initially hidden and then it fades in
		$("#letter_words").load(url + ' #letter_words div').hide().fadeIn('slow');
	});

}); 
