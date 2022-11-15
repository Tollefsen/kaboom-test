import kaboom from "kaboom"
import { addNormalEnemyAvoidPlayer } from "./entity/Enemy";
import { addGun } from "./entity/Gun";
import { addDefaultPlayer } from "./entity/Player";
import { bulletHitsEnemy, enemyHitsPlayer, playerPicksupGun } from "./system/Collisions";
import { EnemyAI } from "./system/EnemyAI";
import { PlayerSystem } from "./system/PlayerSystem";
import { addPlayerControllers } from "./system/PlayerControllers";
import { doXTimes } from "./utils";

kaboom()

loadSprite("bean", "sprites/bean.png")


// Entities

// Add player
const player = addDefaultPlayer();


// Add score
const score = add([
	text(player.score + ''),
	pos(10, 10)
])

// Add enemies
doXTimes(10, () => addNormalEnemyAvoidPlayer(player))

// Add gun
addGun()


// Systems

addPlayerControllers(player)

bulletHitsEnemy()
enemyHitsPlayer()
playerPicksupGun()
PlayerSystem()

EnemyAI(player, score)

onUpdate(() => {
	//debug.log(player.state)
})

debug.inspect = true
