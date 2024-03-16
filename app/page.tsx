import Hero from 'components/banner/hero';
import BestSellers from 'components/custom-collection/best-sellers';
import LatestArrivals from 'components/custom-collection/latest-arrivals';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {

  return (
    <div>
      <Hero/>
      <LatestArrivals/>
      <BestSellers/>
    </div>
  );
}
