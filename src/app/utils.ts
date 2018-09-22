export function formatDate(date) {
  let month = date.getMonth()+1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = "";//hours >= 12 ? 'pm' : 'am';
  //hours = hours % 12;
  //hours = hours ? hours : 12; // the hour '0' should be '12'
  month = month < 10 ? '0'+month : month;
  day = day < 10 ? '0'+day : day;
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  let strTime = hours + ':' + minutes + ':'+seconds+' ' + ampm;
  //return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  return date.getFullYear() + "-" + month + "-" + day + " " + strTime;
}

export function currentDate()
{
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth()+1).toString(); //January is 0!
    let yyyy = today.getFullYear().toString();

    if(today.getDate()<10) {
        dd = '0'+dd;
    }

    if(today.getMonth()+1<10) {
        mm = '0'+mm;
    }

    return yyyy+'-'+mm + '-' + dd;
}
/****************************** cookie **************************/
export function setCookie(cname, cvalue, exdays,path) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path="+path;
}

export function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

export function deleteCookies() {
    document.cookie = "eptic_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "MKHSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    //document.cookie = "L=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
