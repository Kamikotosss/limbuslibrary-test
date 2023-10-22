
export const handleErrorsAndLoadings = (states:Array<{error:string|null , loading:boolean}>) => {
    const error = states.some((state) => state.error!==null);
    const loading = states.some((state) => state.loading);
    return {error,loading}
}