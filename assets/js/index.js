'use strict';

$(function () {
	// chart
	const myLineChart = function () {
		const myChart = $('#chart')[0];
		myChart.width = window.innerWidth * .1;
		myChart.height = window.innerWidth * .08;

		const c = new Chart(myChart, {
			type: 'radar',
			data: {
				labels: ['HTML / CSS', 'jQuery', ['React', 'Next.js'], 'TypeScript', ['Photoshop', 'llustrator', 'XD']],
				datasets: [{
					label: 'スキル',
					data: [3, 3, 1, 2, 3],
					backgroundColor: 'RGBA(145,53,95,.2)',
					borderColor: 'RGBA(145,53,95,1)',
					borderWidth: 1,
					pointBackgroundColor: 'RGBA(145,53,95,1)',
					pointRadius: 2,
					pointHitRadius: 15,
				}],
				borderWidth: 1
			},
			options: {
				legend: {
					display: false
				},
				scale:{
					ticks:{
						suggestedMin: 0,
						suggestedMax: 3,
						stepSize: 1,
						fontSize: 9
					}
				},
				tooltips:{
					bodyFontColor: '#ccc'
				},
				layout: {
					padding: {
						top: 10,
						right: 10,
						bottom: 10,
						left: 10
					}
				}
			}
		});
	};

	// loading
	const hiddenLoading = function () {
		$('#loading').addClass('action');
		$('body').css('overflow', '');
	};

	// controller ↓

	// loading
	$(window).on('load', function () {
		hiddenLoading();
	});
	setTimeout(function () {
		hiddenLoading();
	}, 5000)

	// chart
	let chartFlag = false;

	myLineChart();

	$(window).on('scroll', function () {
		let h = $(window).innerHeight();
		let scroll = $(window).scrollTop() + h - (h / 3);

		// inner
		const $inner = $('.inner');
		for (const item of $inner) {
			if (item.offsetTop < scroll) {
				$(item).addClass('active');
			}
		}

		// chart
		const $skill = $inner[2];
		if (chartFlag == false && $skill.offsetTop + 120 < scroll) {
			myLineChart();
			chart.classList.add('active');
			chartFlag = true;
		}

		// portList
		const $port = $inner[3];
		const $portList = $('.port_list');
		for (const item of $portList) {
			if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
				if (item.offsetTop < scroll) {
					$(item).addClass('active');
				}
			} else {
				if (item.offsetTop + $port.offsetTop < scroll) {
					$(item).addClass('active');
				}
			}
		}
	});

	// slick
	$('.slick').slick({ dots: true });

	// ページ内リンク
	$('.fot_list a').on('click', (e) => {
		e.preventDefault();
		const href = $(e.target).attr('href');
		const position = $(href).offset().top;
		$('html, body').animate({scrollTop: position}, 500, 'swing');
	});
});

