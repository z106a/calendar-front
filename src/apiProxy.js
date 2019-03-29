export let url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3100/';
} else {
  url = `${window.location.protocol}//${window.location.host}/`;
}
