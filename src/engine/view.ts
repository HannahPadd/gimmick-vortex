import * as PIXI from 'pixi.js'

export interface PixiRendererOptions {
  container: HTMLDivElement
  chartData: string[][]
}

export function initializePixi(options: PixiRendererOptions): PIXI.Application {
  const { container, chartData } = options

  // Create Pixi application
  const app = new PIXI.Application({
    width: container.clientWidth,
    height: container.clientHeight,
    backgroundColor: 0xffffff
  })

  container.appendChild(app.view)

  renderNotes(app, chartData)

  return app
}

function renderNotes(app: PIXI.Application, chartData: string[][]): void {
  // Define positions and dimensions
  const columnWidth = app.renderer.width / chartData.length
  const rowHeight = app.renderer.height / chartData[0].length

  // Render notes
  chartData.forEach((column, columnIndex) => {
    column.forEach((noteGroup, rowIndex) => {
      if (noteGroup !== '0') {
        // Render only if there's a note
        const noteSprite = PIXI.Sprite.from('path_to_note_image.png') // Replace with your note image path
        noteSprite.anchor.set(0.5) // Center anchor
        noteSprite.position.set(
          columnIndex * columnWidth + columnWidth / 2,
          rowIndex * rowHeight + rowHeight / 2
        )

        // Scale noteSprite as needed

        app.stage.addChild(noteSprite)
      }
    })
  })
}
