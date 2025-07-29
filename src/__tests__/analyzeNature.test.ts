import { analyzeNature } from '../utils/analyzeNature';

describe('analyzeNature', () => {
  it('detects graphique keyword', () => {
    expect(analyzeNature('Ce CSS doit changer la couleur')).toBe('Graphique');
  });

  it('defaults to Fonctionnelle', () => {
    expect(analyzeNature('Veuillez mettre a jour le plugin')).toBe('Fonctionnelle');
  });
});
