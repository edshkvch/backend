export function removeUndefinedValue(object: Record<string, any>): Record<string, any> {
  return Object.entries(object).reduce((accumulator, [key, value]) => {
    if (value === undefined) {
      return accumulator;
    }

    accumulator[key] = value;

    return accumulator;
  }, {});
}
