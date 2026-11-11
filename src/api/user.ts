import { apiHttp } from '@/http';
import type { User } from '@/types/common';

export interface LoginParams {
  mobile: string;
  password: string;
}

/** 登录，返回 token */
export const login = (params: LoginParams) =>
  apiHttp.get<string>('/public/login', {params});

/** 当前登录用户 */
export const selectUser = () => apiHttp.get<User>('/users/me');
