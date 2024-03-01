interface TextPreset {
  mobileSize: number;
  desktopSize: number;
  mobileLineHeight: string;
  desktopLineHeight: string;
}

export const textPresets: { [key: string]: TextPreset } = {
  text1: {
    mobileSize: 12,
    desktopSize: 14,
    mobileLineHeight: '16px',
    desktopLineHeight: '20px',
  },
  text2: {
    mobileSize: 14,
    desktopSize: 16,
    mobileLineHeight: '20px',
    desktopLineHeight: '24px',
  },
  text3: {
    mobileSize: 16,
    mobileLineHeight: '24px',
    desktopSize: 18,
    desktopLineHeight: '24px',
  },
  text4: {
    mobileSize: 18,
    mobileLineHeight: '24px',
    desktopSize: 20,
    desktopLineHeight: '28px',
  },
  text5: {
    mobileSize: 20,
    mobileLineHeight: '24px',
    desktopSize: 28,
    desktopLineHeight: '32px',
  },
  text6: {
    mobileSize: 24,
    mobileLineHeight: '32px',
    desktopSize: 32,
    desktopLineHeight: '40px',
  },
  text7: {
    mobileSize: 28,
    mobileLineHeight: '32px',
    desktopSize: 40,
    desktopLineHeight: '48px',
  },
  text8: {
    mobileSize: 32,
    mobileLineHeight: '40px',
    desktopSize: 48,
    desktopLineHeight: '56px',
  },
  text9: {
    mobileSize: 40,
    mobileLineHeight: '48px',
    desktopSize: 56,
    desktopLineHeight: '64px',
  },
  text10: {
    mobileSize: 48,
    mobileLineHeight: '56px',
    desktopSize: 64,
    desktopLineHeight: '72px',
  },
};