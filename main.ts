namespace SpriteKind {
    export const NPC = SpriteKind.create()
    export const Friend = SpriteKind.create()
    export const SatisfiedFriend = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
    //% blockIdentity=images._tile
    export const tile1 = img`
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
`
    //% blockIdentity=images._tile
    export const tile2 = img`
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
`
}
function printText (text: string, x: number, y: number) {
    printedText = story.createScript(text, 15, 13)
    printedText.setPagePauseLength(5000)
    story.printScript(printedText, x, y, 0)
}
sprites.onOverlap(SpriteKind.Friend, SpriteKind.Friend, function (sprite, otherSprite) {
    if (sprites.readDataString(sprite, "food") == sprites.readDataString(otherSprite, "food")) {
        sprite.setKind(SpriteKind.SatisfiedFriend)
        otherSprite.setKind(SpriteKind.SatisfiedFriend)
        sprite.follow(null)
        otherSprite.follow(null)
        sprite.vy = -70
        otherSprite.vy = -70
        sprite.lifespan = 500
        otherSprite.lifespan = 500
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    hasFood = sprites.readDataString(otherSprite, "food")
    if (!(hasFood)) {
        favoriteFood = foods[Math.randomRange(0, foods.length - 1)]
        sprites.setDataString(otherSprite, "food", favoriteFood)
        if (sprites.allOfKind(SpriteKind.NPC)[0]) {
            sprites.setDataString(sprites.allOfKind(SpriteKind.NPC)[0], "food", favoriteFood)
        }
    }
    otherSprite.setKind(SpriteKind.Friend)
    story.queueStoryPart(function () {
        story.spriteSayText(otherSprite, "I wanna get some " + sprites.readDataString(otherSprite, "food") + " with somebody!")
        controller.moveSprite(thePlayer, 0, 0)
    })
    story.queueStoryPart(function () {
        otherSprite.follow(sprite)
        controller.moveSprite(thePlayer)
    })
})
function setPersonalityLists () {
    names = ["Turmeric", "Basil", "Cayenne", "Cilantro", "Delilah", "Billy MacSniffle", "Joe", "Poblano", "Willow", "Ivy", "Bartholomew"]
    foods = ["Peppers", "Pizza", "NOT Peppers", "Beef Wellington", "Water", "Teriyaki", "Spaghetti", "Noodles", "Chicken Enchiladas", "Udon"]
    traits = ["Really fast", "Afraid of stairs", "Caffeinated!!!", "Lighter than air", "Loves programming", "Water-soluble", "Hydrophobic", "Low frequency", "I am not a robot"]
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(startGame)) {
        startGame = true
        controller.moveSprite(thePlayer)
        scene.cameraFollowSprite(thePlayer)
        tiles.setTilemap(tiles.createTilemap(
            hex`1000100004040404040404040404040404040404040404040804040404040404040404040404040404040404040404040404040404040402010101030404040404040404040404020107010304040404040404040404040101010103040404040404040404020101010101030404040404040404040201010101010304040404040404040402010101010404040401010101030404020701010304040404020107010304040201060603040404040201010103040404040404040404040402010101030404040404040404040404020101010104040404040404040404040404040404040404040404080404040404040404040404040404040404040404040404040404`,
            img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`,
            [myTiles.tile0,sprites.castle.tilePath5,sprites.castle.tilePath4,sprites.castle.tilePath6,sprites.castle.tileGrass1,sprites.castle.tilePath9,sprites.castle.tilePath8,myTiles.tile1,myTiles.tile2],
            TileScale.Sixteen
        ))
        for (let value of tiles.getTilesByType(myTiles.tile1)) {
            villager = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.NPC)
            setRandomSpriteImage(villager)
            tiles.placeOnTile(villager, value)
            tiles.setTileAt(value, sprites.castle.tilePath5)
        }
        for (let value of tiles.getTilesByType(myTiles.tile2)) {
            villager = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.NPC)
            setRandomSpriteImage(villager)
            tiles.placeOnTile(villager, value)
            tiles.setTileAt(value, sprites.castle.tileGrass1)
        }
    } else {
    	
    }
})
function setRandomSpriteImage (sprite: Sprite) {
    playerBase = [img`
. . . . . . . . . . b . . . . . 
. . . . . . . . b . b b b . . . 
. . . . . c c b b b b b b . . . 
. . . c c c c c c c b b b . b . 
. . c c c c c c c c b b b b b . 
. . b c c c c c c c c c c c b . 
. b b c b c c c c c c b b c c . 
. c c c c c c c c c c b b c c . 
. c c c 1 1 1 1 1 1 1 1 1 c c . 
. c c 1 1 1 1 1 1 1 1 1 1 1 c . 
. c c 1 1 1 1 1 1 1 1 1 1 1 c . 
. b b 1 1 1 1 1 1 1 1 1 1 1 c . 
. b b 1 1 f 1 1 1 1 1 f 1 1 c . 
. . b c 1 1 1 1 1 1 1 1 1 c c . 
. . . c . . c . . . c . . c . . 
. . . c . . c . . . c . . c . . 
`, img`
. . . . . c c c c c c . . . . . 
. . . . c 1 1 1 1 1 1 c . . . . 
. . . c 1 1 1 1 1 1 1 1 c . . . 
. . . b 1 1 1 1 1 1 1 1 c . . . 
. . . b 1 f 1 1 1 1 f 1 c . . . 
. . . c 1 1 1 1 1 1 1 1 c . . . 
. . . c c 1 1 1 1 1 1 c c . . . 
. c . c c c c c c c c c c . b . 
. c c c c b c c c c c b b b b . 
. . . c c c c c c c c b b . . . 
. . . c c c c c c c c b b . . . 
. . . b b c c c c b c c b . . . 
. . . b b c c c c c c c c . . . 
. . . c b c c c c c b b c . . . 
. . . c c c c c c b b b c . . . 
. . . c c c c c b b b b b . . . 
`, img`
. . . . . . . . . . 1 1 1 1 . . 
. . . . . . . . . 1 1 1 1 1 1 . 
. . . . . . . . c 1 f 1 1 f 1 . 
. . . . . . . . c 1 1 1 1 1 1 . 
. . 1 1 1 1 . . c c 1 1 1 1 c . 
. 1 1 1 1 1 1 . . c c c c c . . 
b 1 f 1 1 f 1 . . c c b c c . . 
b 1 1 1 1 1 1 . . c c c c b . . 
b b 1 1 1 1 c . . c c c b b . . 
. c c c c c c c . b c b b b . . 
. . c c c c b c b b c b b b . . 
. . b b c c c c c c c c b b . . 
. . b b b c c c b c c c c c . . 
. . b . b b c c c c c c . c . . 
. . b . . c c c c c c . . c . . 
. . c . . c . . . . c . . c . . 
`]
    sprite.setImage(playerBase[Math.randomRange(0, playerBase.length - 1)])
    sprite.image.replace(12, Math.randomRange(2, 14))
    sprite.image.replace(11, Math.randomRange(2, 14))
    sprite.image.replace(13, 6)
}
let playerBase: Image[] = []
let villager: Sprite = null
let favoriteFood = ""
let hasFood = ""
let printedText: story.Script = null
let startGame = false
let traits: string[] = []
let foods: string[] = []
let names: string[] = []
let thePlayer: Sprite = null
setPersonalityLists()
scene.setBackgroundColor(13)
thePlayer = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
setRandomSpriteImage(thePlayer)
thePlayer.y += -16
thePlayer.z = 10
printText(names[Math.randomRange(0, names.length - 1)], 80, 60)
printText("Food: " + foods[Math.randomRange(0, foods.length - 1)], 80, 70)
printText(traits[Math.randomRange(0, traits.length - 1)], 80, 80)
startGame = false
