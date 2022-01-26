
const server      = 'https://serviceuf.pdtcomunicaciones.com/api'
const file_server = 'https://serviceuf.pdtcomunicaciones.com'

const tokenApiMaps = "AIzaSyBm_gLphZClLWDkUHnD0PrxCx1H0GCoXeM"
              
const token_wompi = "pub_prod_ImySCqVliTWdSJqsaupl1b7R05bfV5Zf"
//const token_wompi = "pub_test_jDc8Fwgxbbr1shC1Qc12kUL9bcVlR3xh"
const ApiWompi = "https://production.wompi.co/v1/"
//const ApiWompi = "https://sandbox.wompi.co/v1/"

const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}



export  {
    base_url,
    server,
    file_server,
    token_wompi,
    ApiWompi,
    tokenApiMaps
}