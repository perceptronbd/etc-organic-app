export const groupByOrder = (data) => {
  return data?.reduce((result, item) => {
    // If the status is not yet in the result object, add it with an empty array
    if (!result[item.status]) {
      result[item.status] = [];
    }

    // Push the current item into the status array in the result object
    result[item.status].push(item);

    // Return the updated result object for the next iteration
    return result;
  }, {}); // Initial value is an empty object
};
