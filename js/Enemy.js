(function () {
    window.Enemy = function () {
        window.GameObject.apply(this, arguments)
        let enemy = document.createElement('img')
        let scale = 1
        let s = enemy.style
        enemy.src = 'sprite/ForestArrow.png'
        //bg height is 1000
        let t = Math.random() * (850 - 400) + 400
        s.left = $(window).width() + 'px'
        // s.left = '600px'
        s.top = t + 'px';
        s.width = 222 * scale + 'px'
        s.height = 79 * scale + 'px'
        s.zIndex = 999
        s.position = 'absolute'
        document.body.appendChild(enemy)
        this.$ele = $(enemy)
        this.start = this.start.bind(this)
        this.update = this.update.bind(this)
        this.start()
    }
    Enemy.prototype = new GameObject()

    Enemy.prototype.start = function () {
        this.update()
    }

    Enemy.prototype.update = function () {
        this.$ele.css("left", this.$ele.position().left - 15)
        if (this.$ele.position().left < -100) {
            this.publish('enemyDied', this)
        }
    }
})()