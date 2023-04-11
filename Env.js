const server = 'https://serviceuf.pdtcomunicaciones.com/api';
const file_server = 'https://serviceuf.pdtcomunicaciones.com';

const tokenApiMaps = 'AIzaSyBm_gLphZClLWDkUHnD0PrxCx1H0GCoXeM';

const token_wompi = 'pub_test_Js72pVMKRL351hsH4aPj3kqlQyG8W8hR';
const ApiWompi = 'https://sandbox.wompi.co/v1/';

const base_url = function base_url(server, uri) {
  return `${server}/${uri}`;
};

export {base_url, server, file_server, token_wompi, ApiWompi, tokenApiMaps};
