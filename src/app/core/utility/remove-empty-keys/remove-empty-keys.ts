export function removeEmptyKeys<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (Array.isArray(v)) {
        return v.length > 0;
      }
      return v !== null && v !== undefined && v !== '';
    })
  ) as Partial<T>;
}
