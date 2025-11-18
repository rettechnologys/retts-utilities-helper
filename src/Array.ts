export function flatenNestedArray(
  nestedArray: any[],
  childrenKey = 'children',
): any[] {
  let flatArray: any[] = [];
  return nestedArray
    .map((n) => {
      const nCopy = { ...n };
      if (nCopy[childrenKey] && nCopy[childrenKey].length) {
        flatArray = [...flatArray, ...nCopy[childrenKey]];
      }

      delete nCopy[childrenKey];

      return nCopy;
    })
    .concat(
      flatArray.length ? flatenNestedArray(flatArray, childrenKey) : flatArray,
    );
}

export function getPath(
  object: any,
  keyToFind: string,
  valueToFind: any,
  childrenKey = 'children',
): any[] | undefined {
  // Check if object exists
  if (!object) return undefined;

  if (object[keyToFind] === valueToFind) return [object['name']];
  else if (object[keyToFind] || Array.isArray(object)) {
    const children = Array.isArray(object) ? object : object[childrenKey];

    // Check if children exists and is iterable
    if (children && Array.isArray(children)) {
      for (const child of children) {
        const result = getPath(child, keyToFind, valueToFind, childrenKey);
        if (result) {
          if (object['name']) result.unshift(object['name']);
          return result;
        }
      }
    }
  }

  return undefined;
}

export function searchNestedArray(
  object: any,
  keyToFind: string,
  valueToFind: string,
  childrenKey = 'children',
): any[] | undefined {
  // Check if object exists
  if (!object) return undefined;

  if (
    object[keyToFind] &&
    object[keyToFind].toLowerCase().indexOf(valueToFind.toLocaleLowerCase()) >
      -1
  )
    return [object];
  else if (object[keyToFind] || Array.isArray(object)) {
    const children = Array.isArray(object) ? object : object[childrenKey];

    // Check if children exists and is iterable
    if (children && Array.isArray(children)) {
      const results: any[] = [];
      for (const child of children) {
        const result = searchNestedArray(
          child,
          keyToFind,
          valueToFind,
          childrenKey,
        );
        if (result) {
          results.push(...result);
        }
      }

      if (results.length) {
        return results;
      }
    }
  }

  return undefined;
}
