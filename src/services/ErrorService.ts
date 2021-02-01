import { toast } from "react-toastify";

const handleExpectedError = (error: any) => {
    const { response } = error;

    if (response) {
      const { status } = response;

      switch (status) {
        case '400':
          toast.error('Bad Request!');
          break;
        case '404':
          toast.error('Page not Found!');
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
}

export default handleExpectedError;