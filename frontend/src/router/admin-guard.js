export default (to, from, next) => {
  if (
    localStorage.getItem('level') == 'admin' ||
    localStorage.getItem('level') === 'superadmin'
  ) {
    next();
  } else {
    next('/login');
  }
};
