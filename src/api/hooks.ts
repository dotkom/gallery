import { useAsync, PromiseFn, AsyncOptions } from 'react-async';
import { useMemo } from 'react';

/**
 * @param resourceFn A function which returns a promise
 * @param params The parameters of the `resourceFn` funtion.
 * Memoized when equal, triggering a re-validation when not.
 * @example
 * // Example of usage in a component:
 * const { data } = useResource(getPhoto, [1]);
 * // Equal to calling the function manually in the following way:
 * const data = await getPhoto(1);
 *
 */
export const useResource = <Data, Params extends Array<unknown>>(
  resourceFn: (...params: Params) => Promise<Data>,
  params: Params = ([] as unknown) as Params,
  options?: AsyncOptions<Data>
) => {
  // Memoize the promise function and its parameters
  const promiseFn: PromiseFn<Data> = useMemo(() => {
    console.log('PromiseFn memo');
    return async () => {
      console.log('resourceFn', 'calling');
      return await resourceFn(...params);
    };
  }, [...params.map((value) => JSON.stringify(value))]);
  console.log('useResource', 'before');
  const response = useAsync(promiseFn, { suspense: true, ...options });
  // Cast the data proptery to not possibly be undefined unless specified directly.
  // undefined is only used when `suspense` is not used.
  console.log('useResource', 'after');
  return response as Omit<typeof response, 'data'> & { data: Data };
};
