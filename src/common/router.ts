/**
 * 路由
 * 由 cloud-react-native/src/navigation/index.ts（react-navigation）迁移。
 * uni-app 里路由由 pages.json 声明，这里只做一层薄封装，
 * 让业务代码继续用 Router.navigate('Login', {...}) 的写法。
 *
 * 路径前缀规则：
 * - /pages/...        主包，只放首页
 * - /pkg-<domain>/... 分包，按业务域划分，见 docs/structure-and-naming.md
 * 尚未迁移的页面路径保持规划值，跳转时会 warn，不影响编译。
 */
import type { LoginFrom, RootStacksParams } from '@/types/router'

/** 页面路径表，key 沿用 RN 的 route name */
export const Routes: Record<keyof RootStacksParams, string> = {
  // 登录页放在功能分包
  Login: '/pkg-auth/login/index',

  // 分包：钱包
  Wallets: '/pkg-wallet/list/index',
  WalletDetail: '/pkg-wallet/detail/index',
  EditWallet: '/pkg-wallet/edit/index',

  // 分包：笔记
  Posts: '/pkg-post/list/index',
  PostDetail: '/pkg-post/detail/index',
  EditPost: '/pkg-post/edit/index',
  SearchPosts: '/pkg-post/search/index',
  // 分类（/categories 只被笔记用，所以放 pkg-post，不放 pkg-media）
  EditCategory: '/pkg-post/edit-category/index',

  // 分包：媒体
  Media: '/pkg-media/list/index',
  SearchMedia: '/pkg-media/search/index',
  EditMedia: '/pkg-media/edit/index',

  // 分包：纪念日（独立业务域，不挂 pkg-media）
  Anniversaries: '/pkg-anniversary/list/index',
  EditAnniversary: '/pkg-anniversary/edit/index',
  ChooseActor: '/pkg-media/choose-actor/index',
  EditActor: '/pkg-media/edit-actor/index',

  // 分包：相亲
  // 列表页在 RN 里是 BottomTabs 的一个 tab（不是从别的页面跳进去的），
  // 迁到 uni 后由首页功能入口面板进入，所以这里补一条 DatingList。
  DatingList: '/pkg-dating/list/index',
  DatingDetail: '/pkg-dating/detail/index',
  EditDating: '/pkg-dating/edit/index',
  EditDatingProgress: '/pkg-dating/edit-progress/index',

  // 分包：投资记录（原「投资组合 -> 每周记录」两层已砍掉组合层）
  PortfolioRecords: '/pkg-portfolio/records/index',
  EditPortfolioRecord: '/pkg-portfolio/edit-record/index',

  // 分包：行情
  SectorStocks: '/pkg-market/sector-stocks/index',
  ChooseGlobal: '/pkg-market/choose-global/index',
  ChooseStock: '/pkg-market/choose-stock/index',
  BoomBoards: '/pkg-market/boom-boards/index',
  EditMsnWeights: '/pkg-market/edit-msn-weights/index',
  MarketSettings: '/pkg-settings/settings/index',

  // 分包：我的
  MyEtf: '/pkg-my/etf/index',
  MyCared: '/pkg-my/cared/index',
  SecretSettings: '/pkg-my/secret-settings/index',

  // 分包：保皇记牌器
  Baohuang: '/pkg-duole/baohuang/index',

  // 分包：节目收藏
  ProgramList: '/pkg-program/list/index',
  ProgramDetail: '/pkg-program/detail/index',
  EditProgramSeries: '/pkg-program/edit-series/index',
  EditProgramEpisode: '/pkg-program/edit-episode/index',

  // 分包：通用
  Webviewer: '/pkg-misc/webviewer/index',
  PreviewVideo: '/pkg-misc/preview-video/index',
  PreviewMarkdown: '/pkg-misc/preview-markdown/index',
  ValuationCalculator: '/pkg-misc/valuation/index',
  IntradayReturns: '/pkg-misc/intraday/index',
  RebalanceCalculator: '/pkg-misc/rebalancer/index',

  // 分包：检测升级（codepush 热更新详情；原首页用户条入口，已移到设置页）
  CodepushCheck: '/pkg-codepush/check/index',

  // 分包：Twitter 博主收藏夹（无独立详情页）
  TwitterList: '/pkg-twitter/list/index',
  EditTwitter: '/pkg-twitter/edit/index',

  // 分包：关于她（小事记，走 /girl-notes）
  GirlfriendList: '/pkg-girlfriend/list/index',
  EditGirlfriendNote: '/pkg-girlfriend/edit/index',

  // 分包：情侣空间（首页宫格入口，纯本地 Pinia 数据，不接后端）
  LoveSettings: '/pkg-love/settings/index',
  LoveAnniversaries: '/pkg-love/anniversary/index',
  LoveChecklist: '/pkg-love/checklist/index',
  LoveDiaries: '/pkg-love/diary/index',
  EditLoveDiary: '/pkg-love/diary/edit',
  LoveCheckin: '/pkg-love/checkin/index'
} as Record<keyof RootStacksParams, string>

const stringifyParams = (params?: Record<string, any>) => {
  if (!params) return ''
  const keys = Object.keys(params).filter(
    k => params[k] !== undefined && params[k] !== null
  )
  if (!keys.length) return ''
  return (
    '?' +
    keys
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')
  )
}

export class Router {
  static goHome() {
    uni.reLaunch({ url: '/pages/home/index' })
  }

  /** 跳转（保留当前页） */
  static navigate<T extends keyof RootStacksParams>(
    name: T,
    params?: RootStacksParams[T]
  ) {
    const path = Routes[name]
    if (!path) {
      console.warn('[Router] 未注册的路由:', name)
      return
    }
    uni.navigateTo({ url: path + stringifyParams(params as any) })
  }

  /** 重定向（关闭当前页） */
  static replace<T extends keyof RootStacksParams>(
    name: T,
    params?: RootStacksParams[T]
  ) {
    const path = Routes[name]
    if (!path) {
      console.warn('[Router] 未注册的路由:', name)
      return
    }
    uni.redirectTo({ url: path + stringifyParams(params as any) })
  }

  /**
   * 返回上一页
   * 已在栈底时不再调 navigateBack —— App 端会触发「再按一次退出应用」，
   * 登录页这类启动页调用它就会表现为「点完按钮提示退出」。
   */
  static back(delta = 1) {
    const stack = getCurrentPages()
    if (stack.length <= delta) {
      uni.reLaunch({ url: '/pages/home/index' })
      return
    }
    uni.navigateBack({ delta })
  }

  /**
   * 跳登录页
   * 用 reLaunch 而非 navigate：登录页是启动页，若用 navigate，
   * 用户在登录页按返回会退回原页面，原页面的登录校验又会把他推回登录页，形成死循环。
   */
  static goLogin(from: LoginFrom = 'Data') {
    uni.reLaunch({ url: Routes.Login + stringifyParams({ from }) })
  }
}
