import { GameObj, Key } from "kaboom"
import { spawnBullet } from "../entity/Bullet"
import { PlayerComp } from "../entity/Player"


export function addPlayerControllers(player: GameObj<PlayerComp>) {
    const dirs = {
        'a': LEFT,
        'w': UP,
        's': DOWN,
        'd': RIGHT,
    }

    for (const dir in dirs) {
        onKeyDown(dir as Key, () => {
            if (player.state === 'stunned') return;
            player.move(dirs[dir].scale(player.speed))
        })
    }

    onKeyPress('space', () => {
        if (player.state === 'stunned') return;
        spawnBullet(player)
    })
}