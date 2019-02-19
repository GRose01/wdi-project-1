$(() => {

  // Build Grid
  const $grid = $('.grid')

  for(let i = 0; i < 285 ; i++) {
    const $gridbox = document.createElement('div')
    $gridbox.className = 'gridbox'
    $gridbox.id = i
    $grid.append($gridbox)
  }

  const $gridbox = $('.gridbox')

  // ALIENS

// set original aliens in an array
  const $aliens = []

// this is the starting 5 aliens in an array
  for(let x = 20; x<25.; x++) {
    const startingAliens = $gridbox.eq(x).addClass('alien')
    $aliens.push(startingAliens)
  }
  console.log($aliens)

  const $alien = $('.alien')

// then move alien array left/right
  let move = 0
  setInterval(() => {
    $gridbox.removeClass('alien')
    move++
    
    $(gridbox[ move]).addClass('alien')
    // $gridbox.eq($alien[0].id++).addClass('alien')
    // const movement = $gridbox[$aliens + move]
    // movement.addClass('alien')
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
  const $starterPosition = $gridbox.eq(275).addClass('player')
  const $player = $('.player')

  $(window).on('keydown', (e) => {

    if ($player[0].id >= 266 && $player[0].id <= 284) {
      switch(e.keyCode) {
        case 37:
        $gridbox.removeClass('player')
        $gridbox.eq($player[0].id--).addClass('player')
        break
        case 39:
        $gridbox.removeClass('player')
        $gridbox.eq($player[0].id++).addClass('player')
        break
        case 32:
        console.log('fire')
        break
        default:
        console.log('hit any other key')
      }
    // } else if ($player[0].id === 266) {
    //   !($player[0].id++)
    // } else if ($player[0].id === 284) {
    //   !($player[0].id--)
    }
  })

  //   switch(e.keyCode) {
  //     case 37:
  //     $gridbox.removeClass('player')
  //     $gridbox.eq($player[0].id--).addClass('player')
  //     break
  //     case 39:
  //     $gridbox.removeClass('player')
  //     $gridbox.eq($player[0].id++).addClass('player')
  //     break
  //     case 32:
  //     console.log('fire')
  //     break
  //     default:
  //     console.log('hit any other key')
  //   }
  // })




  // aliens to start top left
  // every half second they move left/right
  // when they hit a wall, all move downa nd start going opposite direction

})
