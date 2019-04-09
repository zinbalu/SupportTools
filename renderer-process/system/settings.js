const storage = require('electron-json-storage');
const username = document.getElementById('account-username');
const password = document.getElementById('account-password');
const server = document.getElementById('account-server');
const submitButton = document.getElementById('account-submit');
if(submitButton) submitButton.addEventListener('click', function (event) {
	if(event.type === 'click') {
		let responseArea = jQuery(".account-response")[0];
		let oldValue = submitButton.innerHTML;
		submitButton.disabled = true;
		submitButton.innerHTML = 	'<div style="white-space: nowrap; margin-left: -21px; margin-top: -7px;">' +
										'<img src="css/loading.gif" style="vertical-align: middle;"/>' +
										'<span style="vertical-align: middle;">Обработка</span>' +
									'</div>';
		$.ajax({
			url: "http://"+server.value+"/api.php?target=ApiSupportTools.checkLogin",
			dataType: "json",
			type: "POST",
			data: JSON.stringify({'test': 'me'}),
			contentType: "application/json; charset=utf-8",
			xhrFields: {
				crossDomain: true,
				withCredentials: true
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic " + btoa(username.value + ":" + password.value));
				// xhr.setRequestHeader('Cookie', "XDEBUG_SESSION=PHPSTORM");
			},
			success: function (response) {
				if(response.status !== 'Success') console.log(response.status);
				const account = {
					username: username.value,
					password: password.value,
					server: server.value
				};
				storage.set('account', account, function (err) {
					if (err) return console.error(err)
				});
				responseArea.innerHTML = "Успешно запазихте информацията.";
				responseAreaPre = responseArea.parentElement;
				if(responseAreaPre.classList.contains('shelf-response-error')) responseAreaPre.classList.remove('shelf-response-error');
				responseAreaPre.parentElement.style.display = 'block';
				submitButton.disabled = false;
				submitButton.innerHTML = oldValue;
			},
			error: function (response) {
				const error = JSON.parse(response.responseText);
				responseArea.innerHTML = error.message+" ("+error.type+")<br>Грешка: "+error.log_id+"<br>Заявка: "+error.requestLogID;
				responseAreaPre = responseArea.parentElement;
				if(!responseAreaPre.classList.contains('shelf-response-error')) responseAreaPre.classList.add('shelf-response-error');
				responseAreaPre.parentElement.style.display = 'block';
				submitButton.disabled = false;
				submitButton.innerHTML = oldValue;
			}
		});
	}
});