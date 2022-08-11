export default function (x) {
  return typeof x === 'number'
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : 0;
}
