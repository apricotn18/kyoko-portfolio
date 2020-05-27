{
'use strict';

navigator.geolocation.getCurrentPosition(success, fail);

let input, lat, lon = '';
const load = document.getElementById('loading');
const xhr = new XMLHttpRequest();

function success(pos) {
	load.classList.add('dnone');
	ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
	load.classList.add('dnone');
	ajaxRequest(35.68036537, 139.77166874);
	console.log(error);
}

function reset() {
	load.classList.remove('dnone');
	$('#forecast').html('');
	$('#weather').html('');
}

function utcToJSTime(utcTime) {
	return utcTime * 1000;
}



// 天気予報
function ajaxRequest(lat, lon) {
	const url = `https://api.openweathermap.org/data/2.5/forecast?appid=dd64b46ea595c4104e0881953cb4e287&lat=${lat}&lon=${lon}&cnt=10&units=metric&lang=ja`;

	fetch(url, {
		mode: 'cors',
		method: 'GET'
	})
	.then(async response => {
		const data = await response.json();

		// 都市
		const place = `<span>${data.city.name}</span>`;
		$('#change').html(place);
		// 天気予報データ
		data.list.forEach(function (forecast, index) {
			const dateTime = new Date(utcToJSTime(forecast.dt));
			const month = dateTime.getMonth() + 1;
			const date = dateTime.getDate();
			const hours = dateTime.getHours();
			const min = String(dateTime.getMinutes()).padStart(2, '0');
			const temperature = Math.round(forecast.main.temp);
			const description = forecast.weather[0].description;
			const iconPath = `img/${forecast.weather[0].icon}.svg`;
			// 現在の天気、それ以外
			if (index === 0) {
				const currentWeather = `
						<div class="info">
							<p>
								<span class="description">現在の天気：${description}</span>
								<span class="temp">${temperature}</span>°C
							</p>
						</div>
						<div class="icon"><img src="${iconPath}"></div>`;
				$('#weather').html(currentWeather);
			}
			else {
				const tableRow = `
						<tr>
							<td class="info">
								${month}/${date}<br>${hours}:${min}
							</td>
							<td class="icon"><img src="${iconPath}"></td>
							<td><span class="description">${description}</span></td>
							<td><span class="temp">${temperature}°C</span></td>
						</tr>`;
				$('#forecast').append(tableRow);
			}
		});
	})
	.catch(erro => {
		console.log(erro);
	});
}


// 地名検索
function ajaxRequestPlace(input) {
	const url = `https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj00aiZpPVpnSXJOWjA2TlVTbSZzPWNvbnN1bWVyc2VjcmV0Jng9NDU-&query=${input}&output=xml`;

	fetch(url, {
		mode: 'cors'
	})
	.then(async response => {
		const data = await response.json();
		console.log(data);
	})
	.catch(erro => {
		console.log(erro);
		alert('エラー：住所が見つかりませんでした');
	});
}


//住所変更
const btn = document.getElementById('btn');
btn.addEventListener('click', function() {
	let val = document.form1['address'].value;
	overflow.classList.add('hidden')
	if (val !== '') {
		ajaxRequestPlace(val);
	} else {
		alert('エラー：住所が見つかりませんでした')
	}
});



// overflow
const change = document.getElementById('change');
const overflow = document.getElementById('overflow');
const wrap = document.getElementById('overflow_wrap');
const close = document.getElementById('overflow_close');
const isClass = overflow.classList.contains('hidden');

change.addEventListener('click', function() {
	if (isClass) overflow.classList.remove('hidden');
	else overflow.classList.add('hidden');
});

wrap.addEventListener('click', function() {
	overflow.classList.add('hidden')
});

close.addEventListener('click', function() {
	overflow.classList.add('hidden')
});

}