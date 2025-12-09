
export class Monster extends Phaser.GameObjects.Sprite {
    constructor({ // destructured params
        scene, // Phaser scene
        x = 0, // default x
        y = 0, // default y
        type // monster type
    }) 
    
    {
        super(scene, x, y, type); // empty frame string
        this.setOrigin(0, 1); // set origin to bottom-left
        scene.add.existing(this); // add to scene
        this.setDepth(5); // set depth
        //this.setScale(2);

        if (type === 'slime') {
            console.log("Slime created at:", x, y);
            this.play("slimeWalk"); // play walk animation
        }
        

    }
}