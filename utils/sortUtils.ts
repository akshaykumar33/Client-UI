function multiSort<T>(data: T[], criteria: SortCriterion[]): T[] {
  // Sort by priority order (index 0 is highest priority)
  return [...data].sort((a, b) => {
    for (const c of criteria) {
      let aValue = a[c.field];
      let bValue = b[c.field];
      if (typeof aValue === 'string' && Date.parse(aValue)) {
        aValue = Date.parse(aValue);
        bValue = Date.parse(bValue);
      }
      if (aValue < bValue) return c.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return c.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}
export { multiSort };