$("#clearBtn").on("click", function(event){
    var forecasts;

    function allStorage() {
        var pastCities = [],
            
            i = pastCities.length;
        while ( i-- ) {
            values.push( localStorage.getItem(pastCities[i]));
        }
        for (i = 0; i < pastCities.length; i++) {
            $("#forecastsList").prepend(".previousCities" + pastCities[i] + "</button>");
        }
    } 
    allStorage()
    });
    

    $("#search").on("click", function(event) {
        event.preventDefault();
            
            
            var subject = $("#subject").val().trim();
            var apiKey = "fedf15ae81e5160d1f28bfed321cc256";
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=" + apiKey;
             var queryUrlDisplay = "https://api.openweathermap.org/data/2.5/forecast?q=" + subject + "&appid=" + apiKey;
            $.ajax({
                url: queryURL,
                method: "GET",
                        
            })
            .then(function(response){
                $(".previousCities").append("<button class='previousCity'>" + subject + "</button>");
                localStorage.setItem("Previous City", subject);
                var icons = response.weather[0].icon;
                $("#forecast").show();
                $(".jumbotron").show();
                var iconsURL = "http://openweathermap.org/img/w/" + icons + ".png";
               $(".icon").attr('src', iconsURL)
                    $("#city").text(response.name + " " + moment().format('l'));
                        var currentTemp = response.main.temp * (9/5) - 459.67;
                        $("#temp").text("Temperature: " + currentTemp.toFixed(1) + " °F");
                        $("#humidity").text("Humidity: " + response.main.humidity + "%");
                        $("#wind").text("Wind Speeds: " + response.wind.speed + " Mile Per Hour");
                        
            $.ajax({
                        url: queryUrlDisplay,
                        method: "GET"
            })
            .then(function(response){
                        var forecastTimes = response.list;
                        for (i = 0; i < forecastTimes.length; i++) {
                            if (forecastTimes[i].dt_txt[12] === "2") {
                                var forecastDate = forecastTimes[i].dt_txt;
                                var forecastDateDisplay = forecastDate.charAt(5) + forecastDate.charAt(6) + "/" + forecastDate.charAt(8) + forecastdate.charAt(9) +
                                "/" + forecastDate.charAt(0) + forecastDate.charAt(1) + forecastDate.charAt(2) + forecastDate.charAt(3);
                                var forecastpics = forecastTimes[i].weather[0].icon;
                                var forecasticonsURL = "http://openweathermap.org/img/w/" + forecastpics + ".png";
                                var forecastsTemp = forecastTimes[i].main.temp * (9/5) - 459.67;
                                var forecastsHum = forecastTimes[i].main.humidity;
                                if (forecasts === false || forecasts === undefined) {
                                    $("#forecastsList").prepend("<div class='forecast-day'>" +
                                    "<h1>" + forecastDateDisplay + "<h1>" +
                                    "<img class='ficon' src=" + forecasticonsURL + " alt='Weather icon'>" + 
                                    "<div>Temp: " + forecastsTemp.toFixed(1) + " °F" + 
                                    "</div><div>Humidity: " + forecastsHum + 
                                    "%</div></div></div>");
                                } 
                            }
                        }
                                
                    })
                    
                  
                
            })
            
        });

    
    
     
    $("#clearBtn").on("click", ".previousCity", function() {
        var subject = $(this).text();
        $(".subject").val(subject);
        $(".search").click();
        $(this).remove();
    });






