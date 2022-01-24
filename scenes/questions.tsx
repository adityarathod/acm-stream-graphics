import { FC, useEffect } from 'react'
import Image from 'next/image'
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

interface QuestionsProps {
  onDone?: () => unknown
}

const Questions: FC<QuestionsProps> = ({ onDone }) => {
  const title = useAnimation()
  const adContainer = useAnimation()

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
      adContainer.start({
        y: 0,
        opacity: 1,
        transition: { ...defaultTransition, delay: 3.25, duration: 0.5 },
      }),
    ])
    await Promise.allSettled([
      title.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 10, duration: 0.5 },
      }),
      adContainer.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 10, duration: 0.5 },
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
            <p className="text-9xl text-center">questions?</p>
            {/* <p
              className="text-6xl text-center mt-6"
              style={{ color: '#75ACFF' }}
            >
              acmutd.co/discord
            </p> */}
          </motion.div>
        </div>
      </Layer>
      <Layer>
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={adContainer}
        >
          <div className="px-12 h-[24rem] w-full m-auto grid grid-cols-2">
            <section className="w-full h-full px-3 py-4 flex flex-col items-center justify-center">
              <div className="text-center">
                <h1
                  className="text-4xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  ping an officer in the discord!
                </h1>
                <Image
                  src="/images/qrcode-discord.png"
                  alt="discord qrcode"
                  width={300}
                  height={300}
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  acmutd.co/discord
                </h1>
              </div>
            </section>

            <section className="w-full h-full px-3 py-4 flex flex-col items-center justify-center">
              <div className="text-center">
                <h1
                  className="text-4xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  or, email us!
                </h1>
                <Image
                  src="/images/qrcode-email.png"
                  alt="email qrcode"
                  width={300}
                  height={300}
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  contact@acmutd.co
                </h1>
              </div>
            </section>
          </div>
        </motion.div>
      </Layer>
      <Layer className="flex flex-col items-center justify-end">
        <motion.div
          className="px-12 py-8 flex flex-row items-center w-full text-4xl"
          style={{
            fontFamily: 'Gilroy-Semibold',
          }}
        >
          <div>acm spring 2022 kickoff.</div>
          <div style={{ color: '#75ACFF' }}>&nbsp;starts soon.</div>
          <div className="flex-1"></div>
        </motion.div>
      </Layer>
    </Scene>
  )
}

export default Questions
