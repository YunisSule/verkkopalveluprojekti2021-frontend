export function trimString(string) {
  return string.length > 80 ? string.substring(0, 80) + '...' : string;
}
