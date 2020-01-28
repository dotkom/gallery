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

type FieldType =
  | 'field'
  | 'boolean'
  | 'string'
  | 'url'
  | 'email'
  | 'regex'
  | 'slug'
  | 'integer'
  | 'float'
  | 'decimal'
  | 'date'
  | 'datetime'
  | 'time'
  | 'choice'
  | 'multiple_choice'
  | 'file_upload'
  | 'image_upload'
  | 'list'
  | 'nested_object';

interface FieldMetadata {
  type: FieldType;
  required: boolean;
  readOnly: boolean;
  label?: string;
  maxLength?: number;
  helpText?: string;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

interface MetadataResponse {
  name: string;
  description: string;
  renders: string[];
  parses: string[];
  actions: {
    [T in keyof RequestMethod]?: FieldMetadata;
  };
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

  destroy(id: Param): Promise<DeleteData>;
}

export class BaseResource {
  path = '';

  constructor(public fetcher = requests) {}

  public getListUrl(queryParams = {}): string {
    const snakeCasedParams = humps.decamelizeKeys(queryParams);
    const queryString = queryParser.stringify(snakeCasedParams);
    return `${this.path}/?${queryString}`;
  }

  public getDetailUrl(id: Param): string {
    return `${this.path}/${id}/`;
  }

  protected async performOptions(url: string) {
    const response = await this.fetcher.get(url).json<MetadataResponse>();
    return response;
  }

  protected async performList<ReturnData>(queryParams = {}): Promise<ListResource<ReturnData>> {
    const url = this.getListUrl(queryParams);
    const response = await this.fetcher.get(url).json<ListResource<ReturnData>>();
    return response;
  }

  protected async performRetrieve<ReturnData>(key: Param): Promise<ReturnData> {
    const url = this.getDetailUrl(key);
    const response = await this.fetcher.get(url).json<ReturnData>();
    return response;
  }

  protected async performCreate<Data, ReturnData>(data: Data): Promise<ReturnData> {
    const url = this.getListUrl();
    const response = await this.fetcher.post(url, { json: data }).json<ReturnData>();
    // Mutate newly created models to add it to the cache.
    // This will make the first detail fetch of the model instant.
    // const futureUrl = this.getDetailUrl(response.id);
    // mutate(futureUrl, response, false);
    return response;
  }

  protected async performUpdate<Data, ReturnData>(key: Param, data: Partial<Data>): Promise<ReturnData> {
    const url = this.getDetailUrl(key);
    const response = await this.fetcher.patch(url, { json: data }).json<ReturnData>();
    // Mutate local state version of the model after getting the updated version from the API.
    mutate(url, response, false);
    return response;
  }

  protected async performDestroy<ReturnData>(key: Param): Promise<ReturnData> {
    const url = this.getDetailUrl(key);
    const response = await this.fetcher.delete(url).json<ReturnData>();
    return response;
  }
}

export class Resource<
  RetrieveData,
  CreateData = RetrieveData,
  ListData = RetrieveData,
  UpdateData = CreateData,
  DestroyData = null
> extends BaseResource implements IResource<RetrieveData, CreateData, ListData, UpdateData, DestroyData> {
  public async list(...params: Parameters<typeof Resource.prototype.getListUrl>) {
    return await this.performList<ListData>(...params);
  }

  public async retrieve(...params: Parameters<typeof Resource.prototype.getDetailUrl>) {
    return await this.performRetrieve<RetrieveData>(...params);
  }

  public async create(data: CreateData) {
    return await this.performCreate<CreateData, RetrieveData>(data);
  }

  public async update(id: Param, data: Partial<UpdateData>) {
    return await this.performUpdate<UpdateData, RetrieveData>(id, data);
  }

  public async destroy(id: Param) {
    return await this.performDestroy<DestroyData>(id);
  }
}
