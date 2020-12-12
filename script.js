$(document).ready(function() {

    //Creating possible hours in the schedule
    var dayHours = {
        9: "9AM", 
        10: "10AM",
        11: "11AM",
        12: "12PM", 
        13: "1PM",
        14: "2PM",
        15: "3PM",
        16: "4PM",
        17: "5PM",
        18: "6PM"
    }

    //Updating page with current time via moment.js
    var currentTime = moment();
    $("#currentDay").html(currentTime.format("dddd Do MMMM YYYY"));
  
    //Creating Timeblock divs for each hour, text area and save button
    $.each(dayHours, function(key, value) {
        var timeRow = $('<div class="row timeblock" id="'+key+'">');
        timeRow.append($('<div class="col col-2 col-md-1 hour">'+value+'</div>'));
        var textForm = $('<div class="col col-8 col-md-10 schedule"></div>');
        textForm.append($('<form class="eventForm"><textarea class="schedule">'));
        var saveBtn = $('<div class="col col-2 col-md-1 saveBtn" id="'+key+'"></div>');
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

   //Retrieving previously saved schedule from local storage
   function setSchedule() {
    $(".timeblock").each(function () {
        var id = $(this).attr("id");
        var schedule = localStorage.getItem(id);

        if (schedule !== null) {
            $(this).find("textarea.schedule").val(schedule);
        }
    });
    }
    setSchedule();
   
    //Adding event listener and saving events to local storage
    $(".row").on("click", function (e) {
        if( $(e.target).hasClass("saveBtn")) {
        var time = $(e.currentTarget).attr("id");
        var schedule = $(e.currentTarget).find("textarea.schedule").val();
    
        localStorage.setItem(time, schedule);
        }
    });

    //Creating Clear Scheduled Events Button
    $("body").append($('<div id="clearBtndiv"><button id="clearBtn">Clear scheduled events</button></div>'));

    //Clearing from HTML and local storage
    $("#clearBtn").on("click", function() {
        $(".schedule").empty();
        localStorage.clear();
        document.location.reload();
    })
});
