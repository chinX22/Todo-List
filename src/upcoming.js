import {parseISO, format, compareAsc,
        isThisHour, isToday, isThisWeek, isThisMonth
 } from 'date-fns';

function build_upcoming(){
    let bigDiv = document.createElement("div");
    document.getElementById("container").appendChild(bigDiv);
    let arr = order_date(JSON.parse(localStorage.getItem("task_list")));
    for (let data of arr){
        let date = document.createElement("p");
        date.textContent = format(data, 'MMMM do, yyyy h:mm a');
        bigDiv.appendChild(date);
    }

}

function order_date(list){
    let task_list = list;
    let unsorted = [];
    for (let i  = 0; i < task_list.length; i++){
        unsorted.push(parseISO(task_list[i]["dueDate"]));
    }
    let sorted = unsorted.sort(compareAsc)
    console.log(sorted);
    return sorted;
}

export {build_upcoming}

function seperate(list){
    let thisHour = [];
    let thisDay = [];
    let thisWeek = [];
    let thisMonth = [];
    for (let date of list){
        if(isThisHour(date)){
            thisHour.push(date);
        } else if(isToday(date)){
            thisDay.push(date);
        } else if(isThisWeek(date)){
            thisWeek.push(date);
        } else if(isThisMonth(date)){
            thisMonth.push(date);
        }
    }
}