/*
 * Variants represented by image urls
 * Urls can be base64 encoded 1x1 pngs to represent color
 */

const color = {
  Black:
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/black.jpg',
  'Stainless Steel':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/stainless_steel.jpg',
  White:
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/white.jpg',
  Slate:
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/slate.jpg',
  Cream:
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/cream.jpg',
  Cranberry:
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/cranberry.jpg',
  'Gloss Black':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/gloss_black.jpg',
  'Brushed Steel':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/brushed_steel.jpg',
  Chrome:
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/chrome.jpg',
}

const drillingWidth = {
  '128CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC128.png',
  '160CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC160.png',
  '192CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC192.png',
  '224CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC224.png',
  '248CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC248.png',
  '256CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC256.png',
  '320CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC320.png',
  '348CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC348.png',
  '448CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC448.png',
  '548CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC548.png',
  '848CC':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CC848.png',
}

const featureSize = {
  '1500 x 600 x 38':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/size-1500x600.png',
  '2400 x 900 x 38':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/size-2400x900.png',
  '3000 x 600 x 38':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/size-3000x600.png',
}

const size = {
  '60 cm':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CM60.png',
  '90 cm':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/CM90.png',
}

const hingeLocation = {
  'Left Hand Hinge':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/hinge-left.png',
  'Right Hand Hinge':
    'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Magnet/VariantImages/hinge-right.png',
}

module.exports = {
  color,
  size,
  features: {
    size: featureSize,
    product_color: color,
    drilling_width: drillingWidth,
    hinge_location: hingeLocation,
  },
}
