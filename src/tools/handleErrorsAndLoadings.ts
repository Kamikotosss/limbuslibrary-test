type TStatus = {
    isLoading:boolean,
    isError:boolean,
    isFetching:boolean
}
export const handleErrorsAndLoadings = (states:Array<TStatus>) => {
    const loading = states.some((state) => state.isLoading );
    const error = states.some((state) => state.isError );
    return {error,loading}
}