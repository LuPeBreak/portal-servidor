/**
 * Função para calcular score de relevância de busca
 * Sistema de pontuação baseado em pesos:
 * - 100: Correspondência exata
 * - 90: Inicia com o termo
 * - 70: Contém o termo
 * - 30: Correspondência parcial por palavras
 */
export function calculateRelevanceScore(
	text: string,
	searchTerm: string,
): number {
	const textLower = text.toLowerCase();
	const termLower = searchTerm.toLowerCase();

	// Correspondência exata recebe pontuação máxima
	if (textLower === termLower) return 100;

	// Texto que inicia com o termo recebe alta pontuação
	if (textLower.startsWith(termLower)) return 90;

	// Texto que contém o termo recebe pontuação média
	if (textLower.includes(termLower)) return 70;

	// Busca por correspondência parcial - verifica palavras individuais
	let score = 0;
	const words = termLower.split(" ");

	for (const word of words) {
		if (textLower.includes(word)) {
			score += 30 / words.length;
		}
	}

	return score;
}

/**
 * Função para buscar em arrays de palavras-chave
 * Retorna a maior pontuação de relevância encontrada
 */
export function searchInKeywords(
	keywords: string[] | undefined,
	searchTerm: string,
): number {
	if (!keywords) return 0;

	let maxScore = 0;
	for (const keyword of keywords) {
		const score = calculateRelevanceScore(keyword, searchTerm);
		maxScore = Math.max(maxScore, score);
	}
	return maxScore;
}
