var homedata = require('./data/home');
var recommend1 = require('./data/recommend1');
var recommend2 = require('./data/recommend2');
var recommend3 = require('./data/recommend3');
var searchKey = require('./data/searchKey');
var search = require('./data/search');
var detail = require('./data/352876');
var catalog = require('./data/chapter-list');
var data1 = require('./data/data1');
var data2 = require('./data/data2');
var data3 = require('./data/data3');
var data4 = require('./data/data4');
var data = {
    '/api/home': homedata,
    '/api/scroll1': recommend1,
    '/api/scroll2': recommend2,
    '/api/scroll3': recommend3,
    '/api/scroll4': recommend4(),
    '/api/search': search,
    '/api/searchKey': searchKey,
    '/api/detail?id=352876': detail,
    '/api/chapterlist?id=352876': catalog,
    '/api/data1': data1,
    '/api/data2': data2,
    '/api/data3': data3,
    '/api/data4': data4
};
module.exports = function(url) {
    return data[url];
};

function recommend4() {
    return { code: 0 };
}