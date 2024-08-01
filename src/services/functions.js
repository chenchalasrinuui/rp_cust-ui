export const handleToaster = (dispatch, message, bg) => {
    dispatch({
        type: "TOASTER", payload: {
            isShowToaster: true,
            toasterMessage: message,
            toasterBG: bg
        }
    })
}