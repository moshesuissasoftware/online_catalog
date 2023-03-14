import {
  rem,
  ifProp,
  withProp,
  switchProp,
  css,
} from '@nobia/zeus-components/lib/styled'
import { transparentize } from '@nobia/zeus-components/lib/helpers/polished'

// TODO: move to main theme in zeus
const primaryColor = '#1a1919'
const overlayBackdropColor = withProp(
  'theme.colors.black',
  transparentize(0.25)
)

export default {
  typography: {
    headline: {
      color: primaryColor,
    },
    subHeadline: {
      color: primaryColor,
    },
    preamble: {
      color: primaryColor,
    },
    paragraph: {
      color: primaryColor,
      marginBottom: rem(30),
    },
    title: {
      color: primaryColor,
      fontSize: rem(20),
      fontSizeDesktop: rem(20),
    },
    pageTitle: {
      color: primaryColor,
      marginBottom: rem(30),
      fontSize: ifProp('small', rem(30), rem(36)),
      lineHeight: ifProp('small', rem(33), rem(40)),
    },
  },
  colors: {
    primary: primaryColor,
    secondary: primaryColor, // makes sense
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
    borderRadius: rem(3),
    fontWeight: 400,
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
}
