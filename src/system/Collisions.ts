import { isEnemy } from "../entity/Enemy";
import { isPlayer } from "../entity/Player";
import { findDirection } from "../utils";

// Bullet hits enemy
export function bulletHitsEnemy() {
    onCollide('bullet', 'enemy', (bullet, enemy) => {
        enemy.hurt(1);
        enemy.aggro = true;
        bullet.destroy()
    })
}


// Enemy hits player
export function enemyHitsPlayer() {
    onCollide('enemy', 'player', (enemy, player) => {

        if (!isPlayer(player) || !isEnemy(enemy)) return;
        player.hurt(1);

        const dir = findDirection(enemy, player);
        
        //Bounce the player away
        player.move(dir.unit().scale(player.speed * 30))
        player.enterState('stunned')
        enemy.enterState('stunned')
    })
}


// Pickup gun
export function playerPicksupGun() {
    onCollide('player', 'gun', (player, gun) => {
        gun.destroy();
        player.hasGun = true;
    })
}
