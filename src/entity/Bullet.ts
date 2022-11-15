import { GameObj } from "kaboom";
import { findDirection, findDistance } from "../utils";
import { PlayerComp } from "./Player";

export const spawnBullet = (player: GameObj<PlayerComp>) => {
	if (!player.hasGun || !player.exists) return;
	const allEnemies = get('enemy').sort((a, b) => {
		const aDist = findDistance(a, player)
		const bDist = findDistance(b, player)
		if (aDist > bDist) return 1;
		if (aDist < bDist) return -1;
		return 0;
	});
	if (allEnemies.length < 1) return;

	const direction = findDirection(player, allEnemies[0])
	add([
		pos(player.pos),
		sprite('bean'),
		scale(0.5),
		area(),
		cleanup(),
		move(direction, 400),
		'bullet'
	])
}