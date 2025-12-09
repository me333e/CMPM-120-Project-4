// enemy pathing logic for monsters
import { Monster } from '../gameobjects/monster.js';

export class MonsterPathing {
    constructor(scene, waypoints, monster) {
        this.monster = monster;
        this.scene = scene;
        this.points = waypoints;

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
         

        // Path progress
        this.path = { t: 0, vec: new Phaser.Math.Vector2() };
        console.log("MonsterPathing constructor " + this.monster);

        // Tween to move monster along the path
        scene.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 4000,
            yoyo: false,
            repeat: 0,
            onUpdate: () => { // update monster position
                this.curve.getPoint(this.path.t, this.path.vec);
                if (!this.monster) {
                    console.warn('MonsterPathing: No monster to move along the path.');
                    return;
                }
                this.monster.x = this.path.vec.x;
                this.monster.y = this.path.vec.y;
            }
        });
    }
}

    