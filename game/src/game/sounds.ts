class Sounds {
  background: HTMLAudioElement
  coin: HTMLAudioElement
  hurt: HTMLAudioElement
  active = false

  constructor () {
    this.background = new Audio('assets/sounds/background.mp3')
    this.coin = new Audio('assets/sounds/coins.mp3')
    this.hurt = new Audio('assets/sounds/hurt.ogg')
  }

  toogle (): void {
    this.active = !this.active
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
