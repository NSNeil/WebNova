(function () {
    window.Player = function () {
        window.GameObject.apply(this, arguments)
        this.forward = false
        this.backward = false
        this.hp = 5
        this.initialJumpSpeed = 22
        this.forwardSpeed = 4
        this.backwardSpeed = 2
        this.jumpSpeed = this.initialJumpSpeed
        this.attenuation = 0.5
        this.maxHeight = 200
        this.update = this.update.bind(this)
        this.initPlayer = this.initPlayer.bind(this)
        this.initHealthBar = this.initHealthBar.bind(this)
        this.start = this.start.bind(this)
        this.initPlayer()
        this.initHealthBar()
        this.jumped = false
        this.jumpStage = 0
        this.bgPosX = this.$ele.css('backgroundPositionX').slice(0, -2)
        this.start()
    }

    Player.prototype = new GameObject()

    Player.prototype.initHealthBar = function () {
        this.$healthArr = []
        for (let index = 0; index < this.hp; index++) {
            let health = document.createElement('img')
            let scale = 0.5;
            health.style.cssText = `left:${90*index}px;
            top:${900}px;
            width:${530 * scale}px;
            height:${530 * scale}px;
            position:absolute;
            z-index:999;`
            health.src = "sprite/ForestBuff.png"
            document.body.appendChild(health)
            this.$healthArr.push($(health))
        }
    }

    Player.prototype.initPlayer = function () {
        let player = document.createElement('img')
        let scale = 1.5;
        this.groundPos = 600
        player.style.cssText = `left:50px;
            top:${this.groundPos}px;
            width:${202 * scale}px;
            height:${184 * scale}px;
            position:absolute;
            z-index:999;`
        player.src = "sprite/bot2.gif"
        document.body.appendChild(player)
        this.$ele = $(player)
    }

    Player.prototype.start = function () {
        this.update()
    }

    Player.prototype.update = function () {
        if (this.hp <= 0) {
            this.$ele.remove();
        }
        if (this.forward) {
            this.$ele.css('left', this.$ele.position().left + this.backwardSpeed)
        }
        if (this.backward) {
            this.$ele.css('left', this.$ele.position().left - this.backwardSpeed)
        }
        if (this.jumped) {
            if (this.jumpStage === 2) {
                this.jumpSpeed = this.initialJumpSpeed
                this.jumped = false
                this.jumpStage = 0
            }
            if (this.jumpStage === 0) {
                this.jumpSpeed = this.jumpSpeed - this.attenuation

                // console.log(this.jumpSpeed);
                // console.log(this.attenuation);
                if (this.jumpSpeed < 5) {
                    this.jumpSpeed = 5
                }
                this.$ele.css('top', this.$ele.position().top - this.jumpSpeed)
                if (this.$ele.position().top < this.maxHeight) {
                    // console.log('********************************');
                    // console.log('********************************');
                    this.jumpStage++
                }
            }
            if (this.jumpStage === 1) {
                // console.log(this.jumpSpeed);
                // console.log(this.attenuation);
                this.jumpSpeed = this.jumpSpeed + this.attenuation
                if (this.jumpSpeed > 20) {
                    this.jumpSpeed = 20
                }
                this.$ele.css('top', this.$ele.position().top + this.jumpSpeed)
                if (this.$ele.position().top > this.groundPos) {
                    // console.log('********************************');
                    this.jumpStage++
                }
            }
        }
    }
})()
