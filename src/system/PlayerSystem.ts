import { isPlayer } from "../entity/Player";

export function PlayerSystem(numberOfEnemies: number) {
    const player = get('player')[0];
    if (!isPlayer(player)) return;
    
    player.onDeath(() => {
        destroy(player);
        go('game over', numberOfEnemies)
    })
    player.onStateEnter('stunned', async () => {
        player.opacity = 0.5;
        await wait(0.5);
        player.enterState('normal')
        player.opacity = 1;
    })
    player.onUpdate(() => {
        if (player.score === numberOfEnemies) {
            if (player.score === 20) {
                go('win')
            } else {
                go('transition', numberOfEnemies)
            }
        }
    })
}