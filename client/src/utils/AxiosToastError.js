import toast from "react-hot-toast";

const AxiosToastError =(error)=>{
    toast.error(
        error?.response?.dada?.message
    )
}
export default AxiosToastError