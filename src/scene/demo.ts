import { addNormalEnemy } from "../entity/Enemy";
import { addGunWithPos } from "../entity/Gun";
import { addDefaultPlayer } from "../entity/Player"
import { addPlayerControllers } from "../system/PlayerControllers";
import { bulletHitsEnemy, enemyHitsPlayer, playerPicksupGun } from "../system/Collisions";
import { addDemoPlayerSystem } from "../system/DemoPlayerSystem";
import { DemoEnemyAI } from "../system/DemoEnemyAI";
import { GameObj } from "kaboom";
import { gameState, GameStateComp } from "../comp/Gamestate";

function getHearthsFromHp(hp: number): string {
    if (hp < 1) return 'dead';
    let result = "";
    for (let index = 0; index < hp; index++) {
        result += "+";
        
    }
   
    return result;
}

export function isGameState(obj: GameObj<any>): obj is GameObj<GameStateComp> {
	return (obj as GameObj<GameStateComp>).is('gameState');
}

export function getDemoSceneGameState(): GameObj<GameStateComp> {
    const result = get('gameState')[0];
    if (!result || !isGameState(result)) {
        return add([
            gameState(),
            'gameState',
        ]);
}
    return result;
}

export function addDemoScene() {
    return scene('demo', () => {
        

        const tileSize = 1920;
        const tileScale = 0.1;
        const spriteSize = tileSize * tileScale;

       
        const numberOfTilesWidth = Math.ceil(width() / spriteSize);
        const numberOfTilesHeigth = Math.ceil(height() / spriteSize);
       

        function fillOneScreenWithBackground(startX: number, startY: number) {
            [...Array(numberOfTilesWidth).keys()].forEach((_, widthIndex) => {
                [...Array(numberOfTilesHeigth).keys()].forEach((_, heightIndex) => {
                    add([
                    sprite("grass"),
                    pos(toWorld(vec2(startX + widthIndex * spriteSize, startY + heightIndex * spriteSize))),
                    scale(tileScale),
                    ])
                })
            })
        }

        [...Array(6).keys()].forEach((offset) => {
            [...Array(6).keys()].forEach(hOffset => {

                fillOneScreenWithBackground(-width() * offset + width() * 3, -height() * hOffset + height() * 3);
            })
        })

       
        

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

        const score = add([
            text('0'),
            pos(width() - 300, 100),
            fixed(),
            'score'
        ])

        addPlayerControllers(player);
        addDemoPlayerSystem();
        playerPicksupGun()
        enemyHitsPlayer();
        DemoEnemyAI(player);

        bulletHitsEnemy();
        

        onUpdate(() => {
            const gameState = getDemoSceneGameState();
            myText.text = getHearthsFromHp(player.hp());
            score.text = gameState.playerScore + '';
            debug.log(gameState.enemiesKilled);
            if (gameState.enemiesKilled >= gameState.numberOfEnemies) {
                go('transition', gameState.numberOfEnemies);
            }
        })
    })
}