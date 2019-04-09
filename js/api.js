function callAPI(method, submitButtonID, responseAreaID, params, doNotPrintResponse){
	if(!empty(doNotPrintResponse)) doNotPrintResponse = true;
	const storage = require('electron-json-storage-sync');
	const account = storage.get('account').data;
	let responseArea = document.getElementById(responseAreaID);
	let submitButton = document.getElementById(submitButtonID);
	let oldValue = submitButton.innerHTML;
	submitButton.disabled = true;
	submitButton.innerHTML = '<div style="white-space: nowrap; margin-left: -21px; margin-top: -7px;">' +
		'<img src="css/loading.gif" style="vertical-align: middle;"/>' +
		'<span style="vertical-align: middle;">Обработка</span>' +
		'</div>';
	$.ajax({
		url: "http://"+account.server+"/api.php?target=ApiSupportTools."+method,
		dataType: "json",
		type: "POST",
		data: JSON.stringify(params),
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(account.username+":"+account.password));
			// xhr.setRequestHeader('Cookie', "XDEBUG_SESSION=PHPSTORM");
		},
		success: function (response) {
			if(response.status !== 'Success') console.log(response.status);
			if(doNotPrintResponse) return response
			else responseArea.innerHTML = response.result;
			let responseAreaPre = responseArea.parentElement;
			if(responseAreaPre.classList.contains('shelf-response-error')) responseAreaPre.classList.remove('shelf-response-error');
			responseAreaPre.parentElement.style.display = 'block';
			submitButton.disabled = false;
			submitButton.innerHTML = oldValue;
		},
		error: function (response) {
			const error = JSON.parse(response.responseText);
			// noinspection JSUnresolvedVariable
			responseArea.innerHTML = error.message+" ("+error.type+")<br>Грешка: "+error.log_id+"<br>Заявка: "+error.requestLogID;
			let responseAreaPre = responseArea.parentElement;
			if(!responseAreaPre.classList.contains('shelf-response-error')) responseAreaPre.classList.add('shelf-response-error');
			responseAreaPre.parentElement.style.display = 'block';
			submitButton.disabled = false;
			submitButton.innerHTML = oldValue;
		}
	});
}

// noinspection JSUnusedGlobalSymbols
function openWithPostParams(url, params, target, windowParams, useGet) {
	console.log('blah')
	let form = document.createElement('form');
	if(!url) return false;
	params = params || {};
	for(let i in params) {
		let inp = document.createElement('input');
		inp.type = 'hidden';
		inp.name = i;
		// noinspection JSUnfilteredForInLoop
		inp.value = params[i];
		form.appendChild(inp);
	}
	
	form.method = empty(useGet) ? 'POST' : 'GET';
	
	if(url.indexOf('?') === -1) {
		url = url + '?__random_param='+Math.random();
	} else {
		url = url + '&__random_param='+Math.random();
	}
	form.action = url;
	
	form.style.display = 'none';
	document.body.appendChild(form);
	let windowName = 'wnd_'+Math.floor(Math.random()*3241234441414141); //v IE ne ba4ka ako v imeto ima - zatova e korigirano na _
	let wnd = '';
	if(target && target === 'window') {
		windowParams = windowParams || 'width=500,height=400,resizeable,scrollbars';
		wnd = window.open("", windowName, windowParams);
		form.target = windowName;
	} else if ( typeof(target) === 'string' && target ) {
		wnd = false;
		form.target = target;
	} else {
		wnd = window.open('',windowName,windowParams);
		form.target = windowName;
	}
	
	form.submit();
	document.body.removeChild(form);
	return wnd;
}

function empty(p) {return p===0 || !p || (typeof(p) === 'object' && jQuery.isEmptyObject(p));}