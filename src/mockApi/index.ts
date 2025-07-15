/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility function to simulate an asynchronous API call.
 * It returns a Promise that resolves with the provided data after a delay.
 * @template T The type of data to be returned.
 * @param {T} data - The data to be returned by the mock API.
 * @param {number} [delay=500] - The delay in milliseconds before resolving the promise.
 * @param {boolean} [success=true] - Whether the mock call should succeed or fail.
 * @returns {Promise<T>} A promise that resolves with the data or rejects with an error.
 */

export const simulateApiResponse = <T>(
  data: T,
  delay: number = 500,
  success: boolean = true,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(new Error("Mock API Error: Something went wrong."));
      }
    }, delay);
  });
};
