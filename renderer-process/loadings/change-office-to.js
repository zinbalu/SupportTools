const changeOfficeToButton = document.getElementById('change-office-to-submit');
const username = document.getElementById('account-username');
const password = document.getElementById('account-password');
if(changeOfficeToButton) changeOfficeToButton.addEventListener('click', function (event) {
	if(event.type === 'click') $.ajax({
		url: "htt://work-1.ee/api.php?SupportTools.changeOfficeTo",
		dataType: "json",
		type: "POST",
		data: JSON.stringify({someParameter: "some value"}),
		contentType: "application/json; charset=utf-8",
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username.value + ":" + password.value));
		},
		success: function (data) {
			alert(data);
		},
		error: function (data) {
			alert("error "+data);
		}
	});
});
