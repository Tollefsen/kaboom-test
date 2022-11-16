import { GameObj } from "kaboom";
import { isEnemy } from "../entity/Enemy";
import { PlayerComp } from "../entity/Player";
import { findDirection, findDistance } from "../utils";

export function EnemyAI(player: GameObj<PlayerComp>, score, numberOfEnemies: number) {
    const enemies = get('enemy');

    enemies.forEach((enemy) => {
        if (!isEnemy(enemy)) return;
        
        enemy.onDeath(() => {
            destroy(enemy)
            player.score++;
            score.text = numberOfEnemies - player.score + '';
        })
        enemy.onStateEnter('stunned', async () => {
            await wait(0.3);
            enemy.enterState('normal');
        })
        enemy.onUpdate(() => {
            if (!player.exists()) return;
            const distanceToplayer = findDistance(enemy, player);

            if ( distanceToplayer < 400) {
                enemy.aggro = true;
            }
            if (enemy.aggro && enemy.state !== 'stunned') {
                enemy.move(findDirection(enemy, player).unit().scale(enemy.speed))
            }
        })
    });
}