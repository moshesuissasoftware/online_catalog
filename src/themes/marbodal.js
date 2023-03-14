import {
  theme,
  rem,
  withProp,
  switchProp,
  css,
} from '@nobia/zeus-components/lib/styled'
import { transparentize } from '@nobia/zeus-components/lib/helpers/polished'

// TODO: move to main theme in zeus
const primaryColor = '#333'
const secondaryColor = theme('colors.gold')
const mediumGreyColor = '#979797'
const borderColor = transparentize(0.8, mediumGreyColor)
const overlayBackdropColor = withProp(
  'theme.colors.black',
  transparentize(0.25)
)
const Sizes = {
  marbodalXs: '14px',
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
      color: '#333',
    },
    preamble: {
      color: primaryColor,
    },
    paragraph: {
      color: primaryColor,
    },
    title: {
      color: primaryColor,
      fontSize: rem(20),
      fontSizeDesktop: rem(20),
    },
    pageTitle: {
      color: '#333',
      fontSize: '42px',
      lineHeight: '48px',
      mobile: {
        fontSize: '30px',
        lineHeight: '38px',
      },
    },
  },
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    mediumGrey: mediumGreyColor,
    border: borderColor,
    price: primaryColor,
    compareHeader: primaryColor,
  },
  breakpoints: {
    lg: 1280,
  },
  overlay: {
    lightbox: {
      backdrop: overlayBackdropColor,
    },
  },
  button: {
    borderWidth: '1px',
    borderLeftPosition: '0',
    borderRightPosition: '0',
    padding: switchProp('size', {
      small: css`
        ${rem(10)} ${rem(40)};
      `,
      normal: css`
        ${rem(15)} ${rem(45)};
      `,
      large: css`
        ${rem(20)} ${rem(50)};
      `,
    }),
  },
  header: {
    title: {
      textTransform: 'none',
      letterSpacing: '0px',
    },
    mobile: {
      maxWidth: '100%',
    },
    layout: 'left',
    maxWidth: '80%',
  },
  collapse: {
    fontWeight: '700',
    border: {
      color: '#ddd',
    },
  },
  app: {
    margin: '0 80px 0 80px',
  },
  wishListButton: {
    marginTop: '-10px',
    marginRight: '-20px',
    width: '40px!important',
    backgroundColor: '#fff',
    paddingLeft: '7px!important',
    height: '38px',
    borderRadius: '50%',
    marginLeft: '5px',
    iconSize: '16px',
    prodPageIconSize: '21px',
    wishListBackground: {
      backgroundColor: 'transparent',
    },
  },
  productViewTable: {
    fontSize: Sizes.marbodalXs,
  },
  subHeadline: {
    color: '#333',
    fontSize: '28px !important',
    lineHeight: '35px !important',
    mobile: {
      fontSize: '21px !important',
      lineHeight: '26px !important',
    },
  },
  paging: {
    paddingTop: '0.6rem!important',
  },
  container: {
    medium: {
      width: 'auto',
    },
  },
  preamble: {
    color: '#333',
    fontSize: '21px',
    fontWeight: '300',
    fontSizeMobil: '18px',
    lineHeightMobil: '28px',
  },
  pageTitleMobile: {
    fontSize: '30px',
    lineHeight: '38px',
  },

  price: {
    color: '#333',
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
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  background: {
    backgroundColor: '#f2eee5',
  },
  categoryCard: {
    fontFamily: 'Ginger',
    backgroundColor: '#f4f2f0',
    title: {
      fontSize: '18px',
    },
  },
  styledHeadline: {
    fontSize: '28px',
    textTransform: 'lowercase',
    mobile: {
      fontSize: '21px',
    },
  },
  productCard: {
    column: {
      mobile: {
        marginTop: '16px',
      },
    },
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '22px',
    mobile: {
      fontFamily: '16px',
    },
    code: {
      fontSize: '16px',
      lineHeight: '22px',
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
      fontSize: '18px',
      lineHeight: '22px',
      fontWeight: 'bold',
    },
    price: {
      fontSize: Sizes.marbodalXs,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      mobile: {
        fontSize: Sizes.marbodalXs,
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
    fontFamily: 'Ginger',
  },
  categories: {
    price: {
      fontSize: '16px',
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
    cta: {
      content: {
        margin: '30px 0 40px 0',
      },
    },
    color: '#333',
    title: {
      color: '#333',
    },
  },
}
