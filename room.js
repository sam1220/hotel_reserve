const allroomurl = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
let singleroomUrl = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';
const token = 'mK8Kca0zjTY3T7xbLtC6Ueox5ImQfAez2sxqTg3IbfxxY6BdItgLrWICm1qH';
const allroom = [];
const allroomName = [];
// JSON.parse(localStorage.getItem('IDlist'))||[];
const wrap = document.querySelector('.wrap');
const images = wrap.querySelectorAll('img');
const links = document.querySelectorAll('.item a');
const weekday = document.querySelectorAll('.weekday');
const holiday = document.querySelectorAll('.holiday');
const descriptionTxt = document.querySelectorAll('.description h2');
fetch(allroomurl,{
                    method:'get',
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Accept':'application/json'
                    }
}).then(response=>response.json()).then(rooms=>{
    rooms.items.forEach(room=>allroom.push(room))

    // 所有房型的id存進localstorage

    const objarr = [];
    allroom.forEach(room=>{
        const obj = {'ID':room.id};
        objarr.push(obj)
    })
    localStorage.setItem('IDlist',JSON.stringify(objarr))
    
    
    //將全部房型資料渲染至html

    allroom.forEach((room,index)=>{
        images[index].src = room.imageUrl;
        links[index].href = room.name.replace(/\s+/g,'')+'.html';
        descriptionTxt[index].textContent = room.name;
        weekday[index].querySelectorAll('p')[1].textContent = room.normalDayPrice;
        holiday[index].querySelectorAll('p')[1].textContent = room.holidayPrice;
    })

    // let i=0;
    // allroom.forEach(room=>{
    //     fetch(singleroomUrl+room.id,{
    //                                     method:'get',
    //                                     headers:{
    //                                         'Authorization':`Bearer ${token}`,
    //                                         'Accept':'application/json'
    //                                     }
    //     }).then(response=>response.json()).then(item=>{
    //         console.log(item.room);
    //         switch(i+1){
    //             case 1:
    //                 images[i].src = item.room[0].imageUrl[0];
    //                 descriptionTxt[i].textContent = item.room[0].name;
    //                 weekday[i].querySelectorAll('p')[1].textContent = item.room[0].normalDayPrice;
    //                 holiday[i].querySelectorAll('p')[1].textContent = item.room[0].holidayPrice;
    //                 break;
    //             case 2:
    //                 images[i].src = item.room[0].imageUrl[1];
    //                 descriptionTxt[i].textContent = item.room[0].name;
    //                 weekday[i].querySelectorAll('p')[1].textContent = item.room[0].normalDayPrice;
    //                 holiday[i].querySelectorAll('p')[1].textContent = item.room[0].holidayPrice;
    //                 break;
    //             case 3:
    //                 images[i].src = item.room[0].imageUrl[1];
    //                 descriptionTxt[i].textContent = item.room[0].name;
    //                 weekday[i].querySelectorAll('p')[1].textContent = item.room[0].normalDayPrice;
    //                 holiday[i].querySelectorAll('p')[1].textContent = item.room[0].holidayPrice;
    //                 break;
    //             case 4:
    //                 images[i].src = item.room[0].imageUrl[1];
    //                 descriptionTxt[i].textContent = item.room[0].name;
    //                 weekday[i].querySelectorAll('p')[1].textContent = item.room[0].normalDayPrice;
    //                 holiday[i].querySelectorAll('p')[1].textContent = item.room[0].holidayPrice;
    //                 break;
    //             case 5:
    //                 images[i].src = item.room[0].imageUrl[0];
    //                 descriptionTxt[i].textContent = item.room[0].name;
    //                 weekday[i].querySelectorAll('p')[1].textContent = item.room[0].normalDayPrice;
    //                 holiday[i].querySelectorAll('p')[1].textContent = item.room[0].holidayPrice;
    //                 break;
    //             case 6:
    //                 images[i].src = item.room[0].imageUrl[1];
    //                 descriptionTxt[i].textContent = item.room[0].name;
    //                 weekday[i].querySelectorAll('p')[1].textContent = item.room[0].normalDayPrice;
    //                 holiday[i].querySelectorAll('p')[1].textContent = item.room[0].holidayPrice;
    //                 break;                    
    //         }
    //         i++;
    //     })
    // })

})
// localStorage.clear();