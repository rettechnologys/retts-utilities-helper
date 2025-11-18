export function getObjByKeyValFromArray(
  items: any[],
  keyToFind: string,
  valueToFind: any,
): any {
  for (const item of items) {
    if (
      keyToFind in item &&
      item[keyToFind as keyof typeof item] === valueToFind
    ) {
      return item;
    }
  }
}

export function getObjValByKeyFromObj(obj: any, propString: string) {
  let prop;
  const props = propString.split('.');

  let i = 0;
  for (let iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    const candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }

  return obj[props[i]];
}

export function generateDatasetObj(obj: any) {
  const dataset = {};
  for (const key in obj) {
    Object.assign(dataset, {
      [`data-${key}`]:
        typeof getObjValByKeyFromObj(obj, key) === 'object' &&
        getObjValByKeyFromObj(obj, key) != null
          ? JSON.stringify(getObjValByKeyFromObj(obj, key))
          : getObjValByKeyFromObj(obj, key),
    });
  }

  return dataset;
}
