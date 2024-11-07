import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleUpdateWaterModal } from "../../redux/slices/modal/modal";
import * as PondService from "../../service/pond/pondService";
import * as WaterService from "../../service/waterParams/waterParamsService";
import "../../styles/components/modal/modal.css";

export const UpdateWater = () => {
  const { pondId } = useParams();
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
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);

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
        o2: (pondInfo.waterParam && pondInfo.waterParam.o2?.toString()) || "",
        temperature:
          (pondInfo.waterParam &&
            pondInfo.waterParam.temperature?.toString()) ||
          "",
        nh4: (pondInfo.waterParam && pondInfo.waterParam.nh4?.toString()) || "",
        salt:
          (pondInfo.waterParam && pondInfo.waterParam.salt?.toString()) || "",
        ph: (pondInfo.waterParam && pondInfo.waterParam.ph?.toString()) || "",
        no2: (pondInfo.waterParam && pondInfo.waterParam.no2?.toString()) || "",
        no3: (pondInfo.waterParam && pondInfo.waterParam.no3?.toString()) || "",
      });
    }
  }, [pondInfo, isFetching, isLoading]);

  const dispatch = useDispatch();
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

  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };

  const handleInputFloatWater = (e) => {
    const { name, value } = e.target;
    // Allow empty string for initial input
    if (value === "") {
      setSubmitData({
        ...submitData,
        [name]: value,
      });
      return;
    }

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setSubmitData({
        ...submitData,
        [name]: parsedValue,
      });
    }
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

    // Check if any field is empty string (allowing 0 values)
    const hasEmptyFields = Object.entries(submitData).some(([key, value]) => {
      if (key === "waterParamId") return false; // Skip waterParamId check
      return value === "";
    });

    if (hasEmptyFields) {
      toast.error("Fields cannot be empty", {
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

    // Check if any field is NaN
    const hasInvalidNumbers = Object.entries(submitData).some(
      ([key, value]) => {
        if (key === "waterParamId") return false; // Skip waterParamId check
        return isNaN(value);
      }
    );

    if (hasInvalidNumbers) {
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

    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAndStorePondStatus = (pondName, waterParams) => {
    const calculateParamStatus = (param, idealMin, idealMax) => {
      if (param >= idealMin && param <= idealMax) return "good";
      if (
        (param >= idealMin - 1 && param < idealMin) ||
        (param > idealMax && param <= idealMax + 1)
      )
        return "moderate";
      return "poor";
    };

    const parameters = [
      calculateParamStatus(waterParams.o2, 7, 9),
      calculateParamStatus(waterParams.no2, 0, 0.5),
      calculateParamStatus(waterParams.no3, 0, 20),
      calculateParamStatus(waterParams.nh4, 0, 0.2),
      calculateParamStatus(waterParams.temperature, 20, 28),
      calculateParamStatus(waterParams.salt, 0.1, 0.3),
      calculateParamStatus(waterParams.ph, 7, 8),
    ];

    const statusCount = parameters.reduce(
      (acc, status) => {
        acc[status]++;
        return acc;
      },
      { good: 0, moderate: 0, poor: 0 }
    );

    const avgStatus =
      statusCount.good >= statusCount.moderate &&
      statusCount.good >= statusCount.poor
        ? "good"
        : statusCount.moderate >= statusCount.poor
        ? "moderate"
        : "poor";

    localStorage.setItem(`status-of-ponds-${pondName}`, avgStatus);
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
                value={submitData.no2}
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
                value={submitData.no3}
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
                value={submitData.nh4}
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
                value={submitData.o2}
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
                value={submitData.salt}
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
                value={submitData.ph}
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
              value={submitData.temperature}
              placeholder="Temperature (℃)"
              onChange={handleInputFloatWater}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleUpdateWaterModal}>Cancel</button>
            <button type="submit">Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
