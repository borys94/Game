import { type Sprite } from './game/types'

export type TileType = 'interactive' | 'decoration' | 'obstacle' | 'backgroundTile'
export type InteractiveType = 'chest' | 'money' | 'trap' | 'card'
export type MapSet = 'powerStation' | 'greenZone' | 'industrialZone' | 'none'
export type Tile = Sprite & {
  id: number
  type: TileType
  set: MapSet
  interactiveType?: InteractiveType
}

const tiles: Array<Tile | null> = [
  null,

  {
    width: 45,
    height: 22,
    frames: 1,
    id: 1,
    asset: 'assets/map/decorations/greenZone/Benches/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 48,
    height: 22,
    frames: 1,
    id: 2,
    asset: 'assets/map/decorations/greenZone/Benches/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 45,
    height: 10,
    frames: 1,
    id: 3,
    asset: 'assets/map/decorations/greenZone/Benches/3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 48,
    height: 10,
    frames: 1,
    id: 4,
    asset: 'assets/map/decorations/greenZone/Benches/4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 33,
    frames: 1,
    id: 5,
    asset: 'assets/map/decorations/greenZone/Bushes/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 16,
    frames: 1,
    id: 6,
    asset: 'assets/map/decorations/greenZone/Bushes/10.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 16,
    frames: 1,
    id: 7,
    asset: 'assets/map/decorations/greenZone/Bushes/11.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 16,
    frames: 1,
    id: 8,
    asset: 'assets/map/decorations/greenZone/Bushes/12.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 40,
    height: 17,
    frames: 1,
    id: 9,
    asset: 'assets/map/decorations/greenZone/Bushes/13.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 40,
    height: 16,
    frames: 1,
    id: 10,
    asset: 'assets/map/decorations/greenZone/Bushes/14.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 38,
    height: 13,
    frames: 1,
    id: 11,
    asset: 'assets/map/decorations/greenZone/Bushes/15.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 22,
    height: 10,
    frames: 1,
    id: 12,
    asset: 'assets/map/decorations/greenZone/Bushes/16.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 50,
    height: 25,
    frames: 1,
    id: 13,
    asset: 'assets/map/decorations/greenZone/Bushes/17.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 41,
    height: 24,
    frames: 1,
    id: 14,
    asset: 'assets/map/decorations/greenZone/Bushes/18.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 43,
    height: 22,
    frames: 1,
    id: 15,
    asset: 'assets/map/decorations/greenZone/Bushes/19.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 33,
    frames: 1,
    id: 16,
    asset: 'assets/map/decorations/greenZone/Bushes/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 30,
    height: 19,
    frames: 1,
    id: 17,
    asset: 'assets/map/decorations/greenZone/Bushes/20.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 33,
    frames: 1,
    id: 18,
    asset: 'assets/map/decorations/greenZone/Bushes/3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 33,
    frames: 1,
    id: 19,
    asset: 'assets/map/decorations/greenZone/Bushes/4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 25,
    frames: 1,
    id: 20,
    asset: 'assets/map/decorations/greenZone/Bushes/5.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 25,
    frames: 1,
    id: 21,
    asset: 'assets/map/decorations/greenZone/Bushes/6.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 25,
    frames: 1,
    id: 22,
    asset: 'assets/map/decorations/greenZone/Bushes/7.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 25,
    frames: 1,
    id: 23,
    asset: 'assets/map/decorations/greenZone/Bushes/8.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 16,
    frames: 1,
    id: 24,
    asset: 'assets/map/decorations/greenZone/Bushes/9.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 35,
    height: 64,
    frames: 1,
    id: 25,
    asset: 'assets/map/decorations/greenZone/Fence/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 35,
    height: 64,
    frames: 1,
    id: 26,
    asset: 'assets/map/decorations/greenZone/Fence/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 17,
    height: 41,
    frames: 1,
    id: 27,
    asset: 'assets/map/decorations/greenZone/Fence/2_1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 35,
    height: 64,
    frames: 1,
    id: 28,
    asset: 'assets/map/decorations/greenZone/Fence/3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 35,
    height: 64,
    frames: 1,
    id: 29,
    asset: 'assets/map/decorations/greenZone/Fence/4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 3,
    height: 41,
    frames: 1,
    id: 30,
    asset: 'assets/map/decorations/greenZone/Fence/4_1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 35,
    height: 64,
    frames: 1,
    id: 31,
    asset: 'assets/map/decorations/greenZone/Fence/5.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 48,
    height: 64,
    frames: 1,
    id: 32,
    asset: 'assets/map/decorations/greenZone/Fence/6.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 48,
    height: 64,
    frames: 1,
    id: 33,
    asset: 'assets/map/decorations/greenZone/Fence/7.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 72,
    height: 72,
    frames: 1,
    id: 34,
    asset: 'assets/map/decorations/greenZone/Fountain/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 72,
    height: 72,
    frames: 1,
    id: 35,
    asset: 'assets/map/decorations/greenZone/Fountain/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 6,
    frames: 1,
    id: 36,
    asset: 'assets/map/decorations/greenZone/Grass/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 10,
    height: 7,
    frames: 1,
    id: 37,
    asset: 'assets/map/decorations/greenZone/Grass/10.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 7,
    height: 5,
    frames: 1,
    id: 38,
    asset: 'assets/map/decorations/greenZone/Grass/11.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 7,
    height: 5,
    frames: 1,
    id: 39,
    asset: 'assets/map/decorations/greenZone/Grass/12.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 5,
    height: 4,
    frames: 1,
    id: 40,
    asset: 'assets/map/decorations/greenZone/Grass/13.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 6,
    frames: 1,
    id: 41,
    asset: 'assets/map/decorations/greenZone/Grass/14.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 7,
    height: 6,
    frames: 1,
    id: 42,
    asset: 'assets/map/decorations/greenZone/Grass/15.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 6,
    frames: 1,
    id: 43,
    asset: 'assets/map/decorations/greenZone/Grass/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 7,
    frames: 1,
    id: 44,
    asset: 'assets/map/decorations/greenZone/Grass/3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 6,
    height: 5,
    frames: 1,
    id: 45,
    asset: 'assets/map/decorations/greenZone/Grass/4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 46,
    asset: 'assets/map/decorations/greenZone/Grass/5.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 7,
    height: 5,
    frames: 1,
    id: 47,
    asset: 'assets/map/decorations/greenZone/Grass/6.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 7,
    height: 7,
    frames: 1,
    id: 48,
    asset: 'assets/map/decorations/greenZone/Grass/7.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 7,
    height: 5,
    frames: 1,
    id: 49,
    asset: 'assets/map/decorations/greenZone/Grass/8.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 6,
    height: 5,
    frames: 1,
    id: 50,
    asset: 'assets/map/decorations/greenZone/Grass/9.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 51,
    asset: 'assets/map/decorations/greenZone/Leaf/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 52,
    asset: 'assets/map/decorations/greenZone/Leaf/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 53,
    asset: 'assets/map/decorations/greenZone/Leaf/3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 54,
    asset: 'assets/map/decorations/greenZone/Leaf/4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 55,
    asset: 'assets/map/decorations/greenZone/Leaf/5.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 8,
    height: 8,
    frames: 1,
    id: 56,
    asset: 'assets/map/decorations/greenZone/Leaf/6.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 25,
    frames: 1,
    id: 57,
    asset: 'assets/map/decorations/greenZone/Other/Box.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 15,
    height: 13,
    frames: 1,
    id: 58,
    asset: 'assets/map/decorations/greenZone/Other/Garbage_Can1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 15,
    height: 13,
    frames: 1,
    id: 59,
    asset: 'assets/map/decorations/greenZone/Other/Garbage_Can2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 23,
    height: 32,
    frames: 1,
    id: 60,
    asset: 'assets/map/decorations/greenZone/Other/Ladder1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 23,
    height: 32,
    frames: 1,
    id: 61,
    asset: 'assets/map/decorations/greenZone/Other/Ladder2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 92,
    height: 48,
    frames: 1,
    id: 62,
    asset: 'assets/map/decorations/greenZone/Other/Ramp1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 92,
    height: 48,
    frames: 1,
    id: 63,
    asset: 'assets/map/decorations/greenZone/Other/Ramp2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 144,
    height: 39,
    frames: 1,
    id: 64,
    asset: 'assets/map/decorations/greenZone/Other/Rapm3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 26,
    height: 7,
    frames: 1,
    id: 65,
    asset: 'assets/map/decorations/greenZone/Other/Skateboard1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 11,
    height: 20,
    frames: 1,
    id: 66,
    asset: 'assets/map/decorations/greenZone/Other/Skateboard2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 10,
    height: 20,
    frames: 1,
    id: 67,
    asset: 'assets/map/decorations/greenZone/Other/Skateboard3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 12,
    height: 20,
    frames: 1,
    id: 68,
    asset: 'assets/map/decorations/greenZone/Other/Skateboard4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 62,
    height: 103,
    frames: 1,
    id: 69,
    asset: 'assets/map/decorations/greenZone/Other/Tree1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 124,
    height: 129,
    frames: 1,
    id: 70,
    asset: 'assets/map/decorations/greenZone/Other/Tree2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 175,
    height: 190,
    frames: 1,
    id: 71,
    asset: 'assets/map/decorations/greenZone/Other/Tree3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 175,
    height: 190,
    frames: 1,
    id: 72,
    asset: 'assets/map/decorations/greenZone/Other/Tree4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 10,
    height: 7,
    frames: 1,
    id: 73,
    asset: 'assets/map/decorations/greenZone/Stones/1.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 22,
    height: 14,
    frames: 1,
    id: 74,
    asset: 'assets/map/decorations/greenZone/Stones/2.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 27,
    height: 16,
    frames: 1,
    id: 75,
    asset: 'assets/map/decorations/greenZone/Stones/3.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 39,
    height: 17,
    frames: 1,
    id: 76,
    asset: 'assets/map/decorations/greenZone/Stones/4.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 46,
    height: 22,
    frames: 1,
    id: 77,
    asset: 'assets/map/decorations/greenZone/Stones/5.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 70,
    height: 44,
    frames: 1,
    id: 78,
    asset: 'assets/map/decorations/greenZone/Stones/6.png',
    set: 'greenZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 79,
    asset: 'assets/map/decorations/industrialZone/0.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 80,
    asset: 'assets/map/decorations/industrialZone/1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 81,
    asset: 'assets/map/decorations/industrialZone/2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 82,
    asset: 'assets/map/decorations/industrialZone/3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 83,
    asset: 'assets/map/decorations/industrialZone/4.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 84,
    asset: 'assets/map/decorations/industrialZone/5.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 85,
    asset: 'assets/map/decorations/industrialZone/6.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 86,
    asset: 'assets/map/decorations/industrialZone/7.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 87,
    asset: 'assets/map/decorations/industrialZone/8.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 88,
    asset: 'assets/map/decorations/industrialZone/9.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 18,
    height: 26,
    frames: 1,
    id: 89,
    asset: 'assets/map/decorations/industrialZone/Barrel1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 18,
    height: 26,
    frames: 1,
    id: 90,
    asset: 'assets/map/decorations/industrialZone/Barrel2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 18,
    height: 26,
    frames: 1,
    id: 91,
    asset: 'assets/map/decorations/industrialZone/Barrel3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 18,
    height: 26,
    frames: 1,
    id: 92,
    asset: 'assets/map/decorations/industrialZone/Barrel4.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 93,
    asset: 'assets/map/decorations/industrialZone/Bench.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 94,
    asset: 'assets/map/decorations/industrialZone/Board1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 95,
    asset: 'assets/map/decorations/industrialZone/Board2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 96,
    asset: 'assets/map/decorations/industrialZone/Board3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 97,
    asset: 'assets/map/decorations/industrialZone/Box1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 98,
    asset: 'assets/map/decorations/industrialZone/Box2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 99,
    asset: 'assets/map/decorations/industrialZone/Box3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 100,
    asset: 'assets/map/decorations/industrialZone/Box4.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 101,
    asset: 'assets/map/decorations/industrialZone/Box5.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 102,
    asset: 'assets/map/decorations/industrialZone/Box6.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 103,
    asset: 'assets/map/decorations/industrialZone/Box7.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 104,
    asset: 'assets/map/decorations/industrialZone/Box8.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 105,
    asset: 'assets/map/decorations/industrialZone/Bucket.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 106,
    asset: 'assets/map/decorations/industrialZone/Fence1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 107,
    asset: 'assets/map/decorations/industrialZone/Fence2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 108,
    asset: 'assets/map/decorations/industrialZone/Fence3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 109,
    asset: 'assets/map/decorations/industrialZone/Fire-extinguisher1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 110,
    asset: 'assets/map/decorations/industrialZone/Fire-extinguisher2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 111,
    asset: 'assets/map/decorations/industrialZone/Fire-extinguisher3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 64,
    frames: 1,
    id: 112,
    asset: 'assets/map/decorations/industrialZone/Flag.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 113,
    asset: 'assets/map/decorations/industrialZone/Ladder1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 114,
    asset: 'assets/map/decorations/industrialZone/Ladder2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 115,
    asset: 'assets/map/decorations/industrialZone/Ladder3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 116,
    asset: 'assets/map/decorations/industrialZone/Locker1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 117,
    asset: 'assets/map/decorations/industrialZone/Locker2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 118,
    asset: 'assets/map/decorations/industrialZone/Locker3.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 119,
    asset: 'assets/map/decorations/industrialZone/Locker4.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 36,
    frames: 1,
    id: 120,
    asset: 'assets/map/decorations/industrialZone/Mop.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 121,
    asset: 'assets/map/decorations/industrialZone/Pointer1.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 122,
    asset: 'assets/map/decorations/industrialZone/Pointer2.png',
    set: 'industrialZone',
    type: 'decoration'
  },
  {
    width: 32,
    height: 17,
    frames: 1,
    id: 123,
    asset: 'assets/map/decorations/powerStation/objects/1.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 11,
    height: 16,
    frames: 1,
    id: 124,
    asset: 'assets/map/decorations/powerStation/objects/10.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 13,
    height: 17,
    frames: 1,
    id: 125,
    asset: 'assets/map/decorations/powerStation/objects/11.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 26,
    height: 18,
    frames: 1,
    id: 126,
    asset: 'assets/map/decorations/powerStation/objects/12.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 57,
    height: 26,
    frames: 1,
    id: 127,
    asset: 'assets/map/decorations/powerStation/objects/13.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 57,
    height: 26,
    frames: 1,
    id: 128,
    asset: 'assets/map/decorations/powerStation/objects/14.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 57,
    height: 26,
    frames: 1,
    id: 129,
    asset: 'assets/map/decorations/powerStation/objects/15.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 57,
    height: 26,
    frames: 1,
    id: 130,
    asset: 'assets/map/decorations/powerStation/objects/16.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 65,
    height: 16,
    frames: 1,
    id: 131,
    asset: 'assets/map/decorations/powerStation/objects/17.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 49,
    height: 16,
    frames: 1,
    id: 132,
    asset: 'assets/map/decorations/powerStation/objects/18.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 32,
    height: 22,
    frames: 1,
    id: 133,
    asset: 'assets/map/decorations/powerStation/objects/19.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 32,
    height: 14,
    frames: 1,
    id: 134,
    asset: 'assets/map/decorations/powerStation/objects/2.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 24,
    height: 22,
    frames: 1,
    id: 135,
    asset: 'assets/map/decorations/powerStation/objects/20.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 13,
    height: 22,
    frames: 1,
    id: 136,
    asset: 'assets/map/decorations/powerStation/objects/21.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 7,
    height: 22,
    frames: 1,
    id: 137,
    asset: 'assets/map/decorations/powerStation/objects/22.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 35,
    height: 6,
    frames: 1,
    id: 138,
    asset: 'assets/map/decorations/powerStation/objects/23.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 68,
    height: 76,
    frames: 1,
    id: 139,
    asset: 'assets/map/decorations/powerStation/objects/24.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 68,
    height: 77,
    frames: 1,
    id: 140,
    asset: 'assets/map/decorations/powerStation/objects/25.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 68,
    height: 48,
    frames: 1,
    id: 141,
    asset: 'assets/map/decorations/powerStation/objects/26.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 78,
    height: 35,
    frames: 1,
    id: 142,
    asset: 'assets/map/decorations/powerStation/objects/27.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 32,
    height: 6,
    frames: 1,
    id: 143,
    asset: 'assets/map/decorations/powerStation/objects/3.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 32,
    height: 8,
    frames: 1,
    id: 144,
    asset: 'assets/map/decorations/powerStation/objects/4.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 5,
    height: 6,
    frames: 1,
    id: 145,
    asset: 'assets/map/decorations/powerStation/objects/5.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 5,
    height: 3,
    frames: 1,
    id: 146,
    asset: 'assets/map/decorations/powerStation/objects/6.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 17,
    height: 3,
    frames: 1,
    id: 147,
    asset: 'assets/map/decorations/powerStation/objects/7.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 19,
    height: 24,
    frames: 1,
    id: 148,
    asset: 'assets/map/decorations/powerStation/objects/8.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 35,
    height: 19,
    frames: 1,
    id: 149,
    asset: 'assets/map/decorations/powerStation/objects/9.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 63,
    height: 39,
    frames: 1,
    id: 150,
    asset: 'assets/map/decorations/powerStation/powerLines/1.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 73,
    height: 64,
    frames: 1,
    id: 151,
    asset: 'assets/map/decorations/powerStation/powerLines/2.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 61,
    height: 192,
    frames: 1,
    id: 152,
    asset: 'assets/map/decorations/powerStation/powerLines/3.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 69,
    height: 192,
    frames: 1,
    id: 153,
    asset: 'assets/map/decorations/powerStation/powerLines/4.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 13,
    height: 13,
    frames: 1,
    id: 154,
    asset: 'assets/map/decorations/powerStation/powerLines/5.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 16,
    height: 11,
    frames: 1,
    id: 155,
    asset: 'assets/map/decorations/powerStation/powerLines/6.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 16,
    height: 7,
    frames: 1,
    id: 156,
    asset: 'assets/map/decorations/powerStation/powerLines/7.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 16,
    height: 5,
    frames: 1,
    id: 157,
    asset: 'assets/map/decorations/powerStation/powerLines/8.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 16,
    height: 4,
    frames: 1,
    id: 158,
    asset: 'assets/map/decorations/powerStation/powerLines/9.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 50,
    height: 25,
    frames: 1,
    id: 159,
    asset: 'assets/map/decorations/powerStation/tubes/1.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 22,
    height: 57,
    frames: 1,
    id: 160,
    asset: 'assets/map/decorations/powerStation/tubes/10.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 12,
    height: 21,
    frames: 1,
    id: 161,
    asset: 'assets/map/decorations/powerStation/tubes/11.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 35,
    height: 22,
    frames: 1,
    id: 162,
    asset: 'assets/map/decorations/powerStation/tubes/2.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 26,
    height: 64,
    frames: 1,
    id: 163,
    asset: 'assets/map/decorations/powerStation/tubes/3.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 103,
    height: 42,
    frames: 1,
    id: 164,
    asset: 'assets/map/decorations/powerStation/tubes/4.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 45,
    height: 16,
    frames: 1,
    id: 165,
    asset: 'assets/map/decorations/powerStation/tubes/5.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 45,
    height: 7,
    frames: 1,
    id: 166,
    asset: 'assets/map/decorations/powerStation/tubes/6.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 21,
    height: 11,
    frames: 1,
    id: 167,
    asset: 'assets/map/decorations/powerStation/tubes/7.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 22,
    height: 11,
    frames: 1,
    id: 168,
    asset: 'assets/map/decorations/powerStation/tubes/8.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 45,
    height: 11,
    frames: 1,
    id: 169,
    asset: 'assets/map/decorations/powerStation/tubes/9.png',
    set: 'powerStation',
    type: 'decoration'
  },
  {
    width: 72,
    height: 72,
    frames: 4,
    id: 170,
    asset: 'assets/map/animatedDecorations/Fountain.png',
    set: 'none',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 4,
    id: 171,
    asset: 'assets/map/animatedDecorations/Screen1.png',
    set: 'none',
    type: 'decoration'
  },
  {
    width: 32,
    height: 42,
    frames: 4,
    id: 172,
    asset: 'assets/map/animatedDecorations/Screen2.png',
    set: 'none',
    type: 'decoration'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 173,
    asset: 'assets/map/tiles/greenZone/Tile_01.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 174,
    asset: 'assets/map/tiles/greenZone/Tile_02.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 175,
    asset: 'assets/map/tiles/greenZone/Tile_03.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 176,
    asset: 'assets/map/tiles/greenZone/Tile_04.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 177,
    asset: 'assets/map/tiles/greenZone/Tile_05.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 178,
    asset: 'assets/map/tiles/greenZone/Tile_06.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 179,
    asset: 'assets/map/tiles/greenZone/Tile_07.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 180,
    asset: 'assets/map/tiles/greenZone/Tile_08.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 181,
    asset: 'assets/map/tiles/greenZone/Tile_09.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 182,
    asset: 'assets/map/tiles/greenZone/Tile_10.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 183,
    asset: 'assets/map/tiles/greenZone/Tile_11.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 184,
    asset: 'assets/map/tiles/greenZone/Tile_12.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 185,
    asset: 'assets/map/tiles/greenZone/Tile_13.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 186,
    asset: 'assets/map/tiles/greenZone/Tile_14.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 187,
    asset: 'assets/map/tiles/greenZone/Tile_15.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 188,
    asset: 'assets/map/tiles/greenZone/Tile_16.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 189,
    asset: 'assets/map/tiles/greenZone/Tile_17.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 190,
    asset: 'assets/map/tiles/greenZone/Tile_18.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 191,
    asset: 'assets/map/tiles/greenZone/Tile_19.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 192,
    asset: 'assets/map/tiles/greenZone/Tile_20.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 193,
    asset: 'assets/map/tiles/greenZone/Tile_21.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 194,
    asset: 'assets/map/tiles/greenZone/Tile_22.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 195,
    asset: 'assets/map/tiles/greenZone/Tile_23.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 196,
    asset: 'assets/map/tiles/greenZone/Tile_24.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 197,
    asset: 'assets/map/tiles/greenZone/Tile_25.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 198,
    asset: 'assets/map/tiles/greenZone/Tile_26.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 199,
    asset: 'assets/map/tiles/greenZone/Tile_27.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 200,
    asset: 'assets/map/tiles/greenZone/Tile_28.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 201,
    asset: 'assets/map/tiles/greenZone/Tile_29.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 202,
    asset: 'assets/map/tiles/greenZone/Tile_30.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 203,
    asset: 'assets/map/tiles/greenZone/Tile_31.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 204,
    asset: 'assets/map/tiles/greenZone/Tile_32.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 205,
    asset: 'assets/map/tiles/greenZone/Tile_33.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 206,
    asset: 'assets/map/tiles/greenZone/Tile_34.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 207,
    asset: 'assets/map/tiles/greenZone/Tile_35.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 208,
    asset: 'assets/map/tiles/greenZone/Tile_36.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 209,
    asset: 'assets/map/tiles/greenZone/Tile_37.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 210,
    asset: 'assets/map/tiles/greenZone/Tile_38.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 211,
    asset: 'assets/map/tiles/greenZone/Tile_39.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 212,
    asset: 'assets/map/tiles/greenZone/Tile_40.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 213,
    asset: 'assets/map/tiles/greenZone/Tile_41.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 214,
    asset: 'assets/map/tiles/greenZone/Tile_42.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 215,
    asset: 'assets/map/tiles/greenZone/Tile_43.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 216,
    asset: 'assets/map/tiles/greenZone/Tile_44.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 217,
    asset: 'assets/map/tiles/greenZone/Tile_45.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 218,
    asset: 'assets/map/tiles/greenZone/Tile_46.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 219,
    asset: 'assets/map/tiles/greenZone/Tile_47.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 220,
    asset: 'assets/map/tiles/greenZone/Tile_48.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 221,
    asset: 'assets/map/tiles/greenZone/Tile_49.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 222,
    asset: 'assets/map/tiles/greenZone/Tile_50.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 223,
    asset: 'assets/map/tiles/greenZone/Tile_51.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 224,
    asset: 'assets/map/tiles/greenZone/Tile_52.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 225,
    asset: 'assets/map/tiles/greenZone/Tile_53.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 226,
    asset: 'assets/map/tiles/greenZone/Tile_54.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 227,
    asset: 'assets/map/tiles/greenZone/Tile_55.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 228,
    asset: 'assets/map/tiles/greenZone/Tile_56.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 229,
    asset: 'assets/map/tiles/greenZone/Tile_57.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 230,
    asset: 'assets/map/tiles/greenZone/Tile_58.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 231,
    asset: 'assets/map/tiles/greenZone/Tile_59.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 232,
    asset: 'assets/map/tiles/greenZone/Tile_60.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 233,
    asset: 'assets/map/tiles/greenZone/Tile_61.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 234,
    asset: 'assets/map/tiles/greenZone/Tile_62.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 235,
    asset: 'assets/map/tiles/greenZone/Tile_63.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 236,
    asset: 'assets/map/tiles/greenZone/Tile_64.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 237,
    asset: 'assets/map/tiles/greenZone/Tile_65.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 238,
    asset: 'assets/map/tiles/greenZone/Tile_66.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 239,
    asset: 'assets/map/tiles/greenZone/Tile_67.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 240,
    asset: 'assets/map/tiles/greenZone/Tile_68.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 241,
    asset: 'assets/map/tiles/greenZone/Tile_69.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 242,
    asset: 'assets/map/tiles/greenZone/Tile_70.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 243,
    asset: 'assets/map/tiles/greenZone/Tile_71.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 244,
    asset: 'assets/map/tiles/greenZone/Tile_72.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 245,
    asset: 'assets/map/tiles/greenZone/Tile_73.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 246,
    asset: 'assets/map/tiles/greenZone/Tile_74.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 247,
    asset: 'assets/map/tiles/greenZone/Tile_75.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 248,
    asset: 'assets/map/tiles/greenZone/Tile_76.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 249,
    asset: 'assets/map/tiles/greenZone/Tile_77.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 250,
    asset: 'assets/map/tiles/greenZone/Tile_78.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 251,
    asset: 'assets/map/tiles/greenZone/Tile_79.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 252,
    asset: 'assets/map/tiles/greenZone/Tile_80.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 253,
    asset: 'assets/map/tiles/greenZone/Tile_81.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 254,
    asset: 'assets/map/tiles/greenZone/Tile_82.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 255,
    asset: 'assets/map/tiles/greenZone/Tile_83.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 256,
    asset: 'assets/map/tiles/greenZone/Tile_84.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 257,
    asset: 'assets/map/tiles/greenZone/Tile_85.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 258,
    asset: 'assets/map/tiles/greenZone/Tile_86.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 259,
    asset: 'assets/map/tiles/greenZone/Tile_87.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 260,
    asset: 'assets/map/tiles/greenZone/Tile_88.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 261,
    asset: 'assets/map/tiles/greenZone/Tile_89.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 262,
    asset: 'assets/map/tiles/greenZone/Tile_90.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 263,
    asset: 'assets/map/tiles/greenZone/Tile_91.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 264,
    asset: 'assets/map/tiles/greenZone/Tile_92.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 265,
    asset: 'assets/map/tiles/greenZone/Tile_93.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 266,
    asset: 'assets/map/tiles/greenZone/Tile_94.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 267,
    asset: 'assets/map/tiles/greenZone/Tile_95.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 268,
    asset: 'assets/map/tiles/greenZone/Tile_96.png',
    set: 'greenZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 269,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_04.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 270,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_05.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 271,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_06.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 272,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_07.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 273,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_08.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 274,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_09.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 275,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_13.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 276,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_14.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 277,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_15.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 278,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_16.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 279,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_17.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 280,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_18.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 281,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_22.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 282,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_23.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 283,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_24.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 284,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_25.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 285,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_27.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 286,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_31.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 287,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_32.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 288,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_33.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 289,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_34.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 290,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_35.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 291,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_36.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 292,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_40.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 293,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_42.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 294,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_43.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 295,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_44.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 296,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_45.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 297,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_49.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 298,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_50.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 299,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_51.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 300,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_52.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 301,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_54.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 302,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_55.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 303,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_56.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 304,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_57.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 305,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_58.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 306,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_59.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 307,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_60.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 308,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_61.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 309,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_63.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 310,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_64.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 311,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_65.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 312,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_66.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 313,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_67.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 314,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_68.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 315,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_69.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 316,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_70.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 317,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_72.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 318,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_73.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 319,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_74.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 320,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_75.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 321,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_76.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 322,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_77.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 323,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_78.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 324,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_79.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 325,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_80.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 326,
    asset: 'assets/map/tiles/industrialZone/IndustrialTile_81.png',
    set: 'industrialZone',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 327,
    asset: 'assets/map/tiles/powerStation/Tile_01.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 328,
    asset: 'assets/map/tiles/powerStation/Tile_02.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 329,
    asset: 'assets/map/tiles/powerStation/Tile_03.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 330,
    asset: 'assets/map/tiles/powerStation/Tile_04.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 331,
    asset: 'assets/map/tiles/powerStation/Tile_05.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 332,
    asset: 'assets/map/tiles/powerStation/Tile_06.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 333,
    asset: 'assets/map/tiles/powerStation/Tile_07.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 334,
    asset: 'assets/map/tiles/powerStation/Tile_08.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 335,
    asset: 'assets/map/tiles/powerStation/Tile_09.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 336,
    asset: 'assets/map/tiles/powerStation/Tile_10.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 337,
    asset: 'assets/map/tiles/powerStation/Tile_11.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 338,
    asset: 'assets/map/tiles/powerStation/Tile_12.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 339,
    asset: 'assets/map/tiles/powerStation/Tile_13.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 340,
    asset: 'assets/map/tiles/powerStation/Tile_14.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 341,
    asset: 'assets/map/tiles/powerStation/Tile_15.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 342,
    asset: 'assets/map/tiles/powerStation/Tile_16.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 343,
    asset: 'assets/map/tiles/powerStation/Tile_17.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 344,
    asset: 'assets/map/tiles/powerStation/Tile_18.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 345,
    asset: 'assets/map/tiles/powerStation/Tile_19.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 346,
    asset: 'assets/map/tiles/powerStation/Tile_20.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 347,
    asset: 'assets/map/tiles/powerStation/Tile_21.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 348,
    asset: 'assets/map/tiles/powerStation/Tile_22.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 349,
    asset: 'assets/map/tiles/powerStation/Tile_23.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 350,
    asset: 'assets/map/tiles/powerStation/Tile_24.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 351,
    asset: 'assets/map/tiles/powerStation/Tile_25.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 352,
    asset: 'assets/map/tiles/powerStation/Tile_26.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 353,
    asset: 'assets/map/tiles/powerStation/Tile_27.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 354,
    asset: 'assets/map/tiles/powerStation/Tile_28.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 355,
    asset: 'assets/map/tiles/powerStation/Tile_29.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 356,
    asset: 'assets/map/tiles/powerStation/Tile_30.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 357,
    asset: 'assets/map/tiles/powerStation/Tile_31.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 358,
    asset: 'assets/map/tiles/powerStation/Tile_32.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 359,
    asset: 'assets/map/tiles/powerStation/Tile_33.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 360,
    asset: 'assets/map/tiles/powerStation/Tile_34.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 361,
    asset: 'assets/map/tiles/powerStation/Tile_35.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 362,
    asset: 'assets/map/tiles/powerStation/Tile_36.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 363,
    asset: 'assets/map/tiles/powerStation/Tile_37.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 364,
    asset: 'assets/map/tiles/powerStation/Tile_38.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 365,
    asset: 'assets/map/tiles/powerStation/Tile_39.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 366,
    asset: 'assets/map/tiles/powerStation/Tile_40.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 367,
    asset: 'assets/map/tiles/powerStation/Tile_41.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 368,
    asset: 'assets/map/tiles/powerStation/Tile_42.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 369,
    asset: 'assets/map/tiles/powerStation/Tile_43.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 370,
    asset: 'assets/map/tiles/powerStation/Tile_44.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 371,
    asset: 'assets/map/tiles/powerStation/Tile_45.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 372,
    asset: 'assets/map/tiles/powerStation/Tile_46.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 373,
    asset: 'assets/map/tiles/powerStation/Tile_47.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 374,
    asset: 'assets/map/tiles/powerStation/Tile_48.png',
    set: 'powerStation',
    type: 'obstacle'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 375,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_01.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 376,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_02.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 377,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_03.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 378,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_10.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 379,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_11.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 380,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_12.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 381,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_19.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 382,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_20.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 383,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_21.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 384,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_26.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 385,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_28.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 386,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_29.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 387,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_30.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 388,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_37.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 389,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_38.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 390,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_39.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 391,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_41.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 392,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_46.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 393,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_47.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 394,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_48.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 395,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_53.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 396,
    asset: 'assets/map/backgrounds/industrialZone/IndustrialTile_71.png',
    set: 'industrialZone',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 397,
    asset: 'assets/map/backgrounds/powerStation/Tile_49.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 398,
    asset: 'assets/map/backgrounds/powerStation/Tile_50.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 399,
    asset: 'assets/map/backgrounds/powerStation/Tile_51.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 400,
    asset: 'assets/map/backgrounds/powerStation/Tile_52.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 401,
    asset: 'assets/map/backgrounds/powerStation/Tile_53.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 402,
    asset: 'assets/map/backgrounds/powerStation/Tile_54.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 403,
    asset: 'assets/map/backgrounds/powerStation/Tile_55.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 404,
    asset: 'assets/map/backgrounds/powerStation/Tile_56.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 405,
    asset: 'assets/map/backgrounds/powerStation/Tile_57.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 406,
    asset: 'assets/map/backgrounds/powerStation/Tile_58.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 407,
    asset: 'assets/map/backgrounds/powerStation/Tile_59.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 408,
    asset: 'assets/map/backgrounds/powerStation/Tile_60.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 409,
    asset: 'assets/map/backgrounds/powerStation/Tile_61.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 410,
    asset: 'assets/map/backgrounds/powerStation/Tile_62.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 411,
    asset: 'assets/map/backgrounds/powerStation/Tile_63.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 32,
    height: 32,
    frames: 1,
    id: 412,
    asset: 'assets/map/backgrounds/powerStation/Tile_64.png',
    set: 'powerStation',
    type: 'backgroundTile'
  },
  {
    width: 24,
    height: 24,
    frames: 8,
    id: 413,
    asset: 'assets/map/interactive/Card.png',
    set: 'none',
    type: 'interactive',
    interactiveType: 'card'
  },
  {
    width: 24,
    height: 24,
    frames: 8,
    id: 414,
    asset: 'assets/map/interactive/Card_2.png',
    set: 'none',
    type: 'interactive'
  },
  {
    width: 32,
    height: 32,
    frames: 4,
    id: 415,
    asset: 'assets/map/interactive/Chest.png',
    set: 'none',
    type: 'interactive',
    interactiveType: 'chest'
  },
  {
    width: 32,
    height: 32,
    frames: 8,
    id: 416,
    asset: 'assets/map/interactive/Chest_2.png',
    set: 'none',
    type: 'interactive',
    interactiveType: 'chest'
  },
  {
    width: 222 / 7,
    height: 22,
    frames: 7,
    id: 417,
    asset: 'assets/map/interactive/Chest_open.png',
    set: 'none',
    type: 'interactive',
    interactiveType: 'chest'
  },
  {
    width: 32,
    height: 64,
    frames: 8,
    id: 418,
    asset: 'assets/map/interactive/Hammer.png',
    set: 'none',
    type: 'interactive'
  },
  {
    width: 24,
    height: 24,
    frames: 6,
    id: 419,
    asset: 'assets/map/interactive/Money.png',
    set: 'none',
    type: 'interactive',
    interactiveType: 'money'
  },
  {
    width: 32,
    height: 48,
    frames: 4,
    id: 420,
    asset: 'assets/map/interactive/Trap.png',
    set: 'none',
    type: 'interactive',
    interactiveType: 'trap'
  },
  {
    width: 48,
    height: 32,
    frames: 8,
    id: 421,
    asset: 'assets/map/interactive/transporter/Transporter.png',
    set: 'none',
    type: 'interactive'
  },
  {
    width: 16,
    height: 32,
    frames: 8,
    id: 422,
    asset: 'assets/map/interactive/transporter/Transporter1.png',
    set: 'none',
    type: 'interactive'
  },
  {
    width: 16,
    height: 32,
    frames: 8,
    id: 423,
    asset: 'assets/map/interactive/transporter/Transporter2.png',
    set: 'none',
    type: 'interactive'
  },
  {
    width: 16,
    height: 32,
    frames: 8,
    id: 424,
    asset: 'assets/map/interactive/transporter/Transporter3.png',
    set: 'none',
    type: 'interactive'
  }
]

export default tiles
