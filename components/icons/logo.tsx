import { getLogo } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';


export default async function LogoIcon({
  width,
  height
}: {
  width?: number
  height?: number
}) {
  const logo = await getLogo()
  return (
    <Link
      href='/'>
      <button className='btn btn-ghost'>
        <Image
          src={logo.image.url}
          alt={logo.image.altText}
          width={width? width : logo.image.width}
          height={height? height : logo.image.height}
        />
      </button>
    </Link>
  );
}
