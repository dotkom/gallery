import { requests } from './requests';
import { ListResource } from 'models/Django';
import queryParser from 'query-string';
import { mutate } from 'swr';
import humps from 'humps';

type Param = string | number;

export interface BaseQueryParams {
  pageSize: number;
  page: number;
  format: 'json';
}

export interface IResource<
  RetrieveData,
  CreateData = RetrieveData,
  ListData = RetrieveData,
  UpdateData = CreateData,
  DeleteData = null
> {
  path: string;

  getListUrl<QueryParams extends {} = {}>(queryParams: Partial<QueryParams & BaseQueryParams>): string;

  getDetailUrl(id: Param): string;

  list(): Promise<ListResource<ListData>>;

  retrieve(id: Param): Promise<RetrieveData>;

  create(data: CreateData): Promise<RetrieveData>;

  update(id: Param, data: Partial<UpdateData>): Promise<RetrieveData>;

  delete(id: Param): Promise<DeleteData>;
}

export class Resource<
  RetrieveData,
  CreateData = RetrieveData,
  ListData = RetrieveData,
  UpdateData = CreateData,
  DeleteData = null
> implements IResource<RetrieveData, CreateData, ListData, UpdateData, DeleteData> {
  path = '';

  constructor(public fetcher = requests) {}

  public getListUrl(queryParams = {}): string {
    const snakeCasedParams = humps.decamelizeKeys(queryParams);
    const queryString = queryParser.stringify(snakeCasedParams);
    console.log(queryString);
    return `${this.path}/?${queryString}`;
  }

  public getDetailUrl(id: Param) {
    return `${this.path}/${id}/`;
  }

  public async list(...params: Parameters<typeof Resource.prototype.getListUrl>) {
    return await this.fetcher.get(this.getListUrl(...params)).json<ListResource<ListData>>();
  }

  public async retrieve(...params: Parameters<typeof Resource.prototype.getDetailUrl>) {
    return await this.fetcher.get(this.getDetailUrl(...params)).json<RetrieveData>();
  }

  public async create(data: CreateData) {
    const response = await this.fetcher.post(this.getListUrl(), { json: data }).json<RetrieveData>();
    // Mutate newly created models to add it to the cache.
    // This will make the first detail fetch of the model instant.
    // const futureUrl = this.getDetailUrl(response.id);
    // mutate(futureUrl, response, false);
    return response;
  }

  public async update(id: Param, data: Partial<UpdateData>) {
    const url = this.getDetailUrl(id);
    const response = await this.fetcher.patch(url, { json: data }).json<RetrieveData>();
    // Mutate local state version of the model after getting the updated version from the API.
    mutate(url, response, false);
    return response;
  }

  public async delete<Output = null>(id: Param) {
    return await this.fetcher.delete(this.getDetailUrl(id)).json<Output>();
  }
}
