import { FC, useEffect } from 'react'
import Image from 'next/image'
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

interface SocialsPlugProps {
  onDone?: () => unknown
}

const SocialsPlug: FC<SocialsPlugProps> = ({ onDone }) => {
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
            <p className="text-9xl text-center">follow us!</p>
            <p
              className="text-5xl text-center mt-6 max-w-5xl m-auto"
              style={{
                color: '#75ACFF',
                fontFamily: 'Gilroy-Semibold',
                lineHeight: 1.3,
              }}
            >
              get reminded about events and
              <br />
              participate in fun social media contests!
            </p>
          </motion.div>
        </div>
      </Layer>
      <Layer>
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={adContainer}
        >
          <div className="px-12 h-80 w-full grid grid-cols-3">
            <section className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <Image
                  src="/images/qrcode-ig.png"
                  alt="ig qrcode"
                  width={300}
                  height={300}
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  instagram.com/acmutd
                </h1>
              </div>
            </section>

            <section className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <Image
                  src="/images/qrcode-fb.png"
                  alt="fb qrcode"
                  width={300}
                  height={300}
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  facebook.com/acmatutd
                </h1>
              </div>
            </section>

            <section className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <Image
                  src="/images/qrcode-li.png"
                  alt="li qrcode"
                  width={300}
                  height={300}
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  linkedin.com/company/acmutd
                </h1>
              </div>
            </section>
          </div>
        </motion.div>
      </Layer>

      <BottomBarLayer />
    </Scene>
  )
}

export default SocialsPlug
