// assetsData.ts
import { menuData } from './Products';

export const PAGE_ASSETS = {
  HOME: [
    '/dish.png', '/dish1.png', '/dish2.png', '/dish3.png',
    '/Gemini_Generated_Image_6iqxc86iqxc86iqx_no_bg.png',
    '/02177287268058700000000000000000000ffffc0a8ac5dabe60f.mp4',
  ],
  ABOUT: [
    '/apout-img.png', '/philosophy.png', '/Rare-Abyssal-Treasures.png',
    '/Artisanal-Gold.png', '/cta-bg.png', '/family-group.png',
    '/02177332750425500000000000000000000ffffc0a8ac5dd01040.mp4',
  ],
  BOOKING: ['/Japanese-Ambience.png'],
  CHECKOUT: ['./The-Cart-is-empty .png', 'visa-card.png'],
  MENU: menuData.flatMap(category => [
    category.categoryImage,
    category.image3d,
    category.image3d2,
    ...category.items.map(item => item.image)
  ])
};