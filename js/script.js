$(document).ready(function(){
	sendReview();
	
});

function sendReview() {
	$('.sideRevSubmit').click(function() {
		var form = $(this).parent('.sidebarReview');
		var error = false; // предварительно ошибок нет
		var review = form.find('textarea').val();
		var curUrl = window.location.href;

		if ( !review.length ) {
			alert("Напишите, пожалуйста, отзыв");
			error = true;
		}

		if ( !error ) { // если ошибки нет
			var data = "review=" + encodeURIComponent(review) 
						+ "&cur_url=" + encodeURIComponent(curUrl);
			$.ajax({ // инициализируем ajax запрос
				type: 'POST', // отправляем в POST формате, можно GET
				url: '/sendreview.php', // путь до обработчика, у нас он лежит в той же папке
				dataType: 'json', // ответ ждем в json формате
				data: data, // данные для отправки
				beforeSend: function(data) { // событие до отправки
					form.find('.sideRevSubmit').attr('disabled', 'disabled');
				},
				success: function(data) { // событие после удачного обращения к серверу и получения ответа
					if ( !data['error'] ) { // если все прошло ок
						alert("Отзыв успешно отправлен. Я вам благодарен!");
						form.find('textarea').val('');
					}
					else {
						alert("Сервер сообщил: " + data['error']);
					}
				},
			   	error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
					alert('Ошибка! Отправка данных не удалась'); // покажем ответ сервера
				},
			   	complete: function(data) { // событие после любого исхода
					form.find('.sideRevSubmit').prop('disabled', false); // в любом случае включим кнопку обратно
				}
			});
		}
	});
}