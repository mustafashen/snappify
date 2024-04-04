import { SearchSortFilterItem, SortFilterItem, sorting } from 'lib/constants';
import { Dispatch, SetStateAction } from 'react';

export default function CollectionSort({
  sortState,
  setSortState
}: {
  sortState: SortFilterItem;
  setSortState: Dispatch<SetStateAction<SearchSortFilterItem>>
}) {
  return (
    <select 
      value={sortState.title}
      onChange={(e) => {
        const newSort = sorting.find((item) => item.title === e.target.value) as SearchSortFilterItem;
        setSortState(newSort)
      }} 
      className="select select-bordered select-sm w-full max-w-xs">
      {
        sorting.map((item: SortFilterItem) => (
          <option key={item.sortKey} value={item.title}>{item.title}</option>
        ))
      }
    </select>
  )
}
