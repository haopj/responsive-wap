/**
 * Created by haopengjie on 2016/10/13.
 */

    //备注信息限制字数200
    function limitTextArea(field){
        var maxLen = 200;
        if(field.value.length > maxLen)
        {
            field.value = field.value.substring(0,maxLen);
            //alert(field.value);
        }
    }

$(function () {
    //添加就诊人******点击输入框被输入法顶起
    $('.frm input,textarea').focus(function () {
        $('.agree-agreement').css({marginBottom:'1.6rem'});
    }).blur(function () {
        $('.agree-agreement').css({marginBottom:'0'});
    });

    //选择就诊人******单选按钮点击事件
    $('input[type="radio"]').change(function () {
        var cp = $(this).parents('.check-person');
        if($(this).attr('checked')) {
            cp.css({'backgroundColor':'#e6fafa'}).siblings('.check-person').css({'backgroundColor':'white'});
        }
    });

    //弹出框
    $('.phone').on('click', function () {
        //var conS = $('.confirm-show');
        //var winH = window.innerHeight;
        //conS.css({'height':winH,zIndex:'98',background:'rgba(0,0,0,0.6)'}).find('.confirm-tip').show();
        //$(window).scrollTop(0);
        //$(window).scroll(function(){
        //    conS.css({position:'fixed',top:'0'});
        //});
        $('#confirm').confirm();
    });
    //取消
    $('.reset').on('click', function () {
        hide();
    });
    //确定
    $('.ensure').on('click', function () {
        hide();
    });
    function hide()
    {
        $('.confirm-show').css({background:'rgba(0,0,0,0)',zIndex:'-1'}).find('.confirm-tip').hide();
    }

    //编辑就诊人信息******关系选择状态
    $('.relation').on('click', function () {
        $(this).css({backgroundColor:'#37bfbd'}).siblings('label').css({backgroundColor:'#ccc'});
    });

    //预约挂号陪诊******判断信息
    var userName = /^[\u4e00-\u9fa5]{2,}$/,
    //姓名
        userVal = $('#username'),
        tel = /^0{0,1}(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0-9])[0-9]{8}$/,
    //手机号
        telVal = $('#tel'),
        reg = /\S/,
    //医院
        hosVal = $('#hospital'),
    //科室
        deVal = $('#departments'),
    //备注
        reVal = $('#remark');
    $('#submit-order').on('click', function () {
        if((!userName.test(userVal.value)) || (!tel.test(telVal.value)) || (!reg.test(hosVal.value)) || (!reg.test(deVal.value) || (!reg.test(reVal.value))))
        {
            //var conS = $('.confirm-show');
            //var winH = window.innerHeight;
            //conS.css({'height':winH,zIndex:'98',background:'rgba(0,0,0,0.6)'}).find('.confirm-info').show();
            //$(window).scrollTop(0);
            //$(window).scroll(function(){
            //    conS.css({position:'fixed',top:'0'});
            //});
            $('#confirm').confirm({
                divContent : '.confirm-info'
            });
            $('.confirm-info-btn').on('click', function () {
                $('.confirm-show').css({background:'rgba(0,0,0,0)',zIndex:'-1'}).find('.confirm-info').hide();
            });
        }
    });

    //控制时间
    var InterValObj,
    //间隔数
      count = 59,
    //当前剩余秒数
      curCount,
      gCode = $('#get-code');
                //点击获取验证码
            gCode.on('click', function () {
                curCount = count;
                $(this).attr('disabled',true).val(curCount + '秒').css('backgroundColor','#ddd');
                InterValObj = setInterval(start,1000);
                $.ajax({
                   url : '',
                   type : 'post',
                   data : '',
                   dataType : 'json',
                   success : function(data){

                   },
                   error : function(){

                   }
                });
            });
            function start()
            {
                if(curCount == 0)
                {
                    clearInterval(InterValObj);
                    gCode.removeAttr('disabled').val('重新获取').css('backgroundColor','#37bfbd');
                }
                else
                {
                    curCount--;
                    if(curCount < 10)
                    {
                        curCount = '0' + curCount;
                    }
                    gCode.val(curCount + '秒');
                }
            }
    //点击清除
    $('#del').del();

    //登录
    $('#tab-nav').tab();

    //登录点击清除
    $('#login-del-user').del({
        parent : '.login-input'
    });
    $('.del-code').del({
        parent : '.login-tel-input'
    });

    var timer = 1500,
        setObj;
    $('#alter-ensure').on('click', function () {
        $('#confirm').confirm({
            divContent : '.confirm-alter'
        });
        setObj = setTimeout(show,timer);
        function show(){
            clearTimeout(setObj);
            $('.confirm-show').css({background:'rgba(0,0,0,0)',zIndex:'-1'}).find('.confirm-alter').hide();
        }
    });
});

//Tab切换
(function ($) {
    $.fn.tab = function (opt) {
        var defaults = {
            content : '.login-content',
            nav : '.login-nav li',
            addC : 'has-btm',
            eqNum : '0'
        };
        var options = $.extend({},defaults,opt);
        return this.each(function(){
            var _this = $(this);
            _this.find(options.content).eq(options.eqNum).show();
            _this.find(options.nav).each(function (index) {
                $(this).on('click', function () {
                    $(this).addClass(options.addC).siblings().removeClass(options.addC);
                    _this.find(options.content).eq(index).show().siblings(options.content).hide();
                });
            });
        });
    }
})(jQuery);

//弹框
(function ($) {
    $.fn.confirm = function (opt) {
        var defaults = {
            pDiv : '.confirm-show',
            divContent : '.confirm-tip'
        };
        var options = $.extend({},defaults,opt);
        return this.each(function () {
            var _this = $(this);
            var  winH = window.innerHeight;
            _this.find(options.pDiv).css({
                'height': winH,
                'zIndex': '98',
                'background': 'rgba(0,0,0,0.6)'
            }).find(options.divContent).show();
            $(window).scrollTop(0);
            $(window).scroll(function () {
                _this.find(options.pDiv).css({
                    'position':'fixed',
                    'top': '0'
                });
            });
        });
    }
})(jQuery);

//点击按钮删除
(function ($) {
    $.fn.del = function (opt) {
      var defaults = {
          parent : '.person-input',
          child : 'input'
      };
      var options = $.extend({},defaults,opt);
        return this.each(function () {
            var _this = $(this);
            _this.on('click', function () {
               var inputVal = $(this).closest(options.parent).find(options.child);
                var val = inputVal.val();
                if(val != "" && val != null)
                {
                    inputVal.val("");
                }
            });
        });
    };
})(jQuery);