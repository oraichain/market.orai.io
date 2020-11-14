import {fetch, priceRequest, classification, ocr, classificationHash, ocrHash} from '@/services/market';

const UserModel = {
  namespace: 'market',
  state: {
    scripts: [],
    pageSize: 12,
    total: 1
  },
  effects: {
    * fetch({payload: {page, limit}}, {call, put}) {
      const response = (yield call(fetch, page, limit)).data
      yield put({
        type: "saveScripts",
        payload: response.result.oracle_scripts
      })
      yield put({
        type: "saveTotal",
        payload: response.result.oracle_scripts.length
      })
    },
    * priceRequest({payload}, {call, put}) {
      try {
        const response = yield call(priceRequest, payload)
        return response;
      } catch (error) {
        return error
      }
    },
    * classification({payload}, {call, put}) {
      try {
        const response = yield call(classification, payload)
        return response;
      } catch (error) {
        return error
      }
    },
    * classificationHash({payload}, {call, put}) {
      try {
        const response = yield call(classificationHash, payload)
        return response;
      } catch (error) {
        return error
      }
    },
    * ocr({payload}, {call, put}) {
      try {
        const response = yield call(ocr, payload)
        return response;
      } catch (error) {
        return error
      }
    },
    * ocrHash({payload}, {call, put}) {
      try {
        const response = yield call(ocrHash, payload)
        return response;
      } catch (error) {
        return error
      }
    },
  },
  reducers: {
    saveScripts(state, {payload}) {
      return {...state, scripts: payload};
    },
    savePageSize(state, action) {
      return {...state, pageSize: action.payload};
    },
    saveTotal(state, action) {
      return {...state, total: action.payload};
    },
  },
};
export default UserModel;
