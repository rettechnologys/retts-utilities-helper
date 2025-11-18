export const debounceTime = async (ms = 1000) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
};
