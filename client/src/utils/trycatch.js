//DOC: trycatch function
// Usage example:
//   const [data, error] = await trycatch(asyncFn());
//   if (error) {
//     logs("Error", [error], Style.danger);
//   } else {
//     logs("Data", [data], Style.success);
//   }

export async function trycatch(promise) {
  try {
    const data = await promise;

    return [data, null];
  } catch (error) {
    console.log("error:", error);
    // Check if error is an instance of Error
    if (error instanceof Error) {
      return [null, error];
    } else {
      // Handle non-error values differently
      return [null, new Error(`Promise was rejected with a non-error value: ${error}`)];
    }
  }
}
