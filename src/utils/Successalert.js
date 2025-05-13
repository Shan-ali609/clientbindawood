import Swal from 'sweetalert2';
const Successalert = async(title)=>{
   const alert = await Swal.fire({
        icon: "success",
        title: title,
      
      });
      return alert
}

export default Successalert