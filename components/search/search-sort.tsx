import { SearchSortFilterItem, searchSorting } from 'lib/constants';
import SortItem from './sort-item';

export default function SearchSort() {
  return (
    <select className="select select-bordered select-sm w-full max-w-xs">
      {
        searchSorting.map((item: SearchSortFilterItem) => (
          <SortItem key={item.sortKey} item={item}/>
        ))
      }
    </select>
  )
}
