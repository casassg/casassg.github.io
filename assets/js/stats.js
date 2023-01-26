function csvJSON(data) {
	var items = []
	var rows = data.split(/\n/g);
	var firstRow = rows.shift()
	var keys = firstRow.substring(0, firstRow.length - 1).split(",");

	rows.forEach(raw_row => {
		var row = {};
		var columns = raw_row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

		columns.forEach((column, index) => {

			var key = keys[index].replace(' ', '');
			if (!key) return;
			row[key] = column;

		});
		items.push(row);
	});

	return items
}

function refreshStats() {
	fetch('https://gerard.space/stats/strava.csv')
		.then((response) => response.text())
		.then((data) => writeStats(csvJSON(data)));

}

function writeText(id, text) {
	document.getElementById(id).innerHTML = text
}
const DAYSAGO = 30;
function writeStats(data) {
	const lastActivity = data[data.length - 1]
	writeText("activity", lastActivity["ActivityType"]);
	const hours = (new Date().getTime() - new Date(lastActivity["ActivityTimeUTCISO"] + "Z").getTime()) / 1000 / 60 / 60;
	var hourstring = hours < 1 ? "less than an hour ago" : Math.floor(hours) + " hours ago"

	writeText("time_ago", hourstring)
	writeText("days_ago", DAYSAGO)
	var meters = 0.0;
	var seconds = 0.0;
	var count = 0;
	const timeAgo = new Date().getTime() - (1000 * 60 * 60 * 24 * DAYSAGO)
	for (let i = 0; i < data.length; i++) {
		var act = data[i];
		var date = new Date(act["ActivityTimeUTCISO"] + "Z").getTime()
		if (date >= timeAgo) {

			count += 1;
			if (act["ActivityType"].includes("Run")) {
				seconds += parseFloat(act["ElapsedSeconds"])
				meters += parseFloat(act["DistanceMeters"])
			}
		}
	}
	writeText("count", count)
	const kms = Math.round(meters / 1000);
	writeText("run_kms", kms)
	const speed = (seconds / 60) / (meters / 1000)
	var speed_seconds = Math.round((speed % 1) * 60)
	if (speed_seconds < 10) {
		speed_seconds = "0" + speed_seconds
	}
	writeText("speed", Math.floor(speed) + ":" + speed_seconds)

}

function openStats() {
	refreshStats()
	document.getElementById("wrapper").classList.add("stats-active");

}

document.getElementById("stats_button").addEventListener("click", openStats);


function closeStats() {
	document.getElementById("wrapper").classList.remove("stats-active");
}
document.getElementById("close_stats").addEventListener("click", closeStats);
refreshStats()