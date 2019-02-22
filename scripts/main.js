$(() => {

  // Build Grid
  const $grid = $('.grid')
  const board = []
  let aliens = []
  const $alien = $('.alien')
  const $winner = $('.winner')
  const $playButton = $('.playButton')
  const $quitButton = $('.quitButton')
  const $playAgainButton = $('.playAgain')
  const $gameOver = $('.gameOver')


  // SCORE
  const $score = $('.score')
  let currentScore = 0
  const $highscore = $('.highscore')
  const currentHighscore = localStorage.getItem('highscore')
  $highscore.text(currentHighscore ? currentHighscore : '0')
  $score.text(currentScore ? currentScore : '0')

  for(let i = 0; i < 285 ; i++) {
    const $gridbox = document.createElement('div')
    $gridbox.className = 'gridbox'
    $gridbox.id = i
    $grid.append($gridbox)
    board.push($gridbox)
  }

  const $gridbox = $('.gridbox')


  // PLAY BUTTON
  $playButton.on('mousedown', () => {
    setup()
    $playButton.addClass('executed')
  })

  // QUIT BUTTON
  $quitButton.on('click', () => {
    gameover()
    $playAgainButton.removeClass('executed')
  })

  // PLAY AGAIN BUTTON
  $playAgainButton.on('click', () => {
    setup()
    $playAgainButton.addClass('executed')
    $gameOver.addClass('executed')
    $(window).on('keydown')
  })

  // // NEXT LEVEL BUTTON
  // $nextLevel.on('click', () => {
  //   levelUp()
  //   $nextLevel.addClass('executed')
  // })


  // ALIENS

  let intervalTime = 1000

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
          if (this.currentMoves < 4) {
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
          gameover()
          clearInterval(this.movementId)
        }
      }, intervalTime)
    }
  }

  // Place aliens and call object Alien
  function setup() {
    aliens = [new Alien(20), new Alien(22), new Alien(24), new Alien(26), new Alien(28), new Alien(30), new Alien(32), new Alien(40), new Alien(42), new Alien(44), new Alien(46), new Alien(48), new Alien(50), new Alien(58), new Alien(60), new Alien(62), new Alien(64), new Alien(66), new Alien(68), new Alien(70)]
  }

  let laser = null

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
        laser = new Laser(playerCurrentIndex).fire()
        break
      default:
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
      this.currentMoves = 0
      this.laserFire = null
    }

    fire() {
      this.laserFire = setInterval(() => {
        let isHit = false
        $(board).eq(this.currentFire).removeClass('laser')
        if (this.currentFire >= 19) {
          this.currentFire -= 19
          aliens.forEach( (alien, alienIndex) => {
            if (alien.currentIndex === this.currentFire){
              alien.isHit = true
              $(board).eq(alien.currentIndex).removeClass('alien laser')
              clearInterval(this.laserFire)
              aliens.splice(alienIndex, 1)
              isHit = true
              currentScore += 10
              $score.text(currentScore)
              if (aliens.length === 0) {
                // $nextLevel.removeClass('executed')
                levelUp()
              }
            } else {
              !isHit && $(board).eq(this.currentFire).addClass('laser')
            }
          })
        } else {
          clearInterval(this.laserFire)
        }
      }, 50)
    }
  }

  // GAME FUNCTIONS
  
  function levelUp() {
    if(intervalTime === 200) {
      intervalTime -= 100
    } else if (intervalTime === 100) {
      $gridbox.addClass('executed')
      $winner.removeClass('executed')
    } else {
      intervalTime -= 200
      setup()
    }
  }

  function gameover() {
    checkHighscore()
    $gridbox.removeClass('alien')
    aliens.forEach((alien) => clearInterval(alien.movementId))
    // $(window).off('keydown')
    // for (let i = 0; i < 500; i++) {
    //   window.clearInterval(i)
    // }
    $gameOver.removeClass('executed')
    $playAgainButton.removeClass('executed')
  }

  function checkHighscore() {
    const currentHighscore = localStorage.getItem('highscore')
    if (currentScore > currentHighscore) {
      alert('NEW HIGHSCORE')
      localStorage.setItem('highscore', currentScore)
      $highscore.text(currentScore)
    }
  }


})
