import { GameObj } from "kaboom";
import { isEnemy } from "../entity/Enemy";
import { PlayerComp } from "../entity/Player";
import { findDirection, findDistance } from "../utils";

export function DemoEnemyAI(player: GameObj<PlayerComp>) {
    const enemies = get('enemy');

    enemies.forEach((enemy) => {
        if (!isEnemy(enemy)) return;
        
        enemy.onDeath(() => {
            destroy(enemy)
        })
        enemy.onStateEnter('stunned', async () => {
            await wait(1.5);
            enemy.enterState('idle');
        })
        enemy.onStateEnter('charge', async () => {
            await wait(0.2);
            enemy.enterState('leap');
        })
        enemy.onStateEnter('leap',async () => {
            await wait(0.2);
            enemy.enterState('stunned')
        })
        enemy.onUpdate(() => {
            if (!player.exists()) return; // Enemy AI can shut down when there are no players


            

            if (enemy.state === 'aggro') {
                const distanceToplayer = findDistance(enemy, player);
                if ( distanceToplayer < 100) {
                    enemy.enterState('charge')
                }
                enemy.move(findDirection(enemy, player).unit().scale(enemy.speed))
            }

            if (enemy.state === 'leap') {
                enemy.move(findDirection(enemy, player).unit().scale(enemy.speed * 4))
            }
            
            if (enemy.state === 'idle') {
                const distanceToplayer = findDistance(enemy, player);
                if ( distanceToplayer < 400) {
                    enemy.enterState('aggro')
                }
            }
        })
    });
}