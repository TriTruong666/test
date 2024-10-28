import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleCreateRefundModal } from "../../redux/slices/modal/modal";
// import service
import * as RefundService from "../../service/refund/refund";
export const CreateRefund = () => {
  // param
  const { orderId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  // dispatch
  const dispatch = useDispatch();
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [submitData, setSubmitData] = useState({
    orderId: orderId,
    refundReason: "",
    refundReasonImage: "",
  });
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
          refundReasonImage: uri,
        });
      },
      "base64",
      250,
      250
    );
  };
  // mutation
  const mutation = useMutation({
    mutationKey: ["create-refund"],
    mutationFn: RefundService.createRefundRequest,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: (response) => {
      if (response?.code === "ALREADY_REQUESTED_REFUND") {
        toast.error("You have requested refund before", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsPreventSubmit(false);
      } else {
        toast.success("Request create success", {
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
          setIsPreventSubmit(false);
        }, 1500);
      }
    },
  });
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      refundReasonImage: "",
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleToggleCreateRefundModal = () => {
    dispatch(toggleCreateRefundModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!submitData.refundReason || !submitData.refundReasonImage) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-refund-container">
      <ToastContainer />
      <div className="create-refund-modal">
        <div className="create-refund-header">
          <strong>Create Refund</strong>
          <i className="bx bx-x" onClick={handleToggleCreateRefundModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="create-refund-form">
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
          <div className="input-item">
            <label htmlFor="title">Your reason</label>
            <textarea
              name="refundReason"
              id=""
              onChange={handleOnChange}
              placeholder="Write your refund reason here..."
            ></textarea>
          </div>
          <div className="submit">
            <button onClick={handleToggleCreateRefundModal}>Cancel</button>
            <button>Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};
