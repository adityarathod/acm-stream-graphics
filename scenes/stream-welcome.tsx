import { FC, useEffect } from 'react'
import { motion, Transition, useAnimation } from 'framer-motion'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'

import Layer from '../components/layer'
import Scene from '../components/scene'

const defaultTransition: Transition = {
  type: 'tween',
  duration: 0.75,
}

const fadeToOrigin: ControlsAnimationDefinition = {
  y: 0,
  opacity: 1,
  transition: { ...defaultTransition, delay: 0.5 },
}

const StreamWelcome: FC = () => {
  const bottomText = useAnimation()
  const topLogo = useAnimation()
  const bottomBar = useAnimation()

  const animSequence = async () => {
    await Promise.allSettled([
      bottomText.start(fadeToOrigin),
      topLogo.start({
        y: -350,
        opacity: 1,
        transition: { ...defaultTransition, delay: 0.5 },
      }),
    ])
    await Promise.allSettled([
      bottomText.start({
        y: 100,
        opacity: 0,
        transition: { ...defaultTransition, delay: 3 },
      }),
      topLogo.start({
        y: 0,
        scale: 1.5,
        transition: { ...defaultTransition, delay: 3.1, duration: 1 },
      }),
      bottomBar.start({
        opacity: 1,
        transition: { ...defaultTransition, delay: 3.5, duration: 0.5 },
      }),
    ])
  }

  useEffect(() => {
    animSequence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Scene background="#303030">
      <Layer className="flex flex-col items-center justify-center">
        <motion.img
          src="/images/acmutd.svg"
          className="h-24"
          initial={{ y: -400, opacity: 0 }}
          animate={topLogo}
        />
      </Layer>

      <Layer className="flex flex-col items-center justify-center">
        <motion.h1
          className="mt-[4rem] text-9xl mb-10"
          initial={{ y: 100, opacity: 0 }}
          animate={bottomText}
          style={{ fontFamily: 'Gilroy-Bold' }}
        >
          spring 2022 kickoff
        </motion.h1>
        <motion.h2
          className="text-7xl"
          initial={{ y: 100, opacity: 0 }}
          animate={bottomText}
          style={{ fontFamily: 'Gilroy-Bold', color: '#75ACFF' }}
        >
          acmutd.co
        </motion.h2>
      </Layer>

      <Layer className="flex flex-col items-center justify-end p-12">
        <motion.div
          className="flex flex-row items-center w-full text-4xl"
          initial={{ opacity: 0 }}
          animate={bottomBar}
          style={{ fontFamily: 'Gilroy-Semibold' }}
        >
          <div>spring 2022 kickoff.</div>
          <div className="flex-1"></div>
          <div style={{ color: '#75ACFF' }}>starting soon</div>
        </motion.div>
      </Layer>
    </Scene>
  )
}

export default StreamWelcome
