function attachEventsListeners() {
    document.getElementById('daysBtn').addEventListener('click',onClickDays);
    document.getElementById('hoursBtn').addEventListener('click',onClickHours);
    document.getElementById('minutesBtn').addEventListener('click',onClickMinutes);
    document.getElementById('secondsBtn').addEventListener('click',onClickSeconds);
  
    let days = document.getElementById('days');
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
  
    function onClickDays() {
      hours.value = Number(days.value) * 24;
      minutes.value = Number(hours.value) * 60;
      seconds.value = Number(minutes.value) * 60;
    }
  
    function onClickHours() {
      days.value = (Number(hours.value) / 24);
      minutes.value = Number(hours.value) * 60;
      seconds.value = Number(minutes.value) * 60;
    }
  
    function onClickMinutes() {
      hours.value = (Number(minutes.value) / 60);
      days.value =(Number(hours.value) / 24);
      seconds.value = Number(minutes.value) * 60;
    }
  
    function onClickSeconds() {
      minutes.value = (Number(seconds.value) / 60);
      hours.value = (Number(minutes.value) / 60);
      days.value =(Number(hours.value) / 24);
    }
  }
  