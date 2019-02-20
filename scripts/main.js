$(() => {

  // Build Grid
  const $grid = $('.grid')
  const board = []

  for(let i = 0; i < 285 ; i++) {
    const $gridbox = document.createElement('div')
    $gridbox.className = 'gridbox'
    $gridbox.id = i
    $grid.append($gridbox)
    board.push($gridbox)
  }

  const $gridbox = $('.gridbox')
  // const lasers = []


  // ALIENS

  class Alien {
    constructor(startingIndex) {
      this.currentIndex = startingIndex
      this.currentMoves = 0
      this.isMovingRight = true
      this.isHit = false
      this.render()
      this.movementId = null
      this.move()
    }

    render() {
      !this.isHit && $(board).eq(this.currentIndex).addClass('alien')
    }

    move() {
      this.movementId = setInterval(() => {
        if (this.currentIndex < 266) {
          $(board).eq(this.currentIndex).removeClass('alien')
          if(this.isHit){
            clearInterval(Laser.laserFire)
            $(board).eq(this.isHit).removeClass('alien')
          }
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
          if(this.isHit){
            clearInterval(this.movementId)
          }
        } else {
          alert('Game over!')
          // this.gamePlaying = false
          clearInterval(this.movementId)
        }

      }, 1000)
    }
  }

  // Place aliens and call object Alien
  const aliens = [new Alien(20), new Alien(22), new Alien(24), new Alien(26), new Alien(28), new Alien(30), new Alien(40), new Alien(42), new Alien(44), new Alien(46), new Alien(48), new Alien(58), new Alien(60), new Alien(62), new Alien(64), new Alien(66), new Alien(68)]

console.log()
  // aliens.forEach(alien => alien.move)

  // PLAY BUTTON
  // when play button is clicked - create formation:
  const $playButton = $('.playButton')

  $playButton.on('click', (e) => {
    console.log('playing')
    this.gameplaying = true

  })
  const $quitButton = $('.quitButton')

  $quitButton.on('click', (e) => {
    console.log('quit')
    this.gameplaying = false
    clearInterval(this.movementId)
    // does this need to refer to the alien?
    $(window).off('keydown')
  })


  // PLAYER
  let playerCurrentIndex = 275
  $(board[playerCurrentIndex]).addClass('player')

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
      // console.log('fire', this.currentFire)
      this.currentMoves = 0
    }

    fire() {
      const laserFire = setInterval(() => {
        let isHit = false
        $(board).eq(this.currentFire).removeClass('laser')
        if (this.currentFire >= 19) {
          this.currentFire -= 19
          aliens.forEach( (alien, alienIndex) =>{

            if (alien.currentIndex === this.currentFire){
              alien.isHit = true
              $(board).eq(alien.currentIndex).removeClass('alien laser')
              // $(board).eq(this.currentFire).removeClass('laser')
              clearInterval(laserFire)
              aliens.splice(alienIndex, 1)
              console.log('HIT!')
              console.log(aliens)
              isHit = true
            } else {
              !isHit && $(board).eq(this.currentFire).addClass('laser')
            }
          })
        } else {
          clearInterval(laserFire)
        }
        // console.log(this.currentFire, '<-------- this.currentFire')
      }, 50)
      // hitCheck()
    }

  }



})
