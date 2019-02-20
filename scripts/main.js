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

  class Alien {
    constructor(startingIndex) {
      // this.startingIndex = startingIndex
      this.currentIndex = startingIndex
      this.currentMoves = 0
      this.isMovingRight = true
      this.isHit = false
      this.render()
      this.movementId = null
      this.move()
    }

    render() {
      $(board).eq(this.currentIndex).addClass('alien')
    }

    move() {
      this.movementId = setInterval(() => {
        $(board).eq(this.currentIndex).removeClass('alien')
        if (this.currentMoves < 6) {
          this.currentMoves++
          if(this.isMovingRight) {
            this.currentIndex++
          } else {
            this.currentIndex--
          }
        } else {
          this.currentIndex += 19
          this.currentMoves = 0
          this.isMovingRight = !this.isMovingRight
        }
        this.render()
      }, 1000)
    }
  }


  // Place aliens and call object Alien
  const aliens = [new Alien(20), new Alien(22), new Alien(24), new Alien(26), new Alien(28), new Alien(30), new Alien(40), new Alien(42), new Alien(44), new Alien(46), new Alien(48), new Alien(58), new Alien(60), new Alien(62), new Alien(64), new Alien(66), new Alien(68)]

  console.log(aliens)



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
        new Laser(playerCurrentIndex).fire()

        console.log(playerCurrentIndex, '<------- playerCurrentIndex')
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

//  LASER
  class Laser {
    constructor(firingIndex) {
      this.startingFire = firingIndex
      this.currentFire = firingIndex
      console.log('fire', this.currentFire)
      this.currentMoves = 0
    }

    fire() {
      const laserFire = setInterval(() => {
        $(board).eq(this.currentFire).removeClass('laser')
        if (this.currentFire >= 19) {
          // if ($gridbox.class !== 'alien') {
          this.currentFire  -= 19
          $(board).eq(this.currentFire).addClass('laser')
          // this.currentIndex = playerCurrentIndex
          // } else {
          //   // detect collision
          //   Alien.isHit = true
          //   clearInterval(laserFire)
          // }
        } else {
          clearInterval(laserFire)
        }
        console.log(this.currentFire, '<-------- this.currentFire')
      }, 250)
    }
  }
  //


//  can only have one laser on the screen at once


// when fired(space), rember the class and every 2.5 second, remover laser class and add one to index + 19
// at every loop, check whether the div has a class of alien
// if yes, change this.isHit of alien, and remove colour. and then end laser
// if no, continue to next box



})
