export class HealthBar {
    constructor(scene, x, y, width = 40, height = 6) {
        this.bar = scene.add.graphics();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = 100;
        this.max = 100;
        this.draw();
    }

    // Set health to specific value
    setValue(value) {
        this.value = Phaser.Math.Clamp(value, 0, this.max);
        this.draw();
    }

    // Decrease health by amount
    decrease(amount) {
        this.setValue(this.value - amount);
    }

    // draw the health bar
    draw() {
        this.bar.clear();
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.width, this.height);
        let color = (this.value < 30) ? 0xff0000 : 0x00ff00;
        this.bar.fillStyle(color);
        let w = Math.floor((this.value / this.max) * (this.width - 2));
        this.bar.fillRect(this.x + 1, this.y + 1, w, this.height - 2);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }

    destroy() {
        this.bar.destroy();
    }
}