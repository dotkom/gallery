import { Resource } from './resource';
import { IModel, ListResource } from 'models/Django';
import useSWR, { ConfigInterface, responseInterface } from 'swr';

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

export const useDetailResource = <RetrieveData extends IModel, CreateData, ListData extends IModel, UpdateData>(
  resourceClass: Resource<RetrieveData, CreateData, ListData, UpdateData>,
  params: Parameters<typeof resourceClass.getDetailUrl> = ([] as unknown) as Parameters<
    typeof resourceClass.getDetailUrl
  >,
  config?: ConfigInterface<RetrieveData>
) => {
  const url = resourceClass.getDetailUrl(...params);
  const response = useSWR<RetrieveData>(url, {
    fetcher: () => resourceClass.retrieve(...params),
    suspense: true,
    ...config,
  });
  type DataPromise = ReturnType<typeof resourceClass.retrieve>;
  type ReturnData = UnwrapPromise<DataPromise>;
  return response as Omit<responseInterface<RetrieveData, unknown>, 'data'> & {
    data: ReturnData;
  };
};

export const useListResource = <RetrieveData extends IModel, CreateData, ListData extends IModel, UpdateData>(
  resourceClass: Resource<RetrieveData, CreateData, ListData, UpdateData>,
  params: Parameters<typeof resourceClass.getListUrl> = ([] as unknown) as Parameters<typeof resourceClass.getListUrl>,
  config?: ConfigInterface<ListResource<ListData>>
) => {
  type ReturnData = UnwrapPromise<ReturnType<typeof resourceClass.list>>;
  const url = resourceClass.getListUrl(...params);
  const response = useSWR<ReturnData>(url, {
    fetcher: () => resourceClass.list(...params),
    suspense: true,
    ...config,
  });
  return response as Omit<responseInterface<ListResource<ReturnData>, unknown>, 'data'> & {
    data: ReturnData;
  };
};
