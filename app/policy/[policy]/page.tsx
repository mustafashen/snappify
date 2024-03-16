import Prose from "components/prose";
import { getPolicies } from "lib/shopify";
import { Policy } from "lib/shopify/types";

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
    <div className='card lg:max-w-[60vw] m-auto'>
      <div className='card-body'>
        <h1 className="card-title text-3xl py-12">{searchParams.title}</h1>
        {policy ? <Prose className="" html={policy.body as string} /> : null}
      </div>
    </div>
  );
}
