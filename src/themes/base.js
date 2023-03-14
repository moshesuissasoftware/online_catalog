import { prop, rem, withProp, theme } from '@nobia/zeus-components/lib/styled'
import {
  darken,
  lighten,
  transparentize,
} from '@nobia/zeus-components/lib/helpers/polished'

const primaryColor = '#333'
const mediumGreyColor = '#979797'
const borderColor = transparentize(0.8, mediumGreyColor)

export default {
  grid: {
    container: '1280px',
  },
  colors: {
    mediumGrey: mediumGreyColor,
    border: borderColor,
    borderPrimary: borderColor, // TODO: De-dupe. Used by ErrorMessage.
    compareHeader: theme('colors.primary'),
  },
  markdown: {
    header: {
      textAlign: 'center',
    },
    paragraph: {
      marginBottom: rem(20),
    },
  },
  breadcrumbs: {
    fontSize: rem(12),
    textTransform: theme('typography.paragraph.textTransform'),
    default: {
      color: withProp('theme.colors.primary', lighten(0.2)),
      colorHover: withProp('theme.colors.primary', darken(0.2)),
      colorMobile: theme('colors.link'),
      textDecoration: 'none',
      textDecorationHover: 'underline',
    },
    hasBackground: {
      color: theme('colors.backgroundPrimary'),
      colorHover: 'currentColor',
      textDecoration: 'none',
      textDecorationHover: 'underline',
    },
  },
  featureList: {
    title: {
      textTransform: 'uppercase',
      letterSpacing: '0.09em',
      fontWeight: 'normal',
      fontSize: rem(12),
    },
    data: {
      textTransform: 'none',
      letterSpacing: 'normal',
      fontWeight: 'bold',
      fontSize: rem(12),
    },
  },
  header: {
    title: {
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: `${theme('typography.pageTitle.fontSize')}`,
    },
    layout: 'center',
    maxWidth: `${theme('breakpoints.sm')}px`,
  },
  preamble: {
    color: theme('colors.primary'),
    fontSize: rem(16),
    fontWeight: 'normal',
  },
  productCard: {
    column: {
      mobile: {
        marginTop: 0,
      },
    },
    code: {
      fontSize: 'inherit',
      lineHeight: '1.5',
      color: 'inherit',
      fontWeight: 'inherit',
      marginTop: rem(15),
      marginBottom: rem(15),
      mobile: {
        fontSize: rem(15),
        marginTop: rem(15),
        marginBottom: rem(15),
      },
    },
    title: {
      fontSize: rem(18),
      textTransform: 'none',
      fontWeight: 'bold',
      marginTop: rem(15),
      marginBottom: rem(15),
      lineHeight: theme('pageTitle.lineHeight'),
      order: 'unset',
      mobile: {
        fontSize: theme('pageTitle.fontSizeMobilSm'),
      },
    },
    price: {
      fontSize: rem(15),
      order: 'unset',
      marginTop: rem(40),
      marginRight: 0,
      marginBottom: rem(30),
      mobile: {
        fontSize: '23px',
      },
    },
    bullets: {
      order: 'unset',
      marginTop: rem(20),
      marginBottom: rem(30),
    },
    preamble: {
      order: 'unset',
      marginTop: rem(15),
      marginBottom: rem(15),
    },
    infoBooking: {
      margin: '20px 0',
    },
  },
  price: {
    color: theme('colors.link'),
  },
  wishlist: {
    summary: {
      fontWeight: 700,
    },
  },
  filterList: {
    button: {
      color: theme('colors.white'),
      background: '#e7e6e6',
    },
  },
  categoryCard: {
    title: {
      fontSize: '16px',
    },
    preamble: {
      fontSize: '14px',
    },
  },
  categories: {
    row: {
      marginBottom: prop('theme.grid.gutter'),
    },
  },
  filterPage: {
    gutter: prop('theme.grid.gutter'),
  },
  promotions: {
    color: primaryColor,
    title: {
      color: primaryColor,
      fontSize: '35px',
      lineHeight: '40px',
      mobile: {
        fontSize: '23px',
        lineHeight: '28px',
      },
    },
    preamble: {
      fontSize: '16px',
      letterSpacing: '.17px',
      lineHeight: '26px',
      fontFamily: 'Ginger',
    },
    cta: {
      color: '#183c69',
      backgroundColor: 'transparent',
      fontFamily: 'Ginger',
      lineHeight: '26px',
      fontSize: '16px',
      fontWeight: 700,
    },
  },
}
