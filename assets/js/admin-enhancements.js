import domReady from '@wordpress/dom-ready';

domReady(() => {
	const adminSidebar = document.querySelector('#adminmenumain');

	function resize(e) {
		const width = e.clientX;
		document.body.classList.toggle('folded', width < 120);
		let newWidth = width;

		// in order to make the switch between the folded and unfolded sidebar smoother
		// we need to set the width to a fixed value when the sidebar is in the transition zone
		// this is the zone between 120px and 175px
		if (width < 120) {
			newWidth = 70;
		}

		if (width < 175) {
			newWidth = 175;
		}

		// add a max width of 500px to the sidebar
		if (newWidth > 500) {
			newWidth = 500;
		}

		// store the new width in local storage
		localStorage.setItem('wp-admin-sidebar-width', newWidth);
		document.documentElement.style.setProperty('--wp-sidebar-width', `${newWidth}px`);
	}

	if (adminSidebar) {
		const resizeHandle = document.createElement('div');
		resizeHandle.id = 'admin-sidebar-resize-handle';
		adminSidebar.appendChild(resizeHandle);

		resizeHandle.addEventListener('mousedown', function (e) {
			e.preventDefault();
			resizeHandle.classList.add('active');
			document.addEventListener('mousemove', resize);
			document.addEventListener('mouseup', () => {
				resizeHandle.classList.remove('active');
				document.removeEventListener('mousemove', resize);
			});
		});
	}
});
