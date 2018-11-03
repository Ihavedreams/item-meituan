/*
 * @Author: JiaZhiteng 
 * @Date: 2018-11-02 19:42:06 
 * @Last Modified by: JiaZhiteng
 * @Last Modified time: 2018-11-02 20:25:05
 */
$(function() {
    var list = document.querySelector('.list');
    var dl = list.querySelector('dl');
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            var str = '';
            if (res.code === 1) {
                var data = res.data.result;

                data.forEach(function(item) {
                    str += `<dd>
                                <a href="javascript:;">
                                    <div class="d_content">
                                        <div class="ct_l"><img src="images/0263f3a1476fc144c9ed3bf8dc9a920e34925.jpg" alt=""></div>
                                        <div class="ct_r">
                                            <div class="dealcard-brand single-line">${item.brand}</div>
                                            <div class="title text-block">${item.title}</div>
                                            <div class="price">
                                                <div>
                                                    <span class="strong">${item.strong}</span><span class="strong-color">元</span>
                                                    <del>${item.del}</del>
                                                </div>
                                                <span class="line-right">
                                                        已售 <i>${item.sold}</i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </dd>`;
                })
            }
            dl.innerHTML = str;
        }
    })

    // //input 事件

    // var ipt = document.querySelector('.ipt');

    // ipt.oninput = function() {
    //     var val = this.value;
    //     if (val) {
    //         $.ajax({
    //             url: '/api/searchKey',
    //             data: {
    //                 key: val
    //             },
    //             dataType: 'json',
    //             success: function(res) {
    //                 console.log(res)
    //             }
    //         })
    //     }
    // }

    // //点击搜索
    // var searchBtn = document.querySelector('.search-btn');

    // searchBtn.onclick = function() {
    //     var val = ipt.value;
    //     if (val) {
    //         $.ajax({
    //             url: '/api/search',
    //             data: {
    //                 key: val
    //             },
    //             dataType: 'json',
    //             success: function(res) {
    //                 console.log(res)
    //             }
    //         })
    //     }
    // }

    // //点击登录
    // var login = document.querySelector('.login');

    // var user = document.querySelector('.username');

    // var pwd = document.querySelector('.pwd');

    // login.onclick = function() {
    //     var username = user.value;

    //     var pwdVal = pwd.value;

    //     if (!username || !pwdVal) {
    //         alert("用户名或密码不为空")
    //     } else {
    //         $.ajax({
    //             url: '/api/login',
    //             dataType: 'json',
    //             type: 'post',
    //             data: {
    //                 username: username,
    //                 pwd: pwdVal
    //             },
    //             success: function(res) {
    //                 console.log(res)
    //             }
    //         })
    //     }
    // }
})