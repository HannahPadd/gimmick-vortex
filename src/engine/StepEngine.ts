import { Application, Assets, Container, Sprite, Graphics } from 'pixi.js'

class StepEngine {
  assets: any
  noteArray: string[]
  noteHighwayContainer: Container
  notesContainer: Container
  app = new Application()

  constructor(NoteArray: string[]) {
    this.noteArray = NoteArray
    this.noteHighwayContainer = new Container()
    this.notesContainer = new Container()
  }

  async init() {
    let y = 0
    await this.app.init({ background: '#1e1e2e', resizeTo: window })

    document.body.appendChild(this.app.canvas)

    this.app.canvas.addEventListener('wheel', (e) => {
      y += e.deltaY
    })
    this.app.canvas.addEventListener('Keydown', (e) => {
      console.log(e)
    })

    this.app.ticker.add(() => {
      const screenWidth = this.app.renderer.width
      const screenHeight = this.app.renderer.height

      const targetY = y / screenHeight

      this.noteHighwayContainer.y += -targetY * 10
    })

    await Assets.init({ manifest: 'src/engine/assets/manifest.json' })
    Assets.backgroundLoadBundle(['note-highway'])
    this.CreateHighway()
  }

  async CreateHighway() {
    const SCREEN_CENTERX = this.app.screen.width / 2
    const SCREEN_CENTERY = this.app.screen.height / 2
    const NOTE_SIZE = 64
    const NOTE_SPACINGX = 64
    const NOTE_SPACINGY = 64
    const TOTALWIDTH = NOTE_SIZE * 4 + NOTE_SPACINGX * 3
    const STARTX = SCREEN_CENTERX - TOTALWIDTH / 2
    const STARTY = 200
    const noteHighwayAssets = await Assets.loadBundle('note-highway')
    const measureLine = new Graphics()
      .moveTo(0.0, 0.0)
      .lineTo(100.0, 0.0)
      .stroke({ width: 4, color: 0xffffff })

    let position = 0
    let measureCounter = 0
    console.log(`noteArray: ${this.noteArray.length}`)
    for (let i = 0; i < this.noteArray.length; i++) {
      measureCounter++
      console.log(`measureCounter: ${measureCounter}`)
      const measureContainer = new Container()
      this.noteHighwayContainer.addChild(measureContainer)
      measureContainer.x = STARTX + 1 * (NOTE_SIZE + NOTE_SPACINGX)
      measureContainer.y = STARTY + position * NOTE_SPACINGY
      console.log(`measureline x: ${measureContainer.x}, measureline y: ${measureContainer.y}`)
      measureContainer.addChild(measureLine)
      const lines = this.noteArray[i].split('\n')
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j]
        console.log(`notes in measure ${lines.length}`)
        for (let k = 0; k < line.length; k++) {
          const noteType = line[k]
          const noteContainer = new Container()
          this.noteHighwayContainer.addChild(noteContainer)

          const direction = k % 4
          let noteSprite: Sprite | undefined

          switch (noteType) {
            // Tap Note
            case '1': {
              noteSprite = new Sprite(
                noteHighwayAssets[
                  ['left_arrow', 'up_arrow', 'down_arrow', 'right_arrow'][direction]
                ]
              )
              noteSprite.anchor.set(0.5)
              noteSprite.x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprite.y = STARTY + position * NOTE_SPACINGY
              noteSprite.tint = this.calculateNoteColor(position, lines.length - 1)
              noteContainer.addChild(noteSprite)
              break
            }
            //Hold Head
            case '2': {
              noteSprite = new Sprite(
                noteHighwayAssets[
                  ['left_arrow', 'up_arrow', 'down_arrow', 'right_arrow'][direction]
                ]
              )
              noteSprite.anchor.set(0.5)
              noteSprite.x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprite.y = STARTY + position * NOTE_SPACINGY
              console.log(`x: ${noteSprite.x}, y: ${noteSprite.y}`)
              noteContainer.addChild(noteSprite)
              break
            }
            //Hold/Roll End
            case '3': {
              noteSprite = new Sprite(
                noteHighwayAssets[['hold', 'hold', 'hold', 'hold'][direction]]
              )
              noteSprite.anchor.set(0.5)
              noteSprite.x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprite.y = STARTY + position * NOTE_SPACINGY
              console.log(`x: ${noteSprite.x}, y: ${noteSprite.y}`)
              noteContainer.addChild(noteSprite)
              break
            }
            //Roll Head
            case '4': {
              noteSprite = new Sprite(
                noteHighwayAssets[
                  ['left_arrow', 'up_arrow', 'down_arrow', 'right_arrow'][direction]
                ]
              )
              noteSprite.anchor.set(0.5)
              noteSprite.x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprite.y = STARTY + position * NOTE_SPACINGY
              console.log(`x: ${noteSprite.x}, y: ${noteSprite.y}`)
              noteContainer.addChild(noteSprite)
              break
            }
            //Mine
            case 'M': {
              noteSprite = new Sprite(
                noteHighwayAssets[['mine', 'mine', 'mine', 'mine'][direction]]
              )
              noteSprite.anchor.set(0.5)
              noteSprite.x = STARTX + direction * (NOTE_SIZE + NOTE_SPACINGX)
              noteSprite.y = STARTY + position * NOTE_SPACINGY
              console.log(`x: ${noteSprite.x}, y: ${noteSprite.y}`)
              noteContainer.addChild(noteSprite)
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
        }
        position++
      }
    }
    this.app.stage.addChild(this.noteHighwayContainer)
  }
  calculateNoteColor(noteIndex: number, totalNotesInMeasure: number) {
    const fractionOfMeasure = (noteIndex % totalNotesInMeasure) / totalNotesInMeasure

    if (
      fractionOfMeasure === 0 ||
      fractionOfMeasure === 0.25 ||
      fractionOfMeasure === 0.5 ||
      fractionOfMeasure === 0.75
    ) {
      return 0xff0000 // Red (Quarter notes)
    } else if (
      fractionOfMeasure === 0.125 ||
      fractionOfMeasure === 0.375 ||
      fractionOfMeasure === 0.625 ||
      fractionOfMeasure === 0.875
    ) {
      return 0x3333ff // Blue (Eighth notes)
    } else {
      return 0x33ff33 // Green (16th notes)
    }
  }
}

export { StepEngine }
