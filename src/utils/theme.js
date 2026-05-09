/**
 * 主题配置系统
 * 根据域名自动切换不同的主题颜色和图片
 */
import { useTemplate } from '@/utils/template'
const { currentTemplate } = useTemplate()
// 主题配置映射表
const themeConfig = {
  // 模板一
  'template_one': {
    name: 'template_one',
    // 紫色主题
    'purple': {
      name: 'purple',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #0077BB',
        loginlinear4: ' #6217dd',
        gold100: ' #7041F3',
        gold500: ' #FFAF00',
        redbglinear1: ' #EBC8A0',
        redbglinear2: ' #B7A0F9',
        themecardlinear1: ' #713799',
        themecardlinear2: ' #8961ea',
        mysteriousgoldlinear1: ' #f954ff',
        mysteriousgoldlinear2: ' #740d95',
        weeklinear1: ' #D9CCFE',
        weeklinear2: ' #B8A1F9',
        mysteriousgoldlinear5: ' #ecd3ae',
        mysteriousgoldlinear6: ' #d1a277',
        defaultBg: ' #3b3466',
        border1: ' #5f528d',
        searchbg: ' #100c2c',
        searchborder: ' #6e51ad',
        bodyBg: ' #272447',
        headerBg: ' #272447',
        asideBg: ' #272447',
        three: ' #272447',
        theme: ' #7041F3',
        btnlinar1: ' #FFAF00',
        btnlinar2: ' #7041F3',
        btnlinar3: ' #713799',
        btnlinar4: ' #8961ea',
        tablebg: ' #7041f3',
        tablergba40: 'rgba(112,65,243,0.4)',
        tablergba20: 'rgba(112,65,243,0.2)',
        tablergba10: 'rgba(112,65,243,0.1)',
        redsmallbg: ' #DBC5DC',
        themeLight: ' #DED2FF',
        faqcolor1: ' #0048B4',
        faqcolor2: ' #0166FF',
        faqcolor3: ' #014A73',
        faqcolor4: ' #016098',
        textcolorone: ' #7041F3',
        textcolortwo: ' #fdf016',
        textcolorthree: ' #FFAF00',
        textcolorsix: '#ffbdac',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #7041F3',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #7041F3 ',
        vantabbottombar: ' #7041F3 '
      },
      images: {
        folder: 'purple',
      }
    },
    'blue': {
      name: 'blue',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #fad126',
        loginlinear4: ' #ff544f',
        gold100: ' #24acd5',
        gold500: ' #0e5c8d',
        redbglinear1: ' #bce8f3',
        redbglinear2: ' #60adbe',
        themecardlinear1: ' #3ab7e6',
        themecardlinear2: ' #1c39a6',
        mysteriousgoldlinear1: ' #00f2fe',
        mysteriousgoldlinear2: ' #4facfe',
        weeklinear1: ' #4facfe',
        weeklinear2: ' #66a6ff',
        mysteriousgoldlinear5: ' #ecd3ae',
        mysteriousgoldlinear6: ' #d1a277',
        defaultBg: ' #162238',
        border1: ' #5db5ff',
        searchbg: ' #0e1123',
        searchborder: ' #91c1e3',
        bodyBg: ' #050a1b',
        headerBg: ' #050a1b',
        asideBg: ' #050a1b',
        three: ' #050a1b ',
        theme: ' #4993ed',
        btnlinar1: ' #fad126',
        btnlinar2: ' #ff544f',
        btnlinar3: ' #3ab7e6',
        btnlinar4: ' #1c39a6',
        tablebg: ' #4993ed',
        tablergba40: 'rgba(73,147,237,0.4)',
        tablergba20: 'rgba(73,147,237,0.2)',
        tablergba10: 'rgba(73,147,237,0.1)',
        redsmallbg: ' #b5dde4',
        themeLight: ' #d8ecf3',
        faqcolor1: ' #a2d4e0',
        faqcolor2: ' #497eb0',
        faqcolor3: ' #6180b6',
        faqcolor4: ' #2c5c6a',
        textcolorone: ' #45718f',
        textcolortwo: ' #fdf016',
        textcolorthree: ' #FFAF00',
        textcolorsix: ' #f1d09f',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #4993ed',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(36, 33, 33, 0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #4993ed',
        vantabbottombar: ' #4993ed '
      },
      images: {
        folder: 'blue',
      }
    },
    // 黑金主题
    'blackgold': {
      name: 'blackgold',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #9EC7E3',
        loginlinear4: ' #617DD0',
        gold100: ' #A65F37',
        gold500: ' #CC9580',
        redbglinear1: ' #E9CFB2',
        redbglinear2: ' #A9643C',
        themecardlinear1: ' #DABB7C',
        themecardlinear2: ' #816739',
        mysteriousgoldlinear1: ' #FDDF61',
        mysteriousgoldlinear2: ' #DA6510',
        weeklinear1: ' #F3D5BC',
        weeklinear2: ' #BE8360',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        defaultBg: ' #40302B',
        border1: ' #7F6839',
        searchbg: ' #31201B',
        searchborder: ' #E3C891',
        bodyBg: ' #070604',
        headerBg: ' #070604',
        asideBg: ' #070604',
        three: ' #070604',
        theme: ' #A65F37',
        btnlinar1: ' #CC9580',
        btnlinar2: ' #CC9580',
        btnlinar3: ' #DABB7C',
        btnlinar4: ' #816739',
        tablebg: ' #A65F37',
        tablergba40: 'rgba(166,95,55,0.4)',
        tablergba20: 'rgba(166,95,55,0.2)',
        tablergba10: 'rgba(166,95,55,0.1)',
        redsmallbg: ' #E4D1B5',
        themeLight: ' #f0e2de',
        faqcolor1: ' #E0C0A2',
        faqcolor2: ' #6A432C',
        faqcolor3: ' #867361',
        faqcolor4: ' #6A432C',
        textcolorone: ' #A65F37',
        textcolortwo: ' #fdf016',
        textcolorthree: ' #FFAF00',
        textcolorsix: '#f1d09f',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #A65F37',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #A65F37 ',
        vantabbottombar: ' #A65F37 '
      },
      images: {
        folder: 'blackgold',
      }
    },
    // 红色主题
    'red': {
      name: 'red',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #FD5392',
        loginlinear4: ' #F86F64',
        gold100: ' #D33E45 ',
        gold500: ' #FF934C',
        redbglinear1: ' #FDC5A0',
        redbglinear2: ' #c54e54',
        themecardlinear1: ' #EC5152',
        themecardlinear2: ' #9D2424',
        mysteriousgoldlinear1: ' #FFAA24',
        mysteriousgoldlinear2: ' #DD0100',
        weeklinear1: ' #F3BCBC',
        weeklinear2: ' #DB7E7E',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        defaultBg: ' #651111',
        border1: ' #8E2424',
        searchbg: ' #651111',
        searchborder: ' #8e2424',
        bodyBg: ' #570000',
        headerBg: ' #570000',
        asideBg: ' #570000',
        three: ' #570000',
        theme: ' #D33E45',
        btnlinar1: ' #FF934C',
        btnlinar2: ' #D33E45',
        btnlinar3: ' #EC5152',
        btnlinar4: ' #9D2424',
        tablebg: ' #D33E45',
        tablergba40: 'rgba(211,62,69,0.4)',
        tablergba20: 'rgba(211,62,69,0.2)',
        tablergba10: 'rgba(211,62,69,0.1)',
        redsmallbg: ' #FFD2D2',
        themeLight: ' #FFCCCC',
        faqcolor1: ' #8A2222',
        faqcolor2: ' #FFAF00',
        faqcolor3: ' #671A1A',
        faqcolor4: ' #D26132',
        textcolorone: ' #D33E45',
        textcolortwo: ' #fdf016',
        textcolorthree: ' #ffd339',
        textcolorsix: '#FFA6A6',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #D33E45',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #D33E45 ',
        vantabbottombar: ' #D33E45 '
      },
      images: {
        folder: 'red',
      }
      
    },
    'gold': {
      name: 'gold',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #FFE67B',
        loginlinear4: ' #CA9134',
        gold100: ' #F2B641',
        gold500: ' #F08455',
        redbglinear1: ' #FFF696',
        redbglinear2: ' #DE9F54',
        themecardlinear1: ' #A88A31',
        themecardlinear2: ' #76560E',
        mysteriousgoldlinear1: ' #FCAE68',
        mysteriousgoldlinear2: ' #FF7E00',
        weeklinear1: ' #FFE4BE',
        weeklinear2: ' #F0B66A',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        defaultBg: ' #4a2500',
        border1: ' #997211',
        searchbg: ' #562F00',
        searchborder: ' #FFF3E2',
        bodyBg: ' #280702',
        headerBg: ' #280702',
        asideBg: ' #280702',
        three: ' #280702',
        theme: ' #AF8c02',
        btnlinar1: ' #F70FFF',
        btnlinar2: ' #FD9D23',
        btnlinar3: ' #A88A31',
        btnlinar4: ' #76560E',
        tablebg: ' #FD9E22',
        tablergba40: 'rgba(175,97,2,0.4)',
        tablergba20: 'rgba(175,97,2,0.2)',
        tablergba10: 'rgba(175,97,2,0.1)',
        redsmallbg: ' #FFEBDB',
        themeLight: ' #FEE5D3',
        faqcolor1: ' #FFE67B',
        faqcolor2: ' #CA9134',
        faqcolor3: ' #B59166',
        faqcolor4: ' #79571F',
        textcolorone: ' #FD9E22',
        textcolortwo: ' #FDF016',
        textcolorthree: ' #FFAF00',
        textcolorsix: '#FFFBB8',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #AF8c02',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #AF8c02 ',
        vantabbottombar: ' #AF8c02 '
      },
      images: {
        folder: 'gold',
      }
    },
    'redpurple': {
      name: 'redpurple',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #fad126',
        loginlinear4: ' #d87514',
        gold100: ' #9941c6',
        gold500: ' #3f1256',
        redbglinear1: ' #f3bce5',
        redbglinear2: ' #a260be',
        themecardlinear1: ' #481d93',
        themecardlinear2: ' #681e93',
        mysteriousgoldlinear1: ' #ae33ff',
        mysteriousgoldlinear2: ' #7b32ff',
        weeklinear1: ' #f2bcf3',
        weeklinear2: ' #9c60be',
        mysteriousgoldlinear5: ' #ecd3ae',
        mysteriousgoldlinear6: ' #d1a277',
        defaultBg: ' #2f0d40',
        border1: ' #71209b',
        searchbg: ' #281b31',
        searchborder: ' #b991e3',
        bodyBg: ' #1e0a2a',
        headerBg: ' #25122a',
        asideBg: ' #25122a',
        three: ' #25122a',
        theme: ' #7132ff',
        btnlinar1: ' #f28e26',
        btnlinar2: ' #fd644f',
        btnlinar3: ' #713799',
        btnlinar4: ' #8961ea',
        tablebg: ' #7132ff',
        tablergba40: 'rgba(113,50,255,0.4)',
        tablergba20: 'rgba(113,50,255,0.2)',
        tablergba10: 'rgba(113,50,255,0.1)',
        redsmallbg: ' #d2b5e4',
        themeLight: ' #f0e2de',
        faqcolor1: ' #eadbf3',
        faqcolor2: ' #b049a3',
        faqcolor3: ' #7e6186',
        faqcolor4: ' #552c6a',
        textcolorone: ' #79397d',
        textcolortwo: ' #fdf016',
        textcolorthree: ' #FFAF00',
        textcolorsix: ' #f1d09f',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #7132ff',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #7132ff',
        vantabbottombar: ' #7132ff '
      },
      images: {
        folder: 'redpurple',
      }
    },
    'fluorescentgreen': {
      name: 'fluorescentgreen',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        loginlinear3: ' #fe35b5',
        loginlinear4: ' #7746dc',
        gold100: ' #07cc72',
        gold500: ' #084210',
        redbglinear1: ' #bcf3dc',
        redbglinear2: ' #60be7f',
        themecardlinear1: ' #50c880',
        themecardlinear2: ' #119633',
        mysteriousgoldlinear1: ' #38f8a4',
        mysteriousgoldlinear2: ' #00dc50',
        weeklinear1: ' #bcf3d2',
        weeklinear2: ' #60be83',
        mysteriousgoldlinear5: ' #ecd3ae',
        mysteriousgoldlinear6: ' #d1a277',
        defaultBg: ' #1e3124',
        border1: ' #209b54',
        searchbg: ' #12230e',
        searchborder: ' #9de391',
        bodyBg: ' #1a1a21',
        headerBg: ' #0a1b05',
        asideBg: ' #0a1b05',
        three: ' #0a1b05 ',
        theme: ' #11c77b',
        btnlinar1: ' #d70a84',
        btnlinar2: ' #6e127f',
        btnlinar3: ' #50c880',
        btnlinar4: ' #119633',
        tablebg: ' #11c77b',
        tablergba40: 'rgba(17,199,123,0.4)',
        tablergba20: 'rgba(17,199,123,0.2)',
        tablergba10: 'rgba(17,199,123,0.1)',
        redsmallbg: ' #b5e4be',
        themeLight: ' #d8f3e9',
        faqcolor1: ' #a2e0af',
        faqcolor2: ' #6db049',
        faqcolor3: ' #61866a',
        faqcolor4: ' #4f6a2c',
        textcolorone: ' #458f76',
        textcolortwo: ' #fdf016',
        textcolorthree: ' #FFAF00',
        textcolorsix: ' #f1d09f',
        nine: ' #655635',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #11c77b',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #11c77b',
        vantabbottombar: ' #11c77b '
      },
      images: {
        folder: 'fluorescentgreen',
      }
    },
  },
  "template_four": {
     'black': {
      name: 'black',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.15)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        m4tentext:'rgba(0,0,0,0.8)',
        m4ninetext:'rgba(0,0,0,0.8)',
        themetext0: ' #ffcc00',
        // 渐变字体色
        themetext1: ' #25bfac',
        themetext2: ' #25ffd8',
        themetext3: ' #aaaaaa',
        themetext4: ' #fffbb8',
        theme: ' #181818',
        defaultBg: ' #181818',
        bodyBg: ' #181818',
        tablebg: ' #2c2c2c',
        tablebg2: ' #222222',
        defaultborder: ' #424242',
        btnlinar1: ' #181818',
        btnlinar2: ' #181818',
        btnlinar3: ' #f8b805',
        btnlinar4: ' #ffcc00',
        downloadlinear3: ' #25bfac',
        downloadlinear4: ' #25ffd8',
        themecardlinear1: ' #232323 ',
        themecardlinear2: ' #232323 ',
        card1: ' #232323',
        card2: ' #3b3b3b',
        activitybox1: ' #0d3b39',
        activitybox2: ' #17201f',
        activityborder1: ' #24b38c',
        activityborder2: ' #468b89',
        homeranktext: ' #663409',
        pwa: ' #01875f',
        texterror:' #ff0000',
        redpacktext: ' #000000',
        vanprimary: ' #25ffd8',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #25ffd8',
        vantabbottombar: ' #25ffd8 '
      },
      images: {
        folder: 'black',
      }
    },
    'blackpurple': {
      name: 'blackpurple',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.15)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        m4tentext:' #ffffff',
        m4ninetext:'#0e0a1f',
        themetext0: ' #ffcc00',
        // 渐变字体色
        themetext1: ' #a67dff',
        themetext2: ' #a67dff',
        themetext3: ' #827a94',
        themetext4: ' #fffbb8',
        theme: ' #090c23',
        defaultBg: ' #090c23',
        bodyBg: ' #0e0a1f',
        tablebg: ' #191338',
        tablebg2: ' #140f2d',
        defaultborder: ' #7768a8',
        btnlinar1: ' #251f42',
        btnlinar2: ' #251f42',
        btnlinar3: ' #f8b805',
        btnlinar4: ' #ffcc00',
        downloadlinear3: ' #a67dff',
        downloadlinear4: ' #6f2dff',
        themecardlinear1: ' #200f50 ',
        themecardlinear2: ' #200f50 ',
        card1: ' #200f50',
        card2: ' #321c73',
        activitybox1: ' #2e0b5c',
        activitybox2: ' #130930',
        homeranktext: ' #aaaaaa',
        pwa: ' #01875f',
        texterror:' #ff0000',
        redpacktext: ' #000000',
        vanprimary: ' #a67dff',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #a67dff',
        vantabbottombar: ' #a67dff '
      },
      images: {
        folder: 'blackpurple',
      }
    },
    'blackgold':{
      name: 'blackgold',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.15)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        m4tentext:' #ffffff',
        m4ninetext:'#000000',
        themetext0: ' #fcff00',
        // 渐变字体色
        themetext1: ' #eccd51',
        themetext2: ' #eccd51',
        themetext3: ' #94827a',
        themetext4: ' #fffbb8',
        theme: ' #120b06',
        defaultBg: ' #120b06',
        bodyBg: ' #100704',
        tablebg: ' #2e231d',
        tablebg2: ' #251c17',
        defaultborder: ' #a88268',
        btnlinar1: ' #2d2525',
        btnlinar2: ' #2d2525',
        btnlinar3: ' #fff06e',
        btnlinar4: ' #ffd40e',
        downloadlinear3: ' #9f6f48',
        downloadlinear4: ' #8a5738',
        themecardlinear1: ' #985d0b ',
        themecardlinear2: ' #5e2f0b ',
        card1: ' #8e6935',
        card2: ' #523016',
        activitybox1: ' #432908',
        activitybox2: ' #1f170a',
        homeranktext: ' #fcff00',
        pwa: ' #01875f',
        texterror:' #ff0000',
        redpacktext: ' #000000',
        vanprimary: ' #eccd51',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #eccd51',
        vantabbottombar: ' #eccd51 '
      },
      images: {
        folder: 'blackgold',
      }
    }
  },
  'template_two': {
    // 黑金主题
    'green': {
      name: 'green',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        textcolortwo: ' #ffe400',
        textcolorthree: ' #beffde',
        textcolorsix: ' #b0d898',
        three: ' #b0d898',
        theme: ' #749c85',
        defaultBg: ' #002402',
        tablebg: ' #002402',
        defaultborder: ' #1c7139',
        searchbg: ' #002402',
        searchborder: 'rgb(2, 2, 2)',
        bodyBg: ' #001f16',
        tablergba40: 'rgba(0, 148, 70,0.4)',
        tablergba20: 'rgba(0, 148, 70,0.2)',
        tablergba10: 'rgba(0, 148, 70,0.1)',
        loginlinear3: ' #17673f',
        loginlinear4: ' #17673f',
        allbtn: ' #17673f',
        border1: ' #089377',
        minecardbg: 'rgba(23, 103, 63, 0.7)',
        btnlinar3: ' #fb6c00',
        btnlinar4: ' #ffb80c ',
        downloadlinear1: ' #ffb80c',
        downloadlinear2: ' #fb6c00',
        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',
        btnlinar1: ' #0061da',
        btnlinar2: ' #00de88',
        richlinar1: ' #0061da',
        richlinar2: ' #00de88',
        mysteriousgoldlinear1: ' #00de88',
        mysteriousgoldlinear2: ' #0061da',
        gold100: ' #00de88',
        gold500: ' #0061da',
        // gold100: ' #ffb80c',
        // gold500: ' #fb6c00',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #ecd3ae',
        minelinear2: ' #d1a277',
        nine: ' #655635',
        homeranktext: ' #663409',
        themecardlinear1: ' #07793a ',
        themecardlinear2: ' #2bb05d ',
        morelinear1: ' #07793a',
        morelinear2: ' #2bb05d',
        faqcolor1: ' #07793a',
        faqcolor2: ' #2bb05d',
        btncolor: ' #f8fe01',
        card1: ' #79db74 ',
        card2: ' #2e9c6f',
        pwa: ' #01875f',
        two: ' #FF0000',
        redpacktext:' #7e1313',
        pddcardtext:' #000000',
        texterror:'rgba(0,0,0,0.5)',
        vanprimary: ' #002402',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #002402 ',
        vantabbottombar: ' #002402 '
      },
      images: {
        folder: 'green',
      }
    },
    'red': {
      name: 'red',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        textcolortwo: ' #fff113',
        textcolorthree: ' #fffbb8',
        textcolorsix: ' #ffbfb2',
        three: ' #ffbfb2',
        theme: ' #9c5a4b',
        defaultBg: ' #1e0000',
        tablebg: ' #1e0000',
        defaultborder: ' #8e560c',
        searchbg: ' #1e0000',
        searchborder: ' #8e560c',
        bodyBg: ' #570000',
        tablergba40: 'rgba(30, 9, 0,0.4)',
        tablergba20: 'rgba(30, 9, 0,0.2)',
        tablergba10: 'rgba(30, 9, 0,0.1)',
        loginlinear3: ' #804227',
        loginlinear4: ' #804227',
        allbtn: ' #804227',
        border1: ' #ab5900',
        minecardbg: 'rgba(128, 66, 39, 0.7)',
        btnlinar3: ' #178a32 ',
        btnlinar4: ' #95ff0c ',
        downloadlinear1: ' #f70fff',
        downloadlinear2: ' #fd9e22',
        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',
        btnlinar1: ' #fd9e22 ',
        btnlinar2: ' #f70fff ',
        richlinar1: ' #ff5b22',
        richlinar2: ' #ffee35',
        mysteriousgoldlinear1: ' #ffee35',
        mysteriousgoldlinear2: ' #ff5b22',
        gold100: ' #ffee35',
        gold500: ' #ff5b22',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #ecd3ae',
        minelinear2: ' #d1a277',
        nine: ' #655635',
        homeranktext: ' #663409',
        themecardlinear1: ' #931111 ',
        themecardlinear2: ' #e03737 ',
        morelinear1: ' #931111',
        morelinear2: ' #e03737',
        faqcolor1: ' #671A1A',
        faqcolor2: ' #931111',
        btncolor: ' #f8fe01',
        card1: ' #e76e33',
        card2: ' #961919',
        pwa: ' #01875f',
        two: ' #FF0000',
        pddcardtext:' #000000',
        texterror:'rgba(0,0,0,0.5)',
        vanprimary: ' #1e0000',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #1e0000 ',
        vantabbottombar: ' #1e0000 '

      },
      images: {
        folder: 'red',
      }
    },
    'gold': {
      name: 'gold',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        textcolortwo: ' #ffe400',
        textcolorthree: ' #fffbb8',
        textcolorsix: ' #fffbb8',
        three: ' #fffbb8',
        theme: ' #8f7945',
        defaultBg: ' #1e0f00',
        tablebg: ' #1e0f00',
        defaultborder: ' #8e860c',
        searchbg: ' #1e0f00',
        searchborder: ' #8e860c',
        bodyBg: ' #1f0002',
        tablergba40: 'rgba(148, 122, 0,0.4)',
        tablergba20: 'rgba(148, 122, 0,0.2)',
        tablergba10: 'rgba(148, 122, 0,0.1)',
        loginlinear3: ' #946b34',
        loginlinear4: ' #946b34',
        allbtn: ' #946b34',
        border1: ' #937a08',
        // 8号色透明度
        minecardbg: 'rgba(148, 122, 0,0.4)',
        btnlinar3: ' #178a32 ',
        btnlinar4: ' #95ff0c',
        downloadlinear1: ' #95ff0c',
        downloadlinear2: ' #178a32',
        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',
        btnlinar1: ' #0061da',
        btnlinar2: ' #00de88',
        richlinar1: ' #0061da',
        richlinar2: ' #00de88',
        mysteriousgoldlinear1: ' #00de88',
        mysteriousgoldlinear2: ' #0061da',
        gold100: ' #00de88',
        gold500: ' #0061da',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #ecd3ae',
        minelinear2: ' #d1a277',
        nine: ' #655635',
        homeranktext: ' #663409',
        themecardlinear1: ' #793f07 ',
        themecardlinear2: ' #b0862b ',
        morelinear1: ' #793f07',
        morelinear2: ' #b0862b',
        faqcolor1: ' #793f07',
        faqcolor2: ' #b0862b',
        btncolor: ' #f8fe01',
        card1: ' #eec25a ',
        card2: ' #c8882d',
        pwa: ' #01875f',
        two: ' #FF0000',
        redpacktext: ' #7e1313',
        pddcardtext:' #000000',
        texterror:'rgba(0,0,0,0.5)',
        vanprimary: ' #1e0f00',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #1e0f00 ',
        vantabbottombar: ' #1e0f00 '
      },
      images: {
        folder: 'gold',
      }
    },
    'blackPurple': {
      name: 'blackPurple',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        textcolortwo: ' #ffcc00',
        textcolorthree: ' #d6a9ff',
        textcolorsix: ' #d6a9ff',
        three: ' #d6a9ff',
        theme: ' #827a94',
        defaultBg: ' #191537',
        tablebg: ' #191537',
        defaultborder: ' #7768a8',
        searchbg: ' #191537',
        searchborder: ' #7768a8',
        bodyBg: ' #090c23',
        tablergba40: 'rgba(94, 37, 148,0.4)',
        tablergba20: 'rgba(94, 37, 148,0.2)',
        tablergba10: 'rgba(94, 37, 148,0.1)',
        loginlinear3: ' #191537',
        loginlinear4: ' #191537',
        allbtn: ' #3f1e84',
        border1: ' #7768a8',
        // 8号色透明度
        minecardbg: 'rgba(63, 30, 132, 0.7)',
        btnlinar3: ' #84e000',
        btnlinar4: ' #33a700',
        downloadlinear1: ' #84e000',
        downloadlinear2: ' #33a700',
        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',
        btnlinar1: ' #a67dff',
        btnlinar2: ' #6f2dff',
        richlinar1: ' #a67dff',
        richlinar2: ' #6f2dff',
        mysteriousgoldlinear1: ' #fd9e22',
        mysteriousgoldlinear2: ' #f70fff',
        gold100: ' #fd9e22',
        gold500: ' #f70fff',
        // gold100: ' #ffb80c',
        // gold500: ' #fb6c00',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #ecd3ae',
        minelinear2: ' #d1a277',
        nine: ' #655736',
        homeranktext: ' #663409',
        themecardlinear1: ' #a05dd9  ',
        themecardlinear2: ' #6402b8',
        morelinear1: ' #6402b8',
        morelinear2: ' #a05dd9',
        faqcolor1: ' #6402b8',
        faqcolor2: ' #a05dd9',
        btncolor: ' #acff31',
        card1: ' #7943cb',
        card2: ' #40286b',
        pwa: ' #01875f',
        two: ' #FF0000',
        pddcardtext:' #ffffff',
        texterror:' #ff0000',
        redpacktext: ' #000000',
        vanprimary: ' #090c23',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #090c23',
        vantabbottombar: ' #090c23 '
      },
      images: {
        folder: 'blackPurple',
      }
    },
    
    'blackgold': {
      name: 'blackgold',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        textcolortwo: ' #fff113',
        textcolorthree: ' #ffd8a7',
        textcolorsix:' #ffd8a7',
        three: ' #ffd8a7',
        theme: ' #8d6848',
        
        defaultBg: ' #1e0e08',
        tablebg: ' #1e0e08',
        defaultborder:' #7f6839',
        searchbg:' #1e0e08',
        searchborder:' #7f6839',
        bodyBg: ' #100900',
        tablergba40: 'rgba(117, 86, 77,0.4)',
        tablergba20: 'rgba(117, 86, 77,0.2)',
        tablergba10: 'rgba(117, 86, 77,0.1)',
        loginlinear3: ' #4d372f',
        loginlinear4: ' #cc9580',
        allbtn:' #4d372f',
        border1: ' #a65f37',
        // border2: ' #cc9580',
        minecardbg: 'rgba(117, 86, 77, 0.7)',
        btnlinar3: ' #ca9134',
        btnlinar4: ' #ffe67b ',
        downloadlinear1: ' #ca9134',
        downloadlinear2: ' #ffe67b',
        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',
        btnlinar1: ' #816739',
        btnlinar2: ' #dabb7c',
        richlinar1:' #816739',
        richlinar2:' #dabb7c',
        mysteriousgoldlinear1: ' #dabb7c',
        mysteriousgoldlinear2: ' #816739',
        gold100: ' #dabb7c',
        gold500: ' #816739',
        // gold100: ' #ffb80c',
        // gold500: ' #fb6c00',
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #ecd3ae',
        minelinear2: ' #d1a277',
        nine:' #655736',
        homeranktext:' #663409',
        themecardlinear1: ' #4d372f ',
        themecardlinear2: ' #75564d ',
        morelinear1:' #4d372f',
        morelinear2:' #75564d',
        faqcolor1:' #4d372f',
        faqcolor2:' #75564d',
        btncolor:' #ffe67b',
        card1:' #ddbb7c',
        card2:' #816739',
        pwa:  ' #01875f',
        two: ' #FF0000',
        texterror:'rgba(0,0,0,0.5)',
        redpacktext:' #ffffff',
        pddcardtext:' #000000',
        vanprimary:' #1e0e08',
        vanplabg:' rgba(255,255,255,0.15) ',
        vanlodingicon:'rgba(255,255,255,0.25) ',
        vanerricon:'rgba(255,255,255,0.25) ',
        vantabfontsize:' inherit ',
        vantabnavbg:'transparent ',
        vantabtext:'inherit',
        vantabactive:' #1e0e08 ',
        vantabbottombar:' #1e0e08 '
      },
      images: {
        folder: 'blackgold',
      }
    },
   
    

  },

  'template_three': {
    // 黑金主题
    'gold': {
      name: 'gold',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        //字体颜色
        themetext0: ' #fff000',
        themetext1: ' #fffbb8',
        themetext2: ' #8f7945',
        themetext3: ' #645432',
        themetext4: ' #281b12',
        //背景
        defaultBg: '#1e0f00',
        tablebg: '#1e0f00',
        defaultborder: '#644c33',
        theme: '#644c33',

        bodyBg: '#251406',
        searchbg: '#251406',
        // searchborder:' #8e560c',

        //表格背景
        tablergba: '#8D7444',
        tablergba40: 'rgba(141,116,68,0.4)',
        tablergba20: 'rgba(141,116,68,0.2)',
        tablergba10: 'rgba(141,116,68,0.1)',

        //登录按钮 色卡10
        loginlinear3: ' #4d3d35',
        loginlinear4: ' #2a2017',
        border1: ' #f2cc8a',

        //其他按钮
        // allbtn:' #804227',
        minecardbg: 'rgba(141,116,68,0.2)',

        btnlinar3: ' #ca9134 ',
        btnlinar4: ' #ffe67b ',

        downloadlinear1: ' #ca9134',
        downloadlinear2: ' #ffe67b',

        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',

        btnlinar1: ' #ca9134 ',
        btnlinar2: ' #ffe67b ',
        //卡色13
        richlinar1: ' #f8fe01',
        richlinar2: ' #f8fe01',

        mysteriousgoldlinear1: ' #f8fe01',
        mysteriousgoldlinear2: ' #f8fe01',
        gold100: ' #f8fe01',
        gold500: ' #f8fe01',
        //卡色 14
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #a28036',
        minelinear2: ' #6b5022',

        nine: ' #655635',
        homeranktext: ' #663409',
        //卡色 15
        themecardlinear1: ' #a28036 ',
        themecardlinear2: ' #6b5022 ',
        //卡色 14 
        morelinear1: ' #a28036',
        morelinear2: ' #6b5022',

        faqcolor1: ' #6b5022',
        faqcolor2: ' #a28036',
        faqcolor3: 'rgba(141,116,68,0.4)',
        faqcolor4: ' #a28036',

        btncolor: ' #d9ff00',
        //卡色 15
        card1: ' #a28036',
        card2: ' #6b5022',

        pwa: ' #01875f',
        //红点
        two: ' #FF0000',

        vanprimary: ' #251406',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #251406',
        vantabbottombar: ' #251406'

      },
      images: {
        folder: 'gold',
      }
    },

    'green': {
      name: 'green',
      colors: {

        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        //字体颜色
        themetext0: ' #fff000',
        themetext1: ' #53fa68',
        themetext2: ' #6de0b0',
        themetext3: ' #458f76',
        themetext4: ' #1c4527',
        //背景
        defaultBg: '#2f3039',
        tablebg: '#2f3039',
        defaultborder: '#44464d',
        theme: '#44464d',

        searchbg: '#1a1a21',
        searchborder: ' #44464d',
        bodyBg: '#1a1a21',

        //表格背景
        tablergba: '#3D6735',
        tablergba40: 'rgba(61,103,53,0.4)',
        tablergba20: 'rgba(61,103,53,0.2)',
        tablergba10: 'rgba(61,103,53,0.1)',

        //登录按钮 色卡10
        loginlinear3: ' #282831',
        loginlinear4: ' #3c3c46',
        border1: ' #58f4a2',

        //其他按钮
        // allbtn:' #804227',
        minecardbg: 'rgba(128, 66, 39, 0.7)',

        btnlinar3: ' #5be375 ',
        btnlinar4: ' #58f5a2 ',

        downloadlinear1: ' #5be375',
        downloadlinear2: ' #58f5a2',

        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',

        btnlinar1: ' #5be375 ',
        btnlinar2: ' #58f5a2 ',
        //卡色13
        richlinar1: ' #6de0b0',
        richlinar2: ' #6de0b0',

        mysteriousgoldlinear1: ' #6de0b0',
        mysteriousgoldlinear2: ' #6de0b0',
        gold100: ' #6de0b0',
        gold500: ' #6de0b0',
        //卡色 14
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #282831',
        minelinear2: ' #3c3c46',

        nine: ' #655635',
        homeranktext: ' #663409',
        //卡色 15
        themecardlinear1: ' #282831 ',
        themecardlinear2: ' #3c3c46 ',
        //卡色 14 
        morelinear1: ' #282831',
        morelinear2: ' #3c3c46',

        faqcolor1: ' #3c3c46',
        faqcolor2: ' #282831',
        faqcolor3: 'rgba(61,103,53,0.4)',
        faqcolor4: ' #a28036',

        btncolor: ' #d9ff00',
        //卡色 15
        card1: ' #282831',
        card2: ' #3c3c46',

        pwa: ' #01875f',
        //红点
        two: ' #FF0000',

        vanprimary: ' #251406',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #251406',
        vantabbottombar: ' #251406'

      },
      images: {
        folder: 'green',
      }
    },

    'pink': {
      name: 'pink',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        //字体颜色
        themetext0: ' #fff000',
        themetext1: ' #e470d8',
        themetext2: ' #e150a4',
        themetext3: ' #7e3a62',
        themetext4: ' #73566f',
        //背景
        defaultBg: '#282129',
        tablebg: '#282129',
        defaultborder: '#463c47',
        theme: '#463c47',

        bodyBg: '#0e030c',
        searchbg: '#0e030c',
        // searchborder:' #8e560c',

        //表格背景
        tablergba: '#9f4fa8',
        tablergba40: 'rgba(159,79,168,0.4)',
        tablergba20: 'rgba(159,79,168,0.2)',
        tablergba10: 'rgba(159,79,168,0.1)',

        //登录按钮 色卡10
        loginlinear3: ' #292128',
        loginlinear4: ' #503d52',
        border1: ' #e470d8',

        //其他按钮
        // allbtn:' #804227',
        minecardbg: 'rgba(159,79,168,0.2)',

        btnlinar3: ' #e150a4 ',
        btnlinar4: ' #e66fc8 ',

        downloadlinear1: ' #e150a4',
        downloadlinear2: ' #e66fc8',

        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',

        btnlinar1: ' #e150a4 ',
        btnlinar2: ' #e66fc8 ',
        //卡色13
        richlinar1: ' #e150a4',
        richlinar2: ' #e150a4',

        mysteriousgoldlinear1: ' #e150a4',
        mysteriousgoldlinear2: ' #e150a4',
        gold100: ' #e150a4',
        gold500: ' #e150a4',
        //卡色 14
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #292128',
        minelinear2: ' #503d52',

        nine: ' #655635',
        homeranktext: ' #663409',
        //卡色 15
        themecardlinear1: ' #292128 ',
        themecardlinear2: ' #503d52 ',
        //卡色 14 
        morelinear1: ' #292128',
        morelinear2: ' #503d52',

        faqcolor1: ' #503d52',
        faqcolor2: ' #292128',
        faqcolor3: 'rgba(159,79,168,0.4)',
        faqcolor4: ' #292128',

        btncolor: ' #d9ff00',
        //卡色 15
        card1: ' #292128',
        card2: ' #503d52',

        pwa: ' #01875f',
        //红点
        two: ' #FF0000',

        vanprimary: ' #251406',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #251406',
        vantabbottombar: ' #251406'

      },
      images: {
        folder: 'pink',
      }
    },
    'purple': {
      name: 'purple',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        //字体颜色
        themetext0: ' #fff000',
        themetext1: ' #e6afff',
        themetext2: ' #b36ff3',
        themetext3: ' #8852ba',
        themetext4: ' #24143f',
        //背景
        defaultBg: '#3b3466',
        tablebg: '#3b3466',
        defaultborder: '#a78af2',
        theme: '#a78af2',

        bodyBg: '#2f2848',
        searchbg: '#2f2848',
        // searchborder:' #8e560c',

        //表格背景
        tablergba: '#7c50e1',
        tablergba40: 'rgba(124,80,225,0.4)',
        tablergba20: 'rgba(124,80,225,0.2)',
        tablergba10: 'rgba(124,80,225,0.1)',

        //登录按钮 色卡10
        loginlinear3: ' #14132f',
        loginlinear4: ' #4c216d',
        border1: ' #ea38ff',

        //其他按钮
        // allbtn:' #804227',
        minecardbg: 'rgba(124,80,225,0.2)',

        btnlinar3: ' #d57bff ',
        btnlinar4: ' #ae00ff ',

        downloadlinear1: ' #d57bff',
        downloadlinear2: ' #ae00ff',

        // downloadlinear3: ' #f70fff',
        // downloadlinear4: ' #fd9e22',

        btnlinar1: ' #d57bff ',
        btnlinar2: ' #ae00ff ',
        //卡色13
        richlinar1: ' #7848ff',
        richlinar2: ' #7848ff',

        mysteriousgoldlinear1: ' #7848ff',
        mysteriousgoldlinear2: ' #7848ff',
        gold100: ' #7848ff',
        gold500: ' #7848ff',
        //卡色 14
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #3b3466',
        minelinear2: ' #5f528d',

        nine: ' #655635',
        homeranktext: ' #663409',
        //卡色 15
        themecardlinear1: ' #3b3466 ',
        themecardlinear2: ' #5f528d ',
        //卡色 14 
        morelinear1: ' #3b3466',
        morelinear2: ' #5f528d',

        faqcolor1: ' #5f528d',
        faqcolor2: ' #3b3466',
        faqcolor3: 'rgba(124,80,225,0.4)',
        faqcolor4: ' #3b3466',

        btncolor: ' #d9ff00',
        //卡色 15
        card1: ' #3b3466',
        card2: ' #5f528d',

        pwa: ' #01875f',
        //红点
        two: ' #FF0000',

        vanprimary: ' #2f2848',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #2f2848',
        vantabbottombar: ' #2f2848'

      },
      images: {
        folder: 'purple',
      }
    },

    'yellowgreen': {
      name: 'yellowgreen',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        //字体颜色
        themetext0: ' #fff000',
        themetext1: ' #74f118',
        themetext2: ' #94c51d',
        themetext3: ' #517a35',
        themetext4: ' #5a642c',
        //背景
        defaultBg: '#102a39',
        tablebg: '#102a39',
        defaultborder: '#94c51d',
        theme: '#94c51d',

        bodyBg: '#011e3e',
        searchbg: '#011e3e',
        // searchborder:' #8e560c',

        //表格背景
        tablergba: '#69b12a',
        tablergba40: 'rgba(105,177,42,0.4)',
        tablergba20: 'rgba(105,177,42,0.2)',
        tablergba10: 'rgba(105,177,42,0.1)',

        //登录按钮 色卡10
        loginlinear3: ' #3a470c',
        loginlinear4: ' #11150a',
        border1: ' #74f118',

        //其他按钮 色卡11
        btnlinar1: ' #6bd11d ',
        btnlinar2: ' #0a72eb ',
        // 色卡11
        btnlinar3: ' #6bd11d ',
        btnlinar4: ' #0a72eb ',

        downloadlinear1: ' #6bd11d',
        downloadlinear2: ' #0a72eb',

        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',

        //卡色13
        richlinar1: ' #89ff55',
        richlinar2: ' #89ff55',

        // mysteriousgoldlinear1: ' #89ff55',
        // mysteriousgoldlinear2: ' #89ff55',
        // gold100: ' #89ff55',
        // gold500: ' #89ff55',
        
        //卡色 14
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #364d1d',
        minelinear2: ' #082c53',

        nine: ' #655635',
        homeranktext: ' #663409',
        //卡色 15
        themecardlinear1: ' #364d1d ',
        themecardlinear2: ' #082c53 ',
        //卡色 14 
        morelinear1: ' #364d1d',
        morelinear2: ' #082c53',

        faqcolor1: ' #082c53',
        faqcolor2: ' #364d1d',
        faqcolor3: 'rgba(105,177,42,0.4)',
        faqcolor4: ' #364d1d',

        btncolor: ' #d9ff00',
        //卡色 15
        card1: ' #082c53',
        card2: ' #364d1d',

        pwa: ' #01875f',
        //红点
        two: ' #FF0000',

        vanprimary: ' #011e3e',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #011e3e',
        vantabbottombar: ' #011e3e'

      },
      images: {
        folder: 'yellowgreen',
      }
    },

    'barbiepink': {
      name: 'barbiepink',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        //字体颜色
        themetext0: ' #fff000',
        themetext1: ' #ffb7da',
        themetext2: ' #d35e92',
        themetext3: ' #956277',
        themetext4: ' #714356',
        //背景
        defaultBg: '#221d1e',
        tablebg: '#221d1e',
        defaultborder: '#d35e92',
        theme: '#d35e92',

        bodyBg: '#161213',
        searchbg: '#161213',
        // searchborder:' #8e560c',

        //表格背景
        tablergba: '#ff7ba3',
        tablergba40: 'rgba(255,123,163,0.4)',
        tablergba20: 'rgba(255,123,163,0.2)',
        tablergba10: 'rgba(255,123,163,0.1)',

        //登录按钮 色卡10
        loginlinear3: ' #5d3f47',
        loginlinear4: ' #221d1e',
        border1: ' #d35e92',

        //其他按钮 色卡11
        btnlinar1: ' #ff96ca ',
        btnlinar2: ' #f56285 ',
        // 色卡11
        btnlinar3: ' #ff96ca ',
        btnlinar4: ' #f56285 ',

        downloadlinear1: ' #ff96ca',
        downloadlinear2: ' #f56285',

        downloadlinear3: ' #f70fff',
        downloadlinear4: ' #fd9e22',

        //卡色13
        richlinar1: ' #ffa6c1',
        richlinar2: ' #ffa6c1',

        // mysteriousgoldlinear1: ' #89ff55',
        // mysteriousgoldlinear2: ' #89ff55',
        // gold100: ' #89ff55',
        // gold500: ' #89ff55',
        
        //卡色 14
        mysteriousgoldlinear5: ' #ECD3AE',
        mysteriousgoldlinear6: ' #D1A277',
        minelinear1: ' #572e33',
        minelinear2: ' #311111',

        nine: ' #655635',
        homeranktext: ' #663409',
        //卡色 15
        themecardlinear1: ' #572e33 ',
        themecardlinear2: ' #311111 ',
        //卡色 14 
        morelinear1: ' #572e33',
        morelinear2: ' #311111',

        faqcolor1: ' #311111',
        faqcolor2: ' #572e33',
        faqcolor3: 'rgba(255,123,163,0.4)',
        faqcolor4: ' #572e33',

        btncolor: ' #d9ff00',
        //卡色 15
        card1: ' #311111',
        card2: ' #572e33',

        pwa: ' #01875f',
        //红点
        two: ' #FF0000',

        vanprimary: ' #011e3e',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(255,255,255,0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #011e3e',
        vantabbottombar: ' #011e3e'

      },
      images: {
        folder: 'barbiepink',
      }
    },

  },
  'template_five': {
    name: 'template_five',
    'deepblue': {
      name: 'deepblue',
      colors: {
        themewhite: '#ffffff',
        themeblack: '#000000',
        rgbawhite10: 'rgba(255,255,255,0.1)',
        rgbawhite30: 'rgba(255,255,255,0.3)',
        rgbawhite50: 'rgba(255,255,255,0.5)',
        rgbawhite80: 'rgba(255,255,255,0.8)',
        rgbablack15: 'rgba(0,0,0,0.15)',
        rgbablack30: 'rgba(0,0,0,0.3)',
        rgbablack50: 'rgba(0,0,0,0.5)',
        rgbablack80: 'rgba(0,0,0,0.8)',
        theme: '#10121d',
        //字体颜色
        themetext0: ' #ffd100',
        themetext1: ' #3a8ee3',
        themetext2: ' #597eec',
        themetext3: ' #6c7caa',
        themetext4: ' #8c8e9b',

        btncolor: ' #d9ff00',

        //0b1127-102e53输入框/内容框边258cff
        inputcolor1: '#0b1127',
        inputcolor2: '#102e53',
        inputborder: '#258cff',



        bodyBg: ' #10121d',
        defaultBg: ' #10121d',

        tablebg1: '#1f2741',
        tablebg2: '#141c34',
        
        //内容底
        btn1_bg: '#171f36',
        btn_border:'#242f50',

        //登录按钮 色卡247ee3-eb4487
        gold100: ' #eb4487',
        gold500: ' #247ee3',

        //按钮2
        themecardlinear1: ' #3a8ee3',
        themecardlinear2: ' #1a48b1',

        //二级底
        btnlinar3: ' #305387',
        btnlinar4: ' #152665',


         //三级窗/底框
        thirsmodel1:'#131c37',
        thirsmodel2:'#1e2a4c',
        thirsmodelboder: '#2f4685',

        //横条&活动奖励
        activitymodel1: '#082543',
        activitymodel2: '#0a101f',
        texterror:' #ff0000',
        homeranktext: ' #1c0308',
        pwa: ' #01875f',
        two: ' #FF0000',
        vanprimary: ' #4993ed',
        vanplabg: ' rgba(255,255,255,0.15) ',
        vanlodingicon: 'rgba(36, 33, 33, 0.25) ',
        vanerricon: 'rgba(255,255,255,0.25) ',
        vantabfontsize: ' inherit ',
        vantabnavbg: 'transparent ',
        vantabtext: 'inherit',
        vantabactive: ' #4993ed',
        vantabbottombar: ' #4993ed ',
      },
      images: {
        folder: 'deepblue',
      }
    },
  },
}

/**
 * 获取当前域名对应的主题配置
 */
export function getCurrentTheme() {

  if(window.themecolor == null){
    let currentTheme = import.meta.env.VITE_THEME || themeConfig.default
    const templateselection = import.meta.env.VITE_TEMPLATE
    const color = localStorage.getItem('current-theme')
    if(color){
      currentTheme = color
    }
     // 添加安全检查
    //  if (!themeConfig[templateselection]) {
    //   console.error(`模板 "${templateselection}" 未在主题配置中找到`)
    //   templateselection = 'template_one' // fallback 到默认模板
    // }
    
    // if (!themeConfig[templateselection][currentTheme]) {
    //   console.error(`主题 "${currentTheme}" 在模板 "${templateselection}" 下未找到`)
    //   currentTheme = Object.keys(themeConfig[templateselection])[0] // 使用第一个可用主题
    // }


    // 返回默认主题
    window.themecolor = themeConfig[templateselection][currentTheme]
  }
  return window.themecolor
  
  // let currentTheme = import.meta.env.VITE_THEME || themeConfig.default
  // const templateselection = import.meta.env.VITE_TEMPLATE

  // const color = localStorage.getItem('theme_color')
  // if(window.VCONSOLE_READY && color){
  //   currentTheme = color
  // }
  // 返回默认主题
  // return themeConfig[templateselection][currentTheme]

}
const originalApplyTheme = applyTheme;

/**
 * 应用主题到页面
 */
export function applyTheme(theme) {
  const root = document.documentElement
  const colors = theme.colors
  //  // 调用原始 applyTheme 函数
  // originalApplyTheme(theme);
  // 更新 meta 标签
  updateThemeColorMeta(theme);
  // 设置所有 CSS 变量
  root.style.setProperty('--color-themewhite', colors.themewhite)
  root.style.setProperty('--color-themeblack', colors.themeblack)
  root.style.setProperty('--color-rgbawhite10', colors.rgbawhite10)
  root.style.setProperty('--color-rgbawhite50', colors.rgbawhite50)
  root.style.setProperty('--color-rgbawhite30', colors.rgbawhite30)
  root.style.setProperty('--color-rgbawhite80', colors.rgbawhite80)
  root.style.setProperty('--color-rgbablack15', colors.rgbablack15)
  root.style.setProperty('--color-rgbablack30', colors.rgbablack30)
  root.style.setProperty('--color-rgbablack50', colors.rgbablack50)
  root.style.setProperty('--color-rgbablack80', colors.rgbablack80)
  root.style.setProperty('--color-theme', colors.theme)
  root.style.setProperty('--color-theme-light', colors.themeLight)
  root.style.setProperty('--color-themetext', colors.textcolorone)
  root.style.setProperty('--color-one', colors.textcolorthree)
  root.style.setProperty('--color-two', colors.two)
  root.style.setProperty('--color-three', colors.three)
  root.style.setProperty('--color-four', colors.textcolortwo)
  root.style.setProperty('--color-textcolorsix', colors.textcolorsix)
  root.style.setProperty('--color-nine', colors.nine)
  root.style.setProperty('--color-border1', colors.border1)
  root.style.setProperty('--color-tablebg', colors.tablebg)
  root.style.setProperty('--color-tablergba', colors.tablergba)
  root.style.setProperty('--color-tablergba40', colors.tablergba40)
  root.style.setProperty('--color-tablergba20', colors.tablergba20)
  root.style.setProperty('--color-tablergba10', colors.tablergba10)
  root.style.setProperty('--color-gold-100', colors.gold100)
  root.style.setProperty('--color-gold-500', colors.gold500)
  root.style.setProperty('--color-header-bg', colors.headerBg)
  root.style.setProperty('--color-aside-bg', colors.asideBg)
  root.style.setProperty('--color-body-bg', colors.bodyBg)
  root.style.setProperty('--color-default-bg', colors.defaultBg)
  root.style.setProperty('--color-drawer-text', colors.redsmallbg)
  root.style.setProperty('--color-loginlinear-3', colors.loginlinear3)
  root.style.setProperty('--color-loginlinear-4', colors.loginlinear4)
  root.style.setProperty('--color-themecardlinear1', colors.themecardlinear1)
  root.style.setProperty('--color-themecardlinear2', colors.themecardlinear2)
  root.style.setProperty('--color-linear-9', colors.redbglinear1)
  root.style.setProperty('--color-linear-10', colors.redbglinear2)
  root.style.setProperty('--color-linear-11', colors.weeklinear1)
  root.style.setProperty('--color-linear-12', colors.weeklinear2)
  root.style.setProperty('--color-linear-18', colors.mysteriousgoldlinear1)
  root.style.setProperty('--color-linear-19', colors.mysteriousgoldlinear2)
  root.style.setProperty('--color-linear-22', colors.mysteriousgoldlinear5)
  root.style.setProperty('--color-linear-23', colors.mysteriousgoldlinear6)
  root.style.setProperty('--color-text-1', colors.text1)
  root.style.setProperty('--color-pwa', colors.pwa)
  root.style.setProperty('--color-homeranktext', colors.homeranktext)
  root.style.setProperty('--color-searchbg', colors.searchbg)
  root.style.setProperty('--color-searchborder', colors.searchborder)
  root.style.setProperty('--color-faqcolor1', colors.faqcolor1)
  root.style.setProperty('--color-faqcolor2', colors.faqcolor2)
  root.style.setProperty('--color-faqcolor3', colors.faqcolor3)
  root.style.setProperty('--color-faqcolor4', colors.faqcolor4)
  root.style.setProperty('--van-primary-color', colors.vanprimary)
  root.style.setProperty('--van-image-placeholder-background', colors.vanplabg)
  root.style.setProperty('--van-image-loading-icon-color', colors.vanlodingicon)
  root.style.setProperty('--van-image-error-icon-color', colors.vanerricon)
  root.style.setProperty('--van-tab-font-size', colors.vantabfontsize)
  root.style.setProperty('--van-tabs-nav-background', colors.vantabnavbg)
  root.style.setProperty('--van-tab-text-color', colors.vantabtext)
  root.style.setProperty('--van-tab-active-text-color', colors.vantabactive)
  root.style.setProperty('--van-tabs-bottom-bar-color', colors.vantabbottombar)
  root.style.setProperty('--color-btnlinar1', colors.btnlinar1)
  root.style.setProperty('--color-btnlinar2', colors.btnlinar2)
  root.style.setProperty('--color-btnlinar3', colors.btnlinar3)
  root.style.setProperty('--color-btnlinar4', colors.btnlinar4)
  // 模板二新加
  root.style.setProperty('--color-noticelinear1', colors.noticelinear1)
  root.style.setProperty('--color-noticelinear2', colors.noticelinear2)
  root.style.setProperty('--color-downloadlinear1', colors.downloadlinear1)
  root.style.setProperty('--color-downloadlinear2', colors.downloadlinear2)
  root.style.setProperty('--color-downloadlinear3', colors.downloadlinear3)
  root.style.setProperty('--color-downloadlinear4', colors.downloadlinear4)
  root.style.setProperty('--color-minecardbg', colors.minecardbg)
  root.style.setProperty('--color-richlinar1', colors.richlinar1)
  root.style.setProperty('--color-richlinar2', colors.richlinar2)
  root.style.setProperty('--color-minelinear1', colors.minelinear1)
  root.style.setProperty('--color-minelinear2', colors.minelinear2)
  root.style.setProperty('--color-defaultborder', colors.defaultborder)
  root.style.setProperty('--color-morelinear1', colors.morelinear1)
  root.style.setProperty('--color-morelinear2', colors.morelinear2)
  root.style.setProperty('--color-btncolor', colors.btncolor)
  root.style.setProperty('--color-card1', colors.card1)
  root.style.setProperty('--color-card2', colors.card2)
  root.style.setProperty('--color-allbtn', colors.allbtn)
  root.style.setProperty('--color-six', colors.six)
  root.style.setProperty('--color-cardbg', colors.cardbg)
  root.style.setProperty('--color-mysteriousgoldtext', colors.mysteriousgoldtext)
  root.style.setProperty('--color-redpacktext', colors.redpacktext)
  root.style.setProperty('--color-pddcardtext', colors.pddcardtext)
  root.style.setProperty('--color-texterror', colors.texterror)

  
  //模板三
  //字体颜色
  root.style.setProperty('--color-themetext0', colors.themetext0)
  root.style.setProperty('--color-themetext1', colors.themetext1)
  root.style.setProperty('--color-themetext2', colors.themetext2)
  root.style.setProperty('--color-themetext3', colors.themetext3)
  root.style.setProperty('--color-themetext4', colors.themetext4)
  //按钮颜色
// 模板四
  root.style.setProperty('--color-tablebg2', colors.tablebg2)
  root.style.setProperty('--color-activitybox1', colors.activitybox1)
  root.style.setProperty('--color-activitybox2', colors.activitybox2)
  root.style.setProperty('--color-activityborder1', colors.activityborder1)
  root.style.setProperty('--color-activityborder2', colors.activityborder2)
  root.style.setProperty('--color-m4tentext', colors.m4tentext)
  root.style.setProperty('--color-m4ninetext', colors.m4ninetext)


  // 模板五
  root.style.setProperty('--color-inputcolor1', colors.inputcolor1)
  root.style.setProperty('--color-inputcolor2', colors.inputcolor2)
  root.style.setProperty('--color-inputborder', colors.inputborder)
  root.style.setProperty('--color-tablebg1', colors.tablebg1)
  root.style.setProperty('--color-tablebg2', colors.tablebg2)
  root.style.setProperty('--color-btn1_bg', colors.btn1_bg)
  root.style.setProperty('--color-btn_border', colors.btn_border)
  root.style.setProperty('--color-thirsmodel1', colors.thirsmodel1)
  root.style.setProperty('--color-thirsmodel2', colors.thirsmodel2)
  root.style.setProperty('--color-thirsmodelboder', colors.thirsmodelboder)
  root.style.setProperty('--color-activitymodel1', colors.activitymodel1)
  root.style.setProperty('--color-activitymodel2', colors.activitymodel2)
  

  // 设置主题名称属性，方便调试
  root.setAttribute('data-theme', theme.name)

  // 存储当前主题到 localStorage
  localStorage.setItem('current-theme', theme.name)
}

/**
 * 初始化主题系统
 */
export function initTheme() {
  const theme = getCurrentTheme()
  applyTheme(theme)
  return theme
}

/**
 * 获取主题图片路径
 * @param {string} imageName - 图片名称
 * @param {string} folder - 可选的子文件夹
 * @returns {string} 完整的图片路径
 */
export function getThemeImage(imageName, folder = '') {
  const theme = getCurrentTheme();
  // 添加缓存对象
  if (!window.imageCache) {
    window.imageCache = {};
  }
  const cacheKey = `${currentTemplate.value}_${theme.images.folder}_${imageName}_${folder}`;
  if (window.imageCache[cacheKey]) {
    return window.imageCache[cacheKey];
  }
  const themeFolder = theme.images.folder;
  let path;
  if (folder) {
    path = `/imgs/${currentTemplate.value}/${themeFolder}/${folder}/${imageName}`;
  } else {
    path = `/imgs/${currentTemplate.value}/${themeFolder}/${imageName}`;
  }
  // 缓存路径
  window.imageCache[cacheKey] = path;
  return path;
}

/**
 * 切换主题（用于测试或手动切换）
 * @param {string} themeName - 主题名称或域名
 */
export function switchTheme(themeName) {
  let theme = themeConfig[themeName]
  // 如果找不到，尝试通过名称查找
  if (!theme) {
    theme = Object.values(themeConfig).find(t => t.name === themeName)
  }

  // 如果还是找不到，使用默认主题
  if (!theme) {
    theme = themeConfig.default
  }

  applyTheme(theme)
  return theme
}

/**
 * 获取所有可用的主题列表
 */
export function getAvailableThemes() {
  return Object.entries(themeConfig).map(([key, value]) => ({
    key,
    name: value.name,
    isDefault: key === 'default'
  }))
}
export function updateThemeColorMeta(theme) {
  // 获取 bodyBg 颜色值，去除空格
  const bodyBgColor = theme.colors.bodyBg?.trim() || '#fff';

  // 查找或创建 theme-color meta 标签
  let metaTag = document.querySelector('meta[name="theme-color"]');
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.name = 'theme-color';
    document.head.appendChild(metaTag);
  }

  // 设置颜色值
  metaTag.content = bodyBgColor;

  // 同时更新 msapplication-TileColor (Windows 磁贴颜色)
  let tileMetaTag = document.querySelector('meta[name="msapplication-TileColor"]');
  if (!tileMetaTag) {
    tileMetaTag = document.createElement('meta');
    tileMetaTag.name = 'msapplication-TileColor';
    document.head.appendChild(tileMetaTag);
  }
  tileMetaTag.content = bodyBgColor;
}

export default {
  initTheme,
  getCurrentTheme,
  applyTheme,
  getThemeImage,
  switchTheme,
  getAvailableThemes
}


