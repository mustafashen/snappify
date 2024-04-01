import Reset from "components/access/reset";

export default function page() {
  
  const domain = process.env.SHOPIFY_STORE_DOMAIN

  if (domain) {
    return (
      <div>
        <Reset domain={domain}/>
      </div>
    )
  } else {
    return (
      <div>
        <p>Cannot get the shopify store domain.</p>
      </div>
    )
  }
}
