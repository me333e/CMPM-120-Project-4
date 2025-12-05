
export class Monster extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0, // default x position
        y = 0, // default y position
        enablePhysics = true, // whether to enable physics
        addToScene = true, // whether to add to scene
        type, // optional type

        // optional: add monster data from json like HP or speed
    }) 
    
    {
        super(scene, x, y, 'monster');
        this.setOrigin(0, 1);
        this.setName(name || 'monster');

        if (addToScene) {
            scene.add.existing(this);
        }

        if (enablePhysics) {
            scene.physics.add.existing(this);
            this.body.setAllowGravity(false);
            this.body.setImmovable(true);
        }

        scene.tweens.add({
            targets: this,
            duration: 500,
            loop: -1,
            yoyo: true,
            hold: 100,
            y: "+=5"
        });
    }
}