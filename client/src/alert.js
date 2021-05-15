import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Birthday from "./helper/picture/birthday.jpg";

const MySwal = withReactContent(Swal);

export const login = (txt) => {
  MySwal.fire({
    position: "center",
    width: "25rem",
    icon: "error",
    title: txt,
    showConfirmButton: false,
    timer: 600,
  });
};
export const register = (txt) => {
  MySwal.fire({
    position: "center",
    width: "25rem",
    icon: "error",
    title: txt,
    showConfirmButton: false,
    timer: 600,
  });
};

export const showMore = () => {
  MySwal.fire({
    position: "top-end",
    width: "32rem",
    icon: "error",
    title: "Nothing to show here",
    showConfirmButton: false,
    timer: 600,
  });
};

export const notSupport = () => {
  MySwal.fire({
    position: "top-end",
    width: "20rem",
    icon: "error",
    title: "Not support yet!",
    showConfirmButton: false,
    timer: 600,
  });
};

export const birthDay = () => {
  MySwal.fire({
    title: "Sweet!",
    text: "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday.",
    imageUrl: Birthday,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Happy Birthday",
  });
};

export const notEmpty = () => {
  MySwal.fire({
    position: "center",
    width: "25rem",
    icon: "error",
    title: "Input can not be empty!",
    showConfirmButton: false,
    timer: 600,
  });
};

export const checkDelete = async () => {
  let check = false;
  await MySwal.fire({
    title: "Are you sure?",
    text: "NOTE: You can edit instead of delete",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await MySwal.fire("Deleted!", "success");
      check = true;
    }
  });

  return check;
};
