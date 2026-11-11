/**
 * 路由参数表
 * 由 cloud-react-native/src/screens/index.tsx 的 RootStacksParams 迁移。
 * BottomTabs / App / Test 属于 RN 专有结构，uni-app 中不需要，已移除。
 */
/** 兼容旧入口链接携带的来源标记。 */
export type LoginFrom = 'Data' | 'My';

export type RootStacksParams = {
  Login: { from?: LoginFrom } | undefined;
  EditWallet: { id?: string } | undefined;
  WalletDetail: { id: string };
  Wallets: undefined;
  MyEtf: undefined;
  EditPost: { id?: string } | undefined;
  PostDetail: { id: string };
  Posts: undefined;
  SearchPosts: undefined;
  Media: undefined;
  SearchMedia: { keyword?: string } | undefined;
  EditMedia: { id?: string } | undefined;
  Anniversaries: undefined;
  EditAnniversary: { id?: string } | undefined;
  ChooseActor: { selectedIds?: string } | undefined;
  EditActor: { id?: string } | undefined;
  EditCategory: { id: string };
  /** injectedJavaScript 已移除：改走 uni 内置 <web-view>，不支持注入 JS */
  Webviewer: { title: string; url: string };
  SectorStocks: { code: string; name: string };
  ChooseGlobal: undefined;
  ChooseStock: { id?: string };
  BoomBoards: undefined;
  /** 投资记录列表：组合层已下线，记录直接平铺（入口在首页宫格） */
  PortfolioRecords: undefined;
  EditPortfolioRecord: { id?: string } | undefined;
  EditMsnWeights: undefined;
  SecretSettings: undefined;
  MarketSettings: undefined;
  ValuationCalculator: undefined;
  IntradayReturns: undefined;
  /** 再平衡计算器（全天候组合 5/25 规则；纯本地计算，入口在首页宫格末尾） */
  RebalanceCalculator: undefined;
  /** 保皇记牌器（独立业务域，纯本地工具，不需要登录） */
  Baohuang: undefined;
  /** 节目收藏（后端 program_series / program_episode） */
  ProgramList: undefined;
  /** 节目详情（内置播放器 + 分集网格），seriesId 必填、episodeId 可选（不传默认第一集） */
  ProgramDetail: { seriesId: string; episodeId?: string } | undefined;
  EditProgramSeries: { id?: string } | undefined;
  EditProgramEpisode: { seriesId: string; id?: string } | undefined;
  MyCared: undefined;
  /** 通用视频播放页（整页只有一个播放器；poster/title 可选，只影响首帧图和自动播） */
  PreviewVideo: { url: string; poster?: string; title?: string };
  /** 不传参：markdown 原文经 common/pageParams 的内存单例中转（长文放不进 URL，见该文件注释） */
  PreviewMarkdown: undefined;
  /** 相亲：列表页在 RN 是 BottomTabs 的 tab，uni 里由首页入口面板进入，不传参 */
  DatingList: undefined;
  DatingDetail: { id: string };
  EditDating: { id?: string } | undefined;
  EditDatingProgress: { datingId: string; id?: string };
  /** 检测升级（codepush 热更新详情页；入口在设置页） */
  CodepushCheck: undefined;
  /** Twitter 博主收藏夹（后端 twitter_blogger；无独立详情页，整卡点击进编辑） */
  TwitterList: undefined;
  EditTwitter: { id?: string } | undefined;
  /** 关于她小事记（/girl-notes；编辑只传 id） */
  GirlfriendList: undefined;
  EditGirlfriendNote: { id?: string } | undefined;
  /** 情侣空间：纯本地 Pinia，入口在首页宫格 */
  LoveSettings: undefined;
  LoveAnniversaries: undefined;
  LoveChecklist: undefined;
  LoveDiaries: undefined;
  EditLoveDiary: { id?: string } | undefined;
  LoveCheckin: undefined;
};
