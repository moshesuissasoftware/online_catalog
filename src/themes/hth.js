import { rem, theme } from '@nobia/zeus-components/lib/styled'

export default {
  breadcrumbs: {
    fontSize: rem(12),
    textTransform: theme('typography.paragraph.textTransform'),
    default: {
      color: '#a2a2a2',
      colorHover: theme('colors.link'),
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
  productCard: {
    title: {
      fontSize: rem(16),
      fontWeight: 400,
    },
    price: {
      fontSize: rem(14),
    },
  },
  price: {
    color: '#a2a2a2',
  },
  wishlist: {
    summary: {
      fontWeight: 500,
    },
  },
}
