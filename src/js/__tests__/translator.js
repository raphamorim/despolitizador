import { translate } from '../translator';

describe('translate', () => {
  test('the input with a single word', () => {
    const library = { 'vossa excelencia': 'mano' };
    const inputText = 'vossa excelencia';

    expect(translate(library, inputText)).toBe('mano');
  });

  test('the input with multiple words', () => {
    const library = {
      'vossa excelencia': 'mano',
      'estadista': 'membro da casta mais alta'
    };
    const inputText = 'vossa excelencia é um estadista';

    expect(translate(library, inputText)).toBe('mano é um membro da casta mais alta');
  });

  test('the input with accent words', () => {
    const library = {
      'vossa excelência': 'mano',
      'estadista': 'membro da casta mais alta'
    };
    const inputText = 'vossa excelência é um estadista';

    expect(translate(library, inputText)).toBe('mano é um membro da casta mais alta');
  });
});
