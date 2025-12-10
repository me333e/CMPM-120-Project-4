import { HealthBar } from "./HealthBar.js";
export class Monster extends Phaser.GameObjects.Sprite {
    constructor({ // destructured params
        scene, // Phaser scene
        x = 0, // default x
        y = 0, // default y
        type, // monster type
        hp, // health points
        money
    }) 
    
    {
        super(scene, x, y, type); // empty frame string
        this.setOrigin(0.5, 0.5); // set origin to bottom-left
        scene.add.existing(this); // add to scene
        scene.physics.add.existing(this);
        this.setDepth(5); // set depth
        //this.setScale(2);

        if (type === 'slime') {
            console.log("Slime created at:", x, y);
            this.play("slimeWalk"); // play walk animation
        } else if (type === 'wolf') {
            console.log("Wolf created at:", x, y);
            this.play("wolfWalk"); // play walk animation
        }

        this.maxHP = hp;
        this.hp = hp;
        this.money = money;
        this.healthBar = new HealthBar(scene, x - 20, y - 32); // create health bar
        this.healthBar.max = hp;
        this.healthBar.setValue(hp);

        console.log(`${type} initialized with HP: ${hp}`);
    }

    takeDamage(amount) {
        
        this.hp -= amount;
        this.healthBar.decrease(amount);
        if (this.hp <= 0) {
            console.log("scene: ", this.scene);
            console.log(`Monster defeated! Gained ${this.money} currency.`);
            this.scene.currency += this.money;

            this.healthBar.destroy();
            this.destroy();
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        // Update health bar position
        this.healthBar.setPosition(this.x - 20, this.y - 20);
    }

    destroy(fromScene) {
        if (this.healthBar) this.healthBar.bar.destroy();
        super.destroy(fromScene);
    }   
}