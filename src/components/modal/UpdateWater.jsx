import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
import * as PondService from "../../service/pond/pondService";
import * as WaterService from "../../service/waterParams/waterParamsService";
export const UpdateWater = () => {
  // param
  const { pondId } = useParams();
  // state
  const [submitData, setSubmitData] = useState({
    waterParamId: 0,
    o2: 0,
    temperature: 0,
    nh4: 0,
    salt: 0,
    ph: 0,
    no2: 0,
    no3: 0,
  });
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
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
    onMutate: () => {
      setIsPreventSubmit(true);
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
        setIsPreventSubmit(false);
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["pond-detail"],
      });
    },
  });

  //   handle func
  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };
  const handleInputFloatWater = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
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

    if (
      isNaN(submitData.nh4) ||
      isNaN(submitData.no2) ||
      isNaN(submitData.no3) ||
      isNaN(submitData.o2) ||
      isNaN(submitData.ph) ||
      isNaN(submitData.salt) ||
      isNaN(submitData.temperature)
    ) {
      toast.error("Invalid number, please enter a number", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (
      !submitData.nh4 ||
      !submitData.no2 ||
      !submitData.no3 ||
      !submitData.o2 ||
      !submitData.ph ||
      !submitData.salt ||
      !submitData.temperature
    ) {
      toast.error("Fields is not empty", {
        position: "top-right",
        autoClose: 1500,
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
      console.error(error);
    }
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
            <div className="input-field">
              <label htmlFor="no2">NO2 (ppm)</label>
              <input
                type="text"
                id="no2"
                name="no2"
                defaultValue={
                  pondInfo && pondInfo.waterParam && pondInfo.waterParam.no2
                }
                placeholder="NO2 (ppm)"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-field">
              <label htmlFor="no3">NO3 (ppm)</label>
              <input
                type="text"
                id="no3"
                name="no3"
                defaultValue={
                  pondInfo && pondInfo.waterParam && pondInfo.waterParam.no3
                }
                placeholder="NO3 (ppm)"
                onChange={handleInputFloatWater}
              />
            </div>
          </div>
          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="nh4">NH3/NH4 (ppm)</label>
              <input
                type="text"
                id="nh4"
                name="nh4"
                defaultValue={
                  pondInfo && pondInfo.waterParam && pondInfo.waterParam.nh4
                }
                placeholder="NH3/NH4 (ppm)"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-field">
              <label htmlFor="o2">O2 (mg/l)</label>
              <input
                type="text"
                id="o2"
                name="o2"
                defaultValue={
                  pondInfo && pondInfo.waterParam && pondInfo.waterParam.o2
                }
                placeholder="O2 (mg/l)"
                onChange={handleInputFloatWater}
              />
            </div>
          </div>
          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="salt">Salt (%)</label>
              <input
                type="text"
                id="salt"
                name="salt"
                defaultValue={
                  pondInfo && pondInfo.waterParam && pondInfo.waterParam.salt
                }
                placeholder="Salt (%)"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-field">
              <label htmlFor="ph">pH</label>
              <input
                type="text"
                id="ph"
                name="ph"
                defaultValue={
                  pondInfo && pondInfo.waterParam && pondInfo.waterParam.ph
                }
                placeholder="pH"
                onChange={handleInputFloatWater}
              />
            </div>
          </div>
          <div className="input-field-water">
            <label>Temperature (℃)</label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              defaultValue={
                pondInfo &&
                pondInfo.waterParam &&
                pondInfo.waterParam.temperature
              }
              placeholder="Temperature (℃)"
              onChange={handleInputFloatWater}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleUpdateWaterModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
