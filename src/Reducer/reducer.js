const initialData ={
    list:[]
}

const reducer =(state=initialData,action)=>{
    switch(action.type){
    
        case 'ADD_TEMP':
            const {id, data} = action.payload;
            return {
                ...state,
                list:[
                    ...state.list,
                    {
                        id:id,
                        data:data
                    }
                ]
            }

            case 'DELETE_TEMP':

            const cityList = state.list.map(e => e.data).filter(a => a.name !== action.data.name)
            let removedList
            cityList.forEach(ele => {
                removedList = { ...ele }
            })
            return {
                ...state,
                list: [{ data: removedList }]
            }
        default: return state;
    }

}

export default reducer;