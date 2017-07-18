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
	var btn = document.createElement("BTN");
	var btnTxt = document.createTextNode("Submit");
	btn.appendChild(btnTxt);
	btn.setAttribute("type", "button");
	btn.setAttribute("id", "btn2");
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
		location.appendChild(btn);
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
		location.appendChild(btn);
	} else {
		txt.innerHTML = "Type in the appropriate text: ";
		location.appendChild(txt);
		location.appendChild(input);
		location.appendChild(btn);
	}
});
});
if(document.getElementById("btn2")) {
document.getElementById("btn2").addEventListener("click", function () {
	document.getElementById("location").style.display = "none";
	document.getElementById("overallData").style.display = "block";
	document.getElementById("question2").style.transition = "recolor2 1s";
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
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function showData() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("overallData").style.display = "none";
				if	(type == "conditions") {
					document.getElementById("conditions").style.display = "block";
					
				} else if (type == "forecast") {
				document.getElementById("forecast").style.display = "block";
				
			} else {
				document.getElementById("hourly").style.display = "block";
				
			}
			}
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
//			xhr.open("GET", "https://api.wunderground.com/api/0374d8d7218313b5/geolookup/" + api + "/q/" + place + ".json&callback=?", "true");
//			xhr.send();
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
		xhr.open("GET", "http://api.wunderground.com/api/0374d8d7218313b5/" + localStorage.getItem("option") + "/q/" + localStorage.getItem("data_type") + "");
		xhr.send();
	}

}

		// A function for changing a string to TitleCase
	function toTitleCase(str) {
		return str.replace(/\w+/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
