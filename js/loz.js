var lozData = [
	{begin: new Date(2003, 6, 01), name: 'Rdrunner', time: '34:04'},
	{begin: new Date(2012, 3, 30), name: 'hal_yotsuba (はる＠よつば)', time: '33:14'},
	{begin: new Date(2012, 5, 5), name: 'Darkwing Duck', time: '32:52'},
	{begin: new Date(2012, 5, 16), name: 'Darkwing Duck', time: '32:46'},
	{begin: new Date(2012, 5, 26), name: 'Darkwing Duck', time: '32:45'},
	{begin: new Date(2012, 6, 1), name: 'Darkwing Duck', time: '32:31'},
	{begin: new Date(2012, 6, 5), name: 'Darkwing Duck', time: '32:20'},
	{begin: new Date(2012, 6, 11), name: 'Darkwing Duck', time: '32:04'},
	{begin: new Date(2013, 1, 3), name: 'hal_yotsuba (はる＠よつば)', time: '31:35'},
	{begin: new Date(2013, 7, 24), name: 'Darkwing Duck', time: '31:25'},
	{begin: new Date(2014, 4, 20), name: 'Darkwing Duck', time: '31:07'},
	{begin: new Date(2014, 6, 9), name: 'LackAttack24', time: '31:02'},
	{begin: new Date(2014, 7, 30), name: 'Darkwing Duck', time: '30:37'},
	{begin: new Date(2015, 0, 23), name: 'Darkwing Duck', time: '30:29'},
	{begin: new Date(2015, 1, 7), name: 'LackAttack24', time: '30:25'},
	{begin: new Date(2015, 1, 10), name: 'Darkwing Duck', time: '30:16'},
	{begin: new Date(2015, 1, 27), name: 'LackAttack24', time: '30:06'},
	{begin: new Date(2015, 2, 31), name: 'LackAttack24', time: '29:56'},
	{begin: new Date(2015, 7, 21), name: 'LackAttack24', time: '29:50'},
	{begin: new Date(2015, 8, 15), name: 'LackAttack24', time: '29:48'},
	{begin: new Date(2015, 8, 21), name: 'LackAttack24', time: '29:36'},
	{begin: new Date(2015, 8, 29), name: 'LackAttack24', time: '29:33'},
	{begin: new Date(2015, 9, 19), name: 'LackAttack24', time: '29:24'},
	{begin: new Date(2015, 9, 30), name: 'LackAttack24', time: '29:19'},
	{begin: new Date(2015, 10, 19), name: 'LackAttack24', time: '29:13'},
	{begin: new Date(2015, 10, 21), name: 'LackAttack24', time: '29:11'},
	{begin: new Date(2015, 11, 2), name: 'LackAttack24', time: '29:04'},
	{begin: new Date(2015, 11, 9), name: 'LackAttack24', time: '28:50'},
	{begin: new Date(2016, 5, 26), name: 'Eunos', time: '28:42'},
	{begin: new Date(2016, 9, 26), name: 'Eunos', time: '28:40'},
	{begin: new Date(2016, 10, 2), name: 'Eunos', time: '28:35'},
	{begin: new Date(2017, 1, 13), name: 'LackAttack24', time: '28:19'},
	{begin: new Date(2017, 1, 21), name: 'Eunos', time: '28:12'},
	{begin: new Date(2017, 2, 3), name: 'Eunos', time: '28:08'},
	{begin: new Date(2017, 2, 8), name: 'Eunos', time: '28:03'},
	{begin: new Date(2017, 3, 8), name: 'Eunos', time: '28:02'},
	{begin: new Date(2017, 5, 27), name: 'LackAttack24', time: '28:01'},
	{begin: new Date(2017, 5, 27), name: 'LackAttack24', time: '27:57'}
];

jQuery(document).ready(function() {
	zeldaHistoryChart(lozData, '#loztimeline', '#lozpopup');
});
