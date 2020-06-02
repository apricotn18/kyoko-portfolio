{
	'use strict';

	let latG, lonG = '';
	const load = document.getElementById('loading');

	navigator.geolocation.getCurrentPosition(success, fail);

	function success(pos) {
		load.classList.add('dnone');
		load.classList.remove('ready');
		latG = pos.coords.latitude;
		lonG = pos.coords.longitude;
		console.log(latG, lotG);
		ajaxRequest(latG, lonG);
	}

	function fail(error) {z
		load.classList.add('dnone');
		ajaxRequest(35.68036537, 139.77166874);
		console.log(error);
	}

	function utcToJSTime(utcTime) {
		return utcTime * 1000;
	}


	// 天気予報
	function ajaxRequest(lat, lon) {
		const url = `https://api.openweathermap.org/data/2.5/forecast?appid=dd64b46ea595c4104e0881953cb4e287&lat=${lat}&lon=${lon}&cnt=10&units=metric&lang=ja`;

		fetch(url, {
			mode: 'cors',
			method: 'POST',
			cache: 'no-cache',
		})
		.then(async response => {
			const data = await response.json();

			// 都市
			$('h2').html(data.city.name);

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
									現在の天気：${description}
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

			//2回目以降用
			setTimeout(function() {
				if (!load.classList.contains('dnone')) {
					load.classList.add('dnone');
				}
			}, 800);
		})
		.catch(erro => {
			console.log(erro);
		});
	}


	// 位置情報の確認がでなかったとき
	setTimeout(function() {
		if (!load.classList.contains('ready')) {
			return false;
		} else {
			load.classList.add('dnone');
			ajaxRequest(35.68036537, 139.77166874);
		}
	}, 5000)


	// overflow
	const change = document.getElementById('change');
	const overflow = document.getElementById('overflow');
	const wrap = document.getElementById('overflow_wrap');
	const close = document.getElementById('overflow_close');

	change.addEventListener('click', function() {
		overflow.classList.toggle('hidden');
	});

	wrap.addEventListener('click', function() {
		overflow.classList.add('hidden');
	});

	close.addEventListener('click', function() {
		overflow.classList.add('hidden');
	});


	//座標一覧
	const areaList = [
		{'area': '北海道', 'coord': [43.06417, 141.34694]},
		{'area': '青森県', 'coord': [40.82444, 140.74]},
		{'area': '岩手県', 'coord': [39.70361, 141.1525]},
		{'area': '宮城県', 'coord': [38.26889, 140.87194]},
		{'area': '秋田県', 'coord': [39.71861, 140.1025]},
		{'area': '山形県', 'coord': [38.24056, 140.36333]},
		{'area': '福島県', 'coord': [37.75, 140.46778]},
		{'area': '茨城県', 'coord': [36.34139, 140.44667]},
		{'area': '栃木県', 'coord': [36.56583, 139.88361]},
		{'area': '群馬県', 'coord': [36.39111, 139.06083]},
		{'area': '埼玉県', 'coord': [35.85694, 139.64889]},
		{'area': '千葉県', 'coord': [35.60472, 140.12333]},
		{'area': '東京都', 'coord': [35.68944, 139.69167]},
		{'area': '神奈川県', 'coord': [35.44778, 139.6425]},
		{'area': '新潟県', 'coord': [37.90222, 139.02361]},
		{'area': '富山県', 'coord': [36.69528, 137.21139]},
		{'area': '石川県', 'coord': [36.59444, 136.62556]},
		{'area': '福井県', 'coord': [36.06528, 136.22194]},
		{'area': '山梨県', 'coord': [35.66389, 138.56833]},
		{'area': '長野県', 'coord': [36.65139, 138.18111]},
		{'area': '岐阜県', 'coord': [35.39111, 136.72222]},
		{'area': '静岡県', 'coord': [34.97694, 138.38306]},
		{'area': '愛知県', 'coord': [35.18028, 136.90667]},
		{'area': '三重県', 'coord': [34.73028, 136.50861]},
		{'area': '滋賀県', 'coord': [35.00444, 135.86833]},
		{'area': '京都府', 'coord': [35.02139, 135.75556]},
		{'area': '大阪府', 'coord': [34.68639, 135.52]},
		{'area': '兵庫県', 'coord': [34.69139, 135.18306]},
		{'area': '奈良県', 'coord': [34.68528, 135.83278]},
		{'area': '和歌山県', 'coord': [34.22611, 135.1675]},
		{'area': '鳥取県', 'coord': [35.50361, 134.23833]},
		{'area': '島根県', 'coord': [35.47222, 133.05056]},
		{'area': '岡山県', 'coord': [34.66167, 133.935]},
		{'area': '広島県', 'coord': [34.39639, 132.45944]},
		{'area': '山口県', 'coord': [34.18583, 131.47139]},
		{'area': '徳島県', 'coord': [34.06583, 134.55944]},
		{'area': '香川県', 'coord': [34.34028, 134.04333]},
		{'area': '愛媛県', 'coord': [33.84167, 132.76611]},
		{'area': '高知県', 'coord': [33.55972, 133.53111]},
		{'area': '福岡県', 'coord': [33.60639, 130.41806]},
		{'area': '佐賀県', 'coord': [33.24944, 130.29889]},
		{'area': '長崎県', 'coord': [32.74472, 129.87361]},
		{'area': '熊本県', 'coord': [32.78972, 130.74167]},
		{'area': '大分県', 'coord': [33.23806, 131.6125]},
		{'area': '宮崎県', 'coord': [31.91111, 131.42389]},
		{'area': '鹿児島県', 'coord': [31.56028, 130.55806]},
		{'area': '沖縄県', 'coord': [26.2125, 127.68111]}
	];


	// 地名検索
	areaList.forEach(function(list) {
		$('#select_area').append(`<li>${list.area}</li>`);
	});

	const li = document.querySelectorAll('#select_area li');
	for (let i = 0; i < li.length; i++) {
		li[i].addEventListener('click', function() {
			latG = areaList[i]['coord'][0];
			lonG = areaList[i]['coord'][1];
			ajaxRequest(latG, lonG);

			overflow.classList.add('hidden');
			load.classList.remove('dnone');
			$('#forecast').html('');
			$('#weather').html('');
		});
	}
}