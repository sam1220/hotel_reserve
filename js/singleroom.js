window.onload = (function(){
    const path = location.pathname.split('/').slice(location.pathname.split('/').length-1).toString().replace('.html','');
    const data = JSON.parse(localStorage.getItem('IDlist'));
    let singleroomUrl = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';
    const token = 'mK8Kca0zjTY3T7xbLtC6Ueox5ImQfAez2sxqTg3IbfxxY6BdItgLrWICm1qH';
    const singleroom = [];
    let roomID='';
    let img_index = 0;

    const roomimages = document.querySelector('.roomimg img');
    const navitem = document.querySelectorAll('.navitem');
    const descriptionTitle = document.querySelector('.description h2');
    const descriptionTxt = document.querySelector('.description p');
    const amenities = document.querySelectorAll('.inner .item');
    const prices = document.querySelectorAll('.price .item h2');
    const name = document.querySelector('#name');
    const tel = document.querySelector('#tel');
    const checkinDate = document.querySelector('#daterangepicker_start');
    const checkoutDate = document.querySelector('#daterangepicker_end');
    const guestNum = document.querySelector('#guestnum');
    const totaldetails = document.querySelectorAll('.total ul li');
    const submit = document.querySelector('#btnSubmit');

    let reserveDays = [];
    const storeDays = [];

    console.log(reserveDays)
    console.log(storeDays)

    console.log(totaldetails)

    const date = new Date();
    
    // format date

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    // console.log(formatDate(new Date().toDateString()))
    
    // adddays

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    // console.log(formatDate(date.addDays(90).toDateString()))


    // daterangepicker

    $("#daterangepicker_start").daterangepicker({
        "alwaysShowCalendars": true,
        opens: "left",
        startDate: formatDate(new Date().addDays(1).toDateString()),
        endDate: formatDate(new Date().addDays(1).toDateString()),
        maxDate: formatDate(date.addDays(90).toDateString()),
        minDate: formatDate(new Date().toDateString()),  
        autoUpdateInput: false,
        datesDisabled:storeDays,
        // ranges: {
        // "今天": [moment(), moment()],
        // "過去 7 天": [moment().subtract(6, "days"), moment()],
        // "本月": [moment().startOf("month"), moment().endOf("month")],
        // "上個月": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
        // },
        locale: {
        format: "YYYY-MM-DD",
        separator: " ~ ",
        applyLabel: "確定",
        cancelLabel: "清除",
        fromLabel: "開始日期",
        toLabel: "結束日期",
        customRangeLabel: "自訂日期區間",
        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月",
        "7月", "8月", "9月", "10月", "11月", "12月"
        ],
        firstDay: 1
        }
        });
        $('#daterangepicker_start').on("apply.daterangepicker", function(ev, picker) {
          $(this).val(picker.startDate.format("YYYY/MM/DD"));
          $('#daterangepicker_end').val(picker.endDate.format("YYYY/MM/DD"));
          console.log(document.querySelector('#daterangepicker_start').value)
          guestNum.value='';

          const gap = new Date(checkoutDate.value).getDate()-new Date(checkinDate.value).getDate();
          for(let i=0; i<=gap; i++){
            const day = formatDate(new Date(checkinDate.value).addDays(i).toDateString());
            console.log(formatDate(new Date(checkinDate.value).addDays(i).toDateString()))
            reserveDays.push(day)
            storeDays.push(day)
          }
          console.log(reserveDays)
          console.log(storeDays)  
        //   console.log($("#daterangepicker_start").daterangepicker.disableDates)
        });
        $("#daterangepicker_start").on("cancel.daterangepicker", function(ev, picker) {
            $(this).val("");
            $('#daterangepicker_end').val('')
            guestNum.value='';
        });


        

    switch(path){
        case 'SingleRoom':
            roomID = data[0].ID;
            break;
        case 'DeluxeSingleRoom':
            roomID = data[1].ID;
            break;
        case 'DoubleRoom':
            roomID = data[2].ID;
            break;
        case 'DeluxeDoubleRoom':
            roomID = data[3].ID;
            break;
        case 'TwinRoom':
            roomID = data[4].ID;
            break;
        case 'DeluxeTwinRoom':
            roomID = data[5].ID;
            break;
    }


    fetch(singleroomUrl+roomID,{
                                    method:'get',
                                    headers:{
                                        'Authorization':`Bearer ${token}`,
                                        'Accept':'application/json'
                                    }
    }).then(response=>response.json())
    .then(item=>singleroom.push(item.room[0]))
    .then(()=>{
        console.log(singleroom[0])
        console.log(Object.getOwnPropertyNames(singleroom[0].amenities))
        // roomimages.forEach((img,index)=>{
        //     img.src = singleroom[0].imageUrl[index];
        // })
        roomimages.src = singleroom[0].imageUrl[img_index];

        navitem.forEach((item,index)=>{
            switch(index){
                case 0:
                    const min = singleroom[0].descriptionShort.GuestMin;
                    const max = singleroom[0].descriptionShort.GuestMax;
                    item.querySelectorAll('p')[1].textContent = `${min}~${max}人`;
                    break;
                case 1:
                    item.querySelectorAll('p')[1].textContent = singleroom[0].descriptionShort.Bed[0];
                    break;
                case 2:
                    const ft =  singleroom[0].descriptionShort.Footage;
                    item.querySelectorAll('p')[1].textContent = `${ft} m2`;
                    break;
                case 3:
                    const bathnum = singleroom[0].descriptionShort['Private-Bath'];
                    item.querySelectorAll('p')[1].textContent = `${bathnum}間`;
                    break;
                case 4:
                    const early = singleroom[0].checkInAndOut.checkInEarly;
                    const late = singleroom[0].checkInAndOut.checkInLate;
                    item.querySelectorAll('p')[1].textContent = `${early}~${late}`;
                    break;
                case 5:
                    item.querySelectorAll('p')[1].textContent = singleroom[0].checkInAndOut.checkOut;
                    break;
            }
        })


        descriptionTitle.textContent = singleroom[0].name;
        descriptionTxt.textContent = singleroom[0].description;

        amenities.forEach((amenity,index)=>{
            const amenityName = Object.getOwnPropertyNames(singleroom[0].amenities)[index];
            // console.log(amenityName);
            if(singleroom[0].amenities[amenityName]){
                amenity.querySelector('span').textContent = Object.getOwnPropertyNames(singleroom[0].amenities)[index]+': 有';
            }else{
                amenity.querySelector('span').textContent = Object.getOwnPropertyNames(singleroom[0].amenities)[index]+': 無';
                amenity.querySelector('span').classList.add('notsupport')
            }
        })

        prices[0].textContent = `$NT ${singleroom[0].normalDayPrice} / 晚`;
        prices[1].textContent = `$NT ${singleroom[0].holidayPrice} / 晚`;


    })

    setInterval(function(){
        if(img_index>=singleroom[0].imageUrl.length-1){
            img_index = -1;
        }
        img_index++;
        roomimages.src = singleroom[0].imageUrl[img_index];
    },3500);

    guestNum.addEventListener('change',(e)=>{
        e.target.value+='人';
        const days = [checkinDate.value,checkoutDate.value];
        const week = [];
        let normalDay=0;
        let holiday=0;
        console.log(days)
        const gap = new Date(days[1]).getDate()-new Date(days[0]).getDate();
        console.log('gap:'+gap)
        for(let i=0; i<=gap; i++){
            const day = new Date(days[0]).addDays(i);
            console.log('day:'+day)
            week.push(day.getDay())
        }
        console.log(week)
        week.forEach(day=>{
            switch(day){
                case 0:
                    holiday++;         
                    break;
                case 1:
                    normalDay++;
                    break;
                case 2:
                    normalDay++;
                    break;
                case 3:
                    normalDay++;
                    break;
                case 4:
                    normalDay++;
                    break;
                case 5:
                    holiday++;
                    break;
                case 6:
                    holiday++;
                    break;
            }
        })

        console.log(`normalday:${normalDay},holiday:${holiday}`)

        totaldetails.forEach((item,index)=>{
            const txt = item.querySelectorAll('p');
            console.log(txt)
            document.querySelector('.total').style.display = 'initial';
            switch(index){
                case 0:
                    txt[0].textContent = `平日$NT${singleroom[0].normalDayPrice}x${normalDay}晚`;
                    txt[1].textContent = `$NT${singleroom[0].normalDayPrice*normalDay}`;
                    break;
                case 1:
                    txt[0].textContent = `假日$NT${singleroom[0].holidayPrice}x${holiday}晚`;
                    txt[1].textContent = `$NT${singleroom[0].holidayPrice*holiday}`;
                    break;
                case 2:
                    txt[0].textContent = '服務費';
                    txt[1].textContent = `$NT${Math.round((singleroom[0].normalDayPrice*normalDay+singleroom[0].holidayPrice*holiday)*0.1)}(10%)`;
                    break;
                case 3:
                    txt[0].textContent = '總計';
                    txt[1].textContent = `$NT${Math.round((singleroom[0].normalDayPrice*normalDay+singleroom[0].holidayPrice*holiday)*1.1)}`;
                    break;
            }
        })

    })

    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        let posturl = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';
        console.log(formatDate(new Date(checkinDate.value).toDateString()));
        fetch(posturl+roomID,{
                                method: "post",
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization':`Bearer ${token}`
                                },
                                //make sure to serialize your JSON body
                                body: JSON.stringify({
                                    name: name.value,
                                    tel: tel.value,
                                    date: reserveDays
                                })
        }).then(response=>response.json())
        .then(data=>{
            if(data.success){
                console.log('successful')
                console.log(data)
                reserveDays = [];
                alert('預訂成功');
            }else if(data.message){
                console.log('some error')
                console.log(data)
                reserveDays = [];
                alert('預訂失敗');
            }
            console.log(reserveDays)
        })
    })


    function deleteReserve(){
        fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',{
                                                                            method:'delete',
                                                                            headers:{
                                                                                'Authorization':`Bearer ${token}`,
                                                                                'Accept':'application/json'
                                                                            }
        }).then(response=>response.json())
        .then(data=>console.log(data))
    }

    // deleteReserve()


})
