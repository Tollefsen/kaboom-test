export function winScene() {
    return scene('win', () => {
        add([
            text("You win!"),
            pos(center()),
            origin('center'),
        ])
        add([
            text("You survived 20 rounds"),
            pos(width() / 2, (height() / 2) + 50),
            scale(0.5),
            origin('center')
        ])
        add([
            text("Press 'r' to play again"),
            pos(width() / 2, (height() / 2) + 100),
            scale(0.5),
            origin('center')
        ])

        onKeyPress('r', () => {
            go('game', 1)
        })
    })
}