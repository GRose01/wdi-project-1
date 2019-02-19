$(() => {

  // Build Grid
  const $grid = $('.grid')
  const board = []


  // player tracking
  let playerCurrentIndex = 275


  for(let i = 0; i < 285 ; i++) {
    const $gridbox = document.createElement('div')
    $gridbox.className = 'gridbox'
    $gridbox.id = i
    $grid.append($gridbox)
    board.push($gridbox)
  }

  const $gridbox = $('.gridbox')


  // ALIENS

  // set original aliens in an array
  const $aliens = []

  board.forEach((element, index) => {
    if(index >= 20 && index <= 30) {
      $(element).addClass('alien')
    } if(index >= 39 && index <= 49) {
      $(element).addClass('alien')
    } if(index >= 58 && index <= 68) {
      $(element).addClass('alien')
    }
  })

  const alienClass = document.querySelectorAll('.alien')
  $aliens.push(alienClass)

  console.log($aliens)

  // const $alien = $('.alien')

  // then move alien array left/right
  // function alienMove {
  //   alienClass.
  // }

  setInterval(() => {

    // $gridbox.eq($alien[0].id++).addClass('alien')

  }, 1000)


  // $gridbox.eq($alien[0].id++).addClass('alien')
  //
  //





  // function startGame() {
  //   setInterval(timing, 1000)
  // } put timings ina function called timing
  // should this be put in the play button with the set up positions & score



  // when play button is clicked - create formation:
  const $playButton = $('.playButton')

  $playButton.on('click', (e) => {
    // call Setup function
  })


  // PLAYER
  const $player = $(board[playerCurrentIndex]).addClass('player')


  $(window).on('keydown', (e) => {

    switch(e.keyCode) {
      case 37:
        $gridbox.removeClass('player')
        playerCurrentIndex--
        $(board).eq(playerCurrentIndex).addClass('player')
        break
      case 39:
        $gridbox.removeClass('player')
        playerCurrentIndex++
        $(board).eq(playerCurrentIndex).addClass('player')
        break
      case 32:
        console.log('fire')
        break
      default:
        console.log('hit any other key')
    }
    if(playerCurrentIndex === 266) {
      !playerCurrentIndex++
    }
    if(playerCurrentIndex === 284) {
      !playerCurrentIndex--
    }
  })





// aliens to start top left
// every half second they move left/right
// when they hit a wall, all move downa nd start going opposite direction

})
