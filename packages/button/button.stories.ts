import '.'

export default {
  title: 'Componentes/ButtonWebComponent',
  argTypes: {
    themeType: { control: 'text' },
    tokenType: { control: 'text' },
  },
};

const Template = (args, { globals }) => {
  const botao = document.createElement('button-web-component');

  const themeType = args.themeType || globals.theme || 'dark';
  const tokenType = globals.theme || args.tokenType || 'movistar';

  botao.setAttribute('theme-type', themeType);
  botao.setAttribute('token-type', tokenType);

  return botao;
};

export const Padrao = Template.bind({});
Padrao.args = {
  themeType: 'dark',
  tokenType: 'o2',
};

Padrao.parameters = {};