/**
 * 通用类型定义
 * 包含分页、壁纸、足球、彩票、用户等通用数据结构
 *
 * 说明：早期用 zod 的 schema 定义（顺带当默认值工厂用），2026-10-03 已移除 zod，
 * 改成「interface + createXxx() 工厂」。
 */

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
}

/** 后端分页返回结构，各列表接口共用（后端统一返回 CommonPage，总数字段名为 totalItems） */
export interface Page<T> {
  records: T[];
  currentPage: number;
  hasNextPage: boolean;
  total?: number;
  totalItems?: number;
}

export interface CommonOptions {
  label: string;
  value: number;
}

export interface BingWallpaper {
  startdate: string;
  enddate: string;
  url: string;
  urlbase: string;
  copyright: string;
  copyrightlink: string;
  title: string;
  quiz: string;
  wp: boolean;
  hsh: string;
}

export interface FootballMatch {
  a: string;
  allAwayTeam: string;
  allHomeTeam: string;
  awayTeam: string;
  awayTeamId: number;
  bettingSingle: number;
  d: string;
  goalLine: string;
  h: string;
  homeTeam: string;
  homeTeamId: number;
  leagueBackColor: string;
  leagueId: number;
  leagueName: string;
  leagueNameAbbr: string;
  matchDate: string;
  matchId: number;
  matchNum: string;
  matchNumStr: string;
  matchResultStatus: string;
  poolStatus: string;
  resultStatus: string;
  sectionsNo1: string;
  sectionsNo999: string;
  winFlag: string;
}

export interface Pailie3And5 {
  lotteryDrawResult: string;
  lotteryDrawTime: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  mobile: string;
  email: string;
  avatar: string;
  updateAt: string;
  createAt: string;
}

export const createUser = (): User => ({
  id: '',
  name: '',
  password: '',
  mobile: '',
  email: '',
  avatar: '',
  updateAt: '',
  createAt: '',
});
