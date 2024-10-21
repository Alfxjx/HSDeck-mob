import { clsx, type ClassValue } from "clsx"
import { FormatType } from "deckstrings";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWeixinBrowser(){
  const ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

export function parseHero(hero: string | undefined) {
  if (!hero) return '';
  /* INVALID = 0
    DEATHKNIGHT = 1
    DRUID = 2
    HUNTER = 3
    MAGE = 4
    PALADIN = 5
    PRIEST = 6
    ROGUE = 7
    SHAMAN = 8
    WARLOCK = 9
    WARRIOR = 10
    DREAM = 11
    NEUTRAL = 12
    WHIZBANG = 13
    DEMONHUNTER = 14
  */
  switch (hero) {
    case 'DEATHKNIGHT':
      return '死亡骑士';
    case 'DRUID':
      return '德鲁伊';
    case 'HUNTER':
      return '猎人';
    case 'MAGE':
      return '法师';
    case 'PALADIN':
      return '圣骑士';
    case 'PRIEST':
      return '牧师';
    case 'ROGUE':
      return '潜行者';
    case 'SHAMAN':
      return '萨满';
    case 'WARLOCK':
      return '术士';
    case 'WARRIOR':
      return '战士';
    case 'DEMONHUNTER':
      return '恶魔猎手';
    default:
      return '';
  }

}

export function parseFormat(format: FormatType | undefined) {
  if (!format) return '';
  /* FT_UNKNOWN = 0
  FT_WILD = 1
  FT_STANDARD = 2
  FT_CLASSIC = 3
  FT_TWIST = 4 */
  switch (format) {
    case 1:
      return '未知';
    case 2:
      return '标准模式';
    case 3:
      return '经典模式';
    case 4:
      return '幻变模式';
    default:
      return '';
  }
}