import Prose from "components/prose";
import { getPolicies } from "lib/shopify";
import { Policy } from "lib/shopify/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { policy: string },
  searchParams: {
    title: string
  }
}): Promise<Metadata> {

  const policy = (await getPolicies()).find(p => p.handle === params.policy)

  if (!policy) return notFound();

  return {
    title: searchParams.title,
    description: "Store policy"
  };
}


export default async function page({
  params,
  searchParams
  }: {
    params: {
      policy: Policy,
    },
    searchParams: {
      title: string
    }
  }) {
    
    const policy = (await getPolicies()).find(p => p.handle === params.policy)
    return (
    <div className='card bg-base-100 lg:max-w-[60vw] m-auto'>
      <div className='card-body'>
        <h1 className="card-title text-3xl py-12">{searchParams.title}</h1>
        {policy ? <Prose className="" html={policy.body as string} /> : null}
      </div>
    </div>
  );
}
