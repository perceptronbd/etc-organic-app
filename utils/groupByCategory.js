export const groupByCategory = (data) => {
  return data?.reduce((result, item) => {
    // If the category is not yet in the result object, add it with an empty array
    if (!result[item.category]) {
      result[item.category] = [];
    }

    // Push the current item into the category array in the result object
    result[item.category].push(item);

    // Return the updated result object for the next iteration
    return result;
  }, {}); // Initial value is an empty object
};
