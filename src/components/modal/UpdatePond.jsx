import { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleUpdatePondModal } from "../../redux/slices/modal/modal";
// import dispatch
import { useDispatch } from "react-redux";
// import service
import * as PondService from "../../service/pond/pondService";
export const UpdatePond = () => {
  // param
  const { pondId } = useParams();
  // query
  const {
    data: pondInfo = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });
  // dispatch
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [validNumber, setValidNumber] = useState(false);
  const [submitData, setSubmitData] = useState({
    image: pondInfo.image,
    pondName: pondInfo.pondName,
    pumpPower: pondInfo.pumpPower,
    size: pondInfo.size,
    depth: pondInfo.depth,
    volume: pondInfo.volume,
    vein: pondInfo.vein,
  });
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-pond", pondId],
    mutationFn: (updatedData) =>
      PondService.updatePondService(pondId, updatedData),
    onSuccess: () => {
      toast.success("Update successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["update-pond"],
      });
    },
  });
  useEffect(() => {
    if (pondInfo && pondInfo.image) {
      setPreviewImage(pondInfo.image);
    }
  }, [pondInfo]);
  //   file resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      100,
      0,
      (uri) => {
        setPreviewImage(uri);
        setSubmitData({
          ...submitData,
          image: uri,
        });
      },
      "base64",
      250,
      250
    );
  };
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdatePondModal());
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleInputNumberPond = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setValidNumber(true);
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseInt(value),
    });
    setValidNumber(false);
  };
  const handleInputFloatPond = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setValidNumber(true);
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
    setValidNumber(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validNumber) {
      toast.error("Invalid number", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="update-pond-container">
      <ToastContainer />
      <div className="update-pond-modal">
        <div className="update-pond-header">
          <strong>Update Pond</strong>
          <i className="bx bx-x" onClick={handleToggleUpdatePondModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          autoComplete="off"
          className="update-pond-form"
        >
          <div className="input-image">
            <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>

            {previewImage ? (
              <label htmlFor="img">
                <img src={previewImage} alt="" />
              </label>
            ) : (
              <label htmlFor="img">
                <i className="bx bx-image-add"></i>
                <p>Choose An Image</p>
              </label>
            )}

            <input
              type="file"
              id="img"
              src=""
              alt=""
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>
          <div className="input-two-fields">
            <input
              type="text"
              placeholder="Pond name"
              name="pondName"
              onChange={handleOnChange}
              defaultValue={pondInfo && pondInfo.pondName}
            />
            <input
              type="text"
              placeholder="Pump power (W)"
              name="pumpPower"
              onChange={handleInputFloatPond}
              defaultValue={pondInfo && pondInfo.pumpPower}
            />
          </div>
          <div className="input-two-fields">
            <input
              type="text"
              placeholder="Size (m²)"
              name="size"
              onChange={handleInputFloatPond}
              defaultValue={pondInfo && pondInfo.size}
            />
            <input
              type="text"
              placeholder="Depth (m)"
              name="depth"
              onChange={handleInputFloatPond}
              defaultValue={pondInfo && pondInfo.depth}
            />
          </div>
          <div className="input-two-fields">
            <input
              type="text"
              placeholder="Volumn (L)"
              name="volume"
              onChange={handleInputFloatPond}
              defaultValue={pondInfo && pondInfo.volume}
            />
            <input
              type="text"
              placeholder="Number of veins"
              name="vein"
              onChange={handleInputNumberPond}
              defaultValue={pondInfo && pondInfo.vein}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleUpdatePondModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
