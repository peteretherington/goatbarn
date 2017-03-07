
	$(function(){

		var players = [
				{
					playerPhoto: "images/markmessier_headshot.jpg",
					playerJersey: "images/markmessier_number.jpg",
					id: 11,
					match: false
				},
				{
					playerPhoto: "images/careyprice_headshot.jpg",
					playerJersey: "images/careyprice_number.jpg",
					id: 31,
					match: false
				},
				{
					playerPhoto: "images/matssundin_headshot.jpg",
					playerJersey: "images/matssundin_number.jpg",
					id: 13,
					match: false
				},
				{
					playerPhoto: "images/jaromirjagr_headshot.jpg",
					playerJersey: "images/jaromirjagr_number.jpg",
					id: 68,
					match: false
				},
				{
					playerPhoto: "images/steveyzerman_headshot.jpg",
					playerJersey: "images/steveyzerman_number.jpg",
					id: 19,
					match: false
				},
				{
					playerPhoto: "images/alexovechkin_headshot.jpg",
					playerJersey: "images/alexovechkin_number.jpg",
					id: 8,
					match: false
				},
				{
					playerPhoto: "images/sidneycrosby_headshot.jpg",
					playerJersey: "images/sidneycrosby_number.jpg",
					id: 87,
					match: false
				},
				{
					playerPhoto: "images/gordiehowe_headshot.jpg",
					playerJersey: "images/gordiehowe_number.jpg",
					id: 9,
					match: false
				},
				{
					playerPhoto: "images/mariolemieux_headshot.jpg",
					playerJersey: "images/mariolemieux_number.jpg",
					id: 66,
					match: false
				},
				{
					playerPhoto: "images/bobbyorr_headshot.jpg",
					playerJersey: "images/bobbyorr_number.jpg",
					id: 4,
					match: false
				},
				{
					playerPhoto: "images/waynegretzkey_headshot.jpg",
					playerJersey: "images/waynegretzkey_number.jpg",
					id: 99,
					match: false
				},
				{
					playerPhoto: "images/connormcdavid_headshot.jpg",
					playerJersey: "images/connormcdavid_number.jpg",
					id: 97,
					match: false
				}
				// {
				// 	playerPhoto: "images/evgenimalkin_headshot.jpg",
				// 	playerJersey: "images/evgenimalkin_number.jpg",
				// 	id: 71,
				// 	match: false
				// },
				// {
				// 	playerPhoto: "images/guylafleur_headshot.jpg",
				// 	playerJersey: "images/guylafleur_number.jpg",
				// 	id: 10,
				// 	match: false
				// },
				// {
				// 	playerPhoto: "images/ericlindros_headshot.jpg",
				// 	playerJersey: "images/ericlindros_number.jpg",
				// 	id: 88,
				// 	match: false
				// },
			];

			// Shuffles the arrays
			function shuffle(players) {
			  var m = players.length, t, i;
			  while (m) {
			    i = Math.floor(Math.random() * m--);
			    t = players[m];
			    players[m] = players[i];
			    players[i] = t;
			  }
			  return players;
			}

			// Calls the shuffle to run
			// players = shuffle(players);

			// Displays the players faces images in list on left side
			players.forEach(function(faceImage, index){
				$('.playersFacesList').append(`
					
					<label for="face${index} class="clickBox" data-type="face">
						<img src="${faceImage.playerPhoto}" data-id="${faceImage.id}">
					</label>
					<input type="radio" id="face${index}" name="radioFaces">
				`);
			});
			
			// Calls the shuffle to run
			players = shuffle(players);

			// Displays players numbers images on right side
			players.forEach(function(numberImage, index){
				$('.playersNumbersList').append(`		
					<label for="number${index} class="clickBox" data-type="number">
						<img src="${numberImage.playerJersey}" data-id="${numberImage.id}">
					</label>
					<input type="radio" id="number${index}" name="radioNumbers">
				`);
			});

			var numberId;
			var faceId;
			var selectedFace;
			var selectedNumber;
			var homeScore = 0;
			var awayScore = 0;

			$('.homeScore').html(`<span>${homeScore}</span>`);
			$('.awayScore').html(`<span>${awayScore}</span>`);

				// Listen for a user to click on an image (child of the label)
				$('label').on('click', function(){
					// If the label has not been matched already
					if(!$(this).hasClass('valid')) {
						// Store data-type value (e.g. 'face' or 'number') in this var
						var type = $(this).data('type');
						// If 'type' is equal to 'face' run this block
						if(type === 'face') {
							// Store data-id value (e.g. '99') in faceId var
							faceId = $(this).find('img').data('id');
							// If type is equal to face make selectedFace equal to true
							selectedFace = true;
						}
						// If type does not equal face run this block
						else {
							// Store data-id value (e.g. '99') in numberId var
							numberId = $(this).find('img').data('id');
							// If type is equal to number make selectedNumber equal to true
							selectedNumber = true;
						}
					// Find the label's parent,
					// then search for its child,
					// remove the class of 'imageSelected'
					$(this).parent('fieldset').find('img').removeClass('imageSelected');
					// Find the label's child,
					// then toggle the class of 'imageSelected'
					$(this).children().toggleClass('imageSelected');
				};
				});
				// When the submit button is clicked run this block
				$('.submitMatch').click(function(e){
					// prevent page refresh
					e.preventDefault();
					// If a face and number has been selected then run this block
					if(selectedFace === true && selectedNumber === true) {
						// If the face and number have a matching ID then run this block
						if (numberId === faceId) {
							// in the element with class of 'validator' insert this markup
							$('.validator').html('<p class="green"><img src="assets/goat.png" class="goat-overlay"> VERIFIED<p>');
							// From the players array filter out objects based on the following conditions:
							players.filter(function(player) {
								// If the players ID matches then run this block
								if (player.id === numberId) {
									// Change the players key value for 'match' to true
									player.match = true;
									// Find the label's img element and add a class of 'valid'
									$(this).find('img').addClass('valid');
									// Find the input associated with the label and uncheck the radio button
									$('input').prop('checked', false);
									// Find the first image selected in the match pair and add a class of 'valid'
									$(".imageSelected").addClass('valid');
									// Add 1 to the (user's) homeScore
									homeScore = homeScore + 1;
									// Insert the homeScore into the scoreBoard
									$('.homeScore').html(`<span> ${homeScore}</span>`);

								// Attempt to append fact about player that has been matched to 'factBox' element
									// players.forEach(function(playerinfo){
									// 	$('.factBox').append(`	
									// 		<p>${playerinfo.fact}</p>
									// 	`);
									// });

								}

								selectedFace = false;
								selectedNumber = false;

							})
						// If the face and number DON'T share an ID, run this block
						} else {
							// in the element with class of 'validator' insert this markup
							$('.validator').html('<p class="red">TRY AGAIN<p>');
							// Add 1 to the (invalid selection) awayScore
							awayScore = awayScore + 1;
							// Insert the awayScore into the scoreBoard
							$('.awayScore').html(`<span> ${awayScore}</span>`);
						}
						// Create a function that checks if the array object has a value of true
						function gameWon(el) {
							return el.match === true;
						}
						// If every array object has a value of true, run this block
						if (players.every(gameWon) === true) {
							// Insert this markup into the HTML
							$('.validator').html('<p class="animated flash">YOU WIN!!<p>');
						}
					}
				});


		// SCOREBOARD TIME
		(function () {
		    function checkTime(i) {
		        return (i < 10) ? "0" + i : i;
		    }

		    function startTime() {
		        var today = new Date(),
		            h = checkTime(today.getHours()),
		            m = checkTime(today.getMinutes());
		        document.getElementById('time').innerHTML = h + ":" + m ;
		        t = setTimeout(function () {
		            startTime()
		        }, 500);
		    }
		    startTime();
		})();

	}); //End of Document Ready