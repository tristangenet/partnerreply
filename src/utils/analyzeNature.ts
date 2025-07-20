export type Nature = 'Graphique' | 'Fonctionnelle';

export function analyzeNature(message: string): Nature {
  const keywordsGraphique = [
    'css', 'js', 'javascript', 'html', 'couleur', 'design', 'modification graphique', 'bouton',
    'image', 'alignement', 'mobile', 'desktop', 'padding', 'mise en page', 'visuel', 'police'
  ];
  const lower = message.toLowerCase();
  for (const kw of keywordsGraphique) {
    if (lower.includes(kw)) return 'Graphique';
  }
  return 'Fonctionnelle';
}
