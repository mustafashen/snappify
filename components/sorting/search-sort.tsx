import { SearchSortFilterItem, SortFilterItem, searchSorting } from 'lib/constants';
import { Dispatch, SetStateAction } from 'react';

export default function SearchSort({
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
        const newSort = searchSorting.find((item) => item.title === e.target.value) as SearchSortFilterItem;
        setSortState(newSort)
      }} 
      className="select select-bordered select-sm w-full max-w-xs">
      {
        searchSorting.map((item: SortFilterItem) => (
          <option key={item.sortKey} value={item.title}>{item.title}</option>
        ))
      }
    </select>
  )
}
