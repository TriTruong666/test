import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/modal/modal.css";
// import components
import { KoiHistory } from "./KoiHistory";
// import assets
// import redux
import { useDispatch, useSelector } from "react-redux";
// import slices
import {
  toggleDelKoiModal,
  toggleDetailKoiModal,
  toggleKoiHistoryOn,
  toggleUpdateKoiModal,
} from "../../redux/slices/modal/modal";
import * as KoiService from "../../service/koi/koiService";
export const KoiDetail = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleKoiHistory = useSelector(
    (state) => state.modal.koiHistoryModal.isToggleModal
  );
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: koiInfo = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["koi-detail", koiId],
    queryFn: () => KoiService.detailKoiService(koiId),
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading, isError]);
  // handle func
  const handeToggleKoiHistoryModalOn = () => {
    dispatch(toggleKoiHistoryOn());
  };
  const handleToggleKoiDetailModal = () => {
    dispatch(toggleDetailKoiModal());
  };
  const handleToggleDelKoiModal = () => {
    dispatch(toggleDelKoiModal());
    // dispatch(toggleDetailKoiModalOff());
  };
  const handleToggleUpdateKoiModal = () => {
    dispatch(toggleUpdateKoiModal());
    // dispatch(toggleDetailKoiModalOff());
  };
  return (
    <div className="koi-detail-container">
      {isToggleKoiHistory && <KoiHistory />}
      <div className="koi-detail-modal">
        {serverError ? (
          <div className="error-page">
            <p>{serverError}</p>
          </div>
        ) : isLoadingPage ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={35} />
            </div>
          </>
        ) : (
          <>
            <div className="koi-detail-header">
              <strong>Koi Detail #{koiInfo.koiId}</strong>
              <i className="bx bx-x" onClick={handleToggleKoiDetailModal}></i>
            </div>
            <div className="koi-detail-info">
              <img src={koiInfo.image} alt="" />
              <div className="koi-detail-info-header">
                <div>
                  <strong>Koi Infomation</strong>
                  <p>View all infomation of your koi</p>
                </div>
                <span onClick={handeToggleKoiHistoryModalOn}>
                  View info history
                </span>
              </div>
              <div className="koi-detail-main">
                <div className="koi-info">
                  <strong>First date in pond</strong>
                  <p>
                    {new Date(koiInfo.createDate).toLocaleDateString() ||
                      "Date not available"}
                  </p>
                </div>
                <div className="koi-info">
                  <strong>Name</strong>
                  <p>{koiInfo.name}</p>
                </div>
                <div className="koi-info">
                  <strong>Sex</strong>
                  <p>{koiInfo.sex ? "Male" : "Female"}</p>
                </div>
                <div className="koi-info">
                  <strong>Type</strong>
                  <p>{koiInfo.type}</p>
                </div>
                <div className="koi-info">
                  <strong>Origin</strong>
                  <p>{koiInfo.origin}</p>
                </div>
              </div>
              <div className="koi-detail-recommendation">
                <div className="koi-recommendation-header">
                  <strong>Recommendation</strong>
                  <p>
                    Our system will calculate how many food based on Koi Age
                  </p>
                </div>
                <div className="recommendation">
                  <div className="koi-food">
                    <strong>Amount of food (% of Koi Weight)</strong>
                    <p>1%</p>
                  </div>
                  <span>
                    A diet consisting of lower protein pellets, around 25-35%,
                    is appropriate, supplemented with vegetables and fruits such
                    as watermelon, lettuce, or citrus slices. Adult koi should
                    be fed once or twice daily, depending on their activity
                    level and water temperature.
                  </span>
                </div>
                <div className="utils">
                  <button onClick={handleToggleUpdateKoiModal}>Update</button>
                  <button onClick={handleToggleDelKoiModal}>Delete</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
