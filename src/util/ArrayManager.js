export function chunkArray(arrayObject, numberOfItemsPerChunk) {
  let j = -1;

  const chunkedArrayObject = arrayObject.reduce(
    (accumulator, arrayItem, index) => {
      if (index % numberOfItemsPerChunk === 0) {
        j += 1;
        accumulator[j] = [arrayItem];
      } else {
        accumulator[j].push(arrayItem);
      }

      return accumulator;
    },
    []
  );

  return chunkedArrayObject;
}
