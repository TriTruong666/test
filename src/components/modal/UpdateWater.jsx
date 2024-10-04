import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleUpdateWaterModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
// import service
import * as WaterService from "../../service/waterParams/waterParamsService";
import * as PondService from "../../service/pond/pondService";
export const UpdateWater = () => {
  // param
  const { pondId } = useParams();
  // state
  const [submitData, setSubmitData] = useState({
    waterParamId: "",
    o2: "",
    temperature: "",
    nh4: "",
    salt: "",
    ph: "",
    no2: "",
    no3: "",
  });
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  // const query
  const {
    data: pondInfo = {},
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (pondInfo && pondInfo.waterParam) {
      setSubmitData({
        waterParamId:
          (pondInfo.waterParam && pondInfo.waterParam.waterParamId) || "",
        o2: (pondInfo.waterParam && pondInfo.waterParam.o2) || "",
        temperature:
          (pondInfo.waterParam && pondInfo.waterParam.temperature) || "",
        nh4: (pondInfo.waterParam && pondInfo.waterParam.nh4) || "",
        salt: (pondInfo.waterParam && pondInfo.waterParam.salt) || "",
        ph: (pondInfo.waterParam && pondInfo.waterParam.ph) || "",
        no2: (pondInfo.waterParam && pondInfo.waterParam.no2) || "",
        no3: (pondInfo.waterParam && pondInfo.waterParam.no3) || "",
      });
    }
  }, [pondInfo, isFetching, isLoading]);
  // dispatch
  const dispatch = useDispatch();
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: [
      "update-water",
      pondInfo.waterParam && pondInfo.waterParam.waterParamId,
    ],
    mutationFn: (updateData) => {
      WaterService.updateWaterService(
        pondInfo.waterParam && pondInfo.waterParam.waterParamId,
        updateData
      );
    },
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
        queryKey: ["update-water"],
      });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputFloatWater = (e) => {
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
  //   handle func
  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };
  return (
    <div className="update-water-container">
      <ToastContainer />
      <div className="update-water-modal">
        <div className="update-water-header">
          <strong>Update Water Quality</strong>
          <i className="bx bx-x" onClick={handleToggleUpdateWaterModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          autoCorrect="off"
          className="update-water-form"
        >
          <div className="input-two-fields">
            <input
              type="text"
              name="no2"
              defaultValue={
                pondInfo && pondInfo.waterParam && pondInfo.waterParam.no2
              }
              placeholder="NO2 (ppm)"
              onChange={handleInputFloatWater}
            />
            <input
              type="text"
              name="no3"
              defaultValue={
                pondInfo && pondInfo.waterParam && pondInfo.waterParam.no3
              }
              placeholder="NO3 (ppm)"
              onChange={handleInputFloatWater}
            />
          </div>
          <div className="input-two-fields">
            <input
              type="text"
              name="nh4"
              defaultValue={
                pondInfo && pondInfo.waterParam && pondInfo.waterParam.nh4
              }
              placeholder="NH3/NH4 (ppm)"
              onChange={handleInputFloatWater}
            />
            <input
              type="text"
              name="o2"
              defaultValue={
                pondInfo && pondInfo.waterParam && pondInfo.waterParam.o2
              }
              placeholder="O2 (mg/l)"
              onChange={handleInputFloatWater}
            />
          </div>
          <div className="input-two-fields">
            <input
              type="text"
              name="salt"
              defaultValue={
                pondInfo && pondInfo.waterParam && pondInfo.waterParam.salt
              }
              placeholder="Salt (%)"
              onChange={handleInputFloatWater}
            />
            <input
              type="text"
              name="ph"
              defaultValue={
                pondInfo && pondInfo.waterParam && pondInfo.waterParam.ph
              }
              placeholder="pH"
              onChange={handleInputFloatWater}
            />
          </div>
          <input
            type="text"
            id="temp"
            name="temperature"
            defaultValue={
              pondInfo && pondInfo.waterParam && pondInfo.waterParam.temperature
            }
            placeholder="Temparature (℃  )"
            onChange={handleInputFloatWater}
          />
          <div className="submit">
            <button onClick={handleToggleUpdateWaterModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
