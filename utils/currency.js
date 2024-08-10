export default function currency(value){
  let MXPesos = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });
  return MXPesos.format(value);
}
