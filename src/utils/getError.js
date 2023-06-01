import { AxiosError } from "axios"

const getError = (err) => {
  if(err instanceof AxiosError) {
    if(err.response.data.message) {
      return err.response.data.message;
    }else{
      return "Network error";
    }
  }else{
    return err.message;
  }
}

export default getError;