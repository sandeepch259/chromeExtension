// Import stylesheets
import './style.css';

const authorEl = document.getElementById('author');
const cryptoTop = document.getElementById('crypto-top');
const cryptoBottom = document.getElementById('crypto-bottom');
const weather = document.getElementById('weather');

setInterval(function () {
  const date = new Date();
  document.getElementById('time').textContent = date.toLocaleTimeString(
    'en-us',
    {
      timeStyle: 'short',
    }
  );
}, 1000);

fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    authorEl.textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    console.log(err);
    document.body.style.backgroundImage =
      'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTk4ODcxNTA&ixlib=rb-1.2.1&q=80)';
    authorEl.textContent = 'By: Qingbao Meng';
  });

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
  .then((res) => res.json())
  .then((data) => {
    cryptoTop.innerHTML = `
    <img src="${data.image.small}"/>
    <span>${data.name}</span>
    
    `;
    cryptoBottom.innerHTML = `
      <p>🎯: $${data.market_data.current_price.usd}</p>
      <p>👆: $${data.market_data.high_24h.usd}</p>
      <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((err) => console.log(err));

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error('error');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      weather.innerHTML = `
      <div class="temp-logo">
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" id="weather-logo"/>
        <p id="temp">${Math.round(data.main.temp)}º</p>
      </div>
      <p id="cityName">${data.name}</p>
      `;
    })
    .catch((err) => console.log(err));
});
