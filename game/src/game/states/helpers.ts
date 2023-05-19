import type Enemy from '../characters/enemy'

export const shouldChangeDirection = (enemy: Enemy) => {
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
