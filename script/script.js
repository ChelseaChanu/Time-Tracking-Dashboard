const ellipsis = document.querySelectorAll(".title img");
const template = document.querySelectorAll(".template");
const daily = document.querySelector(".daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");
const current = document.querySelectorAll(".current");
const previous = document.querySelectorAll(".previous");
let isDaily = false;
let isWeekly = false;
let isMonthly = false;

function active(element){
    element.style.color = "white";
}

function inActive(element){
    element.style.color = "hsl(235, 45%, 61%)";
}

daily.addEventListener("mouseenter",()=>active(daily));
weekly.addEventListener("mouseenter",()=>active(weekly));
monthly.addEventListener("mouseenter",()=>active(monthly));

daily.addEventListener("mouseleave",(e)=>{
    if(isDaily)
        e.stopPropagation();
    else
        inActive(daily);
});
weekly.addEventListener("mouseleave",()=>{
    if(isWeekly)
        e.stopPropagation();
    else
        inActive(weekly);
});
monthly.addEventListener("mouseleave",()=>{
    if(isMonthly)
        e.stopPropagation();
    else
        inActive(monthly);
});

daily.addEventListener("click",()=>{
    isDaily = true;
    isWeekly = false;
    isMonthly = false;
    active(daily);

    fetch('./script/data.json')
    .then(response => response.json())
    .then((data)=>{
        for(let i=0;i<current.length;i++){
            current[i].innerHTML = data[i].timeframes.daily.current + "hrs";
            previous[i].innerHTML = "Last day -"+ data[i].timeframes.daily.previous + "hrs";
        }
        console.log(data);
    })
});

weekly.addEventListener("click",()=>{
    isWeekly = true;
    isDaily = false;
    isMonthly = false;
    active(weekly);

    fetch('./script/data.json')
    .then(response => response.json())
    .then((data)=>{
        for(let i=0;i<current.length;i++){
            current[i].innerHTML = data[i].timeframes.weekly.current + "hrs";
            previous[i].innerHTML = "Last day -"+ data[i].timeframes.weekly.previous + "hrs";
        }
        console.log(data);
    })
});

monthly.addEventListener("click",()=>{
    isMonthly = true;
    isDaily = false;
    isWeekly = false;
    active(monthly)
 
    fetch('./script/data.json')
    .then(response => response.json())
    .then((data)=>{
        for(let i=0;i<current.length;i++){
            current[i].innerHTML = data[i].timeframes.monthly.current + "hrs";
            previous[i].innerHTML = "Last day -"+ data[i].timeframes.monthly.previous + "hrs";
        }
        console.log(data);
    })   
});

for(let i=0;i<6;i++){
    ellipsis[i].addEventListener("mouseover",(e)=>{
        template[i].style.backgroundColor = "hsl(235, 46%, 20%)";
        e.stopPropagation();
    });

    ellipsis[i].addEventListener("mouseleave",()=>{
        template[i].style.backgroundColor = "hsl(235, 46%, 40%)";
    });

    template[i].addEventListener("mouseleave",()=>{
        template[i].style.backgroundColor = "hsl(235, 46%, 20%)";
    });

    template[i].addEventListener("mouseover",()=>{
        template[i].style.backgroundColor = "hsl(235, 46%, 40%)";
    });
}