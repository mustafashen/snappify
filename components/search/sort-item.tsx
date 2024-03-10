'use client'
import { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SortItem({item}: {item: SortFilterItem}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );

  return (
    <option
      onClick={() => router.push(href)}>
      {item.title}
    </option>
  );
}
