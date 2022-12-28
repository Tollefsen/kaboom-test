import kaboom from "kaboom"
import { introScene } from "./scene/intro";
import { gameScene } from "./scene/game";
import { gameOverScene } from "./scene/gameOver";
import { winScene } from "./scene/win";
import { transitionScene } from "./scene/transition";
import { addDemoScene } from "./scene/demo";

kaboom()

loadSprite("bean", "sprites/bean.png");
loadSprite("playerface", "sprites/Playerface.png");
loadSprite("healthFull", "sprites/HealthFull.png");
loadSprite("healthEmpty", "sprites/HealthEmpty.png");
loadSprite("grass", "sprites/grass-tiles.jpeg")

introScene()
gameScene()
gameOverScene()
winScene()
transitionScene()
addDemoScene();

go('demo')

debug.inspect = true
