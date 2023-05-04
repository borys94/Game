import easyMap from '../../maps/easy'
import mediumMap from '../../maps/medium'
import emptyMap from '../../maps/empty'

interface MapType {
  tiles: number[][]
  bgTiles: number[][]
  interactive: number[][]
}

class Editor {
  loadMap = (value: string): MapType => {
    if (value === 'easy') {
      return easyMap
    } else if (value === 'medium') {
      return mediumMap
    }
    return easyMap
  }
}

export default Editor
