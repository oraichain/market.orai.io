import request from '@/utils/request';
const queryString = require('query-string');
import axios from "axios"
import { URL, TRY_URL } from "../../config/constant"

export async function fetch(page, limit) {
    const query = {}
    if(page) query.page = page
    if(limit) query.limit = limit
    const url = queryString.stringifyUrl({url: `${URL}/provider/oscripts`, query});
    var config = {
        method: 'get',
        url: url
      };
      
    return axios(config)
}

export async function tryOut(payload) {
  var config = {
      method: 'post',
      url: `${TRY_URL}/api/v1/txs/req_price`,
      data: payload
    };
    
  return axios(config)
}
