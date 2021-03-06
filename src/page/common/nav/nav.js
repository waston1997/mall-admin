/*
 * @Author: wangtao 
 * @Date: 2018-04-19 12:37:09 
 * @Last Modified by: wangtao
 * @Last Modified time: 2018-04-30 18:25:37
 */
const util = require('utils/util.js');
const service = {
    init: function() {
        this.switchColor();
        this.getUsername();
        this.bindEvent();
    },
    bindEvent: function() {
        let _this = this;
        $('#logout').click(function() {
            _this.logout();
        });
    },
    //给导航条的当前条目着色
    switchColor: function() {
        let keys = new Map();
        keys.set('index', 0);
        keys.set('category-list', 1);
        keys.set('product-list', 2);
        keys.set('product-detail', 2);
        keys.set('product-edit', 2);
        keys.set('order-list', 3);
        keys.set('order-detail', 3);
        
        let url = window.location.href;
        let key = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
        $('.clickColor').eq(keys.get(key)).addClass('active');
    },
    getUsername: function() {
        util.request({
            type: 'post',
            url: util.getServletUrl('/manage/user/get_username.do'),
            doSuccess: function(json, msg) {
                $('#user').text(json.username);
            },
            doError: function(errMsg) {
                alert(errMsg);
            }
        });
    },
    logout: function() {
        util.request({
            type: 'post',
            url: util.getServletUrl('/manage/user/logout.do'),
            doSuccess: function() {
                window.location.href = './login.html';
            },
            doError: function(errMsg) {
                alert(errMsg);
            }
        });
    }
}
$(function() {
    service.init();
});