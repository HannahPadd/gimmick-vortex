import { Application, Assets, Container, Sprite } from 'pixi.js'

class StepEngine {
  assets: any
  noteArray: string[]
  noteHighwayContainer: Container
  notesContainer: Container
  testNotes: string[]
  app = new Application()

  constructor(noteArray: number[]) {
    this.noteArray = []
    this.noteHighwayContainer = new Container()
    this.notesContainer = new Container()
    this.testNotes = [
      '0000\n0000\n0000\n0000\n',
      '1000\n0100\n0010\n0001\n',
      '0001\n0010\n0100\n1000\n1000\n0100\n0010\n0001\n',
      '1000\n0100\n0010\n0001\n'
    ]
  }

  async init() {
    let y = 0
    await this.app.init({ background: '#1099bb', resizeTo: window })

    document.body.appendChild(this.app.canvas)

    this.app.canvas.addEventListener('wheel', (e) => {
      y += e.deltaY
    })

    this.app.ticker.add(() => {
      const screenWidth = this.app.renderer.width
      const screenHeight = this.app.renderer.height

      const targetY = y / screenHeight

      this.noteHighwayContainer.y += -targetY * 10
      console.log(this.noteHighwayContainer.y)
    })

    await Assets.init({ manifest: 'src/engine/assets/manifest.json' })
    Assets.backgroundLoadBundle(['note-highway'])
    this.CreateHighway()
  }

  async CreateHighway() {
    const SCREEN_CENTERX = this.app.screen.width / 2
    const SCREEN_CENTERY = this.app.screen.height / 2
    const NOTE_SIZE = 128
    const NOTE_SPACINGX = 64
    const NOTE_SPACINGY = 64
    const TOTALWIDTH = NOTE_SIZE * 4 + NOTE_SPACINGX * 3
    const STARTX = SCREEN_CENTERX - TOTALWIDTH / 2
    const STARTY = 200
    const noteHighwayAssets = await Assets.loadBundle('note-highway')
    const noteSprites = [
      new Sprite(noteHighwayAssets.left_arrow),
      new Sprite(noteHighwayAssets.up_arrow),
      new Sprite(noteHighwayAssets.down_arrow),
      new Sprite(noteHighwayAssets.right_arrow),
      new Sprite(noteHighwayAssets.mine),
      new Sprite(noteHighwayAssets.roll),
      new Sprite(noteHighwayAssets.hold)
    ]

    console.log(this.testNotes)
    this.noteArray = this.testNotes

    let position = 0
    const measureLength = 0
    for (let i = 0; i < this.noteArray.length; i++) {
      console.log(this.noteArray[i])
      for (let j = 0; j < this.noteArray[i].length; j++) {
        /** 
        const noteContainer = new Container()
        this.noteHighwayContainer.addChild(noteContainer)
        this.noteArray[i][j] === '\n' ? position++ : position
        */
        const noteContainer = new Container()
        this.noteHighwayContainer.addChild(noteContainer)

        const direction = j % 4
        let noteSprite: Sprite | undefined
        console.log(
          'position: ' +
            position +
            ' notePosition: ' +
            j +
            ' noteType: ' +
            this.noteArray[i][j] +
            ' direction: ' +
            direction.toString()
        )
        switch (this.noteArray[i][j]) {
          //Tap Note
          case '1': {
            /** 
            if (direction == 0) {
              noteSprites[0].anchor.set(0.5)
              noteSprites[0].x = STARTX
              noteSprites[0].y = STARTY + position * 20
              console.log('x: ' + noteSprites[0].x + ', y: ' + noteSprites[0].y)
              noteContainer.addChild(noteSprites[0])
            }
            if (direction == 1) {
              noteSprites[1].anchor.set(0.5)
              noteSprites[1].x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprites[1].y = STARTY + position * 20
              console.log('x: ' + noteSprites[1].x + ', y: ' + noteSprites[1].y)
              noteContainer.addChild(noteSprites[1])
            }
            if (direction == 2) {
              noteSprites[2].anchor.set(0.5)
              noteSprites[2].x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprites[2].y = STARTY + position * 20
              console.log('x: ' + noteSprites[2].x + ', y: ' + noteSprites[2].y)
              noteContainer.addChild(noteSprites[2])
            }
            if (direction == 3) {
              noteSprites[3].anchor.set(0.5)
              noteSprites[3].x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprites[3].y = STARTY + position * 20
              console.log('x: ' + noteSprites[3].x + ', y: ' + noteSprites[3].y)
              noteContainer.addChild(noteSprites[3])
            }
              */
            noteSprite = new Sprite(
              noteHighwayAssets[['left_arrow', 'up_arrow', 'down_arrow', 'right_arrow'][direction]]
            )
            noteSprite.anchor.set(0.5)
            noteSprite.x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
            noteSprite.y = STARTY + position * NOTE_SPACINGY
            console.log(`x: ${noteSprite.x}, y: ${noteSprite.y}`)
            noteContainer.addChild(noteSprite)
            break
          }
          //Hold Head
          case '2': {
            break
          }
          //Hold/Roll End
          case '3': {
            break
          }
          //Roll Head
          case '4': {
            break
          }
          //Mine
          case 'M': {
            break
          }
          //Lift
          case 'L': {
            break
          }
          //Fake (unused)
          case 'F': {
            break
          }
          //AutoKeysound (mostly unused)
          case 'K': {
            break
          }
        }
        position++
      }
    }
    this.app.stage.addChild(this.noteHighwayContainer)
  }
}

export { StepEngine }
