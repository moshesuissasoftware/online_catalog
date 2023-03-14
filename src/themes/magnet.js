import { theme, rem } from '@nobia/zeus-components/lib/styled'

// TODO: Move to zeus theme
const colorLightBlue = '#356094'
const colorLightGray = '#697175'
const colorBetterBlue10 = '#E2E3E4'
const colorBetterBlue40 = '#989EA1'
const primaryColor = theme('colors.primary')
const Sizes = {
  xxs: '16px',
  xs: '20px',
  s: '23px',
  sm: '26px',
  m: '28px',
  ml: '30px',
  xml: '35px',
  l: '36px',
  xl: '40px',
  mxl: '44px',
  xxl: '56px',
}
export default {
  typography: {
    headline: {
      color: primaryColor,
    },
    subHeadline: {
      color: primaryColor,
      fontSize: Sizes.m,
    },
    preamble: {
      color: primaryColor,
    },
    paragraph: {
      color: primaryColor,
    },
    title: {
      color: primaryColor,
    },
    pageTitle: {
      color: primaryColor,
    },
    link: {
      color: primaryColor,
    },
  },
  collapse: {
    fontWeight: '500',
    border: {
      color: '#D49B6B',
    },
  },
  app: {
    margin: '0 auto auto',
  },
  wishListButton: {
    marginTop: '-15px',
    marginRight: '-15px',
    width: '40px!important',
    backgroundColor: '#fff',
    paddingLeft: '7px!important',
    height: '38px',
    borderRadius: '50%',
    marginLeft: '5px',
    iconSize: '16px',
    prodPageIconSize: '21px',
    wishListBackground: {
      backgroundColor: '#eceded',
    },
  },
  subHeadline: {
    fontSize: Sizes.m,
    lineHeight: Sizes.xml,
    mobile: {
      fontSize: Sizes.ml,
      lineHeight: Sizes.sm,
    },
  },
  subHeadlineBig: {
    fontSize: Sizes.l,
    lineHeight: Sizes.xl,
  },
  subHeadlineMobile: {
    fontSizeSm: Sizes.xs,
    lineHeightSm: Sizes.sm,
    fontSizeLg: Sizes.s,
    lineHeightLg: Sizes.m,
  },
  description: {
    lineHeight: Sizes.s,
  },
  filters: {
    marginLeft: '0',
  },
  headline: {
    fontSize: Sizes.m,
  },
  feature: {
    paddingTop: rem(7),
    paddingBottom: rem(7),
  },
  header: {
    title: {
      textTransform: 'none',
      letterSpacing: rem(0),
      fontWeight: 500,
    },
  },
  colors: {
    lightBlue: colorLightBlue,
    border: '#E7E7E7',
    betterBlue10: colorBetterBlue10,
    betterBlue40: colorBetterBlue40,
    link: theme('colors.darkBlue'),
    secondary: primaryColor,
  },
  button: {
    borderRadius: '3px',
  },
  breadcrumbs: {
    fontSize: '13px',
    fontWeight: 300,
    textTransform: 'none',
    default: {
      color: theme('colors.darkBlue'),
      colorHover: theme('colors.lightGrey'),
      textDecorationHover: 'none',
    },
    breakpoints: {
      lg: 1800,
    },
    hasBackground: {
      textDecorationHover: 'underline',
    },
  },
  featureList: {
    title: {
      fontSize: Sizes.xxs,
      textTransform: 'none',
      letterSpacing: 'normal',
      fontWeight: 300,
    },
    data: {
      fontSize: Sizes.xxs,
      fontWeight: 500,
    },
  },
  grid: {
    container: 'auto',
  },
  pageTitle: {
    lineHeight: Sizes.mxl,
    fontSizeMobil: '30px',
    fontSizeMobilSm: Sizes.ml,
    fontSize: Sizes.xl,
    mobile: {
      fontSize: '15.75px',
    },
  },

  pageTitleMobile: {
    fontSize: '32px',
    lineHeight: '38px',
  },
  paragraph: {
    fontFamily: '"Campton", Arial, sans-serif',
    fontSize: '16px',
  },
  preamble: {
    paddingRight: rem(200),
    fontSize: Sizes.xs,
    fontFamily: 'NewSpirit',
    textAlign: 'left',
    fontWeight: 'lighter',
    fontSizeMobil: '18px',
  },
  preambleXtml: {
    paddingRight: rem(200),
    fontSize: Sizes.xs,
    fontFamily: 'NewSpirit',
    textAlign: 'left',
    fontWeight: 'lighter',
  },
  pageMargin: {
    bottom: rem(70),
    marginRight: '80px',
    marginLeft: '80px',
  },
  pageMarginResponsiveMd: {
    paddingRight: '90px',
    paddingLeft: '90px',
  },
  pageMarginResponsiveSpecial: {
    paddingRight: '103px',
    paddingLeft: '103px',
  },
  pageMarginResponsiveSm: {
    paddingRight: '0',
    paddingLeft: '0',
  },
  price: {
    fontSize: Sizes.l,
    color: theme('colors.darkBlue'),
    marginTop: rem(40),
    marginRight: 0,
    marginBottom: rem(30),
  },
  background: {
    backgroundColor: '#f7efe9',
  },
  categoryCard: {
    title: {
      fontSize: '18px',
    },
    preamble: {
      fontSize: '16px',
    },
    fontFamily: 'NewSpirit',
    backgroundColor: '#f6ebe1',
  },
  styledHeadline: {
    fontSize: '24px',
    mobile: {
      fontSize: '18px',
    },
  },
  productCard: {
    lineHeight: '22px!important',
    column: {
      mobile: {
        marginTop: '16px',
      },
    },
    mobile: {
      fontFamily: '14px',
    },
    fontSize: Sizes.xxs,
    fontWeight: 500,
    code: {
      fontSize: '16px',
      lineHeight: '24px',
      color: colorLightGray,
      fontWeight: 400,
      order: 1,
      marginTop: 0,
      marginBottom: '8px',
      mobile: {
        fontSize: '14px',
        marginTop: '8px',
        marginBottom: '16px',
      },
    },
    title: {
      lineHeight: '23px',
      order: 2,
      marginTop: 0,
      marginBottom: '16px',
      mobile: {
        fontSize: '15.75px',
      },
    },
    price: {
      fontSize: '36px !important',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      mobile: {
        fontSize: '23px',
      },
    },
    bullets: {
      order: 3,
      marginTop: '24px',
      marginBottom: '12px',
    },
    preamble: {
      order: 4,
      marginTop: '12px',
      marginBottom: '12px',
    },
    infoBooking: {
      margin: '12px 0 8px 0',
    },
    fontFamily: 'NewSpirit',
  },
  categories: {
    price: {
      fontSize: Sizes.xs,
    },
    row: {
      marginBottom: '24px',
    },
    filterPage: {
      gutter: '12px',
    },
  },
  readmore: {
    minHeight: '59px',
  },
  productCardBadge: {
    badge: {
      width: '80px',
    },
  },
  promotions: {
    color: primaryColor,
    title: {
      color: primaryColor,
      fontSize: '36px',
    },
    preamble: {
      letterSpacing: 'normal',
      lineHeight: '23px',
      fontFamily: 'Campton,arial,sans-serif',
    },
    cta: {
      color: '#192228',
      fontFamily: 'Campton,arial,sans-serif',
      lineHeight: '22px',
      fontWeight: 500,
    },
  },
}
