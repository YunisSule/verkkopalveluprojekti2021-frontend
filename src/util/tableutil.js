export function trimString(string) {
  return string.length > 80 ? string.substring(0, 80) + '...' : string;
}

export function getProductState(item, index) {
  switch (item) {
    case 'ordered':
      return <td key={index}>Tilattu</td>;
    case 'shipped':
      return <td key={index}>Postitettu</td>;
    case 'completed':
      return <td key={index}>Valmis</td>;
    default:
      return <td key={index}>Ei arvoa</td>;
  }
}

export function getPaymentMethod(item, index) {
  switch (item) {
    case 'email':
      return <td key={index}>Sähköposti</td>;
    case 'letter':
      return <td key={index}>Kirje</td>;
    default:
      return <td key={index}>Ei arvoa</td>;
  }
}
