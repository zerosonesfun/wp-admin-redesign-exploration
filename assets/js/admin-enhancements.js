import domReady from '@wordpress/dom-ready';

domReady(() => {
	const adminSidebar = document.querySelector('#adminmenumain');
	const collapseButton = document.querySelector('#collapse-button');
	const isRTL = document.body.classList.contains('rtl');

	const initialWidth = localStorage.getItem('wp-admin-sidebar-width') || 300;
	if (initialWidth < 175) {
		document.body.classList.add('folded');
	}

	function resize(e) {
		const width = isRTL ? window.innerWidth - e.clientX : e.clientX;
		document.body.classList.toggle('folded', width < 120);
		let newWidth = width;

		// in order to make the switch between the folded and unfolded sidebar smoother
		// we need to set the width to a fixed value when the sidebar is in the transition zone
		// this is the zone between 120px and 175px
		if (width < 120) {
			newWidth = 70;
		}

		if (width < 175 && width >= 120) {
			newWidth = 175;
		}

		// add a snap point at 300px
		if (width > 290 && width < 310) {
			newWidth = 300;
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

	collapseButton.addEventListener('click', () => {
		const isFolded = document.body.classList.contains('folded');
		const newFolded = !isFolded;

		localStorage.setItem('wp-admin-sidebar-width', newFolded ? 70 : 300);
		document.documentElement.style.setProperty(
			'--wp-sidebar-width',
			newFolded ? '70px' : '300px',
		);
	});
});
