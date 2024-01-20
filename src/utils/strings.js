export function stringToUniqueNumber(inputString) {
  const trimmedString = inputString.trim();

  let hash = 0;
  if (trimmedString.length === 0) return hash;
  for (let i = 0; i < trimmedString.length; i++) {
    const char = trimmedString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
}