var url_root = 'http://localhost:3000';

function listSources() {
	$.ajax({
		url: url_root+'/paginas',
		type: 'get',
		dataType: 'json',
		success: function(response) {
			fuentes = response.fuentes

			for (var i = 0; i < fuentes.length; i++) {
				f = fuentes[i];

				option_label = f.nombre
				option_value = f.clave;
				$('#fuentes').append('<option value="'+option_value+'">'+option_label+'</option>');
			
			};
		}
	});
}


function listNews(fuente) {
	$.ajax({
		url: url_root+'/'+fuente,
		type: 'get',
		dataType: 'json',
		beforeSend: function() {
			$('#respuesta').text('Estoy buscando tus noticias...');
		},
		success: function(response) {
			$('#respuesta').empty();
			for (var i = 0; i < response.length; i++) {
				news = response[i];
				n = "<div class=\"noticia\"><a href=\""+news.link+"\">"+news.title+"</a></div>";

				$('#respuesta').append(n);
			}
		}
	});
} 

$(document).ready(function() {
	listSources();
	$('#fuentes').change(function() {
		if($(this).val() == "none") {
			$('#respuesta').text("Seleccione una opción...")
		}
		else {
			$('#respuesta').empty();
			listNews($(this).val());
		}

	});
});