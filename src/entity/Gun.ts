import { AreaComp, GameObj, PosComp, RectComp } from "kaboom"

export type GunComp = PosComp & AreaComp & RectComp;

export function addGun(): GameObj<GunComp> {
    return add([
        pos(width() - 0.2 * width(), height() / 2),
        rect(40, 40),
        color(0, 0, 255),
        area(),
        'gun'
    ]);
}

export function addGunWithPos(x: number, y: number): GameObj<GunComp> {
    return add([
        pos(x, y),
        rect(40, 40),
        color(0, 0, 255),
        area(),
        'gun'
    ])
}

