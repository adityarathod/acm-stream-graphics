import { FC, useEffect } from 'react'
import { motion, Transition, useAnimation } from 'framer-motion'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'

import Layer from '../components/layer'
import Scene from '../components/scene'
import { BottomBarLayer } from '../components/bottom-bar'

const defaultTransition: Transition = {
  type: 'tween',
  duration: 0.75,
}

const fadeToOrigin: ControlsAnimationDefinition = {
  y: 0,
  opacity: 1,
  transition: { ...defaultTransition, delay: 0.5 },
}

interface GiveawayProps {
  onDone?: () => unknown
}

const Giveaway: FC<GiveawayProps> = ({ onDone }) => {
  const title = useAnimation()
  const subtitle = useAnimation()
  const cardTop = useAnimation()
  const cardBtm = useAnimation()

  const animSequence = async () => {
    await title.start({
      opacity: 1,
      transition: { ...defaultTransition, delay: 1 },
    })
    await Promise.allSettled([
      title.start({
        scale: 0.75,
        y: -370,
        transition: { ...defaultTransition, delay: 3 },
      }),
    ])
    await Promise.allSettled([
      cardTop.start({
        x: -6130,
        transition: { ...defaultTransition, duration: 5 },
      }),
      cardBtm.start({
        x: 1930,
        transition: { ...defaultTransition, duration: 5 },
      }),
      subtitle.start({
        ...fadeToOrigin,
        transition: { ...defaultTransition, delay: 4.1 },
      }),
    ])
    await Promise.allSettled([
      title.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 6, duration: 0.5 },
      }),
      subtitle.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 6, duration: 0.5 },
      }),
      cardTop.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 6, duration: 0.5 },
      }),
      cardBtm.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 6, duration: 0.5 },
      }),
    ])
    if (onDone) onDone()
  }

  useEffect(() => {
    animSequence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Scene background="#303030">
      <Layer>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <motion.div
            className="text-9xl"
            style={{
              fontFamily: 'Gilroy-Bold',
            }}
            initial={{ opacity: 0 }}
            animate={title}
          >
            <p className="text-9xl text-center">kickoff giveaway 🎉</p>
          </motion.div>
        </div>
      </Layer>

      <Layer>
        <div className="w-full h-full flex items-center justify-center">
          <motion.h1
            className="text-6xl text-center"
            style={{ fontFamily: 'Gilroy-Semibold' }}
            animate={subtitle}
            initial={{ y: 10, opacity: 0 }}
          >
            we&apos;ll be giving away a $50 amazon gift card
            <br />
            to a random attendee!*
            <br />
            <span className="text-gray-300 text-lg">
              *make sure you stay until the end and are in our discord server :)
            </span>
          </motion.h1>
        </div>
      </Layer>

      <Layer>
        <motion.div
          className="w-[6120px] h-32 absolute bottom-[510px] bg-repeat-x bg-cover"
          style={{ background: 'url("/images/amazon-sm.png")' }}
          initial={{ x: 1930 }}
          animate={cardTop}
        ></motion.div>
        <motion.div
          className="w-[6120px] h-32 absolute bottom-[360px] bg-repeat-x bg-cover"
          style={{ background: 'url("/images/amazon-sm.png")' }}
          initial={{ x: -6130 }}
          animate={cardBtm}
        ></motion.div>
      </Layer>

      <BottomBarLayer />
    </Scene>
  )
}

export default Giveaway
