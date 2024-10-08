function delete_cookie(name) {
  document.cookie = `${name}=; expires=Thu, 01-Jan-70 00:00:01 GMT;`;
} 

function create_cookie(name, value) {
  document.cookie = `${name}=${value}; path=/`
}

function get_cookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export {
  delete_cookie,
  create_cookie,
  get_cookie,
}
