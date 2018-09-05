function zeldaHistoryChart(rawData, chartSelector, title, scaleMin) {
	function setEnds(ary) {
		ary[ary.length - 1]['end'] = new Date();
		for(var i = ary.length - 2; i >= 0; --i) {
			ary[i]['end'] = ary[i + 1].begin
		}
	}

	function convertTime(s) {
		var c = s.split(':');
		var secs = c[0] * 60 + c[1] * 1;
		return secs;
	}

	function timeText(secs) {
		var s = secs % 60;
		var m = ((secs - s) % 3600) / 60;
		var h = (secs - s - m * 60) / 3600;
		if(h) {
			ret = h.toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');
		} else if(m) {
			ret = m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');
		} else {
			ret = "00:" + s.toString().padStart(2, '0');
		}
		return ret;
	}

	function getDateSlices(ary) {
		var ret = {
			x: [],
			y: [],
			text: [],
			hoverinfo: 'text',
			type: 'scatter',
			mode: 'lines+markers',
			marker: {
				size: 8,
			},
			line: {
				shape: 'hv',
			},
		};
		for(var idx in ary) {
			var row = ary[idx];
			ret.x.push(row.begin.toISOString());
			ret.y.push(convertTime(row.time));
			ret.text.push(row.name + ': ' + row.time + " on " + row.begin.toLocaleDateString());
		}
		ret.x.push((new Date()).toISOString());
		ret.y.push(ret.y[ret.y.length - 1]);
		ret.text.push(ret.text[ret.text.length - 1]);
		return ret;
	}

	setEnds(rawData);
	var dateSlices = getDateSlices(rawData);
	var data = [
		dateSlices,
	];

	/*  Calculate Y axis ticks */
	var scaleMin = 1;
	var maxTime = convertTime(rawData[0].time);
	var minTime = convertTime(rawData[rawData.length - 1].time);
	var maxTimeRoundedUp = ((Math.floor(maxTime / 60) / scaleMin) + 1) * scaleMin * 60;
	var minTimeRoundedDown = (Math.floor(minTime / 60) / scaleMin) * scaleMin * 60;
	var nticks = Math.floor((maxTimeRoundedUp / 60 / scaleMin) - (minTimeRoundedDown / 60 / scaleMin) + 1);
	var tickVals = [];
	var tickText = [];
	for(var i = 0; i < nticks; ++i) {
		var tick = i * 60 * scaleMin + minTimeRoundedDown;
		tickVals.push(tick);
		tickText.push(timeText(tick));
	}

	while(tickVals.length > 20) {
		for(var i = tickVals.length - 2; i > 0; i -= 2) {
			tickVals.splice(i, 1);
			tickText.splice(i, 1);
		}
	}

	var layout = {
		title: title,
		xaxis: {
			title: 'Date',
		},
		yaxis: {
			title: 'Time achieved',
			tickmode: 'array',
			tickvals: tickVals,
			ticktext: tickText,
			range: [tickVals[0], tickVals[tickVals.length - 1]],
		},
	}

	Plotly.newPlot(chartSelector, data, layout);

}
