require('electron').remote.require('./js/api.js')
let buttonRemoveFromStorage = document.getElementById('remove-from-storage-submit');
if(buttonRemoveFromStorage) buttonRemoveFromStorage.addEventListener('click', function (event) {
	if(event.type === 'click') callAPI("removeFromStorage", "remove-from-storage-submit", "remove-from-storage-response", {
		"removeFromStorageCategory"	: document.getElementById('remove-from-storage-category').value,
		"removeFromStorageValueType": document.getElementById('remove-from-storage-value-type').value,
		"removeFromStorageValue" 	: document.getElementById('remove-from-storage-value').value
	});
});