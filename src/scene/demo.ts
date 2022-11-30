import { addNormalEnemy } from "../entity/Enemy";
import { addGunWithPos } from "../entity/Gun";
import { addDefaultPlayer } from "../entity/Player"
import { addPlayerControllers } from "../system/PlayerControllers";
import { bulletHitsEnemy, enemyHitsPlayer, playerPicksupGun } from "../system/Collisions";
import { addDemoPlayerSystem } from "../system/DemoPlayerSystem";
import { DemoEnemyAI } from "../system/DemoEnemyAI";

function getHearthsFromHp(hp: number): string {
    if (hp < 1) return 'dead';
    let result = "";
    for (let index = 0; index < hp; index++) {
        result += "+";
        
    }
   
    return result;
}

export function addDemoScene() {
    return scene('demo', () => {
        const player = addDefaultPlayer();

        addGunWithPos(400, 400);

        addNormalEnemy(center().x, center().y);

        const myText = add([
            text(''),
            pos(100, 100),
            { health: player.hp() },
            fixed(),
            'healthbar',
        ])

        addPlayerControllers(player);
        addDemoPlayerSystem();
        playerPicksupGun()
        enemyHitsPlayer();
        DemoEnemyAI(player);

        bulletHitsEnemy();
        

        onUpdate(() => {
            myText.text = getHearthsFromHp(player.hp());
        })
    })
}