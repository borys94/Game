class Sounds {
  background: HTMLAudioElement
  coin: HTMLAudioElement
  hurt: HTMLAudioElement
  collect: HTMLAudioElement
  jump: HTMLAudioElement
  unlock: HTMLAudioElement

  constructor (public active = false) {
    this.background = new Audio('assets/sounds/background.mp3')
    this.coin = new Audio('assets/sounds/coins.mp3')
    this.hurt = new Audio('assets/sounds/hurt.ogg')
    this.collect = new Audio('assets/sounds/collect.wav')
    this.jump = new Audio('assets/sounds/jump.wav')
    this.unlock = new Audio('assets/sounds/unlock.wav')
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

  collectSound (): void {
    this.playSound(this.collect)
  }

  jumpSound (): void {
    this.playSound(this.jump)
  }

  unlockSound (): void {
    this.playSound(this.unlock)
  }

  hurtSound (): void {
    this.playSound(this.hurt)
    setTimeout(() => {
      this.hurt.pause()
    }, 500)
  }
}

export default new Sounds()
