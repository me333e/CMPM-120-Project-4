
export class DebuffShooter extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0
    }) 
    
    {
        super(scene, x, y, 'debuffShooter');
        this.setOrigin(0, 1);
        scene.add.existing(this);
        this.setScale(2);
        this.play("idleD");

    }
}