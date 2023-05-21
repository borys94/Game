import React, { useEffect, useRef, useState } from 'react'

const Sprites = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const image = useRef<HTMLImageElement | null>(null)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const img = new Image()
    image.current = img
    img.src = `assets/heroes/punk/withoutArm/run.png`
    img.onload = () => {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
      }
    }
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && image.current) {
      ctx.clearRect(0, 0, 48, 48)
      ctx.drawImage(image.current, frame * 48 * -1, 0)
    }
  }, [frame])

  return (
    <div style={{ backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%' }}>
      <input type="number" onChange={(e) => setFrame(+e.target.value)} />
      <canvas id="canvas" ref={canvasRef} width={48} height={48} />
    </div>
  )
}

export default Sprites
