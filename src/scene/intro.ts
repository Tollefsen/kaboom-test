export function introScene() {
    return scene('intro', () => {
        add([
            text('Avoid the enemies'),
            pos(width() / 2, height() / 3),
            origin('center')
        ])

        add([
            text('Collect the gun'),
            pos(width() / 2, height() / 2),
            origin('center')
        ])

        add([
            text('Go nuts'),
            pos(width() / 2, height()/ 3 * 2),
            origin('center')
        ])

        add([
            text('Click anywhere to start'),
            pos(width() / 2, height()/ 3 * 2 + 100),
            scale(0.5),
            origin('center')
        ])

        onClick(() => {
            go('game', 1)
        })
    })
}