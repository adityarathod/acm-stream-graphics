import { FC } from 'react'

interface LayerProps {
  className?: string
}

const Layer: FC<LayerProps> = ({ className, children }) => {
  return (
    <div className={`w-full h-full absolute top-0 left-0 ${className}`}>
      {children}
    </div>
  )
}

export default Layer
