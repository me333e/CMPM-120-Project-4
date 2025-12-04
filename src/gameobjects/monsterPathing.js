// enemy pathing logic for monsters

// enemy pathing logic for monsters

import { Monster } from '../gameobjects/monster.js';

export class MonsterPathing {
    constructor(scene, startX, startY) {
        this.scene = scene;

        // Define path points
        this.points = [
            new Phaser.Math.Vector2(startX, startY),
            new Phaser.Math.Vector2(startX, startY+700)
        ];

        // Create the curve
        this.curve = new Phaser.Curves.Spline(this.points);

        // Draw the path for visualization
        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.curve.draw(this.graphics, 64);

        // Place the monster at the start of the path
        this.monster = scene.add.circle(this.points[0].x, this.points[0].y, 12, 0xff0000);

        // Path progress
        this.path = { t: 0, vec: new Phaser.Math.Vector2() };

        // Tween to move monster along the path
        scene.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 4000,
            yoyo: false,
            repeat: 0,
            onUpdate: () => {
                this.curve.getPoint(this.path.t, this.path.vec);
                this.monster.x = this.path.vec.x;
                this.monster.y = this.path.vec.y;
            }
        });
    }
}