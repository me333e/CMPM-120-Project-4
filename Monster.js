takeDamage(amount) {
    this.hp -= amount;
    this.healthBar.decrease(amount);

    console.log(`Monster HP after taking damage: ${this.hp}`);

    // Debugging logs to trace execution flow
    console.log("Checking conditions for phase two activation...");

    if (this.type === 'jerry') {
        console.log("Condition 1 passed: Monster type is jerry");
    }
    if (this.hp <= this.maxHP / 2) {
        console.log(`Condition 2 passed: Monster HP is below half (${this.hp} / ${this.maxHP})`);
    }
    if (!this.phaseTwo) {
        console.log("Condition 3 passed: Phase two has not been activated yet");
    }

    // Check if all conditions are satisfied
    if (this.type === 'jerry' && this.hp <= this.maxHP / 2 && !this.phaseTwo) {
        console.log("All conditions satisfied. Jerry boss entering phase two!");
        this.phaseTwo = true;
        this.speed *= 1.5; // increase speed by 50%
        this.scene.events.emit('jerryBossPhaseTwo', this);
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
