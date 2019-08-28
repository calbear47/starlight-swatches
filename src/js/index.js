import util from './util';
import '../scss/app.scss'; // Ensures that our scss is built and bundled on compilation.

function MyProject(str) {
	this.thing = str || 'happy-too';
}

MyProject.prototype.fooMethod = function() {
	return util.isString(this.thing);
};

module.exports = MyProject;
