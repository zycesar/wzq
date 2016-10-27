$(function() {
	var isAi;
	$('.kaichang').on('click', function() {
		$('.kaichang .zuo').css({
			transform: 'translateX(-100%)'
		});
		$('.kaichang .you').css({
			transform: 'translateX(100%)'
		});
		$('.kaichang span').css({
			transform: 'translateY(-100%)'
		});
		$('.kaichang').css({
			zIndex: -10
		});
	})
	/*人机对战点击事件*/
	$('.chance .one').on('click', function() {
		$('.qipan').css({
			display: 'block'
		});
		$('.qipan').css({
			transform: 'translateY(0px)'
		});
		$('.jishiqi,.zailaiyiju,.tuichu').css({
			display: 'block'
		});
		$('.qipan').empty();
		start();
		isAi = true;
		times();

	})
	/*人人对战点击事件*/
	$('.chance .two').on('click', function() {
		$('.qipan').css({
			display: 'block'
		});
		$('.qipan').empty();
		start();
		$('.qipan').css({
			transform: 'translateY(0px)'
		});
		$('.jishiqi,.zailaiyiju,.tuichu').css({
			display: 'block'
		});
		times();
		isAi = false;
	})
	/*网络对战点击事件*/
	$('.chance .net,.chance .phb,.chance .cj,.chance .xx').on('click', function() {
		$('.tishikuang1').css({zIndex:300});
		$('.tishikuang1').animate({
			'opacity': 1
		}, 1000, function() {
			setTimeout(function() {
				$('.tishikuang1').animate({
					'opacity': 0,zIndex:-100
				},1000)
			})
		});
	})

	function start() {

		var kongbai = {};
		for (var i = 0; i < 15; i++) {
			$('<b>').addClass('heng').appendTo('.qipan');
			$('<i>').addClass('shu').appendTo('.qipan');
			for (var j = 0; j < 15; j++) {
				kongbai[i + '-' + j] = {
					x: i,
					y: j
				};
				$('<div>').addClass('qizi').attr('id', i + '-' + j).data('pos', {
					x: i,
					y: j
				}).appendTo('.qipan');
			}
		}
		for (var j = 0; j < 5; j++) {
			$('<span>').appendTo('.qipan');
		};

		var join = function(n1, n2) {
			return n1 + '-' + n2;
		}
		var flag = true;
		// var biao = {};
		var hei = {};
		var bai = {};

		var ai = function() {
			var zuobiao1;
			var max1 = -Infinity;
			for (var i in kongbai) {
				var weixie = panduan(kongbai[i], hei);
				// console.log(weixie)
				if (weixie > max1) {
					max1 = weixie;
					zuobiao1 = kongbai[i];
				};
			}
			var zuobiao2;
			var max2 = -Infinity;
			for (var i in kongbai) {
				var weixie = panduan(kongbai[i], bai);
				if (weixie > max2) {
					max2 = weixie;
					zuobiao2 = kongbai[i];
				};
			}
			return (max1 > max2) ? zuobiao1 : zuobiao2;
			// return {x:3,y:4}
			// console.log(kongbai[i])
		}
		// var dict = {};
		var panduan = function(pos, dict) {

			// for (var i in biao) {
			// 	if (biao[i] === color) {
			// 		dict[i] = true;
			// 	}
			// }
			var h = 1,
				s = 1,
				zx = 1,
				yx = 1;
			var tx, ty;
			tx = pos.x;
			ty = pos.y;
			while (dict[tx + '-' + (ty - 1)]) {
				h++;
				ty--;
			}
			tx = pos.x;
			ty = pos.y;
			while (dict[tx + '-' + (ty + 1)]) {
				h++;
				ty++;
			}
			// console.log(h);
			// if (h >= 5) {
			// 	return true;
			// };
			tx = pos.x;
			ty = pos.y;
			while (dict[(tx - 1) + '-' + ty]) {
				s++;
				tx--;
			}
			tx = pos.x;
			ty = pos.y;
			while (dict[(tx + 1) + '-' + ty]) {
				s++;
				tx++;
			}
			// console.log(s);
			// if (s >= 5) {
			// 	return true;
			// };
			tx = pos.x;
			ty = pos.y;
			while (dict[(tx - 1) + '-' + (ty + 1)]) {
				zx++;
				tx--;
				ty++;
			}
			tx = pos.x;
			ty = pos.y;
			while (dict[(tx + 1) + '-' + (ty - 1)]) {
				zx++;
				ty--;
				tx++;
			}
			// if (zx >= 5) {
			// 	return true;
			// };
			tx = pos.x;
			ty = pos.y;
			while (dict[(tx + 1) + '-' + (ty + 1)]) {
				yx++;
				ty++;
				tx++;
			}
			tx = pos.x;
			ty = pos.y;
			while (dict[(tx - 1) + '-' + (ty - 1)]) {
				yx++;
				ty--;
				tx--;
			}
			// if (yx >= 5) {
			// 	return true;
			// };
			return Math.max(h, s, zx, yx);
		}

		$('.qizi').on('click', function() {
			// if ($(this).hasClass('hei') || $(this).hasClass('bai')) {
			// 	return;
			// }
			var pos = $(this).data('pos');
			if (flag) {
				hei[pos.x + '-' + pos.y] = true;
				$(this).addClass('hei');
				console.log($('.hei').length)
				delete kongbai[join(pos.x, pos.y)];
				// flag = !flag
				if (panduan(pos, hei) >= 5) {
					$('.tishipei').css({
						transform: 'translateY(0px)'
					});
					clearInterval(time);
					$('.qipan .qizi').off('click');
				}
				if (isAi) {
					var pos = ai();
					$('#' + join(pos.x, pos.y)).addClass('bai');
					bai[join(pos.x, pos.y)] = true;
					delete kongbai[join(pos.x, pos.y)];
					// var x=Math.floor(Math.random()*15);
					// var y=Math.floor(Math.random()*15);
					if (panduan(pos, bai) >= 5) {
						$('.tishipei1').css({
							transform: 'translateY(0px)'
						});
						clearInterval(time);
						$('.qipan .qizi').off('click');
					};

					// $('#'+x+'-'+y).addClass('bai');
					// bai[x+'-'+y]=true;
					return;
				};
			} else {
				bai[join(pos.x, pos.y)] = true;
				$(this).addClass('bai');

				if (panduan(pos, bai) >= 5) {
					$('.tishipei1').css({
						transform: 'translateY(0px)'
					});
					clearInterval(time);
					$('.qipan .qizi').off('click');
				};
			}
			flag = !flag;
		})

	}
	start();
	var times = function() {
		var s = 0;
		time = setInterval(function() {
			var hour = parseInt(s / 3600);
			var minutes = parseInt((s % 3600) / 60);
			var seconds = parseInt(s % 60);
			s += 1;
			hour = hour < 10 ? "0" + hour : hour;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			t = hour + ":" + minutes + ":" + seconds;

			$('.jishiqi').text(t);
		}, 1000);
	}
	$('.again,.zailaiyiju').on('click', function() {
		// $('.kaichang').css({zIndex:0});
		// location.reload();
		$('.qipan').empty();
		start();
		clearInterval(time);
		times();
		$('.jishiqi,.zailaiyiju').css({
			display: 'block'
		});
		$('.tishipei').css({
			transform: 'translateY(-1000px)'
		});
		$('.tishipei1').css({
			transform: 'translateY(-1000px)'
		});
		$('.qipan').css({
			transform: 'translateY(0px)'
		});

	});
	$('.quxiao,.tuichu').on('click', function() {
		$('.tishipei').css({
			transform: 'translateY(-1000px)'
		});
		$('.tishipei1').css({
			transform: 'translateY(-1000px)'
		});
		$('.jishiqi,.zailaiyiju,.tuichu').css({
			display: 'none'
		});
		$('.qipan').css({
			transform: 'translateY(-1000px)'
		});
		// location.reload();
		$('.kaichang .zuo,.kaichang .you').css({
			transform: 'translateX(0)'
		});
		$('.kaichang').css({
			zIndex: 100
		});
		$('.word').css({
			transform: 'translateY(0)'
		});
		clearInterval(time);
	});

})