const storage = require('electron-json-storage');
const username = document.getElementById('account-username');
const password = document.getElementById('account-password');
const url = document.getElementById('settings-url');
const accountButton = document.getElementById('account-submit');
if(accountButton) accountButton.addEventListener('click', function (event) {
	if(event.type === 'click') {
		debugger;
		accountButton.disabled = true;
		let oldValue = accountButton.innerHTML;
		accountButton.innerHTML = "<img url='"+__dirname+"/../../css/Spinner.gif' class='spinner'/>Обработка";
		$.ajax({
			url: "http://"+url.value+"/api.php?target=ApiSupportTools.checkLogin",
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
				const account = {
					username: username.value,
					password: password.value,
					url: url.value
				};
				storage.set('account', account, function (err) {
					if (err) return console.error(err)
				});
				accountResponse[0].innerHTML = "Успешно запазихте информацията.";
				accountResponse[0].parentElement.parentElement.style.display = 'block';
				accountButton.disabled = false;
				accountButton.value = oldValue;
				accountButton.image = '';
			},
			error: function (response) {
				const error = JSON.parse(response.responseText);
				let accountResponse = jQuery(".account-response");
				accountResponse[0].innerHTML = error.message+" ("+error.type+")<br>Грешка: "+error.log_id+"<br>Заявка: "+error.requestLogID;
				accountResponse[0].parentElement.parentElement.style.display = 'block';
				accountButton.disabled = false;
				accountButton.innerHTML = oldValue;
			}
		});
	}
});