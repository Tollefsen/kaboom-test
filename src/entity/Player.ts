import { AreaComp, GameObj, HealthComp, OpacityComp, PosComp, StateComp } from "kaboom";
import { HasGunComp } from "../comp/HasGun";
import { score, ScoreComp } from "../comp/Score";
import { speed, SpeedComp } from "../comp/Speed";

export type PlayerComp = PosComp & AreaComp & HasGunComp & ScoreComp & HealthComp & SpeedComp & StateComp & OpacityComp;

export function isPlayer(obj: GameObj<any>): obj is GameObj<PlayerComp> {
	return (obj as GameObj<PlayerComp>).is('player');
}

export function addDefaultPlayer(): GameObj<PlayerComp> {
    return add([
        pos(0.2 * width(), height() / 2),
        sprite("bean"),
        area(),
        solid(),
        { hasGun: false },
        score(),
        health(5),
        speed(320),
        state('normal', ['normal', 'stunned', 'dash', 'cooldown']),
        opacity(),
        origin('center'),
        'player',
    ])
}
