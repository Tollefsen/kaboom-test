import { addNormalEnemyAvoidPlayer } from "../entity/Enemy";
import { addGun } from "../entity/Gun";
import { addDefaultPlayer } from "../entity/Player";
import { bulletHitsEnemy, enemyHitsEnemy, enemyHitsPlayer, playerPicksupGun } from "../system/Collisions";
import { EnemyAI } from "../system/EnemyAI";
import { addPlayerControllers } from "../system/PlayerControllers";
import { PlayerSystem } from "../system/PlayerSystem";
import { doXTimes } from "../utils";

export function gameScene() {
    return scene('game', (numberOfEnemies: number) => {
        // Entities
    
        // Add player
        const player = addDefaultPlayer();
    
    
        // Add score
        const score = add([
            text(numberOfEnemies - player.score + ''),
            pos(center())
        ])
    
        // Add enemies
        doXTimes(numberOfEnemies, () => addNormalEnemyAvoidPlayer(player))
    
        // Add gun
        addGun()
    
    
        // Systems
    
        addPlayerControllers(player)
    
        bulletHitsEnemy()
        enemyHitsPlayer()
        enemyHitsEnemy()
        playerPicksupGun()
        PlayerSystem(numberOfEnemies)
    
        EnemyAI(player, score, numberOfEnemies)
    })
}