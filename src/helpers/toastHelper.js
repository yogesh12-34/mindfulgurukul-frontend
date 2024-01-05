import { toast } from 'react-toastify'
export const successToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const errorToast = (message) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
  }
