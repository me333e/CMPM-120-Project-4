export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, target, speed, damage, asset, scale){
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
         this.scene.time.delayedCall(10000, () => this.destroy());
    }

    preUpdate(time)
    {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const angle = Math.atan2(dy, dx);
        this.rotation = angle+Math.PI;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10)
        {
            this.x += Math.cos(angle)*this.speed*dt;
            this.y += Math.sin(angle)*this.speed*dt;
        }

    }
}