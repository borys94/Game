class Sounds {
  background: HTMLAudioElement
  coin: HTMLAudioElement
  hurt: HTMLAudioElement
  collect: HTMLAudioElement
  jump: HTMLAudioElement
  unlock: HTMLAudioElement
  foot: HTMLAudioElement
  menu: HTMLAudioElement
  mainMenu: HTMLAudioElement
  guns: Record<string, HTMLAudioElement>

  constructor(public active = false) {
    this.background = new Audio('assets/sounds/background.mp3')
    this.coin = new Audio('assets/sounds/coins.mp3')
    this.hurt = new Audio('assets/sounds/hurt.ogg')
    this.collect = new Audio('assets/sounds/collect.wav')
    this.jump = new Audio('assets/sounds/jump.wav')
    this.unlock = new Audio('assets/sounds/unlock.wav')
    this.foot = new Audio('assets/sounds/foot.ogg')
    this.menu = new Audio('sounds/menu.wav')
    this.mainMenu = new Audio('sounds/mainMenu.mp3')

    this.guns = {
      pistol: new Audio('assets/sounds/guns/pistol.wav'),
      laserGun: new Audio('assets/sounds/guns/laserGun.wav'),
      laserGunShort: new Audio('assets/sounds/guns/laserGunShort.wav'),
      rifle: new Audio('assets/sounds/guns/rifle.wav')
    }
  }

  toogle(): void {
    this.active = !this.active

    if (!this.active) {
      this.background.pause()
      this.mainMenu.pause()
      this.coin.pause()
      this.hurt.pause()
    }
  }

  private async playSound(sound: HTMLAudioElement): Promise<void> {
    if (!this.active) {
      return
    }
    try {
      await sound.pause()
      sound.currentTime = 0
      // eslint-disable-next-line
      await sound.play()
    } catch (e) {
      // TODO
      console.error(e)
    }
  }

  playMenu(): void {
    this.playSound(this.mainMenu)
    this.mainMenu.loop = true
  }

  stopMenu() {
    this.mainMenu.pause()
  }

  playBackground(): void {
    this.playSound(this.background)
    this.background.loop = true
  }

  stopBackground() {
    this.background.pause()
  }

  pistolSound() {
    this.playSound(this.guns.pistol)
  }

  rifleSound() {
    this.playSound(this.guns.pistol)
  }

  laserGunSound() {
    this.playSound(this.guns.laserGunShort)
  }

  coinSound(): void {
    this.playSound(this.coin)
  }

  collectSound(): void {
    this.playSound(this.collect)
  }

  jumpSound(): void {
    this.playSound(this.jump)
  }

  unlockSound(): void {
    this.playSound(this.unlock)
  }

  footSound(): void {
    this.foot.loop = true
    this.foot.playbackRate = 0.5
    this.playSound(this.foot)
  }

  stopFootSound() {
    this.foot.pause()
    this.foot.currentTime = 0
  }

  menuSound(): void {
    this.playSound(this.menu)
  }

  hurtSound(): void {
    this.playSound(this.hurt)
    setTimeout(() => {
      this.hurt.pause()
    }, 500)
  }
}

const sounds = new Sounds()
export default sounds
