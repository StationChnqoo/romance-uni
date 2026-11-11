/** 后端统一响应结构。业务接口返回 R 本体，业务数据位于 data。 */
export interface R<T = unknown> {
  code: number;
  msg?: string;
  data: T;
}