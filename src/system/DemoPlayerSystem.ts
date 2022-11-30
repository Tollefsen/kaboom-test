import { isPlayer } from "../entity/Player";

export function addDemoPlayerSystem() {
    const player = get('player')[0];
    if (!isPlayer(player)) return;

    player.onDeath(() => {
        destroy(player);
    })

    player.onHurt(() => {
        get('healthbar')[0].health = player.hp();
    })

    player.onStateEnter('stunned', async () => {
        player.opacity = 0.5;
        await wait(0.5);
        player.enterState('normal')
        player.opacity = 1;
    })

    player.onStateEnter('dash', async () => {
        const playerAreaOffset = player.area.offset;
        player.opacity = 0.3;
        player.speed = player.speed*3;
        player.area.offset = vec2(10000, 10000);
        await wait(0.2);
        player.enterState('cooldown')
        player.opacity = 1;
        player.speed = 320;
        player.area.offset = playerAreaOffset;
    })

    player.onStateEnter('cooldown', async () => {
        await wait(0.1);
        player.enterState('normal')
    })

    player.onUpdate(() => {
        camPos(player.pos)
    })
}