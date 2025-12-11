// enemy pathing logic for monsters
import { Monster } from '../gameobjects/monster.js';

export class MonsterPathing {
    constructor(scene, waypoints, monster, type) {
        this.monster = monster;
        this.scene = scene;
        this.points = waypoints;
        this.type = type;

        // Create the curve
        this.curve = new Phaser.Curves.Spline(this.points);

        // Draw the path for visualization
        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.curve.draw(this.graphics, 64);

        // Place the monster at the start of the path
        // this.monster = scene.add.circle(this.points[0].x, this.points[0].y, 12, 0xff0000);
        if (this.monster) {
            this.monster.x = this.points[0].x;
            this.monster.y = this.points[0].y;
        }
         
      
        const speedFactor = monster.speed || 25; // use monster speed or default

        const pathLength = this.curve.getLength();
        const monsterSpeed = pathLength / speedFactor * 1000; // duration based on speed

        // Path progress
        this.path = { t: 0, vec: new Phaser.Math.Vector2() };

        // Tween to move monster along the path
        scene.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Linear',
            duration: monsterSpeed,
            yoyo: false,
            repeat: 0,
            onUpdate: () => { // update monster position
                this.curve.getPoint(this.path.t, this.path.vec);
                if (!this.monster) { //debug line
                    console.warn('MonsterPathing: No monster to move along the path.');
                    return;
                }
                this.monster.x = this.path.vec.x;
                this.monster.y = this.path.vec.y;
            },
            onComplete: () => { // destroy monster at end of path
                if (this.monster && this.monster.active) {
                    this.monster.destroy();
                    if (this.scene.enemyGroup) { // remove from enemy group
                        this.scene.enemyGroup.remove(this.monster, true, true);
                    }
                    if (this.scene.playerhp !== undefined) {
                        console.log('Monster reached the end of the path. Reducing player HP.'); // debug line
                        this.scene.playerhp -= 1; // reduce player HP
                    }
                }
        
            }
        });
    }
}

    