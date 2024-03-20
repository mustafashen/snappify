import Grid from "components/grid";
import SearchSort from "components/search/search-sort";
import { Product } from "lib/shopify/types";


export default function ProductsSearch({products, searchValue}: {products: Product[], searchValue?: string}) {
  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          Results for &quot;{searchValue}&quot;
        </h1>
        <SearchSort/>
      </div>
      <Grid products={products}></Grid>
    </div>
  )
}
