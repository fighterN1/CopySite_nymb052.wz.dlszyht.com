function getCity(type, id, version){
    var provinceCode = $('#province_'+id).val();
    if (version) {
        $('#province_'+id).parent().parent().siblings(".city, .district").hide();
    }
    var url = "/dom/ajax_form.php?ajax=3&code=" + provinceCode + "&fieldId=" + id + "&type=" + type;
    $.get(url,function(data){
        if(data){
            $('#city_'+ id).empty();
            $('#city_'+ id).append(data);
            if (version) {
                $('#city_'+ id).siblings("span").html('请选择城市');
                $('#province_'+id).parent().parent().siblings('.city').css('display','block');
            }
        }
    });
}

function getDistrict(id, version){
    var cityCode = $('#city_'+id).val();
    var url = "/dom/ajax_form.php?ajax=4&cityCode=" + cityCode + "&fieldId=" + id;
    if (version) {
        $('#city_'+id).parent().parent().siblings(".district").hide();
    }
    $.get(url, function(data){
        $('#district_'+ id).empty();
        $('#district_'+ id).append(data);
        if (version) {
            $('#district_'+ id).siblings("span").html('请选择区县');
            $('#city_'+id).parent().parent().siblings('.district').css('display','block');
        }
    })
}

function getPCD(id){
    var province = $('#province_'+id+' option:selected').html();
    var city = $('#city_'+id+' option:selected').html();
    var district = $('#district_'+id+' option:selected').html();
    $('#field_'+id).val(province + '#' + city + '#' + district);
}

function getP(id){
    var province = $('#province_'+id+' option:selected').html();
    $('#field_'+id).val(province);
}

function getPC(id){
    var province = $('#province_'+id+' option:selected').html();
    var city = $('#city_'+id+' option:selected').html();
    $('#field_'+id).val(province + '#' + city);
}

$(function() {
    $("body").on("change", ".checkboxDynamicValue", function() {
        var id = parseInt($(this).data("id"));
        if (!id) {
            return false;
        }

        $('#field_'+id).val("");

        var name = 'checkbox_'+id+'[]';
        if ($("input[name='"+name+"']:checked").length === 0) {
            return false;
        }

        var str = '';
        $("input[name='"+name+"']:checked").each(function(){
            str ? str += '#*#'+ $(this).val() : str = $(this).val();
        });
        $('#field_'+id).val(str);
        return false;
    });
});

function getCheckboxVal(id){
    $('#field_'+id).val("");

    var name = 'checkbox_'+id+'[]';
    if ($("input[name='"+name+"']:checked").length === 0) {
        return false;
    }

    var str = '';
    $("input[name='"+name+"']:checked").each(function(){
        str ? str += '#*#'+ $(this).val() : str = $(this).val();
    });
    $('#field_'+id).val(str);
    return false;
}

function auto_check(oParam) {
    var checkArr = [];
    for (var i=0; i<oParam.length; i++) {
        (function(n){
            var _this = oParam[n];
            if (_this['type'] == 2) {
                $('#field_'+_this['id']+' option:first').attr("selected","selected");
                $('#field_'+_this['id']).on('change',function(){
                    var _thisVal = $.trim($('#field_'+_this['id']).val());

                    if (_this['required'] == 1 && _thisVal == '') {
                        $('#error_'+_this['id']).html('<span class="caution">不能为空！</span>');
                        return false;
                    } else {
                        $('#error_'+_this['id']).html('');
                        return true;
                    }
                })
            } else if (_this['type'] == 3) {
                    checkArr[_this['id']] = $("input[name='checkbox_"+ _this['id'] +"[]']");
                    for (var j=0; j<checkArr.length; j++) {
                        (function(m){
                            $(checkArr[_this['id']][m]).on('click',function(){
                                if (_this['required'] == 1 && $("input[name='checkbox_"+ _this['id'] +"[]']:checked").length === 0) {
                                    $('#error_'+_this['id']).html('<span class="error">请选择一个项目！</span>');
                                } else {
                                    $('#error_'+_this['id']).html('');
                                }
                            })
                            return false;
                        })(j);
                    }
            } else if (_this['type'] == 5 || _this['type'] == 6) {
                $('#district_'+_this['id']+' option:first').attr("selected","selected");
                $('#city_'+_this['id']+' option:first').attr("selected","selected");
                $('#province_'+_this['id']+' option:first').attr("selected","selected");
                $('#province_'+_this['id']).on('change',function(){
                    var _thisVal = $.trim($('#province_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal == '') {
                        showCityMsg(1, _this['id']);
                    } else {
                        showCityMsg(false, _this['id']);
                    }
                })
                $('#city_'+_this['id']).on('change',function(){
                    var _thisVal1 = $.trim($('#city_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal1 == '') {
                        showCityMsg(2, _this['id']);
                    } else {
                        showCityMsg(false, _this['id']);
                    }
                })
                if (_this['type'] == 5){
                    $('#district_'+_this['id']).on('change',function(){
                        var _thisVal2 = $.trim($('#district_'+_this['id']).val());
                        if (_this['required'] == 1 && _thisVal2 == '') {
                            showCityMsg(3, _this['id']);
                        } else {
                            showCityMsg(false, _this['id']);
                        }
                    })
                }
            } else {
                $('#field_'+_this['id']).on('blur',function(){
                    var _thisVal = $.trim($('#field_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal == '') {
                        $('#error_'+_this['id']).html('<span class="caution">不能为空！</span>');
                        return false;
                    } else {
                        if ($.trim(_this['regex']) && (_this['required'] == 1 || _thisVal)) {
                            if (paramRegexp(_this['regex'], _thisVal) === false) {
                                $('#error_'+_this['id']).html('<span class="error">'+_this['msg']+'</span>');
                                return false;
                            } else {
                                $('#error_'+_this['id']).html('');
                                return true;
                            }
                        } else {
                            $('#error_'+_this['id']).html('');
                            return true;
                        }
                    }

                })
            }
        })(i);
    }
}

function defineFormSublime(iFormId, type) {
    if($("#HourWorkBox input").length == 3){
        if (!hourCheckTime()) {
            return false;
        }
    }

    if($("#roomOrderHtml input").length == 5){
        if (!checkRoomFrom()) {
            return false;
        }
    }
    if (!type) {
        if ($('#form-sublimt-box-'+ iFormId).data("hyid")) {
            if ($(".ev_t_product_yy_c ul li").length < 1) {
                showAllzz("预约项目不能为空！");
                return false;
            }
        }
    }

    var
        param = userDefineFromParam(iFormId),
        iCountError = 0,
        checkArr = [];

    for (var i=0; i<param.length; i++) {
        (function(n){
            var _this = param[n];
            if (_this['type'] == 2) {
                if ($('#field_'+_this['id']).triggerHandler('change') === false) {
                    iCountError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                }
            } else if (_this['type'] == 3) {
                checkArr = $("input[name='checkbox_"+ _this['id'] +"[]']:checked");
                if (_this['required'] == 1 && checkArr.length < 1) {
                    $('#error_'+_this['id']).html('<span class="caution">不能为空！</span>！');
                    iCountError++;
                    if (iCountError == 1) {
                        $("input[name='checkbox_"+ _this['id'] +"[]']").focus();
                    }
                }
            } else if (_this['type'] == 4) {
                var _thisVal = $("input[name='field_"+ _this['id'] +"']:checked").length;
                if (_this['required'] == 1 && _thisVal < 1) {
                    $('#error_'+_this['id']).html('<span class="caution">不能为空！</span>！');
                    iCountError++;
                    if (iCountError == 1) {
                        $("input[name='field_"+ _this['id'] +"']").focus();
                    }
                } else {
                    $('#error_'+_this['id']).html('');
                }
            } else if (_this['type'] == 5 || _this['type'] == 6) {
                var iCountCityError = 0;
                if (_this['type'] == 5) {
                    var _thisVal2 = $('#district_'+_this['id']).val();
                    if (_this['required'] == 1 && _thisVal2 == '') {
                        iCountError++;
                        iCountCityError++;
                        if (iCountError == 1) {
                            $('#field_'+_this['id']).focus();
                        }
                        showCityMsg(3, _this['id']);
                    }
                }
                var _thisVal1 = $('#city_'+_this['id']).val();
                if (_this['required'] == 1 && _thisVal1 == '') {
                    iCountError++;
                    iCountCityError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                    showCityMsg(2, _this['id']);
                }
                var _thisVal = $('#province_'+_this['id']).val();
                if (_this['required'] == 1 && _thisVal == '') {
                    iCountError++;
                    iCountCityError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                    showCityMsg(1, _this['id']);
                }
                if (parseInt(iCountCityError) === 0) {
                    showCityMsg(false, _this['id']);
                }
            } else {
                if ($('#field_'+_this['id']).triggerHandler('blur') === false) {
                    iCountError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                }
            }
        })(i);
    }

    if (parseInt(iCountError) > 0) {
        return false;
    } else {
        if (typeof is_formsubmit != 'undefined') {
            if (!is_formsubmit) {
                return false;
            }
        }
        $('#form-sublimt-box-'+ iFormId).html('正在努力提交中... ');
        $('#isSubmit').val(1);
        $('#form_'+iFormId).submit();
    }
}

function paramRegexp(regexpString, string) {
    if ($.trim(regexpString)=='' || $.trim(string)=='') {
        return false;
    }
    if(string.match(eval(regexpString))){
        return true;
    }else{
        return false;
    }
}

function showCityMsg (error, id) {
    if (error === false) {
        $('#error_'+ id).html('');
        return true;
    } else {
        var city_error_msg = '';
        if (error == 1) {
            city_error_msg  = '省不能为空！';
        } else if (error == 2) {
            city_error_msg  = '市不能为空！';
        } else if (error == 3) {
            city_error_msg  = '区不能为空！';
        }
        $('#error_'+ id).html('<span class="caution">'+ city_error_msg +'</span>');
        return false;
    }
}

// 刷新验证码
function refreshYzm(obj, iFormId)  {
    var date = new Date();
    $(obj).attr("src","/include/captcha/captcha-id.php?id="+ iFormId +"&datete="+ date.getTime());
}

