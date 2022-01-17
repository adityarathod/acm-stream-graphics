import { FC } from 'react'

export interface SceneProps {
  background: string
  width?: string
  height?: string
}

const Scene: FC<SceneProps> = ({ background, width, height, children }) => {
  return (
    <main
      className="text-white relative"
      style={{
        background,
        width: width ?? '1920px',
        height: height ?? '1080px',
      }}
    >
      {children}
    </main>
  )
}

interface SceneContainerProps {
  className?: string | undefined
}

export const SceneContainer: FC<SceneContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center bg-black ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  )
}

export default Scene
