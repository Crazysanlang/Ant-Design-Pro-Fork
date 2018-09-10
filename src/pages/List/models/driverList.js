
import { driverList } from "@/services/api";
export default{
    namespace:'driverList',
    state:{
        data:[]
    },
    effects:{
        *fetchDriverList({ payload },{ call, put}) {
            const response = yield call(driverList,payload);
            console.log(response)
            yield put({
                type:'showList',
                payload:response
            })
        }
    },
    reducers:{
        showList(state,action) {
            return {
                ...state,
                data:action.payload
            }
        }
    }
}