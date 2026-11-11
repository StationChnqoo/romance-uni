/**
 * z-paging 类型接入
 *
 * z-paging 的 package.json 没有 `types` / `typings` 字段，类型文件放在 `types/` 子目录下，
 * 因此不能在 tsconfig 的 `types` 数组里直接写 "z-paging"（会报 TS2688 Cannot find type definition file）。
 * 这里显式引入它的类型入口，作用有两个：
 *   1. 注册 `<z-paging>` 等全局组件，模板里才有 props / 方法提示；
 *   2. 补充 `uni.$zp` 全局配置的类型。
 *
 * 注意：这是纯类型文件，不会进入运行时产物，无需在业务代码里 import。
 */
import 'z-paging/types/index'
