const sliderCardsDataTransform = (CMSdata) => {
	const data = [];
	CMSdata.forEach((card) => {
		data.push({
			titulo: card.nome,
			subtitulo: card.cargo + " | " + card.municipio + " - " + card.uf,
			corpo: card.texto,
		});
	});
	return data;
};

export { sliderCardsDataTransform };
