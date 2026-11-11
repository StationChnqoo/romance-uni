/**
 * 多乐小游戏 - 设置项 + 牌局状态
 *
 * 对应 RN `cn.xiaopacai.duole` 的 useCaches（zustand + MMKV）里的游戏数据。
 * 目前只搬保皇用到的（RN 里在「我的 → 游戏设置 / 保皇」分组下）：
 *   - baohuangArea     区域玩法：wf 潍坊保皇（40 张）/ fk 疯狂保皇（30 张）
 *   - keyboardFeedback 按键反馈（震动效果），默认开
 *   - baohuangGame     当前牌局（四家牌面 + 录入位），每次变化即持久化
 *
 * 写法与 stores/user.ts 一致：Vue3 setup 风格、ref 直接赋值（store.xxx = v），
 * 整包 persist 到 uniStorage（跨端：H5 localStorage / App SQLite / 小程序 storage）。
 * ★ 项目口径：要缓存就走 store + persist，页面里不许手写 uni.setStorageSync。
 * 以后够级等游戏再加设置，直接往这个 store 里补字段即可（一个游戏一组）。
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BaohuangGame } from '@/pkg-duole/types'
import { uniStorage } from '@/storage/uniStorage'

/** 保皇区域玩法：潍坊 / 疯狂 */
export type BaohuangArea = 'wf' | 'fk'

/**
 * 各区域的总牌数（照搬 RN 的 `{ wf: 40, fk: 30 }[gameArea]`）。
 * 「剩余张数」= 总数 − 进贡 + 吃贡 − 已出，总数换了整桌的剩余都会跟着变。
 */
export const BAOHUANG_SUM: Record<BaohuangArea, number> = { wf: 40, fk: 30 }

/** 四家座位名，索引与牌桌位置一一对应（第一行 上联 / 下联，第二行 上家 / 下家） */
const BAOHUANG_NAMES = ['上联', '上家', '下家', '下联']

/**
 * 新建一局空牌：四家都是空槽，录入位默认落在「上联的出牌记录」。
 * 首次进页面时初始化，点「重置」/ 下拉刷新时整体换一局新的。
 */
export function createBaohuangGame(): BaohuangGame {
  return {
    currentPlayerIndex: 0,
    players: BAOHUANG_NAMES.map((name, id) => ({
      id,
      name,
      /* 三个槽位：[进贡, 吃贡, 出牌记录]，默认录入出牌记录 */
      cards: ['', '', ''],
      currentCardIndex: 2
    }))
  }
}

/**
 * 旧版（2026-10-16 前）牌面里混着两套旧编码：
 *  - 动作键写的是 'D.点' / 'S.烧' 这类**带字母的完整标签**（SoftKeyboard 的 keys()
 *    把 value 取成了整个 label），后果：回显带字母小数点、删除一次只删掉尾巴的汉字、
 *    进贡 / 吃贡按 3 字符算张数；
 *  - 大王 / 小王 / 鹰 写的是单字母编码 D / X / Y，回显带字母。
 * 现在一律写纯文字，恢复存档时顺手洗掉这些旧编码。
 * 幂等：新数据没有这些串，replace 原样返回。
 */
const LEGACY_CODE_MAP: Record<string, string> = {
  'D.点': '点',
  'S.烧': '烧',
  'M.闷': '闷',
  'L.落': '落',
  'R.让': '让',
  D: '大', // 大王（必须排在 'D.点' 之后匹配，否则会抢先吃掉 D）
  X: '小', // 小王
  Y: '鹰' // 鹰
}
/** 顺序敏感：'D.点' 在前，单字母 D 在后，避免 'D.点' 被拆成 '点' + 残留 */
const LEGACY_CODE_RE = /D\.点|S\.烧|M\.闷|L\.落|R\.让|D|X|Y/g

function migrateLegacyCodes(game: BaohuangGame) {
  game.players.forEach(p => {
    p.cards = p.cards.map(c => c.replace(LEGACY_CODE_RE, m => LEGACY_CODE_MAP[m]))
  })
}

export const useDuoleStore = defineStore(
  'useDuoleStore',
  () => {
    /** 保皇区域玩法，默认潍坊（与 RN 的 initialState 一致） */
    const baohuangArea = ref<BaohuangArea>('wf')
    /** 按键反馈（按键时轻震动），默认开 */
    const keyboardFeedback = ref(true)

    /**
     * 保皇当前牌局（四家牌面 + 当前录入位）。
     *
     * ★ 页面直接读写这个对象，不再自己存本地：pinia 的 $subscribe 是 deep 的，
     *   改 `cards` 里一个字符都会触发 persist → 重进页面 / 重启 App 自动恢复上一次局面。
     *   （对应 RN 的 autoRevertGame，默认开；但不再维护「历史牌局列表」。）
     */
    const baohuangGame = ref<BaohuangGame>(createBaohuangGame())

    /**
     * 重置整桌。整体换一局空牌（换引用，persist 立刻把空局面写回 storage，
     * 上次的存档被覆盖，不会「重置完切回来又回来了」）。
     */
    function resetBaohuangGame() {
      baohuangGame.value = createBaohuangGame()
    }

    return {
      baohuangArea,
      keyboardFeedback,
      baohuangGame,
      resetBaohuangGame
    }
  },
  {
    persist: {
      storage: uniStorage,
      /** 恢复存档后洗掉旧版编码（'S.烧'→'烧'、'D'→'大'），见 migrateLegacyCodes */
      afterRestore: ({ store }) => {
        migrateLegacyCodes((store as unknown as { baohuangGame: BaohuangGame }).baohuangGame)
      }
    }
  }
)
