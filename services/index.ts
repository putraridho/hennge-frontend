/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class MailsControllerService {
  /**
   *
   */
  static mailsControllerGetAll(
    params: {
      /**  */
      page?: number;
      /**  */
      size?: number;
      /**  */
      sort?: string;
      /**  */
      sortBy?: string;
      /**  */
      from?: string;
      /**  */
      to?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetAllMailsRes> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/mail';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        page: params['page'],
        size: params['size'],
        sort: params['sort'],
        sortBy: params['sortBy'],
        from: params['from'],
        to: params['to']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class UsersControllerService {
  /**
   *
   */
  static usersControllerGetAllUsers(options: IRequestOptions = {}): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersControllerGetUser(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface GetAllMailsRes {
  /**  */
  page?: number;

  /**  */
  total?: number;

  /**  */
  data: MailModel[];
}

export interface MailModel {
  /**  */
  id: string;

  /**  */
  subject: string;

  /**  */
  attachment: boolean;

  /**  */
  createdAt: Date;

  /**  */
  to: UserModel[];

  /**  */
  from: AllFromTypes;
}

export interface UserModel {
  /**  */
  id: string;

  /**  */
  email: string;

  /**  */
  createdAt: Date;

  /**  */
  updatedAt: Date;

  /**  */
  sent: SentMailModel[];

  /**  */
  inbox: MailModel[];
}

export interface SentMailModel {
  /**  */
  id: number;

  /**  */
  user: UserModel;

  /**  */
  userId: string;

  /**  */
  mail: MailModel;

  /**  */
  mailId: string;
}
export type AllFromTypes = SentMailModel;
