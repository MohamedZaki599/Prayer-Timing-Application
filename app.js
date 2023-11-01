
let cities = [

  {
    arabicName: "القاهرة",
    name: "Al Qāhirah"
  },
  {
    arabicName: "أسيوط",
    name: "Asyūţ"
  },
  {
    arabicName: "البحر الأحمر",
    name: "Al Baḩr al Aḩmar"
  },
  {
    arabicName: "الوادي الجديد",
    name: "Al Wādī al Jadīd"
  },
  {
    arabicName: "الإسكندرية",
    name: "Al Iskandarīyah"
  }
];

for (let city of cities) {
  const content = `
  <option>${city.arabicName}</option>
  `
  document.getElementById('citiesSelect').innerHTML += content;
}

document.getElementById('citiesSelect').addEventListener('change', function () {

  document.getElementById('city-name').innerHTML = this.value; 
  let cityName = ""
  for (city of cities) {
    if (city.arabicName == this.value) {
      cityName = city.name;
    }
  }
  getPrayersTimingsOfCity(cityName)
})


function getPrayersTimingsOfCity(cityName) {
  let params = {
    country: "EG",
    city: cityName //"Al Qāhirah"
  }

  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
    .then(function (response) {
      const timings = response.data.data.timings
      FillTimeForPrayer("fajr-time", timings.Fajr)
      FillTimeForPrayer("sunrise-time", timings.Sunrise)
      FillTimeForPrayer("dhuhr-time", timings.Dhuhr)
      FillTimeForPrayer("asr-time", timings.Asr)
      FillTimeForPrayer("sunset-time", timings.Maghrib)
      FillTimeForPrayer("isha-time", timings.Isha)

      const readableDate = response.data.data.date.readable
      const weekDay = response.data.data.date.hijri.weekday.ar

      console.log(response.data.data.timings);
      // console.log(weekDay + " " + readableDate);
      const date = weekDay + " " + readableDate
      document.getElementById("date1").innerHTML = date;
    })
    .catch(function (error) {
      console.log(error);
    })
}


getPrayersTimingsOfCity("Al Qāhirah")


function FillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time
}