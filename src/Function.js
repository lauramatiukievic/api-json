export function firstLetterUpperCase(str) {
  const firstLetter = str.charAt(0).toUpperCase();
  const restOfStr = str.slice(1);
  const output = firstLetter + restOfStr;
  return output;
}
