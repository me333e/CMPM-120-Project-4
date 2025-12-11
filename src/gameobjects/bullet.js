export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, target, speed, damage, asset, scale, isDebuff = false) {
         super(scene, x, y, asset);
         scene.add.existing(this);
         scene.physics.add.existing(this);
         this.target = target;
         this.setDepth(4);
         this.setScale(scale);
         this.scene = scene;
         this.last_time = this.scene.time.now;
         this.speed = speed;
         this.damage = damage;
         this.isDebuff = isDebuff;
         this.scene.time.delayedCall(10000, () => this.destroy());
         this.which = asset;
    }

    preUpdate(time)
    {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        if (this.which.key == 'movingProj') {
            this.x += Math.cos(this.target)*this.speed*dt;
            this.y += Math.sin(this.target)*this.speed*dt;
            this.rotation += 15*dt;
        }
        else {
            let adjust = 0;
            if (this.which.key == 'rangeProj') {
                adjust = 2.5;
            }
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const angle = Math.atan2(dy, dx);
            this.rotation = angle - 1.8 + adjust;
            if (Math.abs(dx) > 10 || Math.abs(dy) > 10)
            {
                this.x += Math.cos(angle)*this.speed*dt;
                this.y += Math.sin(angle)*this.speed*dt;
            }

            if (!this.target) {
                this.destroy();
            }
            else if (this.target.active != true) {
                this.destroy();
            }
        }

        if (this.x > 877 || this.x < 400) {
            this.destroy();
        }
        if (this.y > 685 || this.y < 55) {
            this.destroy();
        }
    }
}