export default (to, from, next) => {
  // Gets id from url
  var url = window.location.pathname.split('/');
  var url_id = url[2];

  if (localStorage.getItem('userid') === url_id) {
    next();
  } else {
    next('/register');
  }
};
