'use strict';
{
	//loading
	window.addEventListener('load', function() {
		const load = document.getElementById('loading');
		load.classList.add('action');
	});


	//chart
	const myChart = document.getElementById('chart');
	myChart.width = window.innerWidth * .1;
	myChart.height = window.innerWidth * .08;

	const myLineChart = function() {
		const c = new Chart(myChart, {
			type: 'radar',
			data: {
				labels: ['HTML / CSS', 'JavaScript', 'jQuery', 'Veu.js', ['Photoshop', 'llustrator', 'XD']],
				datasets: [{
					label: 'スキル',
					data: [3, 2, 2, 1, 3],
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
	let chartFlag = false;
	myLineChart();


	//scrollイベント
	const inner = document.querySelectorAll('.inner');
	const skill = inner[2];
	const port = inner[3];
	const li = document.querySelectorAll('.port_list');

	window.addEventListener('scroll', function() {
		let h = $(window).innerHeight();
		let st = $(window).scrollTop();
		let scroll = st + h - (h / 3);

		//inner
		for (let i = 1; i < inner.length; i++) {
			if (inner[i].offsetTop < scroll) {
				inner[i].classList.add('active');
			}
		}

		//chart
		if (chartFlag == false && skill.offsetTop + 120 < scroll) {
			myLineChart();
			chart.classList.add('active');
			chartFlag = true;
		}

		//port_list
		for (let i = 0; i < li.length; i++) {
			if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
				if (li[i].offsetTop < scroll) {
					li[i].classList.add('active');
				}
			} else {
				if (li[i].offsetTop + port.offsetTop < scroll) {
					li[i].classList.add('active');
				}
			}
		}
	});


	//slick
	$('.slick').slick({
		dots: true
	});


	//ページ内リンク
	$('.fot_list a').click(function(){
		const href= $(this).attr('href');
		const target = $(href == '#' || href == '' ? 'html' : href);
		const position = target.offset().top + 30;
		$('html, body').animate({scrollTop:position}, 500, 'swing');
		return false;
	});
}