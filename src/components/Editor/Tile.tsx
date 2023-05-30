import { useEffect, useRef } from 'react'
import { AssetFrameDetail } from '../../game/assetLoader'

type Props = {
  img: HTMLImageElement
  frame: AssetFrameDetail
  onSelect: (asset?: AssetFrameDetail) => void
}

const Tile = ({ img, frame, onSelect }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !img) {
      return
    }

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !frame) {
      return
    }

    ctx.drawImage(
      img,
      frame.frame.x,
      frame.frame.y,
      frame.frame.w / (frame.frames ?? 1),
      frame.frame.h,
      0,
      0,
      frame.frame.w / (frame.frames ?? 1),
      frame.frame.h
    )
  }, [img]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!frame) {
    return <div onClick={() => onSelect()}>CLEAR</div>
  }

  return (
    <canvas
      title={frame.name}
      onClick={() => onSelect(frame)}
      ref={canvasRef}
      width={frame.frame.w / (frame.frames ?? 1)}
      height={frame.frame.h}
    />
  )
}

export default Tile
