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
  const lasers = []


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
      $(board).eq(this.currentIndex).addClass('alien')
    }

    move() {
      this.movementId = setInterval(() => {
        if (this.currentIndex < 266) {
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
    $(window).on('keydown')
  })


  // PLAYER
  let playerCurrentIndex = 275

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
        const newLaser = new Laser(playerCurrentIndex).fire()
        lasers.push(newLaser)

        // console.log(playerCurrentIndex, '<------- playerCurrentIndex')
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
        $(board).eq(this.currentFire).removeClass('laser')
        if (this.currentFire >= 19) {
          this.currentFire -= 19
          console.log(this.currentFire)
          // if ($(this.currentFire).hasClass('alien')) {
          //   console.log('HIT')
          // } else {
          $(board).eq(this.currentFire).addClass('laser')
          // }
        } else {
          clearInterval(laserFire)
        }
        // console.log(this.currentFire, '<-------- this.currentFire')
      }, 450)
    }

  }



  // function checkHit(laserElement) {
  //   const laserIndex = lasers.currentFire[laserElement]
  //   for (let x = 0; x < aliens.position.length; x++) {
  //     if (aliens.position[x] === laserIndex) {
  //       aliens.position.splice(x, 1)
  //       lasers.position.splice(laserElement, 1)
  //       $(board[laserIndex]).classList.remove('alien', 'laser')
  //       console.log('hit')
  //     }
  //   }
  // }




})
