$(function () {
	const $load = $('#loading');
	const $overflow = $('#overflow');
	const $weather = $('#weather');
	const $forecast = $('#forecast');
	const $city = $('#city');
	const HIDDEN_CLASS = 'is-hidden';
	let isChosen = false;

	// 情報整理
	const organizeInfo = (data) => {
		const dateTime = new Date(data.dt * 1000);
		const month = dateTime.getMonth() + 1;
		const date = dateTime.getDate();
		const hours = dateTime.getHours();
		const min = String(dateTime.getMinutes()).padStart(2, '0');
		const temperature = Math.round(data.main.temp);
		const description = data.weather[0].description;
		const iconPath = `img/${data.weather[0].icon}.svg`;
		return {month, date, hours, min, temperature, description, iconPath};
	};

	// 現在の天気のDOM生成
	const createCurrentWeatherDOM = (info) => {
		return `
			<div class="info">
				<p>
					現在の天気：${info.description}
					<span class="temp">${info.temperature}</span>°C
				</p>
			</div>
			<div class="icon"><img src="${info.iconPath}"></div>
		`;
	};

	// 現在の天気以外のDOM生成
	const createTableRowDOM = (info) => {
		return `
			<tr>
				<td class="info">
					${info.month}/${info.date}<br>${info.hours}:${info.min}
				</td>
				<td class="icon"><img src="${info.iconPath}"></td>
				<td><span class="description">${info.description}</span></td>
				<td><span class="temp">${info.temperature}°C</span></td>
			</tr>
		`;
	};

	// HTMLを更新
	const updateHtml = (data) => {
		// 都市名
		$city.html(data.city.name);
		// 天気予報データ
		data.list.forEach((item, index) => {
			const info = organizeInfo(item);
			if (index === 0) {
				$weather.html(createCurrentWeatherDOM(info));
			} else {
				$forecast.append(createTableRowDOM(info));
			}
		});
	};

	// 天気予報データを取得
	const ajaxRequest = (lat, lon) => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?appid=dd64b46ea595c4104e0881953cb4e287&lat=${lat}&lon=${lon}&cnt=10&units=metric&lang=ja`;

		fetch(url, {
			mode: 'cors',
			method: 'POST',
			cache: 'no-cache',
		}).then(async (res) => {
			const data = await res.json();
			updateHtml(data);
		}).catch((err) => {
			$city.html('');
			$weather.append('<div id="err">データを取得できませんでした</div>');
		}).then(() => {;
			setTimeout(() => {
				$load.addClass(HIDDEN_CLASS);
			}, 500);
		});
	};

	const toggleChosenFlag = () => {
		isChosen = !isChosen;
	}

	// 現在地の位置情報の許可
	navigator.geolocation.getCurrentPosition(success, fail);
	function success (pos) {
		toggleChosenFlag();
		ajaxRequest(pos.coords.latitude, pos.coords.longitude);
	}
	function fail () {
		toggleChosenFlag();
		ajaxRequest(35.68036537, 139.77166874); // 東京都千代田区丸の内の天気を取得
	}

	// 座標一覧
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
		{'area': '沖縄県', 'coord': [26.2125, 127.68111]},
	];

	// 都道府県リストを生成
	areaList.forEach((item) => {
		const insertHtml = `<li class="todofuken_item" data-coord="${item.coord}">${item.area}</li>`;
		$('#select_area').append(insertHtml);
	});

	// イベント
	$('#change').on('click', () => {
		$overflow.toggleClass(HIDDEN_CLASS);
	});
	$('#overflow_wrap').on('click', () => {
		$overflow.addClass(HIDDEN_CLASS);
	});
	$('#overflow_close').on('click', () => {
		$overflow.addClass(HIDDEN_CLASS);
	});
	$(document).on('click', '.todofuken_item', (e) => {
		const coord = $(e.target).attr('data-coord').split(',');
		// 画面をリセットしてからajax通信
		$overflow.addClass(HIDDEN_CLASS);
		$load.removeClass(HIDDEN_CLASS);
		$forecast.html('');
		$weather.html('');
		ajaxRequest(coord[0], coord[1]);
	});
});
