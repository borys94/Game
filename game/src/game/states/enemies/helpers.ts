import type Enemy from '../../characters/enemy'

export const shouldChangeDirection = (enemy: Enemy<any>) => {
  return (
    !enemy.game.map.hasObstacle(
      enemy.x + enemy.paddingLeft + enemy.speed + 0.1,
      enemy.y + enemy.height + 16.5
    ) ||
    !enemy.game.map.hasObstacle(
      enemy.x +
        enemy.width -
        enemy.paddingRight +
        enemy.speed +
        0.1,
      enemy.y + enemy.height + 16.5
    ) ||
    enemy.game.map.hasObstacle(
      enemy.x + enemy.speed * 2 + 0.1,
      enemy.y + enemy.height / 2 + 0.1
    ) ||
    enemy.game.map.hasObstacle(
      enemy.x + enemy.width - enemy.paddingLeft + enemy.speed + 0.1,
      enemy.y + enemy.height / 2 + 0.1
    ) ||
    enemy.x <= 0
  )
}

// if (
//   !this.character.game.map.hasObstacle(
//     this.character.x + this.character.paddingLeft + this.character.speed + 0.1,
//     this.character.y + this.character.height + 16.5
//   ) ||
//   !this.character.game.map.hasObstacle(
//     this.character.x +
//       this.character.width -
//       this.character.paddingRight +
//       this.character.speed +
//       0.1,
//     this.character.y + this.character.height + 16.5
//   ) ||
//   this.character.game.map.hasObstacle(
//     this.character.x + this.character.speed * 2,
//     this.character.y + this.character.height / 2
//   ) ||
//   this.character.x <= 0
// ) {
