// const electron = require('electron');
const { remote } = require('electron');
remote.require('./js/api.js');
// const api = electron.remote.require("./js/api.js")
// let key = '676a1c5461b3d304b63c0a822889234b'
let buttonViewLoading = document.getElementById('view-loading-submit');
if(buttonViewLoading) buttonViewLoading.addEventListener('click', function (event) {
	if(event.type === 'click'){
		// let fieldType = document.getElementById('view-loading-value-type').value
		// let fieldValue = document.getElementById('view-loading-value').value
		
		let url = callAPI("getDirectURLForPage", "view-loading-submit", "view-loading-response", {
			page : 'loading_order',
			identifier: document.getElementById('view-loading-value-type').value,
			identifierValue: document.getElementById('view-loading-value').value
		});
		//http://trunk.eol/page.php?page=loading_order&id='+fieldValue+'&login_id=12289&login_timestamp=123123&login_key='+getSHA1('12289123123676a1c5461b3d304b63c0a822889234b'))
		const BrowserWindow = require('electron').remote.BrowserWindow
		// const url = 'http://trunk.eol/page.php?page=loading_order&'+fieldType+'='+fieldValue+
		// 			'&login_id=12289'+
		// 			'&login_timestamp=123123'+
		// 			'&login_key=e6ae7141baee01eb9a973724040480db1278775a'
		const mainScreen = require('electron').screen.getPrimaryDisplay();
		// const dimensions = mainScreen.size;
		let win = new BrowserWindow({width: mainScreen.size.width, height: mainScreen.size.height - 50, icon: 'css/econt-logo.png'})
		win.setMenu(null);
		win.on('close', function () {win = null})
		// win.loadURL('http://trunk.eol/page.php?page=loading_order&id=2018050000000123&login_id=12289&login_timestamp=123123&login_key=e6ae7141baee01eb9a973724040480db1278775a')
		win.loadURL(url)
		win.show()
	}
});