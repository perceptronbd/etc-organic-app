export const totalPrice = (items) => {
  return items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.product.salesPrice;
  }, 0);
};
