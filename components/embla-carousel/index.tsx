'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, NextButton, PrevButton } from './embla-buttons'
import Image from 'next/image'
import { Image as ProductImage } from 'lib/shopify/types'
import { StopIcon as Dot } from '@heroicons/react/24/outline'
import { StopIcon as SelectedDot } from '@heroicons/react/24/solid'

type PropType = {
  slides: ProductImage[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className='relative w-full'>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div className="w-full min-w-full flex justify-center items-center" key={index}>
              <Image
                src={slide.url}
                alt={slide.altText}
                width={400}
                height={400}
              />
            </div>
          ))}
        </div>
      </div>
      {
        slides.length > 1 ? (
          <>
            <div className="absolute h-0 overflow-visible top-[50%] flex w-full items-center justify-between">
              <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
              <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
            </div>
            <div className="absolute bottom-5 h-0 overflow-visible w-full flex items-center justify-center opacity-80">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={'w-5 h-5'}
                  icon={selectedIndex === index ? <SelectedDot/> : <Dot/>}
                />
              ))}
            </div>
          </>
        ) :
        null
      }

    </div>
  )
}

export default EmblaCarousel
