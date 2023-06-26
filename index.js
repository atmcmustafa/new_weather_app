const cityInput = document.getElementById("input");
const submitBtn = document.getElementById("submitBtn");
const form = document.querySelector("form");
const API_KEY = "8845d04f01fe7c50bb0b4caf338e7a50";
const weatherContainer = document.querySelector(".right");

const addTransition = () => {
  weatherContainer.classList.add("lg:basis-4/6");
  weatherContainer.classList.add("opacity-100");
  weatherContainer.classList.add("duration-300");
  cityInput.value = "";
};

async function getWeather(e) {
  e.preventDefault();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_KEY}&units=metric`;

  if (cityInput.value.length <= 0) {
    weatherContainer.innerHTML = `<h1 class="text-4xl flex items-center">Please Enter a Valid City or Country</h1>`;
    addTransition();
  } else {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let date = new Date();
        let d = date.getDate();
        let m = date.getMonth();
        let y = date.getFullYear();

        weatherContainer.innerHTML = `
            <div class="right-bar flex flex-col ">
                <div class="w-full rounded-lg bg-blue-500 text-white text-lg p-8">
                    <div class="mb-4 text-2xl">
                        <span>${
                          data.name
                        }</span><span class="ml-3">(${d}/${m}/${y})</span>
                    </div>
                <div class="flex justify-between">
                        <div>
                            <p class="mb-2">Temperatures: ${Math.floor(
                              data.main.temp
                            )}°</p>
                            <p class="mb-2">Wind: ${Math.floor(
                              data.wind.speed
                            )} km/h</p>
                            <p class="mb-2">Humidity: % ${Math.floor(
                              data.main.humidity
                            )}</p>
                        </div>
                        <div class="flex flex-col items-center">
                        <img  src="https://openweathermap.org/img/wn/${
                          data.weather[0].icon
                        }.png" alt="" />
                            <p>${data.weather[0].description}</p>
                        </div>
                </div>
            </div>
        </div>
        `;

        addTransition();
      })
      .catch((err) => {
        weatherContainer.innerHTML = `<h1 class="text-4xl flex items-center">Please Enter a Valid City or Country</h1>`;
        addTransition();
      });
  }
}
form.addEventListener("submit", getWeather);
