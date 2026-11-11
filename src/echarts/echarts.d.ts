// 用户提供的 echarts 6.1.0 构建产物（UMD 经 esbuild 转 ESM）。
// 全量/精简包均自带所需图表与渲染器，无需单独 echarts.use([])。
// 这里只做类型兜底（实际为运行时 any），避免 vue-tsc 报找不到模块。
declare module '*/echarts.esm.js' {
  const echarts: any
  export default echarts
}
