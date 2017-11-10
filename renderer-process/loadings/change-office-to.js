const changeOfficeToButton = document.getElementById('change-office-to-submit');
if(changeOfficeToButton) changeOfficeToButton.addEventListener('click', function (event) {
	if(event.type === 'click') $.ajax({
		url: "htt://work-1.ee/api.php?SupportTools.changeOfficeTo",
		dataType: "json",
		type: "POST",
		data: JSON.stringify({someParameter: "some value"}),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert(data);
		},
		error: function (data) {
			alert("error "+data);
		}
	});
});
