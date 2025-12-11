import { HealthBar } from "./HealthBar.js";

export class Monster extends Phaser.GameObjects.Sprite {
    constructor({ // destructured params
        scene, // Phaser scene
        x = 0, // default x
        y = 0, // default y
        type, // monster type
        hp, // health points
        money,
        speed
    }) 
    
    {
        super(scene, x, y, type); // empty frame string
        this.setOrigin(0.5, 0.5); // set origin to bottom-left
        scene.add.existing(this); // add to scene
        scene.physics.add.existing(this);
        this.setDepth(3); // set depth
        //this.setScale(2);

        if (type === 'slime') {
            console.log("Slime created at:", x, y);
            this.play("slimeWalk"); // play walk animation
        } else if (type === 'wolf') {
            console.log("Wolf created at:", x, y);
            this.play("wolfWalk"); // play walk animation
        } else if (type === 'jerry') {
            console.log("jerry boss created at:", x, y);
            this.play("jerryIdle"); // play walk animation
            this.setScale(2.5);
        }
        else if (type === 'alina') {
            console.log("alina boss created at:", x, y);
            this.play("alinaIdle"); // play walk animation
            this.setScale(2);
            this.circle = scene.add.circle(x, y, 150, 0x00ff00, 0.35);
            this.circle.setVisible(false);
            scene.physics.add.existing(this.circle);
            this.circle.body.setCircle(150);
        }

        this.maxHP = hp;
        this.hp = hp;
        this.money = money;
        this.maxSpeed = speed;
        this.speed = speed;

        this.isSlowed = false;
        this.phaseTwo = false;

        this.healthBar = new HealthBar(scene, x - 20, y - 32); // create health bar
        this.healthBar.max = hp;
        this.healthBar.setValue(hp);

        console.log(`${type} initialized with HP: ${hp}, Speed: ${speed}`); // debug 
    }

    takeDamage(amount) {
        this.hp -= amount;
        this.healthBar.decrease(amount);
    
        // 'jerry' specific phase two logic
        if (this.texture.key === 'jerry' && this.hp <= this.maxHP / 2 && !this.phaseTwo) {
            console.log("All conditions satisfied. Jerry boss entering phase two!");
            this.phaseTwo = true;
            this.speed *= 2.0; // increase speed by 100%
            this.scene.events.emit('updateMonsterSpeed', this);
        } else {
            console.log("Phase two activation conditions not fully met.");
        }
    
        if (this.hp <= 0) {
            console.log("scene: ", this.scene);
            console.log(`Monster defeated! Gained ${this.money} currency.`);
            this.scene.currency += this.money;
    
            this.healthBar.destroy();
            if (this.circle) {
                this.circle.destroy();
                this.scene.towerGroup.children.iterate((tower) => {
                    tower.attack_speed = tower.saved_attack_speed;
                    tower.clearTint();
                });
            }
            this.destroy();
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        // Update health bar position
        this.healthBar.setPosition(this.x - 20, this.y - 20);

        if (this.circle) {
            this.circle.x = this.x;
            this.circle.y = this.y;
            
            this.scene.towerGroup.children.iterate((tower) => {
                tower.attack_speed = tower.saved_attack_speed;
                tower.clearTint();
            });
            this.scene.physics.world.overlap(this.circle, this.scene.towerGroup, (b,t) => {
                t.attack_speed = t.saved_attack_speed * 1.7;
                t.setTint(0x40b2f5);
            });
        }
    }

    destroy(fromScene) {
        if (this.healthBar) this.healthBar.bar.destroy();
        super.destroy(fromScene);
    }   
}