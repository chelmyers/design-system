import Component from '@ember/component';
import ENV from '../config/environment';
import beautify from '../utils/beautify';

export default Component.extend({
	classNames: ['component-demo'],

	codeOnly: false,
	rootURL: ENV.rootURL,
	standalone: false,
	standaloneDevice: null,

	showHTML: false,
	showHBS: true,

	didInsertElement() {
		const $component = this.$('.component-demo__rendered').clone();

		$component.find('.ember-view').removeAttr('id').removeClass('ember-view');

		this.set('code', beautify($component.html()));

		this.toggleView(this.get('name'));
	},

	click(event) {
		if (event.target.classList.contains('component-demo__fullscreen')) {
			this.send('closeFullscreen');
		}
	},

	actions: {
		closeFullscreen() {
			this.set('standaloneDevice', null);
		},
		showFullscreen(device) {
			this.set('standaloneDevice', device);
		},
		onTabChange(tab) {
			const isHBS = tab.element.innerText.includes('HBS');
			
			this.toggleView(isHBS);
		}
	},

	toggleView(showHBS) {
		this.set('showHBS', showHBS);
		this.set('showHTML', !showHBS);
	}
});
