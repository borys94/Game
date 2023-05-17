/* eslint-disable */
const gm = require('gm');
const path = require('path');
const fs = require('fs');

let id = 1;

const loadAllAssets = async () => {
  const decorations = await loadDecorations();
  const animated = await loadAnimatedDecorations();
  const tiles = await loadTiles();
  const backgroundTiles = await loadBackgroundTiles();
  const interactive = await loadInteractive();

  await save(decorations, animated, tiles, backgroundTiles, interactive);
};

const save = (...args) => {
  const content = `
  import { type Sprite } from './game/types'

  export type TileType = 'interactive' | 'decoration' | 'obstacle' | 'backgroundTile'
  export type MapSet = 'powerStation' | 'greenZone' | 'industrialZone' | 'none'
  export type Tile = Sprite & { id: number, upHill?: true, downHill?: true, interactive?: true, type?: TileType, set: MapSet  }

  const tiles: Array<Tile | null> = [
    null,
    ${args.join('')}
  ]

  export default tiles
  `;

  fs.writeFile('src/tiles.ts', content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
};

const loadDecorations = async () => {
  const files = throughDirectory('public/assets/map/decorations/');
  let tiles = '';
  for (const file of files) {
    const { width, height } = await getImgSize(file);
    tiles += `
    {
      width: ${width},
      height: ${height},
      frames: 1,
      id: ${id++},
      asset: '${file.substring(7)}',
      set: '${getMapSetByPath(file)}',
      type: 'decoration'
    },`;
  }
  return tiles;
};

const loadAnimatedDecorations = async () => {
  const files = throughDirectory('public/assets/map/animatedDecorations/');
  console.log(files);
  let tiles = '';
  for (const file of files) {
    const { width, height } = await getImgSize(file);
    tiles += `
    {
      width: ${width / 4},
      height: ${height},
      frames: 4,
      id: ${id++},
      asset: '${file.substring(7)}',
      set: '${getMapSetByPath(file)}',
      type: 'decoration'
    },`;
  }
  return tiles;
};

const loadInteractive = async () => {
  const files = throughDirectory('public/assets/map/interactive/');
  let tiles = '';
  for (const file of files) {
    const { width, height } = await getImgSize(file);
    tiles += `
    {
      width: ${width / 8},
      height: ${height},
      frames: 8,
      id: ${id++},
      asset: '${file.substring(7)}',
      set: '${getMapSetByPath(file)}',
      type: 'interactive'
    },`;
  }
  return tiles;
};

const loadTiles = async () => {
  const files = throughDirectory('public/assets/map/tiles/');
  let tiles = '';
  for (const file of files) {
    const { width, height } = await getImgSize(file);
    tiles += `
    {
      width: ${width},
      height: ${height},
      frames: 1,
      id: ${id++},
      asset: '${file.substring(7)}',
      set: '${getMapSetByPath(file)}',
      type: 'obstacle'
    },`;
  }
  return tiles;
};

const loadBackgroundTiles = async () => {
  const files = throughDirectory('public/assets/map/backgrounds/');
  let tiles = '';
  for (const file of files) {
    const { width, height } = await getImgSize(file);
    tiles += `
    {
      width: ${width},
      height: ${height},
      frames: 1,
      id: ${id++},
      asset: '${file.substring(7)}',
      set: '${getMapSetByPath(file)}',
      type: 'backgroundTile'
    },`;
  }
  return tiles;
};

const getMapSetByPath = (path) => {
  if (path.includes('industrialZone')) {
    return 'industrialZone';
  } else if (path.includes('greenZone')) {
    return 'greenZone';
  } else if (path.includes('powerStation')) {
    return 'powerStation';
  }
  return 'none';
};

const getImgSize = (path) => {
  // obtain the size of an image
  return new Promise((res, rej) => {
    gm(path).size(function (err, size) {
      if (!err) {
        res(size);
      } else {
        rej(err);
      }
    });
  });
};

function throughDirectory(Directory) {
  let f = [];
  fs.readdirSync(Directory).forEach((File) => {
    const Absolute = path.join(Directory, File);
    if (fs.statSync(Absolute).isDirectory()) f.push(...throughDirectory(Absolute));
    else if (path.extname(Absolute) === '.png') f.push(Absolute);
    // console.log(path.extname(Absolute))
  });
  return f;
}

loadAllAssets();
