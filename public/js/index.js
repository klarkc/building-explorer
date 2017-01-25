// Adjust viewport to position pop-ups
function adjustViewport() {
	// Width and Height post-load/resize
	let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let height= Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

	// Center pop-up
	let notificationPopup = document.getElementById('notification-popup');
	notificationPopup.classList.remove("hidden");
	notificationPopup.style.left = (width/2 - notificationPopup.clientWidth/2)+'px';
	notificationPopup.style.top = ((height/2 - notificationPopup.clientHeight/2)-20)+'px';
	notificationPopup.classList.add("hidden");
}

window.onresize = adjustViewport;

window.onload = function() {
	adjustViewport();

	// Start hidden
	document.getElementById('notification-popup').classList.add("hidden");
};