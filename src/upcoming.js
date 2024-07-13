import {parseISO, format, compareAsc, isPast,
        isThisHour, isToday, isThisWeek, isThisMonth
 } from 'date-fns';

function build_upcoming(){
    let bigDiv = document.getElementById("upcoming");
    bigDiv.replaceChildren();
    let upcomingTitle = document.createElement("h2");
    upcomingTitle.textContent = "Tasks";
    upcomingTitle.id = "upcoming-title"
    bigDiv.appendChild(upcomingTitle);
    document.getElementById("container").appendChild(bigDiv);
    order_task_list();
    let arr_0 = JSON.parse(localStorage.getItem("task_list"));
    let arr = arr_0.filter((task) => task.dueDate !== "");
    for (let task of arr){
        let [where, text, title] = filter(task.dueDate);

        let upcomingTask = document.createElement("div");
        upcomingTask.className = "upcoming-task";

        let taskTitle = document.createElement("h4");
        taskTitle.textContent = task.name;
        taskTitle.className = "upcoming-title";

        let taskDate = document.createElement("h4");
        taskDate.textContent = text;
        taskDate.className = "upcoming-date";

        upcomingTask.appendChild(taskTitle);
        upcomingTask.appendChild(taskDate);

        if(!document.querySelector("#"+ where)){
            let upcomingList = document.createElement("div");
            upcomingList.className = "upcoming-list";
            upcomingList.id = where;
            let listTitle = document.createElement("h3");
            listTitle.textContent = title;
            upcomingList.appendChild(listTitle);
            console.log ("just made: " + title);
            bigDiv.appendChild(upcomingList);
        }

        document.querySelector("#"+ where).appendChild(upcomingTask);
        //let date = document.createElement("p");
        //date.textContent = format(data, 'MMMM do, yyyy h:mm a');
    }

}

function order_task_list(){
    let arr = JSON.parse(localStorage.getItem("task_list"));
    let unsorted = [];
    for (let task of arr){
        unsorted.push(task.dueDate);
    }
    let sorted = unsorted.sort(compareAsc);

    let temp = [];
    for(let t = 0; t < arr.length; t++){
        for(let d = 0; d < sorted.length; d++){
            if(sorted[d] === arr[t].dueDate){
                temp.push(arr[t]);
                break;
            }
        }
    }

    localStorage.setItem("task_list", JSON.stringify(temp));
    return sorted;
}

export {build_upcoming}

function filter(date){
    date = parseISO(date);
    if (isPast(date)){
        return ["past-task", format(date, 'L / d'), "Past Tasks"];
    } else if(isThisHour(date)){
        return ["hour-task", format(date, 'h:m aaaa'), "This Hour"];
    } else if(isToday(date)){
        return ["today-task", format(date, 'h:m aaaa'), "Today"];
    } else if(isThisWeek(date)){
        return ["week-task", format(date, 'eeee h:m aaaa'), "This Week"];
    } else if(isThisMonth(date)){
        return ["month-task", format(date, 'L/ d h:m aaaa'), "This Month"];
    } else {
        return ["way-later", format(date, 'L/ d / yyyy h:m aaaa'), "Even Later"];
    }
}