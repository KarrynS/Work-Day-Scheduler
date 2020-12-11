$(document).ready(function() {

    //Creating possible hours in the schedule
    var dayHours = {
        9: "9AM", 
        10: "10AM",
        11: "11AM",
        12: "12AM", 
        13: "1PM",
        14: "2PM",
        15: "3PM",
        16: "4PM",
        17: "5PM",
    }

    //Updating page with current time via moment.js
    var currentTime = moment();
    $("#currentDay").html(currentTime.format("dddd Do MMMM YYYY"));
    
    //Retrieving from local storage
    var eventsObj = {};
    if (localStorage.getItem("eventsString)")) {
       eventsObj = JSON.parse(localStorage.getItem("eventsString"));
    }
  
    //Creating Timeblock divs for each hour, text area and save button
    $.each(dayHours, function(key, value) {
        var timeRow = $('<div class="row timeblock" id="'+key+'">');
        timeRow.append($('<div class="col col-2 col-md-1 hour">'+value+'</div>'));
        var textForm = $('<div class="col col-8 col-md-10 schedule"></div>');
        textForm.append($('<form class="eventForm"><textarea class="col schedule">'));
        var saveBtn = $('<div class="col col-2 col-md-1 saveBtn"></div>');
        saveBtn.append($('<i class="fas fa-save"></i'));
        timeRow.append(textForm);
        timeRow.append(saveBtn);
        $(".container").append($(timeRow));
    })

    //Styling for timeblocks
    function styleTimeBlocks() {
        hour = currentTime.hours();
        $(".timeblock").each(function () {
            var currentHour = parseInt($(this).attr("id"));
            if (currentHour > hour) {
                $(this).addClass("future")
            } else if (currentHour === hour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("past");
            }
        })
    }
    styleTimeBlocks();

   
    //Handling save button and saving to local storage
    var handleSaveBtn = function(event) {
        if( $(event.target).hasClass("saveBtn")) {
            var newEvent = $(e.currentTarget).find(".schedule").val();
            var newEventDate = currentTime.format("YYYY-MM-DD") + "-" + e.currentTarget.getAttribute("id");
            eventsObj[newEventDate] = newEvent;
            localStorage.setItem("eventsString", JSON.stringify(eventsObj));
        }
    }

    $(".row").on(("click", handleSaveBtn));
    

    //Creating Clear Button
    $("body").append($('<div id="clearBtndiv"><button id="clearBtn">Clear all scheduled events</button></div>'));

    //Clearing from HTML and local storage
    $("#clearBtn").on("click", function() {
        $(".schedule").empty();
        localStorage.clear();
    })
    
});


/*

var saveBtn = $(".saveBtn");
        saveBtn.on("click", function (e) {
        if ( $(e.target).attr("saveBtn")) {
            var time = $(this).parent().attr("id");
            var schedule = $(this).siblings(".schedule").val();
            console.log(time);
            console.log(schedule);
            localStorage.setItem(time, schedule);
        }
    });

    



        function setSchedule() {
            $(".timeblock").each(function () {
                var id = $(this).attr("id");
                var schedule = localStorage.getItem(id);
        
                if (schedule !== null) {
                    $(this).children(".schedule").val(schedule);
                }
            });
            }
            setSchedule();
            */