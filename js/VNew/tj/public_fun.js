/**************** ǰ̨ҳ�湫�õ�js���� *******************/
// swf����һ����վȫ�ֵĶ��������洢ǰ̨��վ�ĸ�����������webSiteFunction
wsf = {};
wsf.userLike = function(){

};
wsf.f = { //�����Ժ���
	s_j: function(st) { //�ַ���ת����json
		var j;
		if (!!st) {
			j = "{" + st + "}";
			j = eval('(' + j + ')');
			return j;
		} else {
			j = {};
			return j;
		}
	},
	j_s: function(j) { //��jsonת�����ַ���
		var x = [];
		for (var i in j) {
			x.push(i + ":" + j[i]);
		}
		return x.join(",");
	},
	addLoadingWait: function(o) { //����loadingWait
		o = o ? o : $('body');
		var w = o.width(),
			h = o.height();
		var loading = $('<div class="loading-wait" style="width:' + w + 'px; height:' + h + 'px;"></div>');
		o.append(loading);
	},
	alertWindow : function(text, icon) {
		var icons = ['warn', 'error', 'right'];
		window.$.popup({
			// addTarget: parWin.Ev.pubVar.winDocum.find("body"),
			type: 1,
			animate: {
				type: 1,
				target: 1
			},
			head: {
				yes: 0
			},
			opBut: {
				yes: 0
			},
			autoClose: {
				yes: 1,
				time: 1.5
			},
			but: {
				yes: 0
			},
			con: {
				text: [1, text],
				img: [1, icons[icon]]
			}
		});
	},
	openWin: function(tit, url,w, h) {
		w = w ? w : 600;
		h = h ? h : 500;
        var popups = $.popup({
        	cName : "evPopupOpacity",
            type: 5,
            area: {w: w,h: h},
            head: {text: tit},
            animate: {type: 1},
            con: {src: url}
        });
        return {w : $("#popupIframe_"+popups),n : popups};
    },
    reg : {
    	phoneTelDigit : function(v){
			var reg = /((^(\+86|86)?[0]?1[3578]\d{9})|(^\d{3,4}\-\d{7,8})|(^\d{3,4}\-\d{7,8})\-\d{1,4})$/;
			var z = reg.test(v);
			return z;
		}
    }
};
wsf.scrollFixed = {
	'judge': function(){
		var that = this;
		that.fixedDomJson = {
			'wrap': $("#wrapper"),
			'alone': {},
			'group':{}
		};
		(function(){
			var domArray = [$('#top_area'),$('#web_nav'),$('#header')], i = 0;
			while(i < domArray.length){
				if(domArray[i].length){
					var dom = domArray[i];
					if(dom.attr('data-fixed') === '1'){
						that.fixedDomJson.alone[dom.attr('id')] = {
							'dom' :dom,
							'iDom': dom.children(["class*='Inner'"]).eq(0),
							'fixed': dom.attr('data-fixed'),
							'fixedX': dom.attr('data-fixedx') == '-1' ? dom.offset().top : dom.attr('data-fixedx'),
							'oLeft': dom.offset().left,
							'oTop': dom.offset().top,
							'position': dom.css('position'),
							'width': dom.width(),
							'height': dom.height()
						}
					}
				}
				i++;
			}
		})();
		$('.headPublicModuleRow').find('.ev-module-edit,.customModule').each(function(i, dom){
			var dom = $(dom),id = dom.attr('id');
			if(dom.hasClass('customModule')){
				id = dom.find('.Mo').attr('id');
			}
			if(dom.attr('data-fixed') === '1'){
				that.fixedDomJson.group[id] = {
					'dom': dom,
					'fixed': dom.attr('data-fixed'),
					'fixedX': dom.attr('data-fixedx') == '-1' ? dom.offset().top : dom.attr('data-fixedx'),
					'oLeft': dom.offset().left,
					'oTop': dom.offset().top,
					'pLeft': dom.position().left,
					'pTop': dom.position().top
				};
			}
		});
		$('#absolute_module_wrap').find('.absolute-module').each(function(i, dom){
			var dom = $(dom);
			if(dom.attr('data-fixed') === '1'){
				that.fixedDomJson.group[dom.attr('id')] = {
					'dom': dom,
					'fixed': dom.attr('data-fixed'),
					'fixedX': dom.attr('data-fixedx') == '-1' ? dom.offset().top : dom.attr('data-fixedx'),
					'oLeft': dom.offset().left,
					'oTop': dom.offset().top,
					'pLeft': dom.position().left,
					'pTop': dom.position().top
				};
			}
		});
	},
	'fun': function(x){
		var alone = this.fixedDomJson.alone,group = this.fixedDomJson.group,wrap = this.fixedDomJson.wrap, padtop = 0;
		$.each(alone, function(i, v) {
			if(v.fixed){
				if(x >= v.fixedX){
					v.dom.height(v.height);
					v.iDom.addClass('scrollFixed').css({'position':'fixed','width': v.width, 'left': v.left, top: (v.oTop - v.fixedX)<=0 ? 0 : (v.oTop - v.fixedX)});
				} else{
					v.iDom.removeClass('scrollFixed').attr('style','');
				}
			}
		});
		$.each(group, function(i, v) {
			if(v.fixed){
				if(x >= v.fixedX){
					v.dom.css({position:'fixed',left: v.oLeft, top: (v.oTop - v.fixedX)<0 ? 0 : (v.oTop - v.fixedX)});
				}else{
					v.dom.css({position:'absolute',left: v.pLeft, top: v.pTop});
				}
			}
		});
	}
};
wsf.wScroll = function(){
	wsf.scrollFixed.judge();
	$(window).on({
		scroll : function(ev){
			wsf.scrollFixed.fun($(this).scrollTop());
		}
	});
	wsf.scrollFixed.fun($(window).scrollTop());
};
// վ�㵼���ķ���,��Ҫ��������ʾ�������ӵ����˵���
wsf.nav = function(){
	$("#nav").on({
		mouseenter: function() {
			var that = $(this),
				sub = that.find("div.NSub");
			if (sub.length) {
				var l = that.offset().left,
					pl = sub.width() + l;
				if (pl > $(document).width()) {
					sub.css({
						left: 'auto',
						right: 0
					});
				}
				that.addClass('NItemSub');
			}
			if(!that.hasClass('NItemCur')){
				that.addClass("NItemH");
			}
		},
		mouseleave: function() {
			$(this).removeClass("NItemH");
			$(this).removeClass("NItemSub");

		}
	}, '.NItem');
};
// վ�������򷽷�,��Ҫ��������ʾ������Ĭ�����֡�
wsf.search = function(){
	var searchModule = $("#search");
	if(searchModule.length){
		searchModule.on({
			focus : function(){
				var t = $(this),v = t.val(),dv = t.data('defaultv');
				v == dv && t.val('');
			},
			blur : function(){
				var t = $(this),v = t.val(),dv = t.data('defaultv');
				(v == dv || !v) && t.val(dv);
			}
		},"#keyWord");
	}
};
/*��վ��logo search shopCart λ�ü���*/
// wsf.hoffL = function(){
// 	var logo = $("#logo"),searchs = $("#search"),shopCart = $("#shopping_car"),webNav = $('#web_nav'),
// 			hcL = Math.floor(($("body").width() - userSiteWidth)/2);
// 	logo.css({'left': parseInt(logo.css('left')) + hcL});
// 	searchs.css({'left': parseInt(searchs.css('left')) + hcL});
// 	shopCart.css({'left': parseInt(shopCart.css('left')) + hcL});
// 	if(parseInt(webNav.css('left')) > 0){
// 		webNav.css({'left': parseInt(webNav.css('left')) + hcL});
// 	}
// };
/*��վ��logo search shopCart λ�ü���*/
wsf.hoffL = function(){
	var j = 0;
	var p = function(obj,t){
		if(t == 'n'){
			if(obj.attr('data-l')){
				j = wsf.f.s_j(obj.attr('data-l'));
			}
		}else{
			if(obj.attr('data-s')){
				j = wsf.f.s_j(obj.attr('data-s'));
			}
		}
	};
	var /*logo = $("#logo"),searchs = $("#search"),shopCart = $("#shopping_car"),*/
		webNav = $('#web_nav');
	var hcL = Math.floor(($("body").width() - userSiteWidth)/2);

	/*if(logo.length){
		p(logo);
		logo.css({'left': j.l + hcL});
	}
	if(searchs.length){
		p(searchs);
		searchs.css({'left': j.l + hcL});
	}
	if(shopCart.length){
		p(shopCart);
		shopCart.css({'left': j.l + hcL});
	}*/
	if(webNav.length){
		p(webNav,'n');
		if(j.p == 1 || j.p == 3){
			webNav.css({'left': j.l + hcL});
		}
	}
};

// �������û���logo,search,shopping�ϱ߾ඨλ
wsf.hoffT = function(){
	var logo = $("#logo"),searchs = $("#search"),shopCar = $("#shopping_car"),
			logoT = parseInt(logo.css('top')),searchT =  parseInt(searchs.css('top')),shopCarT = parseInt(shopCar.css('top')),topH = $("#top_area").outerHeight();
	logo.css({top : logoT + topH +'px'});
	searchs.css({top : searchT + topH +'px'});
	shopCar.css({top : shopCarT + topH +'px'});
};
/*
fixedShopcar
��Ҫ������ʾǰ̨�ĸ������ﳵ������ߵ�һЩ����
 */
wsf.fixedShopcar = function(){
	var fixedShopcar = $("#fixedShopcar"),
		shopcarAlert = fixedShopcar.find("div.shopcar-alert"),
		listBody = fixedShopcar.find("dd.shopcar-list-body"),
		listUl = listBody.find(".shopcar-list-ul");
	listBody.cScroll({
		w: 10,
		tbB: false
	});
	fixedShopcar.on({
		click: function() {
			var that = $(this);
			if (that.data("alertShow") == 1) {
				that.removeData("alertShow");
				shopcarAlert.css({
					'visibility': 'hidden'
				});
			} else {
				that.data("alertShow", 1);
				shopcarAlert.css({
					'visibility': 'visible'
				});
			}
		}
	}, ".shopcar-icon");
	fixedShopcar.on({
		click: function() {
			fixedShopcar.find(".shopcar-icon").removeData("alertShow");
			shopcarAlert.css({
				'visibility': 'hidden'
			});
		}
	}, ".shopcar-alert-close");
	listUl.on({
		click: function() {
			var par = $(this).parent().parent();
			par.animate({
				height: 0,
				opacity: 0
			}, 500, function() {
				$(this).remove();
				if (listUl.height() > listBody.height()) {
					listBody.cScroll({
						w: 10,
						tbB: false
					});
				} else {
					listBody.cScroll({
						w: 10,
						tbB: false
					});
					listBody.find(".c-scrollbar").hide();
				}
			});
		}
	}, "span.span-option a");
};
/*
	focus-pic-module
	createDate:2015/04/02
	ģ���ڽ���ͼ��������Ҫ��ģ���еĽ���ͼ�л�����
*/
wsf.focusPicModule = function(id){
	var objArray = id ? $('#'+id).find('div.focus-pic-module') : $("div.focus-pic-module");
	$("div.focus-pic-module").each(function() {
		var obj = $(this);
		var h = obj.parent().height(),
			w = obj.parent().width(),
			dd = obj.find("dd"),
			dl = obj.find("dl"),
			type = obj.data("type"),
			dir = obj.data("dir"),
			sum = dd.length,
			curi = 0,
			ni = curi + 1,
			times, move, fun;
		dl.css({
			"width": w + "px",
			"height": h + "px",
			"overflow": "hidden"
		});
		dd.css({
			"width": w + "px",
			"height": h + "px"
		});
		//�ж����õķ���
		(function() {
			var scss;
			switch (dir) {
				case 1: //left
					scss = {
						left: (w + 10) + "px",
						top: 0
					};
					break;
				case 2: //right
					scss = {
						left: -(w + 10) + "px",
						top: 0
					};
					break;
				case 3: //top
					scss = {
						top: (h + 10) + "px",
						left: 0
					};
					break;
				case 4: //bottom
					scss = {
						top: -(h + 10) + "px",
						left: 0
					};
					break;
			}
			dd.each(function() {
				var that = $(this);
				if (that.index() != curi) {
					that.css(scss);
				} else {
					that.css({
						left: 0,
						top: 0
					});
				}
			});
		})();
		//�ж����õ�����
		if (sum > 1) {
			(function() {
				switch (type) {
					case 1:
					case 2:
						var controls = $('<div class="focus-controls-list"></div>');
						for (var s = 0; s < sum; s++) {
							if (type == 1) {
								var span = $('<span>' + (s + 1) + '</span>');
								if (s === curi) {
									span = $('<span class="cur">' + (s + 1) + '</span>');
								}
							} else if (type == 2) {
								var span = $('<span></span>');
								if (s === curi) {
									span = $('<span class="cur"></span>');
								}
							}
							controls.append(span);
						}
						obj.append(controls);
						fun = function(i) {
							obj.find(".focus-controls-list span:eq(" + i + ")").addClass("cur").siblings().removeClass("cur");
						};
						obj.on({
							click: function() {
								var indexs = $(this).index();
								if (indexs != curi) {
									if (!obj.data("move")) {
										move(indexs);
									}
								}
							}
						}, ".focus-controls-list span");
						break;
					case 3:
						var nextBtn = $('<span class="focus-pic-next"></span>'),
							prevBtn = $('<span class="focus-pic-prev"></span>');
						obj.append(nextBtn, prevBtn);
						obj.on({
							mouseenter: function() {
								var this_ = $(this);
								if (!this_.data("type3btn")) {
									obj.find(".focus-pic-next,.focus-pic-prev").css({
										visibility: 'visible'
									});
									this_.data("type3btn", 1);
								}
							},
							mouseleave: function() {
								var this_ = $(this);
								if (this_.data("type3btn") == 1) {
									obj.find(".focus-pic-next,.focus-pic-prev").css({
										visibility: 'hidden'
									});
									this_.removeData("type3btn");
								}
							}
						});
						fun = function(i) {
							obj.find(".focus-pic-next").data("num", i + 1);
							obj.find(".focus-pic-prev").data("num", i - 1);
						};
						fun(curi);
						obj.find(".focus-pic-next").on("click", function() {
							if (!obj.data("move")) {
								move($(this).data('num'));
							}
						});
						obj.find(".focus-pic-prev").on('click', function() {
							if (!obj.data("move")) {
								move($(this).data('num'));
							}
						});
						break;
				}
			})();
			//�ƶ�����
			function move(c) {
				if (c == sum) {
					c = 0;
				}
				if (c < 0) {
					c = sum - 1;
				}
				obj.data("move", 1);
				var chNum = function() {
					curi = c;
					ni = c + 1;
					obj.data("move", 0);
				};
				if (dir == 1) {
					$(dd[c]).animate({
						left: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						left: -w
					}, 1000, function() {
						$(this).css({
							left: (w + 10) + "px"
						});
					});
				}
				if (dir == 2) {
					$(dd[c]).animate({
						left: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						left: w
					}, 1000, function() {
						$(this).css({
							left: -(w + 10) + "px"
						});
					});
				}
				if (dir == 3) {
					$(dd[c]).animate({
						top: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						top: -(h + 10)
					}, 1000, function() {
						$(this).css({
							top: (h + 10) + "px"
						});
					});
				}
				if (dir == 4) {
					$(dd[c]).animate({
						top: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						top: h + 10
					}, 1000, function() {
						$(this).css({
							top: -(h + 10) + "px"
						});
					});
				}
				fun(c);
			}
			var setTime = function() {
				times = setInterval(function() {
					move(ni);
				}, 5000);
			};
			obj.on({
				mouseenter: function() {
					clearInterval(times);
				},
				mouseleave: function() {
					setTime();
				}
			});
			setTime();
		}
	});
};
/*
	pic-text-list-module
	createDate:2015/07/20
	changeDate:2016/12/20==>Ϊ�˽���༭״̬��dom���º����õ����⡣
	�ı��б���ͼ����Ϣ�б�ģ��ķ���
*/
wsf.textListModule = function(obj){
	var fun = function(t){
		if(!t.data('bindevent')){
			t.on({
				mouseenter : function(){
					$(this).addClass("liHover");
				},
				mouseleave : function(){
					$(this).removeClass("liHover");
				}
			},"li");
			t.data('bindevent',1);
		}
	};
	if(obj){
		fun(obj);
	}else{
		$("div.text-list-module").each(function(){
			fun($(this));
		});
		$("div.pic-text-list-module").each(function(){
			fun($(this));
		});
	}
};
/*�б�ҳ25��jsЧ��*/
wsf.picTextList_changePic = function(){
	/* ����ͼƬЧ�� */
	$('.b-listpage-pic-text-list-3').on({
		click : function(){
			var t = $(this),src = t.find('img').attr('src'),lip = t.parents('li'),picimg = lip.find(".pics img");
			picimg.attr('src', src);
			t.addClass('pl-list-dd-cur').siblings().removeClass('pl-list-dd-cur');
		}
	},'.pl-small-pic-list .pl-list-dd');
	/*��ʾ�����ղ�*/
	$('.b-listpage-pic-text-list-3').on({
		mouseenter : function(){
			var t = $(this),plCollect = t.find(".pl-collect");
			plCollect.animate({right : 0},100);
		},
		mouseleave : function(){
			var t = $(this),plCollect = t.find(".pl-collect");
			plCollect.animate({right : -100},100);
		}
	},'.pics');
	$('.b-listpage-pic-text-list-3, .collect_p').on({
		click : function(){
			var t = $(this),div = t.children('div');

			var timestamp = Date.parse(new Date());
			var url = '/dom/user_collect_add.php?timestamp=' + timestamp;
			var is_detail = t.data("detail");
			var data = {
				'title': t.data("name"),
				'type': t.data("type"),
				'doc_id': t.data("id"),
				'channel_id': channel_id,
				'username': user_name,
				'wap': 0
			};
			$.ajax({
				'url': url,
				type: "POST",
				async: false,
				cache: false,
				data: data,
				success: function(data) {
					if (data == 1) {
						//`div.attr('class','no-collect').find("b").text('�ղ�');
						div.attr('class','yes-collect').find("b").text('���ղ�');
						alert("�ղسɹ������ڸ������Ĳ鿴��");
					} else if (data == 2) {
						alert('�ղ�ʧ�ܣ�����û�е�¼����¼�����������ղأ�');
						window.location.href="/dom/denglu.php?username="+ user_name;
						return false;
					} else if (data == 3) {
						if (is_detail) {
							div.attr('class','no-collect').find("b").text('�ղ�');
							alert("ȡ���ղسɹ���");
						} else {
							div.attr('class','yes-collect').find("b").text('���ղ�');
							alert("���Ѿ��ղع������ڸ������Ĳ鿴��");
						}
						return false;
					} else if (data == 4) {
						alert("��������");
						return false;
					}
				}
			});
			return false;
		}
	},'.pl-collect');
};
/* ����������json���� */
wsf.interactJ = {
	a_1 : {
		typeJ : {
			t_1 : 'int-onlyimg-larger',
			t_2 : 'int-onlyimg-small',
			t_3 : 'int-onlyimg-move-left',
			t_4 : 'int-onlyimg-move-right',
			t_5 : 'int-onlyimg-move-top',
			t_6 : 'int-onlyimg-move-down',
			t_7 : 'int-onlyimg-rotate-left',
			t_8 : 'int-onlyimg-rotate-right'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
		}
	},
	a_2 : {
		typeJ : {
			t_1 : 'int-bigglass-fade',
			t_2 : 'int-bigglass-magnify',
			t_3 : 'int-bigglass-shrink',
			t_4 : 'int-bigglass-slide-left',
			t_5 : 'int-bigglass-slide-right',
			t_6 : 'int-bigglass-slide-up',
			t_7 : 'int-bigglass-slide-down'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var domhtml = '<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><img src="/images/VNew/magnifying_glass_img.png" /></div></div>';
				obj.append(domhtml);
			}
		}
	},
	a_3 : { 
		typeJ : {
			t_1 : 'int-changeimg-fade',
			t_2 : 'int-changeimg-magnify',
			t_3 : 'int-changeimg-shrink',
			t_4 : 'int-changeimg-slide-left',
			t_5 : 'int-changeimg-slide-right',
			t_6 : 'int-changeimg-slide-up',
			t_7 : 'int-changeimg-slide-down',
			t_8 : 'int-changeimg-slide-leftup',
			t_9 : 'int-changeimg-slide-rightup',
			t_10 : 'int-changeimg-slide-leftdown',
			t_11 : 'int-changeimg-slide-rightdown',
			t_12 : 'int-changeimg-push-left',
			t_13 : 'int-changeimg-push-right',
			t_14 : 'int-changeimg-push-up',
			t_15 : 'int-changeimg-push-down',
			t_16 : 'int-changeimg-hinge-left',
			t_17 : 'int-changeimg-hinge-right',
			t_18 : 'int-changeimg-hinge-up',
			t_19 : 'int-changeimg-hinge-down',
			t_20 : 'int-changeimg-flip-horiz',
			t_21 : 'int-changeimg-flip-vert',
			t_22 : 'int-changeimg-flip-diag-l',
			t_23 : 'int-changeimg-flip-diag-r',
			t_24 : 'int-changeimg-shutter-out-horiz',
			t_25 : 'int-changeimg-shutter-out-vert',
			t_26 : 'int-changeimg-shutter-out-diag-l',
			t_27 : 'int-changeimg-shutter-out-diag-r'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var nImgUrl = obj.data('nimgurl');
				var domhtml = '<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><img src="'+ nImgUrl +'" /></div></div>';
				obj.append(domhtml);
			}
		}
	},
	a_4 : { 
		typeJ : {
			t_1 : 'int-showAttr-fade',
			t_2 : 'int-showAttr-magnify',
			t_3 : 'int-showAttr-shrink',
			t_4 : 'int-showAttr-slide-left',
			t_5 : 'int-showAttr-slide-right',
			t_6 : 'int-showAttr-slide-up',
			t_7 : 'int-showAttr-slide-down',
			t_8 : 'int-showAttr-slide-leftup',
			t_9 : 'int-showAttr-slide-rightup',
			t_10 : 'int-showAttr-slide-leftdown',
			t_11 : 'int-showAttr-slide-rightdown',
			t_12 : 'int-showAttr-hinge-left',
			t_13 : 'int-showAttr-hinge-right',
			t_14 : 'int-showAttr-hinge-up',
			t_15 : 'int-showAttr-hinge-down',
			t_16 : 'int-showAttr-shutter-out-horiz',
			t_17 : 'int-showAttr-shutter-out-vert',
			t_18 : 'int-showAttr-shutter-out-diag-l',
			t_19 : 'int-showAttr-shutter-out-diag-r'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var ntitle = obj.data('ntitle'),nintro = obj.data('nintro'),picH = obj.height();
				ntitle = ntitle ? ntitle : '���Ǳ���';
				nintro = nintro ? nintro : '���ǽ���';
				var domhtml = $('<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><div class="show-attr"><h3>' + ntitle + '</h3><p>' + nintro + '</p></div></div></div>');
				obj.append(domhtml);
				var showAttr = domhtml.find('.figcaption'),attrH = showAttr.height(),attrT = (picH - attrH)/2;
				showAttr.css({top : attrT + 'px'});
			}
		}
	},
	a_5 : {
		typeJ : {
			t_1 : 'int-showTitle-fade',
			t_2 : 'int-showTitle-magnify',
			t_3 : 'int-showTitle-shrink',
			t_4 : 'int-showTitle-slide-left',
			t_5 : 'int-showTitle-slide-right',
			t_6 : 'int-showTitle-slide-up',
			t_7 : 'int-showTitle-slide-down',
			t_8 : 'int-showTitle-slide-leftup',
			t_9 : 'int-showTitle-slide-rightup',
			t_10 : 'int-showTitle-slide-leftdown',
			t_11 : 'int-showTitle-slide-rightdown',
			t_12 : 'int-showTitle-shutter-out-horiz',
			t_13 : 'int-showTitle-shutter-out-vert'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var ntitle = obj.data('ntitle');
				ntitle = ntitle ? ntitle : '���Ǳ���';
				var domhtml = '<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><div class="show-attr"><h3>' + ntitle + '</h3></div></div></div>';
				obj.append(domhtml);
			}
		}
	}
};
/* ���������ķ��� */
wsf.interactFun = function(){
	var picTextListModule = $(".pic-text-list-module"),picTextModule = $(".pic-text-module"),picModule = $('.pic-module'),evPicModule = $('.ev-pic');
	/* ͼ����Ϣ��������ͼƬ���� */
	picTextListModule.each(function(){
		var that = $(this),interact = that.data('interact');
		interact = interact ? wsf.f.s_j(interact) : interact;
		if(interact){
			if(wsf.interactJ['a_' + interact.a]){
				that.find("li").each(function(){
					var t = $(this),pic = t.find('.pic');
					wsf.interactJ['a_' + interact.a].addDom(pic, interact);
				});
			}
		}
	});
	/* ͼ�Ļ��ŵ�ͼƬ���� */
	picTextModule.each(function(){
		var that = $(this),interact = that.data('interact');
		interact = interact ? wsf.f.s_j(interact) : interact;
		if(interact){
			if(wsf.interactJ['a_' + interact.a]){
				var pic = that.find('.pic');
				wsf.interactJ['a_' + interact.a].addDom(pic, interact);
			}
		}
	});
	/* ����ͼƬ���� */
	picModule.each(function(){
		var that = $(this),interact = that.data('interact');
		interact = interact ? wsf.f.s_j(interact) : interact;
		if(interact){
			if(wsf.interactJ['a_' + interact.a]){
				var pic = that.find('.pic');
				wsf.interactJ['a_' + interact.a].addDom(pic, interact);
			}
		}
	});

};
/* ������������4�����Ծ��з��� */
wsf.interactFun_ = function(){
	var fun = function(t){
		t = $(t);
		var figcaption = t.find('.figcaption'),top_ = (t.height() - figcaption.height())/2;
		figcaption.css({top : top_ + 'px'});
	};
	$('.pic[class*="int-showAttr-"]').each(function(i, d){
		fun(d);
	});
	$('.ev-pic[class*="int-showAttr-"]').each(function(i, d){
		fun(d);
	});
};
/*
	catalogList
	���η���Ŀ¼��Ҫ��ģ��ķ���Ŀ¼js�����������ƶ�
 */
wsf.catalogList = function(obj_) {
	var catalogH = function(obj) {
			var oneDl = obj.children("dl.oneClassList");
			if (obj.height() < oneDl.height() || parseInt(oneDl.css("margin-top"), 10) < 0) {
				obj.find("big.but").show();
			} else {
				obj.find("big.but").hide();
			}
		},
		move = function(obj, dir) {
			var oneDl = obj.find("dl.oneClassList"),
				t_h = obj.height(),
				dl_t = Math.abs(parseInt(oneDl.css("margin-top"), 10)),
				dl_sh = oneDl.height() - dl_t,
				judge;

			if (dir == 'up') {
				judge = (dl_sh - t_h) > 0 ? true : false;
			} else if (dir == 'down') {
				judge = dl_t > 0 ? true : false;
				t_h = -t_h;
			}

			if (judge) {
				if (oneDl.data('moving') != 1) {
					oneDl.data('moving', 1);
					oneDl.animate({
						marginTop: -(dl_t + t_h / 3)
					}, 500, function() {
						oneDl.removeData('moving', 1);
					});
				}
			}
		},
		fun = function(t) {
			if(!t.data('bindevent')){
				t.css({
					height: t.parent().height() + "px",
					width: t.parent().width() + "px"
				});
				//������չ���պ������¼�
				t.on({
					click: function() {
						var this_ = $(this),
							pDt = this_.parent().parent(),
							num;
						if (pDt.hasClass('oneClassT')) {
							num = 'one'
						} else if (pDt.hasClass('twoClassT')) {
							num = 'two'
						} else if (pDt.hasClass('threeClassT')) {
							num = 'three'
						}
						if (this_.hasClass('open')) {
							pDt.removeClass(num + 'ClassTopen').next("dd").removeClass(num + 'ClassCopen');
							this_.removeClass("open");
						} else {
							pDt.addClass(num + 'ClassTopen').next("dd").addClass(num + 'ClassCopen');
							this_.addClass("open");
						}
						catalogH(t);
					}
				}, "dt code");
				t.on({
					click: function(ev){
						var tagname = ev.target.tagName.toLocaleLowerCase(),
							$this = $(this);
						if( tagname != 'code'){
							if(tagname == 'a'){
								if($this.attr('href') != '#' && $this.attr('href') != '###'){
									return true;
								}else{
									$(this).closest('dt').find('code').trigger('click');
									return false;
								}
							}else{
								$(this).closest('dt').find('code').trigger('click');
							}
						}
					}
				},'dt *');
				t.on({
					mouseenter : function(){
						var pDt = $(this);
						if (pDt.hasClass('oneClassT')) {
							num = 'one';
						} else if (pDt.hasClass('twoClassT')) {
							num = 'two';
						} else if (pDt.hasClass('threeClassT')) {
							num = 'three';
						}
						pDt.addClass(num + 'ClassThover');
					},
					mouseleave : function(){
						var pDt = $(this);
						if (pDt.hasClass('oneClassT')) {
							num = 'one';
						} else if (pDt.hasClass('twoClassT')) {
							num = 'two';
						} else if (pDt.hasClass('threeClassT')) {
							num = 'three';
						}
						pDt.removeClass(num + 'ClassThover');
					}
				},"dt");
				// �����°�ť���¼�
				t.on({
					click: function() {
						if ($(this).hasClass('upBut')) {
							move(t, 'down');
						} else if ($(this).hasClass('downBut')) {
							move(t, 'up');
						}
					}
				}, "big.but");
				// ��Ԫ�ر������¼�
				t.on({
					mouseenter: function() {
						var this_ = $(this),
							dl = this_.find("dl.oneClassList"),
							dl_h = dl.height(),
							t_h = this_.height();
						if (dl_h > t_h || parseInt(dl.css("margin-top"), 10) < 0) {
							this_.find("big.but").show();
						}
					},
					mouseleave: function() {
						$(this).find("big.but").hide();
					}
				});
				t.data('bindevent',1);
			}
		};
	if(obj_){
		fun(obj_);
	}else{
		$("div.catalogList").each(function(){
			fun($(this));
		});
	}
};
/*
	menu-catalog-module
	�����ͷ���Ŀ¼��Ҫ����չʾ�������
*/
wsf.menuCatalogModule = function(obj_) {
	var fun = function(that){
		if(!that.data('bindevent')){
			var menuCatalog = that,
				Mo = menuCatalog.parents("div.Mo"),
				MoId = Mo.attr("id"),
				catalog = $("#menuCatalogMore_" + MoId.substr(3)), leveObj, hideTimeFun,
				moreInner = catalog.find(".catalog-more-inner"),
				gap = catalog.find("big.gap"),
				hideCatalog = function() {
					hideTimeFun = setTimeout(function() {
						leveObj.removeClass('one-class-hover').data('h',0);
						catalog.css("width", 0).data('visible',0);
					}, 500);
				};
			catalog.on({
				mouseenter: function() {
					clearTimeout(hideTimeFun);
				},
				mouseleave: function() {
					hideCatalog();
				}
			});
			menuCatalog.on({
				mouseenter: function() {

				},
				mouseleave: function() {
					hideCatalog();
				}
			});
			menuCatalog.on({
				mouseenter: function() {
					var tObj = $(this);
					clearTimeout(hideTimeFun);
					leveObj = tObj.parent();
					if(!leveObj.data('h')){
						leveObj.addClass("one-class-hover").data('h',1).siblings('dd.one-class-hover').removeClass('one-class-hover').data('h',0);
						var indexs = leveObj.index(),
							that_t = leveObj.position().top,
							that_h = leveObj.outerHeight(),
							inner_mt = parseInt(tObj.css("margin-top")),
							inner_tbw = parseInt(tObj.css("borderTopWidth")),
							inner_bbw = parseInt(tObj.css("borderBottomWidth")),
							inner_h = tObj.innerHeight(),
							l = menuCatalog.offset().left,
							t = menuCatalog.offset().top,
							gap_h = inner_h,
							gap_t = that_t + inner_tbw +  inner_mt,
							moreList = catalog.find(".catalog-more-list:eq(" + indexs + ")");
						l = l + menuCatalog.width() - 2;
						gap.css({height: gap_h + "px",top: gap_t + "px"});
						moreList.siblings().hide();
						if(moreList.find("dl").length >= 1){
							moreList.show();
							catalog.css({visibility:'visible'});
						}else{
							catalog.css({visibility:'hidden'});
						}
						moreInner.css({minHeight: gap_h + "px",marginTop : that_t + inner_mt + 'px'});
						catalog.css({left: l + "px",top: t + "px"});
						if(!catalog.data('visible')){
							catalog.animate({
								width: moreInner.outerWidth()
							}, 200, function() {
								catalog.css({
									width: "auto"
								});
							});
							catalog.data('visible',1);
						}
					}
				},
				mouseleave: function() {
					//$(this).removeClass("one-class-hover");
				}
			}, ".one-class-inner");
			menuCatalog.data('bindevent',1);
		}
	};
	if(obj_){
		fun(obj_);
	}else{
		$("div.menu-catalog-module").each(function(){
			fun($(this));
		});
	}
};
/*
	tableModule
	createDate:2015/05/11
	��������������class
*/
wsf.tableModule = function() {
	var tableModule = $('div.tableModule');
	tableModule.each(function() {
		$(this).find('tr:first').addClass('trHead');
	});
};
/*
	tab-switch-module
	createDate:2015/03/24
	ģ���ǩ���л�����
*/
wsf.tabSwitchModule = function() {
	var tabSwitch = $("div.tab-switch-module"),
		tabT = tabSwitch.find("div.tab-switch-t"),
		tabC = tabSwitch.find("div.tab-switch-c");
	tabT.on({
		click: function() {
			if(tabT.data('noswitch') != 1){
				var that = $(this),
					indexs = that.index();
				that.find("span").addClass("active");
				that.siblings("li").find("span").removeClass("active");
				tabC.find('.tab-c-item').each(function() {
					if ($(this).index() == indexs) {
						$(this).addClass("tab-c-item-active");
					} else {
						$(this).removeClass("tab-c-item-active");
					}
				});
			}
		}
	}, "li");
};
// ���ɱ༭ģ��
wsf.customEditModule = function(){
	var customEditModule = $('div.custom-edit-module').each(function(){
		var t = $(this),tp = t.parent();
		t.css({height : tp.height()});
	});
};
/*
	row-classify-module
	createDate:2015/08/16
	�����Ʒ�����б�ģ��ķ���
*/
wsf.classifyModule = function(){
	$("div.classify-module").on({
		mouseenter : function(){
			$(this).addClass("classify-hover");
		},
		mouseleave : function(){
			$(this).removeClass("classify-hover");
		}
	},".big-classify,.small-classify");
	$("div.classify-module").on({
		mouseenter : function(){
			$(this).addClass("pic-classify-hover");
		},
		mouseleave : function(){
			$(this).removeClass("pic-classify-hover");
		}
	},".small-pic-classify");
};
/*ѡ���б�*/
wsf.selectState = function(){
	$("#filterSort").on({
		mouseenter : function(){
			$(this).addClass("select-state-hover");
		},
		mouseleave : function(){
			$(this).removeClass('select-state-hover');
		}
	},".select-state");
};
// �ֶ��ƶ�ģ��
wsf.manualMoveModule = function(obj){
	var manual;
	manual = obj ? obj : $("div.manual-move-module");
	manual.each(function(){
		var t = $(this),
				li = t.find('li'),
				liNum = li.length,
				liW = li.outerWidth(),
				ulP = t.find(".pic-text-list-module");
		ulP.width(liW * liNum);
	});
	manual.on({
		click : function(){
			var t = $(this),
					id = t.data('id'),
					obj = t.parent();
			moveFun(id,obj);
		}
	},'em.prev-move,em.next-move');
	manual.on({
		mouseenter : function(){
			var t = $(this);
			t.find('em.prev-move,em.next-move').css('visibility','visible');
		},
		mouseleave : function(){
			var t = $(this);
			t.find('em.prev-move,em.next-move').css('visibility','hidden');
		}
	});
	var moveFun = function(dir,obj){
		var curManual = obj,
			list = curManual.find('.manual-move-body'),
			ulP = curManual.find(".pic-text-list-module"),
			li = ulP.find('li'),
			liNum = li.length,
			liWidth = li.outerWidth(),
			showNum = Math.floor((list.width()) / liWidth),
			ulPW = ulP.width(),
			ulPLeft = Math.abs(parseInt(ulP.css('margin-left'))),
			move = showNum * liWidth,
			newMove = ulPW - (ulPLeft + move),
			nowMove;
		if(curManual.data('move') == 1) return false;
		curManual.data('move',1);
		if(dir == 'next'){
			if(newMove > 0 && newMove > move){
					nowMove = move;
			}else{
				nowMove = newMove;
			}
			if(ulPW > move){
				ulP.animate({
					"marginLeft": "-=" + nowMove
				}, 500,function(){
					curManual.removeData('move');
				});
			}
		}else{
			nowMove = ulPLeft > move ? move : ulPLeft;
			ulP.animate({
				"marginLeft": "+=" + nowMove
			}, 500,function(){
				curManual.removeData('move');
			});
		}
	};
};
wsf.absoluteModuleWrapBind = function(){
	var absMoInner = $("#absolute_module_inner");
	absMoInner.on({
		mouseenter : function(){
			var t = $(this);
			if(t.hasClass('absolute-menu-catalog')){
				wsf.absoluteMenuCatalog();
			}
		}
	},'.absolute-module');
};
wsf.absoluteMenuCatalog = function(){
 	var menuCatalog = $('.absolute-menu-catalog');
 	if(menuCatalog.length > 0){
 		menuCatalog.each(function(){
 			var t = $(this);
 			if(!t.data('bindevent')){
	 			var open = t.data('open'),
					amc = t.find('.a-m-c'),
					mch = t.find('.m-c-h'),
					mcb = t.find('.m-c-b'),
					mcm = t.find('.m-c-m'),
					gap = mcm.find('.gap');
				t.on({
		 			mouseleave : function(){
		 				if(!open){
		 					amc.removeClass('a-m-c-open');
		 					mch.removeClass('m-c-h-open');
		 				}
		 				if(mcm.data('open')){
		 					mcm.data('open',0).css({display : 'none'});
		 				}
		 				mcb.find('.o-l-e').each(function(){
		 					var ot = $(this);
		 					if(ot.data('open')){
				 				ot.removeClass('o-l-e-open').data('open',0);
				 				var tNimg = ot.find('.o-l-h-n img');
				 				tNimg.attr('src',tNimg.data('src'));
		 					}
		 				});
		 			}
		 		});
		 		t.on({
		 			mouseenter : function(){
		 				if(!open){
		 					amc.addClass('a-m-c-open');
		 					mch.addClass('m-c-h-open');
		 				}
		 			}
		 		},'.m-c-h-i');
		 		t.on({
		 			mouseenter : function(){
		 				var that = $(this),o_openId = that.data('id'),tIndex = that.index(),tagOpen = 0;
		 				if(!that.data('open')){
		 					/*����Сͼ���ַ*/
		 					that.addClass('o-l-e-open').data('open',1);
		 					var tNimg = that.find('.o-l-h-n img'),
		 						thatSib = that.siblings('.o-l-e-open'),
		 						sibNimg = thatSib.find('.o-l-h-n img');
	 						tNimg.attr('src',tNimg.data('hsrc'));
		 					thatSib.removeClass('o-l-e-open').data('open',0);
	 						sibNimg.attr('src',sibNimg.data('src'));
		 					var tBotT = parseInt(that.find('.o-l-e-i').css('borderTopWidth')),
		 						tHeight = that.find('.o-l-e-i').height(),tTop = that.position().top - mch.height();
		 					gap.css({height : tHeight + 'px', top : (tTop + tBotT) + 'px'});
			 				mcm.find('.m-c-m-e').each(function(){
			 					var iThis = $(this),m_openId = iThis.data('id');
			 					if(m_openId == o_openId){
			 						iThis.addClass('m-c-m-e-open');
			 						tagOpen = 1;
			 					}else{
			 						iThis.removeClass('m-c-m-e-open');
			 					}
			 				});
	 						if(tagOpen == 1){
			 					if(mcm.data('open') != 1){
			 						mcm.css({display : 'block',visibility : 'hidden'});
			 						var macT = mch.height(),
			 							mcmW = mcm.width(),
			 							mcmL = mcb.width() - parseInt(mcb.find('.m-c-b-i').css('border-right-width'));
			 						mcm.css({visibility : 'visible', width : 0, left : mcmL + 'px', top : macT + 'px'});
			 						mcm.animate({width: mcmW},200).data('open',1);
		 						}
		 					}else{
	 							mcm.css({display : 'none'}).data('open',0);
	 						}
		 				}
		 				// return false;
		 			}
		 		},'.o-l-e');
		 		t.data('bindevent',1);
	 		}
 		});
 	}
};
wsf.banner_2 = function(){
    dom = $('#banner_area');
	if(dom.data('type') == 4){
	    var id = dom.find('.full-banner').attr('id'),
	    win_width = userSiteWidth;
	    cntheight = dom.height();
	    $("#" + id).html5zoo({
	    	jsfolder:'',
	        width: win_width,
	        height: cntheight,
	        skinsfoldername: "",
	        loadimageondemand: false,
	        isresponsive: false,
	        autoplayvideo: false,
	        pauseonmouseover: true,
	        addmargin: true,
	        bordersize:0,
	        randomplay: false,
	        slideinterval: 5000,
	        enabletouchswipe: true,
	        transitiononfirstslide: false,
	        loop: 0,
	        autoplay: true,
	        navplayvideoimage: "/images/VNew/html5zoo/play-32-32-0.png",
	        navpreviewheight: 60,
	        timerheight: 2,
	        shownumbering: false,
	        skin: "Frontpage",
	        addgooglefonts: true,
	        navshowplaypause: false,
	        navshowplayvideo: false,
	        navshowplaypausestandalonemarginx: 8,
	        navshowplaypausestandalonemarginy: 8,
	        navbuttonradius: 0,
	        navthumbnavigationarrowimageheight: 32,
	        navmarginy: 0,
	        showshadow: false,
	        showwatermarkdefault: false,
	        navfeaturedarrowimagewidth: 16,
	        navpreviewwidth: 120,
	        googlefonts: "Inder",
	        textpositionmarginright: 24,
	        bordercolor: "#ffffff",
	        navthumbnavigationarrowimagewidth: 32,
	        navthumbtitlehovercss: "text-decoration:underline;",
	        navcolor: "#999999",
	        arrowwidth: 48,
	        texteffecteasing: "easeOutCubic",
	        texteffect: "fade",
	        navspacing: 12,
	        playvideoimage: "/images/VNew/html5zoo/playvideo-64-64-0.png",
	        ribbonimage: "/images/VNew/html5zoo/ribbon_topleft-0.png",
	        navwidth: 24,
	        showribbon: false,
	        arrowimage: "/images/VNew/html5zoo/arrows-48-48-3.png",
	        timeropacity: 0.6,
	        navthumbnavigationarrowimage: "/images/VNew/html5zoo/carouselarrows-32-32-0.png",
	        navshowplaypausestandalone: false,
	        navpreviewbordercolor: "#ffffff",
	        ribbonposition: "topleft",
	        navthumbdescriptioncss: "display:block;position:relative;padding:2px 4px;text-align:left;font:normal 12px Arial,Helvetica,sans-serif;color:#333;",
	        arrowstyle: "mouseover",
	        navthumbtitleheight: 20,
	        textpositionmargintop: 24,
	        navswitchonmouseover: false,
	        navarrowimage: "/images/VNew/html5zoo/navarrows-28-28-0.png",
	        arrowtop: 50,
	        textstyle: "static",
	        playvideoimageheight: 64,
	        navfonthighlightcolor: "#666666",
	        showbackgroundimage: false,
	        navpreviewborder: 4,
	        navopacity: 0.8,
	        shadowcolor: "#aaaaaa",
	        navbuttonshowbgimage: true,
	        navbuttonbgimage: "/images/VNew/html5zoo/navbuttonbgimage-28-28-0.png",
	        textbgcss: "display:block; position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:#333333; opacity:0.6; filter:alpha(opacity=60);",
	        navdirection: "horizontal",
	        navborder: 4,
	        bottomshadowimagewidth: 110,
	        showtimer: true,
	        navradius: 0,
	        navshowpreview: false,
	        navpreviewarrowheight: 8,
	        navmarginx: 16,
	        navfeaturedarrowimage: "/images/VNew/html5zoo/featuredarrow-16-8-0.png",
	        navfeaturedarrowimageheight: 8,
	        navstyle: "bullets",
	        textpositionmarginleft: 24,
	        descriptioncss: "display:block; position:relative; margin-top:4px; font:14px Inder,Arial,Tahoma,Helvetica,sans-serif; color:#fff;",
	        navplaypauseimage: "/images/VNew/html5zoo/navplaypause-28-28-0.png",
	        backgroundimagetop: -10,
	        timercolor: "#ffffff",
	        numberingformat: "%NUM/%TOTAL ",
	        navfontsize: 12,
	        navhighlightcolor: "#333333",
	        navimage: "/images/VNew/html5zoo/bullet-24-24-4.png",
	        navheight: 24,
	        navshowplaypausestandaloneautohide: false,
	        navbuttoncolor: "#999999",
	        navshowarrow: false,
	        navshowfeaturedarrow: false,
	        titlecss: "display:block; position:relative; font:16px Inder,Arial,Tahoma,Helvetica,sans-serif; color:#fff;",
	        ribbonimagey: 0,
	        ribbonimagex: 0,
	        navshowplaypausestandaloneposition: "bottomright",
	        shadowsize: 5,
	        arrowhideonmouseleave: 1000,
	        navshowplaypausestandalonewidth: 28,
	        navshowplaypausestandaloneheight: 28,
	        backgroundimagewidth: 120,
	        textautohide: true,
	        navthumbtitlewidth: 120,
	        navpreviewposition: "top",
	        playvideoimagewidth: 64,
	        arrowheight: 48,
	        arrowmargin: 0,
	        texteffectduration: 1000,
	        bottomshadowimage: "/images/VNew/html5zoo/bottomshadow-110-100-5.png",
	        border: 0,
	        timerposition: "bottom",
	        navfontcolor: "#333333",
	        navthumbnavigationstyle: "arrow",
	        borderradius: 0,
	        navbuttonhighlightcolor: "#333333",
	        textpositionstatic: "bottom",
	        navthumbstyle: "imageonly",
	        textcss: "display:block; padding:12px; text-align:left;",
	        navbordercolor: "#ffffff",
	        navpreviewarrowimage: "/images/VNew/html5zoo/previewarrow-16-8-0.png",
	        showbottomshadow: false,
	        textpositionmarginstatic: 0,
	        backgroundimage: "",
	        navposition: "bottom",
	        navpreviewarrowwidth: 16,
	        bottomshadowimagetop: 100,
	        textpositiondynamic: "bottomleft",
	        navshowbuttons: true,
	        navthumbtitlecss: "display:block;position:relative;padding:2px 4px;text-align:left;font:bold 14px Arial,Helvetica,sans-serif;color:#333;",
	        textpositionmarginbottom: 24,
	        ribbonmarginy: 0,
	        ribbonmarginx: 0,
	        transition: "slide,crossfade,threedhorizontal,slice,fade,blocks,blinds,shuffle,threed"
	    });
	}
};
/*
//jquery focusImg
//qwguo	qwguo@sohu.com
//copyright www.ev123.com
// ����ͼjs����
 */
(function($) {
	$.fn.extend({
		focusImg: function(options) {
			return this.each(function() {
				var Opts = {
					uistyle: "style-1",
					fnclass: "inOut",
					evtype: "mouseenter",
					usertime: 6
				};
				Opts = $.extend(Opts, options);

				var full = $(this),
					fWidth = full.parent().width(),
					fHeight = full.parent().height(),
					uistyle = Opts.uistyle,
					fnclass = Opts.fnclass,
					pUl = full.children("ul"),
					pLi = pUl.find("li"),
					bNav = $("<div></div>"),
					times = null,
					an = true,
					y = 0,
					change = function(e) { //ͼƬ��ַ����
						var curli = e,
							bigpic = curli.attr("bigpic"),
							bcolor = curli.attr("bcolor");
						curli.css({
							"background-color": bcolor,
							"background-image": "url(" + bigpic + ")"
						});
						curli.attr("change", "true");
					},
					eventfn = function(obj, fobj) { //�¼�ģʽ
						obj.find(fobj).each(function(e) {
							$(this).bind(Opts.evtype, function() {
								eval(fnclass + "(e)");
							});
						});
					};
				switch (Opts.fnclass) {
					case 'inOut':
						(function() {
							pUl.addClass('banner-pic-1').css({
								"height": fHeight
							});
							pLi.each(function() {
								$(this).css({
									"height": fHeight
								});
							});
						})();
						break;
					case 'LMove':
						(function() {
							full.css({
								"height": fHeight + "px"
							});
							pUl.addClass('banner-pic-2').css({
								"width": pLi.length * fWidth + "px",
								"height": fHeight + "px"
							});
							pLi.each(function() {
								$(this).css({
									"width": fWidth + "px",
									"height": fHeight
								});
							});
						})();
						break;
					case 'TMove':
						(function() {
							full.css({
								"height": fHeight + "px"
							});
							pUl.addClass('banner-pic-3').css({
								"height": pLi.length * fHeight + "px"
							});
							pLi.each(function() {
								$(this).css({
									"height": fHeight
								});
							});
						})();
						break;
				}
				switch (Opts.uistyle) {
					case "style-1":
						if(pLi.length > 1){
							var ban = $("<div class='b-nav'></div>");
							pLi.each(function(e) {
								ban.append("<span></span>");
							});
							full.append(bNav.attr("class", "banner-nav-1").html(ban));
							eventfn(ban, "span");
						}
					break;
					case "style-2":
						if(pLi.length > 1){
							var ban = $("<div class='b-nav'></div>");
							pLi.each(function(e) {
								ban.append("<span>" + (e + 1) + "</span>");
							});
							full.append(bNav.attr("class", "banner-nav-2").html(ban));
							eventfn(ban, "span");
						}
					break;
					case "style-3":
						var ban = $("<div class='b-nav'></div>");
						pLi.each(function() {
							var smallurl = $(this).attr("smallpic") ? $(this).attr("smallpic") : $(this).attr("bigpic");
							var s = $("<span></span>").html("<img src=" + smallurl + " />");
							ban.append(s);
						});
						full.append(bNav.attr("class", "banner-nav-3").html(ban));
						eventfn(ban, "span");
						break;
				}
				var inOut = function(e) {
					var curli = pLi.eq(e);
					if (curli.attr("change") == "false") {
						change(curli);
					}
					var ospan = bNav.find("span.cur");
					var o = ospan.index();
					if (e != o) {
						if (an) {
							an = false;
							ospan.removeClass("cur");
							bNav.find("span:eq(" + e + ")").addClass("cur");
							pLi.eq(o).css({
								"z-index": 3
							}).animate({
								"opacity": 0
							}, 1000, function() {
								an = true;
								$(this).css({
									"opacity": 1,
									"z-index": 1
								});
							});
							curli.css({
								"display": "block",
								"z-index": 2
							});
							y = y + 1;
							if (y >= pLi.length) {
								y = 0;
							}
						}
					}
				};
				var LMove = function(e) {
					var fullW = full.parent().width(),
						fullH = full.parent().height();
					var curli = pLi.eq(e);
					if (curli.attr("change") == "false") {
						change(curli);
					}
					var ospan = bNav.find("span.cur");
					var o = ospan.index();
					if (an) {
						an = false;
						ospan.removeClass("cur");
						bNav.find("span:eq(" + e + ")").addClass("cur");
						pUl.animate({
							"left": "-" + e * fullW
						}, 200, function() {
							an = true;
							y = y + 1;
							if (y >= pLi.length) {
								y = 0;
							}
						});
					}
				};
				var TMove = function(e) {
					var fullH = full.height();
					var curli = pLi.eq(e);
					if (curli.attr("change") == "false") {
						change(curli);
					}
					var ospan = bNav.find("span.cur");
					var o = ospan.index();
					if (an) {
						an = false;
						ospan.removeClass("cur");
						bNav.find("span:eq(" + e + ")").addClass("cur");
						pUl.animate({
							"top": "-" + e * fullH
						}, 200, function() {
							an = true;
							y = y + 1;
							if (y >= pLi.length) {
								y = 0;
							}
						});
					}
				};
				times = setInterval(function() {
					eval(Opts.fnclass + "(y)");
				}, (Opts.usertime) * 1000);
				full.mouseenter(function() {
					clearInterval(times);
				});
				full.mouseleave(function() {
					times = setInterval(function() {
						eval(Opts.fnclass + "(y)");
					}, (Opts.usertime) * 1000);
				});
				eval(Opts.fnclass + "(y)");
			});
		}
	});
})(jQuery);

/*
//ģ���ƶ�����
��Ҫ����ק��ĵ�ģ�������ƶ�Ч��
*/
(function($) {
	$.fn.extend({
		"moveModule": function(options) {
			return this.each(function() {
				var defaultO = {
					axis: "top",
					speed: "slow",
					type: "flow",
					hand: false
				};
				var O = $.extend(defaultO, options);
				var speed = 100;
				if (O.type == "flow") {
					switch (O.speed) {
						case "slowly":
							speed = 150;
							break;
						case "slow":
							speed = 100;
							break;
						case "normal":
							speed = 60;
							break;
						case "quick":
							speed = 30;
							break;
						case "quickly":
							speed = 5;
							break;
					}
				} else if (O.type == "single") {
					switch (O.speed) {
						case "slowly":
							speed = 5000;
							break;
						case "slow":
							speed = 4000;
							break;
						case "normal":
							speed = 3000;
							break;
						case "quick":
							speed = 2000;
							break;
						case "quickly":
							speed = 1000;
							break;
					}
				}
				var _this = $(this),
					movepx = 0,
					times = null,
					thisPar = $(this).parent(),
					thisParH = thisPar.height(),
					thisParW = thisPar.width(),
					firstChild = _this.children().first();
				if (O.axis == "top" || O.axis == "bottom") {
					var thisH = _this.height();
				} else if (O.axis == "left" || O.axis == "right") {
					if(_this.hasClass('pic-text-list-module')){
						_this.addClass('pic-text-list-module-moveL');
						// if(_this.hasClass('pic-text-list-module-1')){
							var liw = firstChild.find("li").width();
							firstChild.find("li").width(liw);
							// firstChild.find("li").width(thisParW);
						// }
						var li_w = 0;
						firstChild.find("li").each(function(){
							li_w+= $(this).outerWidth();
						});
						firstChild.width(li_w);
					}
					var thisW = firstChild.width();
					_this.width(firstChild.width() * 2 + 10);
				}
				var clone = $(firstChild.clone());
				//����
				if (O.axis == "top") {
					movepx = 0;
					_this.append(clone);
					times = setInterval(moveT, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveT, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//����
				if (O.axis == "bottom") {
					movepx = -(thisH + (thisH - thisParH));
					_this.css({
						"margin-top": -thisH
					}).append(clone);
					times = setInterval(moveB, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveB, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//����
				if (O.axis == "left") {
					movepx = 0;
					_this.css({
						"margin-left": 0
					}).append(clone);
					times = setInterval(moveL, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveL, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//����
				if (O.axis == "right") {
					movepx = -(thisW);
					_this.css({
						"margin-left": movepx
					}).append(clone);
					times = setInterval(moveR, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveR, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//���ƶ�����
				function moveB() {
					if (thisH != firstChild.height()) {
						thisH = firstChild.height();
					}
					var mt = parseInt(_this.css("margin-top"));
					var itemH = firstChild.children().outerHeight();
					if (O.type == "flow") {
						if (mt < 0) {
							_this.css("margin-top", movepx);
							movepx++;
						} else {
							movepx = -thisH;
							_this.css("margin-top", movepx);
						}
					} else if (O.type == "single") {
						if (mt < 0) {
							_this.animate({
								"margin-top": mt + itemH
							}, 500);
						} else {
							_this.css("margin-top", -thisH);
							_this.animate({
								"margin-top": -(thisH - itemH)
							}, 500);
						}
					}
				}
				//���ƶ�����
				function moveT() {
					if (thisH != firstChild.height()) {
						thisH = firstChild.height();
					}
					var itemH = firstChild.children().outerHeight();
					var mt = Math.abs(parseInt(_this.css("margin-top")));
					if (O.type == "single") {
						if (mt < thisH) {
							_this.animate({
								"margin-top": -(mt + itemH)
							}, 500);
						} else {
							_this.css("margin-top", 0);
							_this.animate({
								"margin-top": -(itemH)
							}, 500);
						}
					} else if (O.type == "flow") {
						if (mt < thisH) {
							_this.css("margin-top", -movepx);
							movepx++;
						} else {
							movepx = 0;
							_this.css("margin-top", -movepx);
						}
					}
				}
				//���ƶ�
				function moveL() {
					if (thisParW != _this.parent().width()) {
						if (_this.hasClass("proListmodule_1")) {
							thisParW = _this.parent().width();
							firstChild.children().width(thisParW);
							clone.remove();
							clone = $(firstChild.clone());
							_this.css({
								"margin-left": 0
							}).append(clone);
							thisW = firstChild.width();
							_this.width(firstChild.width() * 2);
						}
					}
					var itemW = firstChild.children().outerWidth();
					var ml = Math.abs(parseInt(_this.css("margin-left")));
					if (O.type == "single") {
						if (ml < thisW) {
							_this.animate({
								"margin-left": -(ml + itemW)
							}, 500);
						} else {
							_this.css("margin-left", 0);
							_this.animate({
								"margin-left": -(itemW)
							}, 500);
						}
					} else if (O.type == "flow") {
						if (ml < thisW) {
							_this.css("margin-left", -movepx);
							movepx++;
						} else {
							movepx = 0;
							_this.css("margin-left", -movepx);
						}
					}
				}

				//���ƶ�
				function moveR() {
					if (thisParW != _this.parent().width()) {
						if (_this.hasClass("pic-text-list-module-1") || _this.hasClass("pic-text-list-module-2")) {
							thisParW = _this.parent().width();
							firstChild.children().width(thisParW);
							clone.remove();
							clone = $(firstChild.clone());
							_this.css({
								"margin-left": -firstChild.width()
							}).append(clone);
							thisW = firstChild.width();
							_this.width(firstChild.width() * 2);
						}
					}
					var itemW = firstChild.children().outerWidth();
					var ml = parseInt(_this.css("margin-left"));
					if (O.type == "single") {
						if (ml < 0) {
							_this.animate({
								"margin-left": ml + itemW
							}, 500);
						} else {
							_this.css("margin-left", -thisW);
							_this.animate({
								"margin-left": -(thisW - itemW)
							}, 500);
						}
					} else if (O.type == "flow") {
						if (ml < 0) {
							_this.css("margin-left", movepx);
							movepx++;
						} else {
							movepx = -thisParW;
							_this.css("margin-left", movepx);
						}
					}
				}

			});
		}
	});
})(jQuery);
/*
//textList module
�ı��б�ǰ�꺯��,ΪҲ����ı��б�����ǰ��
*/
// $(function(){
// 	var icon_array = {
// 		'icon_1':"&#8226",				//''
// 		'icon_2':"&#9734",				//'��'
// 		'icon_3':"&#9733",				//'��'
// 		'icon_4':"&#9675",				//'��'
// 		'icon_5':"&#9679",				//'��'
// 		'icon_6':"&#9671",				//'��'
// 		'icon_7':"&#9670",				//'��'
// 		'icon_8':"&#9633",				//'��'
// 		'icon_9':"&#9632",				//'��'
// 		'icon_10':"&#9651",				//'��'
// 		'icon_11':"&#9650",				//'��'
// 		'icon_12':"&#8251"				//'��'
// 	}
// 	var textList_1 = $("div.text-list-module-1"),
// 			textList_2 = $("div.text-list-module-2");
// 		textList_1.each(function(){
// 			$(this).find("li").each(function(){
// 				var codes = $(this).find("code"),
// 						dataId = codes.data("id");
// 				if(dataId){
// 					codes.html(icon_array[dataId]);
// 				}
// 			})
// 		});

// });
// ��Ʒ����ҳ��ͼƬЧ��
wsf.innerPreview = function(id) {
	var preview = $(id),
		bigPics = preview.find(".show-big-pic"),
		bigPic = bigPics.find(".pics"),
		smallListArea = preview.find(".small-pic-list-area"),
		leftBut = smallListArea.find(".left-but"),
		rightBut = smallListArea.find(".right-but"),
		slist = smallListArea.find(".small-pic-list"),
		listUl = slist.find("ul"),
	li = listUl.find("li"),
		ulW = 0, spic = false, zoom = false;
	li.each(function() {
		ulW += $(this).width();
	});
	// listUl.width(ulW);
	var movePx = 0,
		cmovePx = ulW - slist.width();
	rightBut.on({
		click: function() {
			if (movePx < cmovePx) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx += li.width())
					}, 200);
				}
			}
		}
	});
	leftBut.on({
		click: function() {
			if (movePx > 0) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx -= li.width())
					}, 200);
				}
			}
		}
	});
	li.on({
		click: function() {
			$(this).siblings().removeClass('liCur').end().addClass("liCur");
			var msrc = $(this).find("img").attr("msrc"),
				bsrc = $(this).find("img").attr("bsrc");
			bigPics.find("img").attr({
				"src": msrc,
				"bsrc": bsrc
			});
		}
	});
	bigPics.on({
		mouseenter: function(event) {
			var that = $(this),
				bsrc = that.find("img").attr("bsrc");
			if (that.data("hover") != 1) {
				that.data("hover", 1);
				zoom = $('<div class="zoom"></div>');
				that.children().append(zoom);
				spic = $('<div class="zoomPic"><img src="' + bsrc + '" /></div>');
				spic.css({
					"left": (preview.width() + 10) + "px",
					"top": "0px"
				});
				spic.appendTo(preview);
			}
			var l = event.clientX,
				t = event.clientY + $(document).scrollTop();
			that.find(".pl-collect").animate({right : 0},100);
			fun(l, t);
		},
		mousemove: function(event) {
			var l = event.clientX,
				t = event.clientY + $(document).scrollTop();
			if(zoom){
				fun(l, t);
			}
		},
		mouseleave: function() {
			var that = $(this);
			that.find(".pl-collect").animate({right : -100},100);
			that.removeData("hover");
			zoom.remove();
			spic.remove();
			zoom = spic = false;
		}
	});
	var fun = function(l, t) {
		var zoomW = (zoom.outerWidth() || zoom.width());
			zoomH = (zoom.outerHeight() || zoom.height());
		l = l - bigPic.offset().left - zoomW / 2;
		t = t - bigPic.offset().top - zoomH / 2;
		if (l < 0) {
			l = 0;
		} else if (l > bigPic.outerWidth() - zoomW) {
			l = bigPic.outerWidth() - zoomW;
		}
		if (t < 0) {
			t = 0;
		} else if (t > bigPic.outerHeight() - zoomH) {
			t = bigPic.outerHeight() - zoomH;
		}
		zoom.css({
			"left": l + "px",
			"top": t + "px"
		});
		var lx = l / (bigPic.outerWidth() - zoomW);
		var tx = t / (bigPic.outerHeight() - zoomH);
		var img = spic.children("img");
		img.css({
			"left": -lx * (img.outerWidth() - spic.outerWidth()) + "px",
			"top": -tx * (img.outerHeight() - spic.outerHeight()) + "px"
		});
	};
};
// ��Ʒ����ҳ��ͼƬЧ��
wsf.innerWapBuy = function(){
	var pWapBuyArea = $("#pWapBuyArea");
	if(pWapBuyArea.length){
		var pPriceList = $("#pPriceList"),t;
		if(pPriceList.length){
			t = pPriceList.position().top;
		}else{
			t = 32;
		}
		pWapBuyArea.css({top : t + 'px'});
		pWapBuyArea.on({
			mouseenter : function(){
				$(this).addClass('p-wap-buy-area-hover');
			},
			mouseleave : function(){
				$(this).removeClass('p-wap-buy-area-hover');
			}
		});
	}
};
// ��Ƹ����
function zpshowDiv() {
	var winWidth = $("body").width(),
		winHeight = $("body").height();

	$('#allzz').css({
		display: "block",
		width: winWidth,
		height: winHeight
	});
	$("#zpAlert").css({
		display: "block"
	});
}

function zpcloseDiv() {
	$("#allzz,#zpAlert").css({
		display: "none"
	});
}

/**��Ʒ����ҳ��ͼƬչʾЧ��**/
$(function() {
	var preview = $("#inner_preview"),
		bigPics = preview.children(".bigPics"),
		bigPic = bigPics.children(".bigPic"),
		smallListArea = preview.children(".smallPic_listArea"),
		leftBut = smallListArea.children(".left_but"),
		rightBut = smallListArea.children(".right_but"),
		slist = smallListArea.children(".smallPic_list"),
		listUl = slist.children("ul"),
		li = listUl.children("li"),
		ulW = 0, spic = "", zoom = "";
	li.each(function() {
		ulW += $(this).width();
	});
	listUl.width(ulW);
	var movePx = 0,
		cmovePx = ulW - slist.width();
	rightBut.on({
		click: function() {
			if (movePx < cmovePx) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx += li.width())
					}, 200);
				}
			}
		}
	});
	leftBut.on({
		click: function() {
			if (movePx > 0) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx -= li.width())
					}, 200);
				}
			}
		}
	});
	li.on({
		click: function() {
			$(this).siblings().removeClass('Pic_box_cur').end().addClass("Pic_box_cur");
			var msrc = $(this).children("img").attr("msrc"),
				bsrc = $(this).children("img").attr("bsrc");
			bigPics.find("img").attr({
				"src": msrc,
				"bsrc": bsrc
			});
		}
	});
	bigPics.on({
		mouseenter: function(event) {
			var that = $(this),
				bsrc = that.find("img").attr("bsrc");
			if (that.data("hover") != 1) {
				that.data("hover", 1);
				zoom = $('<div class="zoom"></div>');
				that.children().append(zoom);
				spic = $('<div class="zoomPic"><img src="' + bsrc + '" /></div>');
				spic.css({
					"left": (preview.width() + 10) + "px",
					"top": "0px"
				});
				spic.appendTo(preview);
			}
			var l = event.clientX,
				t = event.clientY;
			fun(l, t);
		},
		mousemove: function(event) {
			var l = event.clientX,
				t = event.clientY;
			fun(l, t);
		},
		mouseleave: function() {
			var that = $(this);
			that.removeData("hover");
			zoom.remove();
			spic.remove();
			zoom = "";
			spic = "";
		}
	});
	var fun = function(l, t) {
		l = l - bigPic.offset().left - zoom.outerWidth() / 2;
		t = t - bigPic.offset().top - zoom.outerHeight() / 2;
		if (l < 0) {
			l = 0;
		} else if (l > bigPic.outerWidth() - zoom.outerWidth()) {
			l = bigPic.outerWidth() - zoom.outerWidth();
		}
		if (t < 0) {
			t = 0;
		} else if (t > bigPic.outerHeight() - zoom.outerHeight()) {
			t = bigPic.outerHeight() - zoom.outerHeight();
		}
		zoom.css({
			"left": l + "px",
			"top": t + "px"
		});
		var lx = l / (bigPic.outerWidth() - zoom.outerWidth()),
			tx = t / (bigPic.outerHeight() - zoom.outerHeight());
		var img = spic.children("img");
		img.css({
			"left": -lx * (img.outerWidth() - spic.outerWidth()) + "px",
			"top": -tx * (img.outerHeight() - spic.outerHeight()) + "px"
		});
	};
});
/* ����ʱ���� */
wsf.countDown = function(j) {
	var r = function(t) {
			var a = t.split(' '),
				ymd = a[0],
				hms = a[1],
				str = ymd.split('-'),
				fix = hms.split(':'),
				year = str[0] - 0,
				month = str[1] - 0 - 1,
				day = str[2] - 0,
				hour = fix[0] - 0,
				minute = fix[1] - 0,
				second = fix[2] - 0,
				time = (new Date(year, month, day, hour, minute, second)).getTime();
			return parseInt(time / 1000);
		},
		o = j.o,
		st = r(j.st),
		et = r(j.et),
		nts = j.nt ? r(j.nt) : (new Date().getTime() / 1000),
		n_underway = function() {
			var y, m, d, h, mi, s, now = nts,
				c = et - now,
				html_;
			nts = nts + 1;
			if (c > 0) {
				d = Math.floor(c / (60 * 60 * 24));
				h = Math.floor((c - d * 24 * 60 * 60) / 3600);
				mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
				s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
				h = h < 10 ? '0' + h : h;
				mi = mi < 10 ? '0' + mi : mi;
				s = s < 10 ? '0' + s : s;
				html_ = '<span class="count-time"><i>' + d + '</i><em>��</em><i>' + h + '</i><em>ʱ</em><i>' + mi + '</i><em>��</em><i>' + s + '</i><em>��</em></span>';
				o.html(html_);
				setTimeout(function() {
					n_underway();
				}, 1000);
			} else {
				j.efun();
				// o.html('��Ѿ�������');
			}
		},
		b_underway = function() {
			var y, m, d, h, mi, s, now = nts,
				c = st - now,
				html_;
			nts = nts + 1;
			if (c > 0) {
				d = Math.floor(c / (60 * 60 * 24));
				h = Math.floor((c - d * 24 * 60 * 60) / 3600);
				mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
				s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
				h = h < 10 ? '0' + h : h;
				mi = mi < 10 ? '0' + mi : mi;
				s = s < 10 ? '0' + s : s;
				html_ = '<span class="count-time"><i>' + d + '</i><em>��</em><i>' + h + '</i><em>ʱ</em><i>' + mi + '</i><em>��</em><i>' + s + '</i><em>��</em></span>';
				o.html(html_);
				setTimeout(function() {
					b_underway();
				}, 1000);
			} else {
				n_underway();
				j.nfun();
			}
		};
	// �ж�״̬
	if ((st - nts) > 0) {
		j.sfun();
		b_underway();
	} else if ((nts - et) > 0) {
		j.efun();
		// o.html('��Ѿ�������');
	} else {
		n_underway();
		j.nfun();
	}
};
//�ֶ����ҹ�����ƷЧ���D�D��
wsf.flow_pro_ = function(n, t) {
	var ContN = $(n).parent(),
		$list_ul = ContN.find("ul"),
		$list_ul_par = $list_ul.parent(),
		$list_li_num = $list_ul.find("li").length,
		$list_li_Lborder = parseInt($list_ul.find("li").css("border-left-width")),
		$list_li_Rborder = parseInt($list_ul.find("li").css("border-right-width")),
		$list_li_Lpadd = parseInt($list_ul.find("li").css("padding-left")),
		$list_li_Rpadd = parseInt($list_ul.find("li").css("padding-left")),
		$list_li_Rmargin = parseInt($list_ul.find("li").css('margin-right')),
		$list_li_Lmargin = parseInt($list_ul.find("li").css('margin-left'));
	$list_li_Lborder = isNaN($list_li_Lborder) ? 0 : $list_li_Lborder;
	$list_li_Rborder = isNaN($list_li_Rborder) ? 0 : $list_li_Rborder;
	$list_li_Rmargin = isNaN($list_li_Rmargin) ? 0 : $list_li_Rmargin;
	$list_li_Lmargin = isNaN($list_li_Lmargin) ? 0 : $list_li_Lmargin;
	var $list_li_width = $list_ul.find("li").width() + $list_li_Lborder + $list_li_Rborder + $list_li_Lmargin + $list_li_Rmargin + $list_li_Lpadd + $list_li_Rpadd,
		$show_num = Math.floor(($list_ul_par.width()) / $list_li_width),
		$ul_width = $list_li_width * $list_li_num,
		$list_ul_left = Math.abs($list_ul.position().left),
		$page = Math.ceil($list_li_num / $show_num),
		$move = $show_num * $list_li_width,
		$newMove = $ul_width - ($list_ul_left + $move);
	if (t == 1) {
		if ($newMove > 0) {
			if ($newMove > $move) {
				if ($list_ul.is(':animated') === false) {
					$list_ul.animate({
						"left": "-=" + $move
					}, 500);
					$(n).parent().find(".left-but").addClass("left-but-off");
				}
			} else {
				if ($list_ul.is(':animated') === false) {
					$list_ul.animate({
						"left": "-=" + $newMove
					}, 500);
					$(n).parent().find(".right-but").addClass("right-but-off");
					$(n).parent().find(".left-but").addClass("left-but-off");
				}
			}
		}
	} else {
		if ($list_ul_left > 0) {
			if ($list_ul_left > $move) {
				if ($list_ul.is(':animated') === false) {
					$list_ul.stop().animate({
						"left": "+=" + $move
					}, 500);
					$(n).parent().find(".right-but").removeClass("right-but-off");
				}
			} else {
				if ($list_ul.is(':animated') === false) {
					$list_ul.stop().animate({
						"left": "+=" + $list_ul_left
					}, 500);
					$(n).parent().find(".left-but").removeClass("left-but-off");
					$(n).parent().find(".right-but").removeClass("right-but-off");
				}
			}
		}
	}
};
/*--�ֶ����ҹ�����Ʒfunction--*/
wsf.flow_pro = function() {
	$(".right-but").click(function() {
		wsf.flow_pro_(this, 1);
	});
	$(".left-but").click(function() {
		wsf.flow_pro_(this, 2);
	});
};
/*���߿ͷ�*/
wsf.onlineService = function(){
	var onService_panel = $("#onService_panel");
	onService_panel.on({
		mouseenter : function(){
			onService_panel.animate({
				right: 0
			});
			$(this).hide();
		}
	},"#onlineOpen");
	onService_panel.on({
		click : function(){
			onService_panel.animate({
				right: -102
			});
			onService_panel.find(".online_tab").fadeOut(100);
			onService_panel.find("#onlineOpen").show();
		}
	},"#onlineClose");

	$(".online_icon").click(function() {
		$(".online_tab").fadeOut(100);
		var onclickId = $(this).attr("id");
		var findparent_tab;
		switch (onclickId) {
			case "online_tel_icon":
				findparent_tab = $("#onlineTelTab");
				break;
			case "online_qq_icon":
				findparent_tab = $("#onlineQQTab");
				break;
			case "online_message_icon":
				findparent_tab = $("#onlineMessageTab");
				break;
		}
		findparent_tab.fadeIn(100);
	});
	$("#onService_panel .tab_close").click(function() {
		$(this).parents(".online_tab").hide();
	});

	function checkLen(obj, maxs) {
		var maxChars = maxs; //����ַ���
		if (obj.value.length > maxChars) {
			obj.value = obj.value.substring(0, maxChars);
		}
		var curr = maxChars - obj.value.length;
		$(obj).parents("dl").find(".text_length b").text(curr.toString());
	}
};
/*��վ���ȼ���*/
wsf.loadWidth = function(){
	var w = $(window),wW = w.width(),bodys = $('body'),htmls = $('html');
	if(wW < userSiteWidth){
		bodys.width(userSiteWidth + 20);
		htmls.width(userSiteWidth + 20);
	}else{
		bodys.width('auto');
		htmls.width('auto');
	}
};
wsf.windowResize = function(){
	$(window).on({
		resize: function(){
			wsf.loadWidth();
		}
	});
};
/*ģ���������ִ��*/
if(!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	wsf.wow_ = function(){
		wsf.wow = new WOW({
		  boxClass: 'wow',
		  animateClass: 'animated',
		  offset: 0,
		  mobile: true,
		  live: true
		});
	};
}

wsf.moduleBind = function(){
	$(".customModule").on({
		mouseenter : function(){
			var t = $(this),
				dataType = wsf.f.s_j(t.attr('data-attr')),
				childDiv = t.find('.MoBodyC > div');
			if(!childDiv.data('bindevent') && !childDiv.hasClass('editMoConBut')){
				switch(dataType.mt){
					case 5 : case 6 : case 1 : case 2 :
						wsf.textListModule(childDiv);
					break;
					case 19 :
						wsf.catalogList(childDiv);
					break;
					case 21 :
						wsf.menuCatalogModule(childDiv);
					break;
				}
			}
		}
	});
};
/*ҳ��������Ҫִ�м��صĺ���*/
$(function(){
	wsf.nav();
	wsf.search();
	wsf.focusPicModule();
	wsf.textListModule();
	wsf.catalogList();
	wsf.menuCatalogModule();
	wsf.tabSwitchModule();
	// wsf.tableModule();
	wsf.tabSwitchModule();
	wsf.classifyModule();
	wsf.selectState();
	wsf.customEditModule();
	wsf.manualMoveModule();
	wsf.innerWapBuy();
	wsf.picTextList_changePic();
	wsf.interactFun_();
	if(!is_action){
		wsf.loadWidth();
		wsf.absoluteMenuCatalog();
		wsf.windowResize();
		wsf.wScroll();
	}else{
		wsf.moduleBind();
		wsf.absoluteModuleWrapBind();
	}
	wsf.banner_2();
});