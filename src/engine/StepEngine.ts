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
    await this.app.init({ background: '#1099bb', resizeTo: window })

    document.body.appendChild(this.app.canvas)

    await Assets.init({ manifest: 'src/engine/assets/manifest.json' })
    Assets.backgroundLoadBundle(['note-highway'])
    this.CreateHighway()
  }

  async CreateHighway() {
    const NOTE_SIZE = 128
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
    const noteContainerArray = []
    console.log(this.testNotes)
    this.noteArray = this.testNotes

    let direction = 0
    let position = 0
    const measureLength = 0
    for (let i = 0; i < this.noteArray.length; i++) {
      console.log(this.noteArray[i])
      for (let j = 0; j < this.noteArray[i].length; j++) {
        if (this.noteArray[i][j] == '\n') {
          direction = 0
          continue
        }
        console.log(this.noteArray[i][j])
        direction += 1
        if (this.noteArray[i][j] !== '0') {
          position >= 3 ? (position = 0) : position++
          console.log('position: ' + position + ' note: ' + this.noteArray[i][j].toString())
          switch (this.noteArray[i][j]) {
            //Tap Note
            case '1': {
              if (position == 0) {
                noteSprites[0].anchor.set(0.5)
                noteSprites[0].x = this.app.screen.width / 2
                noteSprites[0].y = this.app.screen.height / 2
                console.log('position 0')
                this.noteHighwayContainer.addChild(noteSprites[0])
              }
              if (position == 1) {
                noteSprites[1].anchor.set(0.5)
                noteSprites[1].x = this.app.screen.width / 2
                noteSprites[1].y = this.app.screen.height / 2
                console.log('position 1')
                this.notesContainer.addChild(noteSprites[1])
              }
              if (position == 2) {
                noteSprites[2].anchor.set(0.5)
                noteSprites[2].x = this.app.screen.width / 2
                noteSprites[3].y = this.app.screen.height / 2
                console.log('position 2')
                this.noteHighwayContainer.addChild(noteSprites[2])
              }
              if (position == 3) {
                noteSprites[3].anchor.set(0.5)
                noteSprites[3].x = this.app.screen.width / 2
                noteSprites[3].y = this.app.screen.height / 2
                console.log('position 3')
                this.noteHighwayContainer.addChild(noteSprites[3])
              }
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
        }
      }
    }
    this.app.stage.addChild(this.noteHighwayContainer)
  }
}

export { StepEngine }
