import { SortFilterItem, sorting } from 'lib/constants';
import SortItem from './sort-item';

export default function CollectionSort() {
  return (
    <select className="select select-bordered select-sm w-full max-w-xs">
      {
        sorting.map((item: SortFilterItem) => (
          <SortItem key={item.sortKey} item={item}/>
        ))
      }
    </select>
  )
}
