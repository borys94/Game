class Sounds {
  background: HTMLAudioElement
  coin: HTMLAudioElement
  hurt: HTMLAudioElement

  constructor (public active = false) {
    this.background = new Audio('assets/sounds/background.mp3')
    this.coin = new Audio('assets/sounds/coins.mp3')
    this.hurt = new Audio('assets/sounds/hurt.ogg')
  }

  toogle (): void {
    this.active = !this.active

    if (!this.active) {
      this.background.pause()
      this.coin.pause()
      this.hurt.pause()
    }
  }

  private playSound (sound: HTMLAudioElement): void {
    if (!this.active) {
      return
    }
    sound.pause()
    sound.currentTime = 0
    // eslint-disable-next-line
    sound.play()
  }

  play (): void {
    this.playSound(this.background)
    this.background.loop = true
  }

  coinSound (): void {
    this.playSound(this.coin)
  }

  hurtSound (): void {
    this.playSound(this.hurt)
    setTimeout(() => {
      this.hurt.pause()
    }, 500)
  }
}

export default Sounds
