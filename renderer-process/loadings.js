require('electron').remote.require('./js/api.js')

let buttonOfficeTo = document.getElementById('office-to-submit');
if(buttonOfficeTo) buttonOfficeTo.addEventListener('click', function (event) {
	if(event.type === 'click') callAPI("changeOfficeTo", "office-to-submit", "office-to-response", {
		"officeToLoadingValueType"	: document.getElementById('office-to-loading-value-type').value,
		"officeToLoadingValue" 		: document.getElementById('office-to-loading-value').value,
		"officeToValueType" 		: document.getElementById('office-to-value-type').value,
		"officeToValue" 			: document.getElementById('office-to-value').value
	});
});

let buttonZeroStatus = document.getElementById('zero-status-submit');
if(buttonZeroStatus) buttonZeroStatus.addEventListener('click', function (event) {
	if(event.type === 'click') callAPI("cancelZeroStatus", "zero-status-submit", "zero-status-response", {
		"zeroStatusValueType"		: document.getElementById('zero-status-value-type').value,
		"zeroStatusValue" 			: document.getElementById('zero-status-value').value
	});
});