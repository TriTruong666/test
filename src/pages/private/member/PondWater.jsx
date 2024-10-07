import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../../styles/dashboard/pondwater/pondwater.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleUpdateWaterModal } from "../../../redux/slices/modal/modal";
// import service
import * as PondService from "../../../service/pond/pondService";
export const PondWater = () => {
  // import dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };
  // param
  const { pondId } = useParams();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    data: pondInfo = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }


  }, [isFetching, isLoading,isError]);
  return (
    <div className="pond-water-container">
      {serverError ? (
            <div className="error-page">
              <p>{serverError}</p>
            </div>
          ) : isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          ) : (
        <>
          <div className="pond-water-header">
            <div className="header">
              <strong>Water quality</strong>
              <p>View detail all parameters of water quality</p>
            </div>
            <div
              className="update-water"
              onClick={handleToggleUpdateWaterModal}
            >
              <i className="bx bxs-edit-alt"></i>
              <p>Update water quality</p>
            </div>
          </div>
          <div className="pond-water-list">
            <div className="pond-water-param">
              <strong>Lastest update</strong>
              <p>
                {new Date(
                  pondInfo &&
                    pondInfo.waterParam &&
                    pondInfo.waterParam.createDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="pond-water-param">
              <strong>O2</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.o2}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>NO2</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.no2}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>NO3</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.no3}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>NH3/NH4</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.nh4}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>Temparature</strong>
              <p>
                {pondInfo &&
                  pondInfo.waterParam &&
                  pondInfo.waterParam.temperature}
                ℃
              </p>
            </div>
            <div className="pond-water-param">
              <strong>Salt</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.salt}%
              </p>
            </div>
            <div className="pond-water-param">
              <strong>pH</strong>
              <p>{pondInfo && pondInfo.waterParam && pondInfo.waterParam.ph}</p>
            </div>
          </div>
          <div className="pond-water-recommendation-header">
            <strong>Recommendation</strong>
            <p>
              Let’s our system calculate ideal water parameter for your ponds
            </p>
          </div>
          <div className="pond-water-recommendation">
            <div className="recommendation-param critical">
              <strong>Salt (Critical)</strong>
              <p>Less 0.1%</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
