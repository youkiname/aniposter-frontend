let currentUser = getCurrentUser();

let authHeaders = null

if (currentUser != null) {
	authHeaders = {
		'Content-Type': 'application/json',
		'Authorization': currentUser.access_token
	};
}

function getCurrentUser() {
	let storageTempObject = localStorage.getItem('currentUser')
	if (storageTempObject == null) {
		return null;
	}
	return JSON.parse(storageTempObject);
}

function global_logout() {
	currentUser = null;
	localStorage.removeItem('currentUser');
}

function global_login(user_data) {
	currentUser = user_data;
	localStorage.setItem('currentUser', JSON.stringify(user_data));
}

export {currentUser, authHeaders, global_logout, global_login}
