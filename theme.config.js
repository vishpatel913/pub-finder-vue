module.exports = {
  // The prefix to use on all css classes from ant.
  'ant-prefix': 'ant',

  '@theme-primary': '#1da57a',
  '@theme-primary-light': '#42b983',
  '@theme-primary-dark': '#3b8070',
  '@theme-red': '#fc224c',
  '@theme-yellow': '#ffeb3b',
  '@theme-gold': '#ffc72d',
  '@theme-green': '#a0ff55',
  '@theme-cyan': '#09ecaf',
  '@theme-blue': '#3d7fff',
  '@theme-purple': '#7c4dff',
  '@theme-pink': '#f84186',
  '@theme-grey': '#2c3e50',
  '@theme-beige': '#f7f4ef',

  // Colors
  'gold-6': '#ffc72d',
  'green-6': '#09ecaf',
  'blue-6': '#3d7fff',
  'red-6': '#f84186',
  'grey-6': '#2c3e50',
  'white-6': '#f7f4ef',

  'primary-color': '@theme-primary',
  'info-color': '@theme-blue',
  'success-color': '@theme-green',
  'processing-color': '@theme-blue',
  'error-color': '@theme-red',
  'highlight-color': '@theme-pink',
  'warning-color': '@theme-gold',
  'normal-color': '#d9d9d9',
  white: '#fff',
  black: '#000',

  // Links
  'link-color': '@theme-primary-dark',
  'link-decoration': 'none',
  'link-hover-decoration': 'none',

  // Background color for `<body>`
  'body-background': '#fff', // af1',
  // Base background color for most components
  'component-background': '#fff',
  'font-family':
    "'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
  'code-family': "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  'heading-color': 'fade(@primary-color, 85%)',
  'text-color': 'fade(@black, 65%)',
  'text-color-secondary': 'fade(@theme-grey, 60%)',
  'text-color-inverse': '@white',
  'icon-color-hover': 'fade(@black, 75%)',
  'heading-color-dark': 'fade(@white, 100%)',
  'text-color-dark': 'fade(@white, 85%)',
  'text-color-secondary-dark': 'fade(@white, 65%)',
  'font-variant-base': 'tabular-nums',
  'font-size-base': '16px',
  'font-size-lg': '@font-size-base + 4px',
  'font-size-sm': '12px',
  'line-height-base': '1',
  'border-radius-base': '4px',
  'border-radius-sm': '2px',

  // Vertical paddings
  'padding-lg': '24px', // containers
  'padding-md': '16px', // small containers and buttons
  'padding-sm': '8px', // Form controls and items
  'padding-xs': '4px', // small items

  // Vertical padding for all form controls
  'control-padding-horizontal': '8px',
  'control-padding-horizontal-sm': '4px',

  // // The background colors for active and hover states for things like
  // // list items or table cells.
  // 'item-active-bg': '@primary-1',
  // 'item-hover-bg': '@primary-1',
  //
  // // Iconfont
  // 'iconfont-css-prefix': 'anticon',
};
