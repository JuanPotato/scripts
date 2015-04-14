// ==UserScript==
// @name         No parrots plz :(
// @namespace    awkward_potato
// @version      1.0.8
// @description  removes all parrot gifs
// @author       awkward_potato
// @match        *://forums.oneplus.net/*
// @grant        none
// ==/UserScript==
//If you are going to manually add some then you need to know this
// *= means contains. So img[src*=hi] would select any img with "hi" in the src
// = just means equals :p

var curVersion = "1.0.8";
$(document).ready(function() {
    var block = [
        'img[src*="http://imgs.su/users/25384/"]',
        'img[src*="http://s8.postimg.org/a3ztgnz1t/image.gif"]', 
        'img[src*="http://uskirill.com/parrot/img/"]', 
        'img[src*="https://forums.oneplus.net/attachments/1428422886-gif."]',
        'img[src*="https://forums.oneplus.net/attachments/anticlockwise-gif."]',
        'img[src*="https://forums.oneplus.net/attachments/clockwise-gif."]',
        'img[src*="https://forums.oneplus.net/attachments/parrot-gif."]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/237/237743"]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/237/237743.jpg"]',
        'img[src*="https://forums.oneplus.net/attachments/9-gif.292039/"]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/586/586861.jpg"]',
        'img[src*="http://media.giphy.com/media/xTiTnuDWahh25btZkc/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEdv8WBWO83wAhQvS/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/l41m5TmwEib3878ly/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEduGChcb8p30lnuE/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEdv644YUEC6fUbZu/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEduQrHXCQ2gALHxe/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/l41lStS75gaKCIwrS/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEduT5IQQE0S5a2be/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEduMGdRZnV1VfgVW/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEdvcMfB7KrmjaLmg/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/3oEduG4JynPwguMdRm/giphy.gif"]',
        'img[src*="http://media.giphy.com/media/l41lP5AwwrJkaDAfC/giphy.gif"]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/406/406960.jpg"]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/28/28769.jpg"]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/418/418224.jpg"]',
        'img[src*="https://forums.oneplus.net/data/avatars/l/79/79181.jpg"]',
        'img[src="http://imgs.su/users/25384/1428422886.jpg"]',
        'img[src="http://imgs.su/users/25384/1428752821.jpg"]',
        'img[src="http://s8.postimg.org/a3ztgnz1t/image.gif"]',
        'img[src*="https://forums.oneplus.net/attachments/iamacat-gif."]',
        'img[src="https://forums.oneplus.net/attachments/c__data_users_defapps_appdata_internetexplorer_temp_saved-images_9-gif.290805/"]',
        'img[src="https://forums.oneplus.net/data/attachments/290/290976-13d2c87d597ba5c56edff9a85dcef8df.jpg"]'
    ];

    function clear(){
        for(var i = 0; i < block.length; i++)
            $(block[i]).remove();
    }

    function modal(title, content, btns){
        var overlayObj = $('<div style="position: fixed;margin: auto;top: 0;left: 0;width: 100%;height: 100%;z-index: 209998;opacity: 0.9;filter: alpha(opacity=90);background-color: rgb(255,255,255);"></div>');
        var modalObj = $('<div class="xenOverlay" style="display: block;position: fixed;left: 50%;width: 600px;z-index:209999;margin-left: -300px;top: 50%;height: auto;"><form class="formOverlay xenForm animateClose"><div class="heading" id="redactor_modal_header">'+title+'</div><div id="redactor_modal_inner"><dl class="ctrlUnit"><div class="modal-inner-content"></div></dl><dl class="ctrlUnit submitUnit modal-btn-wrapper"></dl></div></form></div>');
        modalObj.find('.modal-inner-content').append(content);
        var modalMethods = {
            close: function(){
                modalObj.find('.xenForm').removeClass('open').delay(300).hide(1, function(){
                    modalObj.remove();
                });
                overlayObj.fadeOut(300, function(){
                    overlayObj.remove();
                });
            },
            add: function(data){
                modalObj.find('.modal-inner-content').append(data);
            }
        };
        this.methods = modalMethods;
        $.each(btns, function(index, value) {
            var btn = $('<button class="redactor_modal_btn button" style="margin-right:5px;">'+index+'</button>');
            if(value.type == "red"){
                btn.addClass('primary');
            }
            modalObj.find('.modal-btn-wrapper').append(btn);
            btn.click(function(e){
                e.preventDefault();
                btns[index].click.call(modalMethods);
            });
        });
        modalObj.appendTo('body');
        modalObj.css('margin-top', -modalObj.outerHeight()/2);
        overlayObj.hide().appendTo('body').fadeIn(300);
        modalObj.find('.xenForm').addClass('open');
    }


    function update(manual) {
        var re;
        $.ajax({
            type : 'GET',
            url : 'https://forums.oneplus.net/threads/script-remove-the-parrots-from-your-screen.295888/',
            success : function (data) {
                var ver2 = data.match(/\d\.\d\.\d/i);
                var v1 = curVersion.split(".");
                var v2 = ver2[0].split(".");
                console.log(v1);
                console.log(v2);
                for(y=0;y<v2.length;y++){
                    v2[y] = parseInt(v2[y]);
                    v1[y] = parseInt(v1[y]);
                }
                if (v1[0] < v2[0] || v1[1] < v2[1] || v1[2] < v2[2]) {
                    var updateText = "New parrot remover found! \nWould you like to view the release page and update?";
                    new modal('Update!', updateText, {
                        'Yes': {
                            type: 'red',
                            click: function(){
                                this.close();
                                location.href="https://github.com/JuanPotato/scripts/raw/master/noParrots.user.js";
                            }
                        },
                        'Not Now': {
                            type: 'grey',
                            click: function(){
                                this.close();
                            }
                        }
                    });
                }else{
                    if(manual){
                        new modal('No New Updates Found', updateText, {
                            'Ok': {
                                type: 'red',
                                click: function(){
                                    this.close();
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    setInterval(function(){
        clear();
    },5000);

    if(location.href.length < 28)
        update();
});
