// Custom element to observe rooms
AFRAME.registerComponent('camera-control', 
{
	schema: {
		notificationEl: {default: ''},
		rayLength: {type: 'float', default: 5.0}
	},
	init: function () {
		// Keep Notify PopUp reference, and track fading timer/room being observed
		this.el.notifyPopup = document.getElementById(this.data.notificationEl);
		this.el.notifyPopup.fadingTimer = false;
		this.el.observedRoom = null;

		// General raycaster properties; ray length = 5.0
		//this.el.components.raycaster.data.objects = ".point-of-interest";
		//this.data.this.el.components.raycaster.refreshObjects();
		this.el.components.raycaster.raycaster.far = this.data.rayLength;

		// Capture raycaster-intersection event to start observing a room, if not yet being observed
		this.el.addEventListener('raycaster-intersection', function (evt) {

			let cursorEl = evt.detail.target;

			// No room being observed, set this to current and fade in popup
			if (cursorEl.observedRoom == null) {
				// Start observing this room
				let room = evt.detail.els[0];
				cursorEl.observedRoom = room;

				// Kill fading timer if existant to prevent hiding it afterwards
				if (cursorEl.notifyPopup.fadingTimer) clearTimeout(cursorEl.notifyPopup.fadingTimer);

				// Remove hidden and wait a cycle to fade in (ms= 0)
				cursorEl.notifyPopup.classList.remove("hidden");
				let currTop = parseFloat(cursorEl.notifyPopup.style.top);

				// Schedule animation immediately (slide up/fade in)
				setTimeout(function(){
					cursorEl.notifyPopup.style.top = (currTop-20)+'px';
					cursorEl.notifyPopup.style.opacity = 1;
				}, 0);
			}
		});

		// Capture raycaster-intersection-cleared to clear observed room and dismiss notification popup
		this.el.addEventListener('raycaster-intersection-cleared', function (evt) {
			//var cameraPos = this.el.parentNode.object3D.position;
			//console.log('dist',this.el.object3D.position.distanceTo(this.el.observedRoom.object3D.position));

			// Set style to play slide down/fade out effect, and hide it roughly 2sec afterwards
			let cursorEl = evt.detail.target;
			var notifyPopup = cursorEl.notifyPopup;

			let currTop = parseFloat(notifyPopup.style.top);

			notifyPopup.style.top = (currTop+20)+'px';
			notifyPopup.style.opacity = 0;

			cursorEl.observedRoom = null;
			notifyPopup.fadingTimer = setTimeout(function(){
				notifyPopup.classList.add("hidden");
			}, 1900);
		});
	}
});