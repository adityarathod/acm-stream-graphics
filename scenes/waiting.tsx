import { FC, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import defaultTransition from '../util/default-transition'

import Layer from '../components/layer'
import Scene from '../components/scene'

interface WaitingProps {
  onDone?: () => unknown
}

const Waiting: FC<WaitingProps> = ({ onDone }) => {
  const bottomBar = useAnimation()

  const animSequence = async () => {
    await Promise.allSettled([
      bottomBar.start({
        scale: 2,
        x: 1240,
        y: -500,
        transition: { ...defaultTransition, delay: 1, duration: 1 },
      }),
    ])
    await bottomBar.start({
      opacity: 0,
      transition: { ...defaultTransition, delay: 3, duration: 0.5 },
    })
    if (onDone) onDone()
  }

  useEffect(() => {
    animSequence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Scene background="#303030">
      <Layer className="flex flex-col items-center justify-end">
        <motion.div
          className="px-12 py-8 flex flex-row items-center w-full text-4xl"
          style={{
            fontFamily: 'Gilroy-Semibold',
          }}
          animate={bottomBar}
          initial={{ scale: 1, opacity: 1 }}
        >
          <div>acm spring 2022 kickoff.</div>
          <div style={{ color: '#75ACFF' }}>&nbsp;starts soon.</div>
          <div className="flex-1"></div>
        </motion.div>
      </Layer>
    </Scene>
  )
}

export default Waiting
