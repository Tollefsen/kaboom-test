import kaboom from "kaboom"
import { introScene } from "./scene/intro";
import { gameScene } from "./scene/game";
import { gameOverScene } from "./scene/gameOver";
import { winScene } from "./scene/win";
import { transitionScene } from "./scene/transition";

kaboom()

loadSprite("bean", "sprites/bean.png")


introScene()
gameScene()
gameOverScene()
winScene()
transitionScene()

go('intro')

debug.inspect = true
