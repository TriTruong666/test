import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleKoiLogModal } from "../../redux/slices/modal/modal";
// import service
import * as KoiLogService from "../../service/koiLog/koiLog";
export const AddKoiLog = () => {
  // selector
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  // state
  const [startDate, setStartDate] = useState(new Date());
  const [submitData, setSubmitData] = useState({
    size: "",
    weight: "",
    koiId: koiId,
  });
  // dispatch
  const dispatch = useDispatch();
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["addKoiLog"],
    mutationFn: KoiLogService.addKoiLog,
    onSuccess: () => {
      toast.success("Add successfully", {
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
        dispatch(toggleKoiLogModal());
      }, 1500);
      queryCilent.invalidateQueries(["koi-detail"]);
    },
  });
  //   handle func
  const handleInputFloatKoiLog = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleKoiLogModal = () => {
    dispatch(toggleKoiLogModal());
  };
  return (
    <div className="add-koi-log-container">
      <ToastContainer />
      <div className="add-koi-log-modal">
        <div className="add-koi-log-header">
          <strong>Add Growth Data</strong>
          <i className="bx bx-x" onClick={handleToggleKoiLogModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="add-koi-log-form">
          <div className="input-item">
            <label htmlFor="size">Size (cm)</label>
            <input
              type="text"
              id="size"
              placeholder="Enter size"
              onChange={handleInputFloatKoiLog}
              name="size"
            />
          </div>
          <div className="input-item">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="text"
              id="weight"
              onChange={handleInputFloatKoiLog}
              placeholder="Enter Weight"
              name="weight"
            />
          </div>
          {/* <DatePicker
            selected={startDate}
            maxDate={new Date()}
            endDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="custom-datepicker"
            calendarClassName="custom-calendar"
          /> */}
          <div className="submit">
            <button onClick={handleToggleKoiLogModal}>Cancel</button>
            <button>Add confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
