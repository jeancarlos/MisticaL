// Importações necessárias
import '.'

export default {
  title: 'Componentes/MeuBotao',
  argTypes: {
    label: { control: 'text' },
  },
};

const Template = (args, { globals: { theme } }) => {
  const botao = document.createElement('meu-botao');
  botao.setAttribute('label', args.label);
  botao.setAttribute('theme', theme);
  return botao;
};
3

export const Padrao = Template.bind({});
Padrao.args = {
  label: 'Clique Aqui',
};

Padrao.parameters = {
};
