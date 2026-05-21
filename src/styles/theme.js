/* Ant Design 5.x ConfigProvider theme — mirrors design tokens */
const nitTheme = {
  token: {
    /* Brand */
    colorPrimary:  '#1E3869',
    colorSuccess:  '#52C41A',
    colorWarning:  '#FAAD14',
    colorError:    '#FF4D4F',
    colorInfo:     '#1677FF',
    colorLink:     '#1677FF',

    /* Typography */
    fontFamily:
      "'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, " +
      "'Noto Sans', 'Noto Sans Thai', sans-serif",
    fontSize: 14,
    lineHeight: 1.5714,

    /* Shape */
    borderRadius: 6,

    /* Surfaces */
    colorBgBase:      '#FFFFFF',
    colorBgLayout:    '#F0F2F5',
    colorBgContainer: '#FFFFFF',
    colorBgElevated:  '#FFFFFF',

    /* Text */
    colorText:          '#262626',
    colorTextSecondary: '#595959',
    colorTextTertiary:  '#8C8C8C',
    colorTextDisabled:  '#BFBFBF',

    /* Border */
    colorBorder:      '#D9D9D9',
    colorBorderSecondary: '#F0F0F0',

    /* Control height */
    controlHeight: 32,

    /* Motion */
    motionDurationFast: '0.1s',
    motionDurationMid:  '0.2s',
    motionDurationSlow: '0.3s',
    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  components: {
    Menu: {
      itemSelectedBg:    '#E8EDF5',
      itemSelectedColor: '#1E3869',
    },
    Table: {
      headerBg:    '#FAFAFA',
      rowHoverBg:  '#F5F7FA',
    },
    Button: {
      defaultBorderColor: '#D9D9D9',
    },
  },
}

export default nitTheme
