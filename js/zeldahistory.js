var zhGetMouse;

function zeldaHistoryChart(rawData, chartSelector, popupSelector) {
	function setEnds(ary) {
		ary[ary.length - 1]['end'] = new Date();
		for(var i = ary.length - 2; i >= 0; --i) {
			ary[i]['end'] = ary[i + 1].begin
		}
	}

	function getPlayerNames(data) {
		var ret = [];
		data.forEach(function(row) {
			if(-1 == ret.indexOf(row.name)) {
				ret.push(row.name);
			}
		});
		return ret;
	}

	function convertTime(s) {
		var c = s.split(':');
		var secs = c[0] * 60 + c[1] * 1;
		return secs;
	}

	function printSecs(secs) {
		var min = Math.floor(secs / 60)
		var sec = secs % 60;

		return min + ":" + (sec < 10 ? "0" + sec : sec);
	}

	function clearHighlight() {
		plotPlayer.entities().forEach(function(entity) {
			jQuery(entity.selection[0][0]).attr('stroke', 'rgba(0, 0, 0, 0)');
		});
	}

	function generateHighlighter(plot) {
		var highlight = new Plottable.Interactions.Pointer();
		highlight.onPointerMove(function(point) {
			var entities = plotPlayer.entitiesIn({min: point.x, max: point.x}, {min: -9999999, max: 9999999});
			clearHighlight();
			if(entities.length && popupLast != entities[0]) {
				var entity = entities[0];
				popupLast = entity;
				var rect = jQuery(entities[0].selection[0][0]);
				rect.attr('stroke', 'rgba(0, 0, 0, 1.0)')
				    .attr('stroke-width', '2px');

				var html = "Runner: " + entity.datum.name + "<br/>" +
				           "Time: " + entity.datum.time + "<br/>" +
				           "Date: " + entity.datum.begin.toLocaleDateString();
				popup.css("left", zhGetMouse().x)
				     .css("top", zhGetMouse().y)
				     .css("display", 'block')
				     .html(html);

				jQuery('body').append(popup);

				if(popupInterval) {
					clearInterval(popupInterval);
					popupInterval = null;
				}
			}
		});
		highlight.onPointerExit(function() {
			popupInterval = setInterval(function() {
				popup.css('display', 'none');
				clearHighlight();
			}, 500);
		});
		highlight.attachTo(plot);
	}

	var data = rawData.slice();
	setEnds(data);

	var playerNames = getPlayerNames(data);
	var colorScale = new Plottable.Scales.Color();

	var xScale = new Plottable.Scales.Time();
	var xAxisTop = new Plottable.Axes.Time(xScale, "top");
	var xAxisBottom = new Plottable.Axes.Time(xScale, "bottom");

	var yScalePlayer = new Plottable.Scales.Category();
	var yAxisPlayer = new Plottable.Axes.Category(yScalePlayer, "left");

	var plotPlayer = new Plottable.Plots.Rectangle()
	  .x(           function(d) { return d.begin; }, xScale)
	  .x2(          function(d) { return d.end;   })
	  .y(           function(d) { return d.name;  }, yScalePlayer)
	  .attr("fill", function(d) { return playerNames.indexOf(d.name);  }, colorScale)
	  .addDataset(new Plottable.Dataset(data));

	var xScale = new Plottable.Scales.Time();
	var xAxis = new Plottable.Axes.Time(xScale, "bottom");

	var yScaleTime = new Plottable.Scales.Linear();
	var yAxisTime = new Plottable.Axes.Numeric(yScaleTime, "left");
	yAxisTime.formatter(printSecs);

	var plotTime = new Plottable.Plots.Line()
	  .x(           function(d) { return d.begin;              }, xScale)
	  .y(           function(d) { return convertTime(d.time);  }, yScaleTime)
	  .attr("stroke", function(d) { return "#000000"; } )
	  .interpolator("step-after")
	  .addDataset(new Plottable.Dataset(data));

	var popupInterval;
	var popupLast;
	var popup = jQuery(popupSelector);
	popup.addClass('zhpopup');

	generateHighlighter(plotTime);
	generateHighlighter(plotPlayer);

	var chart = new Plottable.Components.Table([
		[null,        xAxisTop   ],
		[yAxisPlayer, plotPlayer ],
		[yAxisTime,   plotTime   ],
		[null,        xAxisBottom]
	]);
	chart.rowWeight(1, 1);
	chart.rowWeight(2, 2);

	chart.renderTo(chartSelector);
}

jQuery(document).ready(function() {
	var currentMousePos = { x: -1, y: -1 };
	$(document).mousemove(function(event) {
		currentMousePos.x = event.pageX;
		currentMousePos.y = event.pageY;
	});
	zhGetMouse = function() {
		return currentMousePos;
	}
});
