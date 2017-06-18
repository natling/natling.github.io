function refresh() {
	location.reload();
}

function setRefreshRate(interval_in_seconds) {
	setTimeout(refresh, interval_in_seconds * 1000);
}

setRefreshRate(60);