export const NavAbsolutePathItems = {
  HOME: '/',
  PROFILE: '/profile',
  SEARCH: '/search',
  LIST: '/list',
  VIDEO_ADD: '/search/add',
  PLAY: '/list/play',
  VIDEO_EDIT: '/list/play/edit',
}

export const screenSizeString = {
  XS: 'xs',
  SM: 'sm',
  LSM: 'lsm',
  SMD: 'smd',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
}

export const screenSizeWidth = {
  XS: 768,
  SM: 1024,
  LSM: 1180,
  SMD: 1280,
  MD: 1440,
  LG: 1920,
  XL: 2560,
}

export const youtubeVideoPrefixURL = 'https://www.youtube.com/watch?v='

export const isFirstConstants = {
  FIRST: 'FIRST' as const,
  NOTFIRST: 'NOT_FIRST' as const,
  P_FIRST: 'p_first' as const,
  V_FIRST: 'v_first' as const,
}
