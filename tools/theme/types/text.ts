interface Typography {
  value: string;
  type: string;
}

interface ResponsiveTypography {
  value: {
    mobile: number;
    desktop: number;
  };
  type: string;
}

export interface Text {
  weight: {
    cardTitle: Typography;
    button: Typography;
    tabsLabel: Typography;
    link: Typography;
    title1: Typography;
    title2: Typography;
    indicator: Typography;
    navigationBar: Typography;
    text5: Typography;
    text6: Typography;
    text7: Typography;
    text8: Typography;
    text9: Typography;
    text10: Typography;
  };
  size: {
    tabsLabel: ResponsiveTypography;
    title2: ResponsiveTypography;
  };
  lineHeight: {
    tabsLabel: ResponsiveTypography;
    title2: ResponsiveTypography;
  };
}
