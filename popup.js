document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('btnHide');
    button.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var blackUsers = $('.truncate');
            var arrUsers = [];
            for(var i = 0; i < blackUsers.length; i++){
                arrUsers.push(blackUsers[i].innerHTML);
            }
            
            var Shop = $('#isShop').is(":checked");
            var Comfort = $('#isComfort').is(":checked");
            var Pro = $('#isPro').is(":checked");

            chrome.tabs.sendMessage(tabs[0].id, {
                data: {
                    raiting: $('#raiting').val(), 
                    blackList: arrUsers,
                    shop: Shop,
                    comfort: Comfort,
                    pro: Pro
                }}, 
                function(response) {
                    console.log('success');
            });
        });
    });
});
