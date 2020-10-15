import { fetch } from '@/services/market';
const UserModel = {
    namespace: 'market',
    state: {
        scripts: [],
        pageSize: 12,
        total: 1
    },
    effects: {
        *fetch({ payload: { page, limit } }, { call, put }) {
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
    },
    reducers: {
        saveScripts(state, { payload }) {
            return { ...state, scripts: payload };
        },
        savePageSize(state, action) {
            return { ...state, pageSize: action.payload };
        },
        saveTotal(state, action) {
            return { ...state, total: action.payload };
        },
    },
};
export default UserModel;
