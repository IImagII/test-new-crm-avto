export const calcTotalPrice = (orders) => {
  let summ = orders.reduce((acc, order) => (acc += +order.countPerson), 0)
  return Number(summ).toFixed(0)
}
