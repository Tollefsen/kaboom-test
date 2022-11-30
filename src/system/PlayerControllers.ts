import { GameObj, Key } from "kaboom"
import { spawnBulletTowardsMouse } from "../entity/Bullet"
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

    onMousePress(() => {
        if (player.state === 'stunned') return;
        spawnBulletTowardsMouse(player)
    })

    onKeyPress('space', () => {
        if (['stunned', 'dash', 'cooldown'].includes(player.state)) return;
        player.enterState('dash');
    })
}