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

export async function priceRequest(payload) {
  var config = {
      method: 'post',
      url: `${TRY_URL}/api/v1/txs/req_price`,
      data: payload
    };

  return axios(config)
}

export async function classification(payload) {
  var config = {
      method: 'post',
      url: `${TRY_URL}/api/v1/txs/img_classification`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: payload
    };

  return axios(config)
}

export async function ocr(payload) {
  var config = {
      method: 'post',
      url: `${TRY_URL}/api/v1/txs/img_ocr`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: payload
    };

  return axios(config)
}

export async function classificationHash(payload) {
  var config = {
      method: 'post',
      url: `${TRY_URL}/api/v1/txs/img_classification_hash`,
      data: payload
    };

  return axios(config)
}

export async function ocrHash(payload) {
  var config = {
      method: 'post',
      url: `${TRY_URL}/api/v1/txs/img_ocr_hash`,
      data: payload
    };

  return axios(config)
}
