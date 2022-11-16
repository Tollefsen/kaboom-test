export function gameOverScene() {
    return scene('game over', (numberOfRoundsSurvived: number) => {
        add([
            text("Game Over"),
            pos(center()),
            origin('center'),
        ])
        add([
            text(`${numberOfRoundsSurvived} was one to many`),
            pos(width() / 2, (height() / 2) + 50),
            scale(0.5),
            origin('center')
        ])
        add([
            text("Press 'r' to restart"),
            pos(width() / 2, (height() / 2) + 100),
            scale(0.5),
            origin('center')
        ])

        onKeyPress('r', () => {
            go('game', 1)
        })
        
    })
}