# romance-uni

> 本项目由 `cloud-uni` 工程整套复制而来（Android 包名 `cn.xiaopacai.romance`），下方调试/离线打包文档沿用原项目记录，仅作脚手架参考。

uni-app（Vue3 + TS + pinia）项目，由 RN 项目 `cloud-react-native` 迁移而来。

- 环境：`src/constants/env.ts` 的 `PRESETS` 按 `APP_ENV` 决定（API / codepush 地址与 appKey 唯一来源，不要在业务里读 `import.meta.env`）。
- 页面/分包：`src/pages/`（主包）+ `src/pkg-xxx/`（分包），改页面要同步 `pages.json` + `src/types/router.ts` + `src/common/router.ts`。
- 组件：弹层 / 按钮 / 表单一律 wot（`wd-popup` / `wd-button` / `wd-form`），uni-ui 已全量移除。
- 常用命令：`npm run dev:app`（HBuilderX 运行同款）、`npm run build:app`、`npm run type-check`。

---

## 热更新（codepush / wgt）调试技巧

### 一、怎么反复弹出升级弹窗，又不真的把手机上的代码换掉

调试弹窗 UI / 下载进度 / 安装重启时，最烦的是「弹一次、装上就不弹了」。用「**wgt 打 n、console 填 n+1**」的办法可以无限复现：

1. **记下手机当前的 wgt 版本号 n**
   - 首页浮层底部有「当前 wgt 版本 vN」；
   - 或去「检测升级」页（`pkg-codepush/check`）看本机信息那一栏。
2. **打 wgt 包时，`manifest.json` 的 `versionCode` 填 n**（和手机上现在跑的**一致**）
   - 这样即使装上，`plus.runtime.getProperty` 读到的还是 n —— **代码内容等于没换**，可以反复测。
3. **codepush 管理台（console）发布这条 wgt 时，版本号填 n+1**
   - 客户端上报 `wgtVersionCode=n` < 服务端最新 `n+1` → 判定 `optional` / `force` → 弹窗。
4. 于是每次冷启动 / 进首页都会出弹窗，点「立即更新」会走完整的下载 → 安装 → 重启流程，
   装完重启后版本仍是 n → **下次还能弹**。
5. **测完一定去 console 删掉那条 n+1 的版本**，避免别的机器 / 灰度设备误命中这个假版本。

### 二、为什么这样能成立

- 服务端只比大小：客户端上报的 `wgtVersionCode` < console 上最新版本的 `versionCode` 就返回更新
  （接口 `POST /v1/update/check`，见 `src/api/codepush.ts`）。**它不校验 wgt 包里 manifest 的版本**。
- 客户端安装时 `plus.runtime.install(..., { force: true })`，**跳过 uni 自带的版本号校验**
  （见 `src/composables/useUpdate.ts` 的 `install()`，注释里有完整原因：离线壳的
  `plus.runtime.versionCode` 是整包 APK 版本，远高于 wgt 版本，不 force 必报 -1205）。
  → 所以「包里写 n、台上写 n+1」这种不一致也不会被拦。
- 结论：**manifest 的 versionCode 决定「装完之后手机是多少版」，console 的版本号决定「要不要弹」**，
  两者解耦，正是这个技巧的抓手。

### 三、什么时候不能这么干

- 要验证「更新内容真的生效」（新代码 / 新资源）时，必须让 wgt 包自身的 `versionCode` 真的比手机上大
  （打 n+1 并填 n+1），否则装上去还是旧代码。
- 只想验证弹窗样式 / 交互 → 用上面的「n / n+1」组合。

### 四、相关代码与自查入口

| 东西 | 位置 |
| --- | --- |
| 检查 + 下载 + 安装逻辑（hook） | `src/composables/useUpdate.ts` |
| 升级弹窗 UI | `src/components/UpdateModal.vue` |
| 检测升级页（手动触发、看 `type` / `trace` / 本机版本 / 判定链路） | `src/pkg-codepush/check/index.vue` |
| 检查接口 | `src/api/codepush.ts`（`/v1/update/check`） |
| 环境地址 / appKey | `src/constants/env.ts`（`CODEPUSH_BASE_URL` / `CODEPUSH_APP_KEY`） |
| 头图与强调色 | `src/constants/codepush.ts` |

补充说明：

- **自动检查挂在首页 `onShow`**（`src/pages/home/index.vue`，`autoChecked` 保证只跑一次，切 tab 回来不重复请求）。
  放在 `App.vue` 是无效的 —— App 端 App.vue 的模板不渲染，弹窗永远创建不出来。
- **非 App 平台（H5 / 小程序）不会检查**：`useUpdate.check()` 直接返回 `'skipped'`，wgt 只存在于 App 端。
- 手动触发 / 看判定链路：进「检测升级」页，里面有 appKey、platform、wgt 版本、原生壳版本、deviceId 与服务端 trace。
- 弹窗不出来时先看这两条：① 是不是非 App 平台；② console 上最新 `versionCode` 是否真的 > 手机上的 n
  （比如刚把 manifest 版本号改大了又重打过包，手机已是最新 → 服务端返回 `none`，看起来像「没检查」）。
