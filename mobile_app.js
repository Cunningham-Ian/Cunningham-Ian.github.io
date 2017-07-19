var button;

window.addEventListener("load", function () {
document.getElementById("btn1").addEventListener("click", function() {
	// Create input box(es)
	button = document.getElementById("btn1");
	var input = document.createElement("INPUT");
	input.setAttribute("id", "input1");
	var location = document.getElementById("location");
	var txt = document.createElement("LABEL");
	input.setAttribute("id", "input1");
//	var btn = document.createElement("BTN");
//	var btnTxt = document.createTextNode("Submit");
//	btn.appendChild(btnTxt);
//	btn.setAttribute("type", "button");
//	btn.setAttribute("id", "btn2");
	document.getElementById("instruct").innerHTML = '(Type the location, then hit "Submit")';
	if (document.getElementById("lat,lon").checked) {
		txt.innerHTML = "lat: ";
		location.appendChild(txt);
		location.appendChild(input);
		
		var input2 = document.createElement("INPUT");
		input2.setAttribute("id", "input2");
		var txt2 = document.createElement("LABEL");
		txt2.innerHTML = "lon: ";
		location.appendChild(txt2);
		document.getElementById("location").appendChild(input2);
	} else if (document.getElementById("city").checked) {
		var input2 = document.createElement("INPUT");
		input2.setAttribute("id", "input2");
		txt.innerHTML = "city: ";
		location.appendChild(txt);

		location.appendChild(input);
		var txt2 = document.createElement("LABEL");
		txt2.innerHTML = "state/country: ";
		location.appendChild(txt2);
		document.getElementById("location").appendChild(input2);
	} else {
		txt.innerHTML = "Type in the appropriate text: ";
		location.appendChild(txt);
		location.appendChild(input);
	}
});
});
if(document.getElementById("btn2")) {
document.getElementById("btn2").addEventListener("click", function () {
	document.getElementById("location").style.display = "none";
	document.getElementById("overallData").style.display = "block";
	//				window.alert("2nd function");
	localStorage.setItem("input1", document.getElementById("input1").value);
	if (document.getElementById("input2")) {
		localStorage.setItem("input2", document.getElementById("input2").value);
		console.log(localStorage.getItem("input2"));

	}

	var array1 = document.getElementsByName("search-option");
	/*
		For each radio button: if checked, store in local storage
	*/
	for (var i = 0; i < array1.length; i++) {
		if (array1[i].checked) {
			localStorage.setItem("option", array1[i].value);
			console.log(localStorage.getItem("option"));
			break;
		} else {
			continue;
		}
	}
});
}
document.getElementById("btn3").addEventListener("click", function () {
	document.getElementById("overallData").style.display = 'none';
	document.getElementById("display").style.display = 'block';
	var data = document.getElementById("request").value;
	localStorage.setItem("data_type", data);
	console.log(localStorage.getItem("data_type"));
	getData(localStorage.getItem("data_type"));
});

function getData(type) {
	if (typeof (Storage) !== "undefined") {
		
			if	(localStorage.getItem("data_type") == "conditions") {
				var api = "conditions";
			} else if (localStorage.getItem("data_type") == "forecast") {
				var api = "forecast";
			} else {
				var api = "hourly";
			}
			if (localStorage.getItem("option") == "zip") {
				var place = localStorage.getItem("input1");
			} else if (localStorage.getItem("option") == "city") {
				var place = localStorage.getItem("input1") + "/" + localStorage.getItem("input2");
			} else {
				var place = localStorage.getItem("input1") + "," + localStorage.getItem("input2");
			}
			document.getElementById("jsonScr").setAttribute("src", "https://api.wunderground.com/api/0374d8d7218313b5/geolookup/" + api + "/q/" + place + ".json?callback=parse");
		}
		
	parse = function(data){
		console.log(data);
		var type = localStorage.getItem("data_type");
		if (type == "hourly") {
			document.getElementById("hourly").style.display = "block";
			var newTr = document.createElement("TR");
			for (var i = 0; i < 3; i++) {
				var newTh = document.createElement("TH");
				var hr = document.createTextNode("Hour: " + data.hourly_forecast[i].FCTTIME.hour + " ");
				newTh.appendChild(hr);
				newTr.appendChild(newTh);
				// Change style width and border to make it look nicer
			}
			document.getElementById("hourly").appendChild(newTr);
			var secondTr = document.createElement("TR");
			for (var i = 0; i < 3; i++) {
				var condTd = document.createElement("TD");
				var cond = document.createTextNode("Condition: " + data.hourly_forecast[i].condition + " ");
				console.log(cond);
				condTd.appendChild(cond);
				secondTr.appendChild(condTd);
				// Change style width and border to make it look nicer
			}
			document.getElementById("hourly").appendChild(secondTr);
			var thirdTr = document.createElement("TR");
			for (var i = 0; i < 3; i++) {
				var forecastTd = document.createElement("TD");
				var pic = document.createElement("IMG");
				pic.setAttribute("SRC", data[i].hourly_forecast[i].icon_url);
				forecastTd.appendChild(pic);
				thirdTr.appendChild(forecastTd);
			}
			document.getElementById(thirdTr);
		} else if (type == "conditions") {
			document.getElementById("conditions").style.display = "block";
			document.getElementById("curr_con").innerHTML = data.forecast.forecastday[0].icon;
			document.getElementById("currConPic").setAttribute("src", data.forecast.forecastday[0].icon_url);
		} else {
			document.getElementById("forecast").style.display = "block";
				for (var i = 0; i < 4; i+=2) {
				var newTh = document.createElement("TH");
				var day = document.createTextNode(data.forecast.txt_forecast.forecastday[i].title + " ");
				newTh.appendChild(day);
				newTr.appendChild(newTh);
				// Change style width and border to make it look nicer
			}
				document.getElementById("forecast").appendChild(newTr);
				var secondTr = document.createElement("TR");
			for (var i = 0; i < 4; i+=2) {
				var newTd = document.createElement("TD");
				var elem = document.createElement("IMG"); 
				newTh.appendChild(day);
				newTr.appendChild(newTh);
				// Change style width and border to make it look nicer
			}
			var thirdTr = document.createElement("TR");
			}
		};
	}
		/*
			If #data_type is conditions,
				api = conditions
				Find location-specific json
				#curr_con = image.link, image.title
				#curr_temp = degrees F
				#curr_feel = feelslike F
				
			If data type is forecast,
				api=forecast
				
					In first row, create blank space
			Then create 10 table headers, 1 for each day

			For each row:
				Create table row
				For each day 1-10:
					Output the corresponding temperature/icon/condition
				Close table row
			End table
			
			If data type is hourly,
			Similar to forecast
		*/
		// A function for changing a string to TitleCase
//	function toTitleCase(str) {
//		return str.replace(/\w+/g, function (txt) {
//			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//		});
//	}
