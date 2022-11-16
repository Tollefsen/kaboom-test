import type { PosComp, AreaComp, RectComp, HealthComp, GameObj, StateComp } from "kaboom";
import { AggroComp, aggro} from '../comp/Aggro'
import { speed, SpeedComp } from "../comp/Speed";
import { PlayerComp } from "./Player";
import { findDistance } from "../utils";


export type EnemyComp = PosComp & AreaComp & RectComp & HealthComp & AggroComp & SpeedComp & StateComp;

export function isEnemy(obj: GameObj<any>): obj is GameObj<EnemyComp> {
	return (obj as GameObj<EnemyComp>).is('enemy');
}

export function addNormalEnemy(x: number, y: number): GameObj<EnemyComp> {
	return add([
		pos(x, y),
		rect(40, 40),
		area(),
		health(3),
		aggro(),
		speed(100),
		solid(),
		state('normal', ['normal', 'stunned']),
		'enemy',
	])
}

export function addNormalEnemyAvoidPlayer(player: GameObj<PlayerComp>): GameObj<EnemyComp> {
	let enemy = addNormalEnemy(rand(width()), rand(height()));

	while(findDistance(player, enemy) < 400) {
		enemy.destroy()
		enemy = addNormalEnemy(rand(width()), rand(height()));
	}
	return enemy;
}