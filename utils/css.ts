export function generateCssVariables(theme: any): string {
  let cssVariables = '';

  const processObject = (obj: any, prefix: string = '') => {
    for (const key in obj) {
      const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
      if (key === 'value' && typeof obj[key] === 'string') {
        cssVariables += `--${prefix.slice(0, -1)}: ${obj[key]};\n`;
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        processObject(obj[key], `${prefix}${kebabKey}-`);
      }
    }
  };

  processObject(theme);
  return cssVariables;
}