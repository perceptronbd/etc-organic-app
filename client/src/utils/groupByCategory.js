export const groupProductsByCategory = (data) => {
  return data.reduce((acc, product) => {
    const { category } = product;
    if (acc[category]) {
      acc[category].push({ value: product._id, label: product.productName });
    } else {
      acc[category] = [{ value: product._id, label: product.productName }];
    }
    return acc;
  }, {});
};

export const extractCategories = (data) => {
  // Check if data is an array
  if (!Array.isArray(data)) {
    throw new Error("extractCategories() must accept an array as argument.");
  }

  // Extract categories from the array
  const categories = Array.from(new Set(data.map((product) => product.category)));
  categories.unshift("all");
  return categories;
};
