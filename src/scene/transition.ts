export function transitionScene() {
    return scene('transition', (numberOfEnemies: number) => {
        add([
            text(`You survived round ${numberOfEnemies}`),
            pos(center()),
            origin('center'),
        ])
        add([
            text("Click anywhere for the next round"),
            pos(width() / 2, (height() / 2) + 50),
            scale(0.5),
            origin('center')
        ])

        onClick(() => {
            go('game', numberOfEnemies + 1)
        })
    })
}