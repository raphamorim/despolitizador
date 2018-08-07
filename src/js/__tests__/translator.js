import { translate } from '../translator';
import library from '../../library.json';

describe('translate', () => {
  test('the input with a single word', () => {
    const inputText = 'vossa excelencia';

    expect(translate(library, inputText)).toBe('mano');
  });

  test('the input with multiple words', () => {
    const inputText = 'vossa excelência é um estadista';

    expect(translate(library, inputText)).toBe('mano é um membro da casta mais alta');
  });

  test('the input with accent words', () => {
    const inputText = 'vossa excelência é um estadista';

    expect(translate(library, inputText)).toBe('mano é um membro da casta mais alta');
  });

  test('the input with unaccented word', () => {
    const inputText = 'usucapiao';

    expect(translate(library, inputText)).toBe('tomou de assalto');
  });
});
