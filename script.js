chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {    
    var data = request.data || {};
    
    //shops
    if(data.shop){
        var elements = document.querySelectorAll('.au-icon_guild_text');
        for (var i=0;i<elements.length;i++) {
            var current = elements[i];
            while (!current.parentNode.classList.contains("au-lots-item")){
                current = current.parentNode;
            }
            current.parentNode.removeChild(current);
        };        
    }


    //comfort
    if(data.comfort){
        var elements_crown = document.querySelectorAll('.au-icon_guild-circle-crown');
        for (var i=0;i<elements_crown.length;i++) {
            var current = elements_crown[i];
            while (!current.parentNode.classList.contains("au-lots-item")){
                current = current.parentNode;
            }
            current.parentNode.removeChild(current);
        };
    }    
    
    //pro
    if(data.pro){
        var elements_pro = document.querySelectorAll('.au-icon_pro');
        for (var i=0;i<elements_pro.length;i++) {
            var current = elements_pro[i];
            while (!current.parentNode.classList.contains("au-lots-item")){
                current = current.parentNode;
            }
            current.parentNode.removeChild(current);
        };
    }
    
    //blackList
    var person_name = document.querySelectorAll('.au-person-name__text');
    for (var i=0;i<person_name.length;i++) {
        var current = person_name[i];
        nick = current.innerHTML.match(/>[\wа-яА-яёЁ ]+/); 
        if (nick){ 
            nick[0] = nick[0].substring(1);
                for (var j=0;j<data.blackList.length;j++) {
                    if (nick[0]==data.blackList[j]){
                        while (!current.parentNode.classList.contains("au-lots-item")){
                            current = current.parentNode;
                        }
                        current.parentNode.removeChild(current);
                    }
                }
        }
    };
    
    //raiting
    var elements_rate = document.querySelectorAll('.au-person-rating');
    for (var i=0;i<elements_rate.length;i++) {
        var current = elements_rate[i];
        raiting = +current.innerHTML
        if (raiting>data.raiting){
            while (!current.parentNode.classList.contains("au-lots-item")){
                current = current.parentNode;
            }
            current.parentNode.removeChild(current);
        }
    };
    sendResponse({data: 'data', success: true});
});