(function () {
  window.Game = function () {
    window.GameObject.apply(this, arguments)
    this.$bgContainer = $(document.getElementsByClassName('container')[0])
    this.moveSpeed = 1;
    this.update = this.update.bind(this)
    this.bindEvent = this.bindEvent.bind(this)
    this.spawn = this.spawn.bind(this)
    this.removeEnemy = this.removeEnemy.bind(this)
    this.enemyTimer = 0
    this.enemyInterval = 2
    this.enemyArr = []
    this.subscribe('enemyDied', this, this.removeEnemy)
    this.subscribe('reduceHealth', this, this.removeEnemy)
    this.spawn()
    this.start()
  }

  Game.prototype = new GameObject()

  Game.prototype.removeEnemy = function (enemy) {
  }

  Game.prototype.removeEnemy = function (enemy) {
    // console.log(this);
    let index = this.enemyArr.indexOf(enemy)
    if (index > -1) {
      enemy.$ele.remove()
      this.enemyArr.splice(index, 1)
    }
  }

  Game.prototype.spawn = function () {
    setInterval(() => {
      // console.log(this);
      this.enemyTimer++;
      this.enemyTimer = this.enemyTimer % this.enemyInterval;
      if (this.enemyTimer === 0) {
        let enemy = new Enemy()
        this.enemyArr.push(enemy)
      }
    }, 1000)
  }

  Game.prototype.update = function () {
    this.$bgContainer.css('left', this.$bgContainer.position().left - this.moveSpeed)
    this.enemyArr.forEach(enemy => {
      let enemyL = enemy.$ele.position().left
      let playerL = this.player.$ele.position().left
      let playerR = this.player.$ele.position().left + this.player.$ele.width()
      let enemyT = enemy.$ele.position().top
      let playerT = this.player.$ele.position().top
      let playerB = this.player.$ele.position().top + this.player.$ele.height()
      let a1 = enemyL > playerL
      let a2 = enemyL < playerR
      let a3 = enemyT > playerT
      let a4 = enemyT < playerB
      if (a1 && a2 && a3 && a4) {
        // console.log("collided!")
        this.player.hp -= 1
        // enemy.$ele.remove()
        this.publish('enemyDied', enemy)
      }
    });
    this.player.update()
    this.enemyArr.forEach(enemy => {
      enemy.update()
    });
    requestAnimationFrame(this.update)
  }

  Game.prototype.start = function () {
    this.player = new Player()
    this.bindEvent()
    this.update()
  }

  Game.prototype.bindEvent = function () {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode == 37) {
        //left
        if (this.player.forward) {
          this.player.forward = false
        } else {
          if (this.player.backward === false) {
            this.player.backward = true
          } else {
            // this.player.backward = false
          }
        }

      } else if (event.keyCode == 38) {
        //up
      } else if (event.keyCode == 39) {
        //right
        if (this.player.backward) {
          this.player.backward = false
        } else {
          console.log(this.player.forward);
          if (this.player.forward) {

          } else {
            this.player.forward = true
          }

        }
      } else if (event.keyCode == 40) {
        //down
      } else if (event.keyCode == 32) {
        //space
        this.player.jumped = true
      }
    })
  }
})()
