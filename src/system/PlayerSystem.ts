import { isPlayer } from "../entity/Player";

export function PlayerSystem() {
    const player = get('player')[0];
    if (!isPlayer(player)) return;
    
    player.onDeath(() => {
        destroy(player);
    })
    player.onStateEnter('stunned', async () => {
        player.opacity = 0.5;
        await wait(0.5);
        player.enterState('normal')
        player.opacity = 1;
    })
}