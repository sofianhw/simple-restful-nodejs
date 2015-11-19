var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HewanSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Hewan', HewanSchema);