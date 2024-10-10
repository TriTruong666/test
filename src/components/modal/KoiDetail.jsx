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

  // Calculate the age of the koi in years
  const calculateKoiAge = (createDate) => {
    const today = new Date();
    const created = new Date(createDate);
    const age = today.getFullYear() - created.getFullYear();
    return age;
  };

  // Calculate recommended food amount based on koi age, weight, sex, type, and origin
  const calculateFoodAmount = (age, weight, sex, type, origin) => {
    let baseAmount = 0;

    // Adjust base food amount based on age
    if (age <= 1) baseAmount = weight * 0.05;
    // Young koi (up to 1 year old) - 5% of body weight
    else if (age <= 2) baseAmount = weight * 0.03;
    // Juvenile koi (1-2 years) - 3% of body weight
    else baseAmount = weight * 0.01; // Adult koi (3+ years) - 1% of body weight

    // Adjust for koi sex (Female typically needs more due to egg production)
    if (sex === "Female") baseAmount *= 1.1; // Increase food by 10% for females

    // Adjust based on koi type
    const typeAdjustment = {
      Kohaku: 1.05,
      Sanke: 1.05,
      Showa: 1.05,
      Tancho: 1.04,
      Asagi: 1.03,
      Shusui: 1.03,
      Utsurimono: 1.02,
      Bekko: 1.02,
      Goshiki: 1.03,
      Koromo: 1.03,
    };

    baseAmount *= typeAdjustment[type] || 1; // Adjust based on koi type (default to 1 if no match)

    // Adjust based on koi origin
    const originAdjustment = {
      Japan: 1.1, // Japanese koi are often higher quality and might need more food
      China: 1.05,
      Indonesia: 1.05,
      Thailand: 1.04,
      Vietnam: 1.03,
      "South Korea": 1.03,
    };

    baseAmount *= originAdjustment[origin] || 1; // Adjust based on origin (default to 1 if no match)

    return baseAmount;
  };

  // Extract koi info
  const koiAge = koiInfo.createDate ? calculateKoiAge(koiInfo.createDate) : 0;
  const koiWeight = koiInfo.weight || 1000; // Assuming koi weight is provided in grams
  const koiSex = koiInfo.sex ? "Male" : "Female";
  const koiType = koiInfo.type;
  const koiOrigin = koiInfo.origin;

  // Calculate food recommendation
  const recommendedFoodAmount = calculateFoodAmount(
    koiAge,
    koiWeight,
    koiSex,
    koiType,
    koiOrigin
  );

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
                  <strong>Feeding Recommendation</strong>
                  <p>
                    Our system calculates the amount of food based on your koi's
                    age, sex, type and origin
                  </p>
                </div>
                <div className="recommendation">
                  <div className="koi-food">
                    <strong>Recommended Food Amount (grams per day)</strong>
                    <p>{recommendedFoodAmount.toFixed(2)}g</p>
                  </div>

                  <span>
                    In addition to pellets, you can feed koi vegetables and
                    fruits such as lettuce, watermelon, and oranges. Adjust
                    feeding based on koi activity and water temperature.
                  </span>
                </div>
                <div className="recommendation">
                  <strong>Recommended Product</strong>
                  <span>
                    We recommend this product for optimal koi health and feeding
                    care.
                  </span>

                  <span>
                    <a
                      href="http://localhost:5173/shop/category/1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-link"
                    >
                      View and Buy Product
                    </a>
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
