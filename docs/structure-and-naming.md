# romance-uni 结构与命名规范

本文件是项目结构、命名与样式的唯一约定来源。新增代码按下表执行，历史代码已按此规范统一。

## 一、命名规范（分层混用）

不同性质的文件采用不同风格，目的是让「组件 / 模块 / 资源」一眼可辨，而不是强行统一成一种。

| 对象 | 风格 | 示例 |
| --- | --- | --- |
| 目录 | kebab-case | `api/third/`、`static/images/tabbar/` |
| 页面目录 | kebab-case | `pages/my/`、`pages/data/` |
| 单文件组件 `.vue` | PascalCase | `Button.vue`、`AllWeatherPortfolios.vue` |
| 页面入口 | `index.vue` | `pages/my/index.vue` |
| 普通 `.ts` 模块 | camelCase | `router.ts`、`caches.ts`、`barTimeKeys.ts` |
| 类型定义 | camelCase | `types/wallet.ts`、`types/common.ts` |
| 静态资源 | kebab-case | `menu-pig.png`、`arrow-left.png` |
| 字体文件 | 保留官方原名 | `DingTalk-JinBuTi.ttf` |

**禁止**：

- 单字母或无语义文件名（历史遗留的 `c.ts` / `u.ts` 已分别归入 `constants/wallet.ts`、`constants/chart.ts` 与 `utils/index.ts`）
- 静态资源使用 snake_case 或驼峰（历史遗留的 `market_checked.png`、`backReason_tip.png` 已清理或改名）
- 目录名混用下划线

## 二、样式（SCSS 嵌套 + BEM）

**统一用 SCSS 嵌套写 BEM，不平铺。** 所有 `<style>` 块都是 `lang="scss" scoped`。

```scss
.card {
  padding: 24rpx;

  &__head {
    display: flex;
  }
  &__title {
    font-size: 32rpx;
  }
  &__head--active {
    /* 修饰符直接接在元素名后 */
  }
}
```

### 命名

- Block `.card`、Element `&__head`、Modifier `&--lg`、状态 `&_hover`（对应 RN 的 `activeOpacity`）。
- 历史遗留的 `&__avatar--empty`、`&__item_hover` 这类「修饰符直接接在元素后」的写法保留，
  不拆成 `&__avatar { &--empty {} }`——两者编译结果完全相同，二次拆分没有收益。

### 约束

1. **嵌套不超过 2 层**（Block → Element）。BEM 的命名已经表达了归属关系，
   再叠加层级只会抬高选择器特异性、增加耦合，那才是反模式。
2. **规则前的注释要放进嵌套规则体内部**。若写在嵌套规则之前，sass 会把它归给父块，
   额外产出一个只含注释的空规则（如 `.wallets { /* c */ }`），编译产物会多出一条空规则。
3. **不嵌套标签选择器**（如 `.card .row .label`）。需要穿透子组件改样式时用 `:deep()`。
5. `App.vue` 的全局样式（`page` / `body` / `uni-page-body` / `@media`）不用 BEM，保持平铺。
6. 组件是**片段**（根元素不是自己的 block，比如 `Profile.vue` / `Settings.vue` / `Tools.vue` 都挂在 `<Card>` 下）时，
   父块仅作**命名空间**存在，`.profile {}` 里可能一条声明都没有。这是允许的：
   `&__gap` 是字符串拼接、生成的是 `.profile__gap`，不是后代选择器，命中不受影响。
7. 尺寸用 `rpx`（RN 的 dp ×2，44dp → 88rpx）；**不要在 `<style>` 里用 `v-bind()`**，小程序端不可靠。

### 为什么不是平铺 BEM

两者**编译产物完全一致**——本次重构逐文件用 sass 编译对比验证过（21 个文件产物相同），
并用构建产物做了端到端复核（`dist/build/app` 下的页面 CSS 仅 `scoped` 哈希变化，选择器与声明一字不差）。
所以这是纯粹的书写风格选择，理由是嵌套把同一个 Block 的样式收在一起，改组件不用在文件里上下翻找。
Vue / uni-app 社区的通行做法同样是 `scoped + lang="scss"` 的嵌套 BEM。

要注意的是，`&__element` 拼出来的仍然是**扁平类名**（`.card__head`），
并没有依赖后代选择器，所以小程序端的样式隔离、`scoped` 的表现都和平铺写法一致，没有兼容性代价。

## 三、目录结构

```
src/
├── api/            接口层，按业务域拆分，业务侧唯一入口
│   ├── third/      第三方数据源（东方财富、MSN）
│   └── index.ts    统一出口
├── http/           传输层：uni.request 封装，只被 api 层依赖
├── components/     全局通用组件
├── constants/      静态常量与枚举
├── pages/          主包页面：启动页 + tabBar 页
├── pkg-<domain>/   分包页面，按业务域划分（见「六、分包」）
├── stores/         pinia store
├── types/          TypeScript 类型
├── utils/          纯函数工具
└── common/         跨层基础设施（如路由封装）
```

依赖方向单向：`pages / stores → api → http`，`http` 不反向依赖业务模块。

## 四、网络请求

### 分层职责

- `http/`：只管传输。拼 url、带 token、解包 `R<T>`、错误提示、401 处理。
- `api/`：只管业务语义。声明路径与出入参类型，不碰 request 细节。

业务代码只写 `import { selectWallets } from '@/api'`，不感知 baseURL 与实例。

### 返回值契约

- 业务接口（`unwrap: true`）：返回 `R.data`，业务码失败直接抛 `HttpError` 并 toast。
- 第三方数据源（`unwrap: false`）：原样返回响应体。

### 关键约束

1. **baseURL 创建后不可变**。第三方数据源按域名各建一个实例，禁止运行时改写。
2. **单次请求的 header 只在该次生效**，不写回实例默认值。
3. token 由 `setTokenGetter` 注册、延迟读取，禁止用 `require` 动态取 store。
4. 新增第三方数据源：在 `api/third/` 下新建模块，用 `createHttp({ baseURL, unwrap: false })` 自建实例。

### 成功业务码

默认 `successCodes = [0, 200]`，登录失效码 `[401]`。若后端约定不同，只改 `http/request.ts` 的默认值，不要在业务侧绕过。

## 五、静态资源

- 只保留被引用资源；未引用的移入 `.unused-assets/`（已加入 `.gitignore`，不进包）。
- 主包体积敏感：新增页面私有资源放各自分包，不要堆在 `src/static`。

## 六、页面导航栏

**一律使用 uni-app 自带标题栏，不使用自定义 ToolBar 组件**（该组件已从 `src/components/` 删除）。

- 标题写在 `pages.json` 的 `navigationBarTitleText`。
- `globalStyle` 现在是 `navigationStyle: custom`（历史页面 data / my 自绘头部），
  因此**新页面必须在自己的 style 里显式写 `"navigationStyle": "default"`**，否则会沿用 custom 而没有标题栏。
- 标题需要随运行时变化（如「新增钱包 / 编辑钱包」）时，在 `onLoad` 里调
  `uni.setNavigationBarTitle({ title })`。
- 返回交给系统返回键，页面内不再画返回箭头，也不需要状态栏占位 view。

日期、时间等选择统一用 uni-app 自带 `<picker>`，不迁移 RN 的自定义 `DateTimePicker`。

## 七、分包

### 现状

主包只放**启动页与 tabBar 页**，其余全部按业务域拆到 `pkg-<domain>/` 分包：

| 分包 root | 业务域 | 页面 | RN Screen | 状态 |
| --- | --- | --- | --- | --- |
| —（主包） | 启动 / tab | `pages/login`、`pages/data`、`pages/my` | Login / Data / My | 已迁移 |
| `pkg-wallet` | 钱包 | `list` / `detail` / `edit` | Wallets / WalletDetail / EditWallet | 已迁移 |
| `pkg-post` | 笔记 | `list` / `detail` / `edit` / `search` | Posts / PostDetail / EditPost / SearchPosts | 待迁移 |
| `pkg-media` | 媒体 | `list` / `search` / `edit` / `choose-actor` / `edit-actor` | Media / SearchMedia / EditMedia / ChooseActor / EditActor | 待迁移 |
| `pkg-anniversary` | 纪念日 | `list` / `edit` | Anniversaries / EditAnniversary | 已迁移 |
| `pkg-dating` | 相亲 | `list` / `detail` / `edit` / `edit-progress` | DatingList / DatingDetail / EditDating / EditDatingProgress | 待迁移 |
| `pkg-portfolio` | 投资组合 | `edit` / `records` / `edit-record` / `analysis` | EditPortfolio / PortfolioRecords / EditPortfolioRecord / PortfolioAnalysis | 待迁移 |
| `pkg-market` | 行情 | `sector-stocks` / `choose-global` / `choose-stock` / `boom-boards` / `msn-news` / `edit-msn-weights` | SectorStocks / ChooseGlobal / ChooseStock / BoomBoards / MsnNews / EditMsnWeights | 待迁移 |
| `pkg-my` | 我的 | `etf` / `cared` / `secret-settings` | MyEtf / MyCared / SecretSettings | 待迁移 |
| `pkg-misc` | 通用 | `webviewer` / `preview-video` / `preview-markdown` / `valuation` | Webviewer / PreviewVideo / PreviewMarkdown / ValuationCalculator | 待迁移 |
| `pkg-duole` | 多乐小游戏 | `baohuang`（以后够级等游戏继续加子目录） | Baohuang | 已迁移 |

上表同时是后续迁移的落地依据：`common/router.ts` 的 `Routes` 已按此表填好路径，页面建好后即可跳转。

### 约束

1. **tabBar 页必须在主包**，因此 `data` / `my` 不能拆走。
2. **分包之间 JS / 组件不互通**。跨域复用的组件一律放 `src/components/`（主包），不要放分包内。
3. 分包可引用主包的组件、工具与 `src/static`；**主包禁止反向引用分包内的任何文件**。
4. 分包私有静态资源放 `src/pkg-<domain>/static/`，不要堆进 `src/static`（会进主包）。
5. `preloadRule` 只给高频入口配，目前只有 `pages/data` 预下载 `pkg-wallet`（财富页点钱包会立刻进）。

### 新增一个分包页面的三步

1. 在 `src/pkg-<domain>/<page>/index.vue` 建页面；
2. 在 `pages.json` 对应 `subPackages` 项里注册（含 `navigationStyle: default`）；
3. `common/router.ts` 的 `Routes` 补路径（规划值已预填，确认一致即可）。

## 八、列表与分页（z-paging）

**项目里所有分页列表一律用 `z-paging`，不自己维护 `currentPage` / `hasNextPage` / `loading`，
也不用 `onPullDownRefresh` + `onReachBottom` 那一套。**

### 接入方式

依赖：`z-paging`（npm）。组件通过 easycom 注册，页面里直接写 `<z-paging>` 即可，无需 import。
easycom 规则在 `pages.json` 的 `easycom.custom`，**注意规则不能写成通配的 `^z-paging(.*)`**：
z-paging 自己的内部子组件（`z-paging-refresh`、`z-paging-load-more`）并不在
`components/z-paging-*/` 下，而是在 `components/z-paging/components/` 里，
通配规则会把它们映射到不存在的路径，构建报 `Rollup failed to resolve import`。规则要逐条写死。

类型：z-paging 的 `package.json` 没有 `types` 字段，**不能**在 `tsconfig.json` 的 `types`
数组里写 `"z-paging"`（报 TS2688）。改用 `src/types/z-paging.d.ts` 里的
`import 'z-paging/types/index'` 引入，这样模板里有 props 提示，`uni.$zp` 也有类型。

### 两种布局模式

| 场景 | 写法 | 说明 |
| --- | --- | --- |
| 独立页面 | `fixed`（默认 true） | z-paging 自己 `position: fixed` 占满视口，父容器不用给高度 |
| 嵌在页面某块区域 | `:fixed="false"` | 走 `height: 100%`，**父容器必须给出确定高度**（如 `flex: 1` + `overflow: hidden`） |

### 写法约定

- 回调统一用 `@query="queryList"`，在里面请求当前页，然后
  `pagingRef.value?.completeByNoMore(records, !hasNextPage)`；
  请求失败用 `pagingRef.value?.complete(false)`。
  **只传当前页数据**，累加由 z-paging 内部完成，不要再手工 `concat`。
- 下拉刷新与上拉加载由 z-paging 负责，因此：
  - `pages.json` 里**不要**给用了 z-paging 的页面开 `enablePullDownRefresh`；
  - 页面里**不要**注册 `onPullDownRefresh` / `onReachBottom`。两套同时存在会互相打架。
- 首次加载由 z-paging 的 `auto` 负责。页面 `onShow` 里如需刷新（例如从详情页返回），
  要用 `inited` 标志跳过第一次，否则会和 `auto` 重复请求一次。
- 空数据用 `#empty` 插槽；固定在顶部不随列表滚动的头部用 `#top` 插槽。
  迁移时注意对应 RN 的 `FlatList` 语义：`ListHeaderComponent` 是**随列表滚动**的，
  应该放默认插槽第一项，不要放进 `#top`；只有 RN 里写在 `FlatList` 外面的才是 `#top`。
- 对外用 `defineExpose({ reload })` 暴露刷新，父页面拿 `ref` 调。

### 现有列表

| 列表 | 组件 | 模式 |
| --- | --- | --- |
| 钱包列表 | `src/components/WalletList.vue` | 两种都支持，`fixed` 由父页传入 |
| 投资组合 | `src/pages/data/components/AllWeatherPortfolios.vue` | 仅内嵌，`:fixed="false"` |

## 九、启动与登录链路

`pages/login/index` 是 `pages[0]`，冷启动先进它。这条链路有三个坑，改动时务必遵守：

1. **登录成功必须 `Router.switchTab()`**，不能用 `back()` / `navigateBack()`。
   登录页是栈底，没有上一页可退，App 端会直接弹「再按一次退出应用」——
   表现就是「点了登录按钮却提示退出 App」。
2. **已登录时自动跳过**：login 的 `onLoad` 检查 `caches.token`，有值直接 `switchTab` 到首页，
   不再展示表单。去哪个 tab 由 `?from=Data|My` 决定，默认 `Data`。
3. **未登录拦截用 `Router.goLogin()`（内部 `reLaunch`）**，不要用 `navigate`。
   用 `navigate` 的话，用户在登录页按返回会退回原页面，原页面的登录校验又把他推回登录页，形成死循环。

`Router.back()` 已内置栈底保护：`getCurrentPages().length <= delta` 时自动转为 `switchTab` 回首页，
业务侧不必各自判断。
