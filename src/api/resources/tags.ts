import { requests } from 'api/requests';
import { getTagsUrl, getTagUrl } from 'api/urls';
import { IUserTagData, IUserTag } from 'models/Tag';
import { ListResource } from 'models/Django';

export const getUserTags = async (query: string) => {
  console.log(query);
  return await requests.get(getTagsUrl()).json<ListResource<IUserTag>>();
};

export const getUserTag = async (tagId: number) => {
  return await requests.get(getTagUrl(tagId)).json<IUserTag>();
};

export const createUserTag = async (tagData: IUserTagData) => {
  return await requests.post(getTagsUrl(), { json: tagData }).json<IUserTag>();
};

export const updateUserTag = async (tagId: number, tagData: Partial<IUserTagData>) => {
  return await requests.patch(getTagUrl(tagId), { json: tagData }).json<IUserTag>();
};

export const deleteUserTag = async (tagId: number) => {
  return await requests.delete(getTagUrl(tagId)).json<undefined>();
};
