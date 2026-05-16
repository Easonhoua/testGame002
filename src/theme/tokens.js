const COLOR_TOKEN_MAP = {
  themewhite: '--color-themewhite',
  themeblack: '--color-themeblack',
  rgbawhite10: '--color-rgbawhite10',
  rgbawhite30: '--color-rgbawhite30',
  rgbawhite50: '--color-rgbawhite50',
  rgbawhite80: '--color-rgbawhite80',
  rgbablack15: '--color-rgbablack15',
  rgbablack30: '--color-rgbablack30',
  rgbablack50: '--color-rgbablack50',
  rgbablack80: '--color-rgbablack80',
  theme: '--color-theme',
  themeLight: '--color-theme-light',
  textcolorone: '--color-themetext',
  textcolorthree: '--color-one',
  two: '--color-two',
  three: '--color-three',
  textcolortwo: '--color-four',
  textcolorsix: '--color-textcolorsix',
  nine: '--color-nine',
  border1: '--color-border1',
  tablebg: '--color-tablebg',
  tablergba: '--color-tablergba',
  tablergba40: '--color-tablergba40',
  tablergba20: '--color-tablergba20',
  tablergba10: '--color-tablergba10',
  gold100: '--color-gold-100',
  gold500: '--color-gold-500',
  headerBg: '--color-header-bg',
  asideBg: '--color-aside-bg',
  bodyBg: '--color-body-bg',
  defaultBg: '--color-default-bg',
  redsmallbg: '--color-drawer-text',
  loginlinear3: '--color-loginlinear-3',
  loginlinear4: '--color-loginlinear-4',
  themecardlinear1: '--color-themecardlinear1',
  themecardlinear2: '--color-themecardlinear2',
  redbglinear1: '--color-linear-9',
  redbglinear2: '--color-linear-10',
  weeklinear1: '--color-linear-11',
  weeklinear2: '--color-linear-12',
  mysteriousgoldlinear1: '--color-linear-18',
  mysteriousgoldlinear2: '--color-linear-19',
  mysteriousgoldlinear5: '--color-linear-22',
  mysteriousgoldlinear6: '--color-linear-23',
  text1: '--color-text-1',
  pwa: '--color-pwa',
  homeranktext: '--color-homeranktext',
  searchbg: '--color-searchbg',
  searchborder: '--color-searchborder',
  faqcolor1: '--color-faqcolor1',
  faqcolor2: '--color-faqcolor2',
  faqcolor3: '--color-faqcolor3',
  faqcolor4: '--color-faqcolor4',
  btnlinar1: '--color-btnlinar1',
  btnlinar2: '--color-btnlinar2',
  btnlinar3: '--color-btnlinar3',
  btnlinar4: '--color-btnlinar4',
  noticelinear1: '--color-noticelinear1',
  noticelinear2: '--color-noticelinear2',
  downloadlinear1: '--color-downloadlinear1',
  downloadlinear2: '--color-downloadlinear2',
  downloadlinear3: '--color-downloadlinear3',
  downloadlinear4: '--color-downloadlinear4',
  minecardbg: '--color-minecardbg',
  richlinar1: '--color-richlinar1',
  richlinar2: '--color-richlinar2',
  minelinear1: '--color-minelinear1',
  minelinear2: '--color-minelinear2',
  defaultborder: '--color-defaultborder',
  morelinear1: '--color-morelinear1',
  morelinear2: '--color-morelinear2',
  btncolor: '--color-btncolor',
  card1: '--color-card1',
  card2: '--color-card2',
  allbtn: '--color-allbtn',
  six: '--color-six',
  cardbg: '--color-cardbg',
  mysteriousgoldtext: '--color-mysteriousgoldtext',
  redpacktext: '--color-redpacktext',
  pddcardtext: '--color-pddcardtext',
  texterror: '--color-texterror',
  themetext0: '--color-themetext0',
  themetext1: '--color-themetext1',
  themetext2: '--color-themetext2',
  themetext3: '--color-themetext3',
  themetext4: '--color-themetext4',
  tablebg2: '--color-tablebg2',
  activitybox1: '--color-activitybox1',
  activitybox2: '--color-activitybox2',
  activityborder1: '--color-activityborder1',
  activityborder2: '--color-activityborder2',
  m4tentext: '--color-m4tentext',
  m4ninetext: '--color-m4ninetext',
  inputcolor1: '--color-inputcolor1',
  inputcolor2: '--color-inputcolor2',
  inputborder: '--color-inputborder',
  tablebg1: '--color-tablebg1',
  btn1_bg: '--color-btn1_bg',
  btn_border: '--color-btn_border',
  thirsmodel1: '--color-thirsmodel1',
  thirsmodel2: '--color-thirsmodel2',
  thirsmodelboder: '--color-thirsmodelboder',
  activitymodel1: '--color-activitymodel1',
  activitymodel2: '--color-activitymodel2',
  logininputcolor1: '--color-logininputcolor1',
  logininputcolor2: '--color-logininputcolor2',
  logininputborder: '--color-logininputborder',
  loginBtncolor: '--color-loginBtncolor',
  loginBg: '--color-loginbg',
}

const COLOR_TOKEN_FALLBACKS = {
  '--color-theme-text': ['themeText', 'textcolorone', 'themewhite'],
}

const VANT_TOKEN_MAP = {
  vanprimary: '--van-primary-color',
  vanplabg: '--van-image-placeholder-background',
  vanlodingicon: '--van-image-loading-icon-color',
  vanerricon: '--van-image-error-icon-color',
  vantabfontsize: '--van-tab-font-size',
  vantabnavbg: '--van-tabs-nav-background',
  vantabtext: '--van-tab-text-color',
  vantabactive: '--van-tab-active-text-color',
  vantabbottombar: '--van-tabs-bottom-bar-color',
}

const setCssToken = (root, cssVariable, value) => {
  if (value !== undefined && value !== null) {
    root.style.setProperty(cssVariable, value)
  }
}

export const applyThemeTokens = (root, colors) => {
  Object.entries(COLOR_TOKEN_MAP).forEach(([colorKey, cssVariable]) => {
    setCssToken(root, cssVariable, colors[colorKey])
  })

  Object.entries(COLOR_TOKEN_FALLBACKS).forEach(([cssVariable, colorKeys]) => {
    const value = colorKeys.map((key) => colors[key]).find((item) => item !== undefined && item !== null)
    setCssToken(root, cssVariable, value)
  })

  Object.entries(VANT_TOKEN_MAP).forEach(([colorKey, cssVariable]) => {
    setCssToken(root, cssVariable, colors[colorKey])
  })
}

export const themeColorTokenMap = COLOR_TOKEN_MAP
export const vantThemeTokenMap = VANT_TOKEN_MAP
