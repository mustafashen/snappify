import Hero from 'components/banners/hero';
import Grid from 'components/grid';
import { getProducts } from 'lib/shopify';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {

  const products = await getProducts({first: 4})

  return (
    <div>
      <Hero/>
      <Suspense>
        <Grid products={products}/>
      </Suspense>
    </div>
  );
}
