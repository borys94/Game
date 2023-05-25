import type Enemy from '../characters/enemy'

export const shouldChangeDirection = (enemy: Enemy) => {
  return (
    isHoleUnderEnemy(enemy) ||
    isObstacleNextToEnemy(enemy) ||
    enemy.x <= 0 ||
    enemy.x + enemy.width >= enemy.game.map.width
  )
}

const isHoleUnderEnemy = (enemy: Enemy) => {
  return (
    (enemy.direction === 'left' &&
      !enemy.game.map.hasObstacle(enemy.x + enemy.paddingLeft + enemy.speed - 0.1, enemy.y + enemy.height + 16.5)) ||
    (enemy.direction === 'right' &&
      !enemy.game.map.hasObstacle(
        enemy.x + enemy.width - enemy.paddingRight + enemy.speed + 0.1,
        enemy.y + enemy.height + 16.5
      ))
  )
}

const isObstacleNextToEnemy = (enemy: Enemy) => {
  return (
    (enemy.direction === 'left' &&
      enemy.game.map.hasObstacle(enemy.x + enemy.paddingLeft + enemy.speed - 0.1, enemy.y + enemy.height / 2 + 0.1)) ||
    (enemy.direction === 'right' &&
      enemy.game.map.hasObstacle(
        enemy.x + enemy.width - enemy.paddingRight + enemy.speed + 0.1,
        enemy.y + enemy.height / 2 + 0.1
      ))
  )
}
