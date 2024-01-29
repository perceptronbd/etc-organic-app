export const groupProductsByCategory  =(data)=>{
    return data.reduce((acc, product) => {
        const { category } = product;
        if (acc[category]) {
          acc[category].push({ value: product._id, label: product.productName });
        } else {
          acc[category] = [{ value: product._id, label: product.productName }];
        }
        return acc;
      }, {});
}