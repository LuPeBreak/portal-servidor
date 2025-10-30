/**
 * Pluraliza uma palavra baseada na quantidade
 * @param count - Número para determinar se deve usar singular ou plural
 * @param singular - Forma singular da palavra
 * @param plural - Forma plural da palavra
 * @returns A palavra no singular ou plural baseada no count
 */
export function pluralize(
	count: number,
	singular: string,
	plural: string,
): string {
	return count === 1 ? singular : plural;
}

/**
 * Formata um número de resultados com pluralização
 * @param count - Número de resultados
 * @returns String formatada com o número e a palavra pluralizada
 */
export function formatResultsCount(count: number): string {
	return `${count} ${pluralize(count, "resultado", "resultados")}`;
}

/**
 * Formata a mensagem de resultados de busca
 * @param totalResults - Número total de resultados
 * @param searchTerm - Termo pesquisado
 * @param hasResults - Se há resultados ou não
 * @returns Mensagem formatada para exibir ao usuário
 */
export function formatSearchMessage(
	totalResults: number,
	searchTerm: string,
	hasResults: boolean,
): string {
	if (!hasResults) {
		return `Nenhum resultado encontrado para "${searchTerm}"`;
	}

	const foundText = pluralize(totalResults, "encontrado", "encontrados");
	return `${formatResultsCount(totalResults)} ${foundText} para "${searchTerm}"`;
}
