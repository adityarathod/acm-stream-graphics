import { FC, useEffect } from 'react'
import { motion, Transition, useAnimation } from 'framer-motion'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'

import Layer from '../components/layer'
import Scene from '../components/scene'
import BottomBar from '../components/bottom-bar'
import CD from 'react-countdown'

const defaultTransition: Transition = {
  type: 'tween',
  duration: 0.75,
}

const fadeToOrigin: ControlsAnimationDefinition = {
  y: 0,
  opacity: 1,
  transition: { ...defaultTransition, delay: 0.5 },
}

interface CountdownProps {
  onDone?: () => unknown
}

const Countdown: FC<CountdownProps> = ({ onDone }) => {
  const bottomText = useAnimation()
  const logo = useAnimation()
  const bottomBar = useAnimation()

  const animSequence = async () => {
    await Promise.allSettled([
      bottomText.start(fadeToOrigin),
      logo.start({
        y: -350,
        opacity: 1,
        transition: { ...defaultTransition, delay: 0.5 },
      }),
    ])
    // await Promise.allSettled([
    //   bottomText.start({
    //     y: 100,
    //     opacity: 0,
    //     transition: { ...defaultTransition, delay: 5 },
    //   }),
    //   logo.start({
    //     y: 0,
    //     scale: 1.75,
    //     transition: { ...defaultTransition, delay: 5.1, duration: 1 },
    //   }),
    //   bottomBar.start({
    //     opacity: 1,
    //     y: 0,
    //     transition: { ...defaultTransition, delay: 5.5, duration: 0.5 },
    //   }),
    // ])
    // await logo.start({
    //   opacity: 0,
    //   transition: { ...defaultTransition, delay: 5, duration: 0.5 },
    // })
    if (onDone) onDone()
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
          animate={logo}
        />
      </Layer>

      <Layer className="flex flex-col items-center justify-center">
        <motion.h1
          className="mt-[4rem] text-9xl mb-10"
          initial={{ y: 100, opacity: 0 }}
          animate={bottomText}
          style={{ fontFamily: 'Gilroy-Bold' }}
        >
          kickoff starts in
        </motion.h1>
        <motion.h2
          className="text-7xl"
          initial={{ y: 100, opacity: 0 }}
          animate={bottomText}
          style={{ fontFamily: 'Gilroy-Bold', color: '#75ACFF' }}
        >
          <CD date={Date.now() + 20000}>
            <span>a moment.</span>
          </CD>
        </motion.h2>
      </Layer>

      <Layer className="flex flex-col items-center justify-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={bottomBar}
          className="w-full"
        >
          <BottomBar />
        </motion.div>
      </Layer>
    </Scene>
  )
}

export default Countdown
