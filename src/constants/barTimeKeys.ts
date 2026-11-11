export const barTimeKeys = [
  {key: 'return1Week', label: '近1周', value: ''},
  {key: 'return1Month', label: '近1月', value: ''},
  {key: 'return3Month', label: '近3月', value: ''},
  // {key: 'return6Month', label: '近半年', value: ''},
  {key: 'return1Year', label: '近一年', value: ''},
  {key: 'returnYTD', label: '今年来', value: ''},
] as const;

export type BarTimeKey = (typeof barTimeKeys)[number];
