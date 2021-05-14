// // & Size of ViewPorts
// const xs = '575';
const xs = '575';
const sm = '768';
const md = '992';
const lg = '1200';

const genMediaQuery = (viewPort, specificSize) => {
  switch (viewPort) {
    case 'xs':
      return `@media (max-width  : ${specificSize || xs}px )`;

    case 'sm':
      return `@media (max-width  : ${specificSize || sm}px)`;

    case 'md':
      return `@media (max-width  : ${specificSize || md}px)`;

    case 'lg':
      return `@media (max-width  : ${specificSize || lg}px)`;

    // case 'xl':
    //    return `@media (max-width  : ${specificSize || xl}px)`;
    default:
      return `@media (max-width  : ${specificSize || lg}px)`;
  }
};

const genBothQueries = (width, height, widthSize, heightSize) => {
  const xs = '425';
  const sm = '768';
  const md = '992';
  const lg = '1200';

  const heightSizes = {
    normal: '692',
    iPhoneX: '812',
    iPad: '1024',
    iPadPro: '1366'
  };

  switch (width) {
    case 'xs':
      return `@media (max-width  : ${widthSize ||
        xs}px ) and (min-height : ${heightSize || heightSizes[height]}px)`;

    case 'sm':
      return `@media (max-width  : ${widthSize ||
        sm}px ) and (min-height : ${heightSize || heightSizes[height]}px)`;

    case 'md':
      return `@media (max-width  : ${widthSize ||
        md}px ) and (min-height : ${heightSize || heightSizes[height]}px)`;

    case 'lg':
      return `@media (max-width  : ${widthSize ||
        lg}px ) and (min-height : ${heightSize || heightSizes[height]}px)`;

    default:
      return `@media (max-width  : ${widthSize || lg}px)`;
  }
};

export { genMediaQuery, genBothQueries };
