import test from 'node:test'
import { Application, Assets, Container, Sprite } from 'pixi.js'

class StepEngine {
  assets: any
  noteArray: string[]
  noteHighwayContainer: Container
  notesContainer: Container
  testNotes: string[]

  constructor(noteArray: number[]) {
    this.assets = null
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
    const app = new Application()

    await app.init({ background: '#1099bb', resizeTo: window })

    document.body.appendChild(app.canvas)

    this.assets = await Assets.init({ manifest: 'assets/manifest.json' })
    Assets.backgroundLoadBundle(['note-highway'])
  }

  async LoadAssets() {
    await Assets.loadBundle('note-highway')
  }

  async CreateHighway() {
    console.log(this.testNotes)
    this.noteArray = this.testNotes
    let position = 0
    let measureLength = 0
    for (let i = 0; i < this.noteArray.length; i++) {
      measureLength = this.noteArray[i].length
      this.noteArray.forEach((note, index) => {
        position = index % 4
        if (note !== '0') {
          switch (note) {
            //Tap Note
            case '1': {
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
      })
    }
  }
}

export { StepEngine }
