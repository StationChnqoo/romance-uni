/**
 * 基础能力：对象存储删除、文件上传、必应壁纸
 */
import { apiHttp, createHttp } from '@/http';
import { ENV } from '@/constants/env';
import type { PicGoSrc } from '@/types/media';
import { renameToLowercase } from '@/utils/file';

const BING = 'cdn.xiaopacai.cn/';
const COS = '.com/';

/** 删除 COS 上的文件，支持原始链接与 CDN 链接 */
export const deleteCosFile = (fileUrl: string) => {
  let key = '';
  const cosIdx = fileUrl.indexOf(COS);
  const cdnIdx = fileUrl.indexOf(BING);

  if (cosIdx !== -1) {
    key = fileUrl.slice(cosIdx + COS.length);
  } else if (cdnIdx !== -1) {
    key = fileUrl.slice(cdnIdx + BING.length);
  } else {
    return Promise.resolve('');
  }

  return apiHttp.delete<string>('/upload', {
    params: {bucket: 'cloud-1252363101', key},
  });
};

/**
 * 上传文件到 SpringBoot 后端
 * @param file uni.chooseImage / chooseVideo 返回的文件项 {path | uri}
 */
export const upload2SpringBoot = (file: any) => {
  const filePath = file?.path || file?.uri;
  if (!filePath) {
    return Promise.reject(new Error('upload2SpringBoot: 缺少文件路径'));
  }
  return apiHttp.upload<any>('/demo/upload.do', {filePath});
};

/**
 * PicGo 图床上传（笔记附件）
 * RN 的 usePicGoUpload：POST /upload/cloud，formData(file + env)，响应 data 即 PicGoSrc。
 * @param filePath uni.chooseImage / chooseVideo 返回的临时路径
 */
export const uploadCloud = async (filePath: string) => {
  // 上传前把本地临时文件名转全小写（iOS 截图/视频是大写后缀 .PNG/.MOV），
  // 避免后端按原始名落库导致 objectKey / CDN URL 大小写不一。
  const normalized = await renameToLowercase(filePath)
  return apiHttp.upload<PicGoSrc>('/upload/cloud', {
    filePath: normalized,
    name: 'file',
    formData: {env: ENV.APP_ENV},
  })
}

/** 必应壁纸：独立数据源，不做 R 解包 */
const bingHttp = createHttp({baseURL: 'https://www.bing.com', unwrap: false});

export const bingWallpaper = (n: number) =>
  bingHttp.get<any>('/HPImageArchive.aspx', {
    params: {format: 'js', idx: 0, n, mkt: 'zh-CN'},
  });
