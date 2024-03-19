'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { logoGet } from './actions';
import { Logo } from 'lib/shopify/types';


export default async function LogoIcon({
  width,
  height
}: {
  width?: number
  height?: number
}) {

  const [logo, setLogo] = useState<{image: Logo} | {}>({})

  useEffect(() => {
    logoGet().then(res => {
      if (res) {
        setLogo(res)
      }
    })
  }, [])

  if (Object.keys(logo).includes('image')) {
    const logoImage = logo as Logo
    return (
      <Link
        className='flex items-center btn btn-ghost'
        href='/'>
          <Image
            src={logoImage.image.url}
            alt={logoImage.image.altText}
            width={width? width : logoImage.image.width}
            height={height? height : logoImage.image.height}
          />
      </Link>
    );
  }

  return null 
}
