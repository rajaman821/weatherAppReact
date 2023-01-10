export const addTemp=(data) =>{
    return {
        type:'ADD_TEMP',
        payload:{
            id: new Date().getTime().toString(),
            data: data
        }
    }
}

export const deleteTemp = (data) =>{
    return {
        type:'DELETE_TEMP',
        data
    }
}