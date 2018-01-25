$('document').ready(function() {

/* the below code sets the newspaper div to move around and be the cursor for the game.
inspired by this codepen https://codepen.io/IanHazelton/pen/EXWNbz */

  $(document).on('mousemove', function(e) {
  $('#newspaper').css({
    'left':  e.pageX,
    'top':  e.pageY
  }); // closes the css assignment
}); // closes the function

/* The Below code grabs the form and stores the user's name.
I had to define the player name outside of the function so that it would have global scope.
I then just reassign its value inside the function */

  let form = $('form');
  let playerName = $('#playerName').val();
  form.submit(grabForm)
  function grabForm(event) {
  form = $('form');
  playerName = $('#playerName').val();
  event.preventDefault();
  form.hide();
  $('img').css('visibility', 'visible');
  $('.playerName').html(playerName);
} // closes grabForm function

//the below code attaches the images to the divs
let divs = $('.flies');
divs.each(function(i) {
  let img = $('<img/>');
  img.attr( {
    'id': i,
    'src': 'http://clipart-library.com/images/8iznoLG8T.png'}); // closes the css assignment
  $(this).append(img)
}); // closes the function

// the below code creates the class for the flies and all 5 instances
//in a future state I want to use this for the win logic
// let fliesArray = [];
// console.log(fliesArray)



// below is my class for all the flies
class Fly {
  constructor(im){
    this.im = im.click(this.squash.bind(this));
    this.alive = true;    // fliesArray.push(this);
  } // closes constructor
  squash() {
    this.alive= false;
    this.im.css('visibility', 'hidden');
    }
  } // closes fly class


// below are all the instances of the class
let fliesArray = [
  new Fly($('#0')),
  new Fly($('#1')),
  new Fly($('#2')),
  new Fly($('#3')),
  new Fly($('#4'))
]





// the below code sets the timer and runs the win logic.
// The timer was insirped by this codepen: https://codepen.io/srikarg/pen/xdIvH?q=timer&limit=all&type=type-pens
// setInterval instructs a function to run at certain time intervals.
// So mine is running every 1000 miliseconds, aka every second
$('button').click(timerF)
let wins = 0
let plays = 0
function timerF() {
  let myTimer = window.setInterval(timerFunction, 1000);
  let seconds = 60;
  function timerFunction () {
    seconds = seconds-1;
    $('.timer').text(seconds);
    if(fliesArray.every(fly => !fly.alive)) {
      $('.winner').html(playerName + ', you won!');
      window.clearInterval(myTimer);
      $('.reset').css('visibility', 'visible');
      addWin()
    } // closes if statement
    else if (seconds === 0) {
      window.clearInterval(myTimer);
      $('.winner').html('Better Luck Next Time!');
      $('img').css('visibility', 'hidden');
      $('.reset').css('visibility', 'visible');
       addLoss()
      } // closes else if statement
    } // closes timerFunction
}// closes timerF

// below is function for adding the win
function addWin() {
  plays = plays+1;
  wins = wins+1;
$('.winCount').html(`Your wins: ${wins}/${plays}`)
} // closes addWin function

function addLoss() {
  plays = plays+1;
  $('.winCount').html(`Your wins: ${wins}/${plays}`)
} // closes addLoss function

// the below code is for the reset button

$('.reset').click(function(event) {
  $('img').css('visibility', 'visible');
  for(i = 0; i < fliesArray.length; i ++){
    fliesArray[i].alive = true
  }
  $('.winner').html("");
  $('.reset').css('visibility', 'hidden')
});


})// closes documnet.ready function


