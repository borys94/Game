import Player from './player'

class PlayerBar {
  constructor(private player: Player) {}

  draw() {
    this.drawHealthBar()
    this.drawEnduranceBar()
    this.drawWeapon()
  }

  drawHealthBar() {
    const ctx = this.player.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#1E8449'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 20, 100, 10)
    ctx.fillRect(20, 20, 100 * (this.player.health / this.player.maxHealth), 10)
    ctx.restore()
  }

  drawEnduranceBar() {
    const ctx = this.player.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#5DADE2'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 35, 100, 10)
    ctx.fillRect(20, 35, 100, 10)
    ctx.restore()
  }

  drawWeapon() {
    if (!this.player.gunManager.currentGun) {
      return
    }
    const ctx = this.player.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#1E8449'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 50, 30, 30)
    ctx.fillRect(20, 50, 30, 30)

    // if (this.gunManager.currentGun?.img) {
    //   const img = this.gunManager.currentGun.img
    //   ctx.drawImage(
    //     img,
    //     0,
    //     0,
    //     img.width,
    //     img.height,
    //     20 + 15 - img.width/2,
    //     50 + 15 - img.height/2,
    //     img.width,
    //     img.height
    //   )
    // }

    ctx.restore()
  }
}

export default PlayerBar
