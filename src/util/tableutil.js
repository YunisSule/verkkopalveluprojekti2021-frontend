export default function trimString(maxLength, string) {
  return string.length > maxLength ? string.substring(0, maxLength) + '...' : string;
}
