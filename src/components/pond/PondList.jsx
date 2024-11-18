import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { toggleAddPondModal } from "../../redux/slices/modal/modal";
import * as PondService from "../../service/pond/pondService";
import "../../styles/components/pond/pond.css";

export const PondList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;

  // Redux dispatch
  const dispatch = useDispatch();

  // State variables
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // React Query for fetching ponds
  const {
    data: ponds = [],
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["ponds", userId],
    queryFn: () => PondService.getUserPondService(userId),
    refetchOnWindowFocus: false,
  });

  const handleToggleAddPondModal = () => {
    dispatch(toggleAddPondModal());
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setIsLoadingPage(isLoading || isFetching);
    setServerError(isError ? "Server is closed now" : null);
  }, [isFetching, isLoading, isError]);

  // Calculate age of Koi based on create date
  const calculateKoiAge = (createDate) => {
    const today = new Date();
    const created = new Date(createDate);
    return today.getFullYear() - created.getFullYear();
  };

  const calculateFoodAmount = (
    age = 0,
    weight = 0,
    sex = "Female",
    type = "Kohaku",
    origin = "Japan"
  ) => {
    let baseAmount = 0;

    // Adjust base amount based on age
    if (age <= 1) baseAmount = weight * 0.05;
    else if (age <= 2) baseAmount = weight * 0.03;
    else baseAmount = weight * 0.01;

    // Adjust amount based on sex
    if (sex === "Female") baseAmount *= 1.1;

    // Type adjustment
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
    baseAmount *= typeAdjustment[type] || 1;

    // Origin adjustment
    const originAdjustment = {
      Japan: 1.1,
      China: 1.05,
      Indonesia: 1.05,
      Thailand: 1.04,
      Vietnam: 1.03,
      "South Korea": 1.03,
    };
    baseAmount *= originAdjustment[origin] || 1;

    return baseAmount;
  };

  // Calculate total food amount for all Kois in a pond
  const getTotalFoodAmountForPond = (kois = []) => {
    return kois.reduce((totalFood, koiInfo) => {
      const koiAge = koiInfo.createDate
        ? calculateKoiAge(koiInfo.createDate)
        : 0;
      const koiWeight = koiInfo?.koiGrowthLogs?.length
        ? koiInfo.koiGrowthLogs[koiInfo?.koiGrowthLogs?.length - 1].weight *
          1000
        : 0;
      const koiSex = koiInfo.sex ? "Male" : "Female";
      const koiType = koiInfo.type || "Kohaku";
      const koiOrigin = koiInfo.origin || "Japan";

      // Calculate food amount for each Koi
      const recommendedFoodAmount = calculateFoodAmount(
        koiAge,
        koiWeight,
        koiSex,
        koiType,
        koiOrigin
      );

      // Accumulate total food
      return totalFood + recommendedFoodAmount;
    }, 0);
  };

  // Filter ponds based on search term
  const filteredPonds = ponds.filter((pond) =>
    pond.pondName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="pondmanage-utils">
        <div className="search-pond">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search pond by Name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="add" onClick={handleToggleAddPondModal}>
          <i className="bx bx-plus"></i>
          <p>Create new pond</p>
        </div>
      </div>
      <div className="pond-list">
        {serverError ? (
          <div className="error-page">
            <p>Server is closed now</p>
          </div>
        ) : (
          <>
            {isLoadingPage ? (
              <div className="loading">
                <ClipLoader color="#000000" size={40} />
              </div>
            ) : (
              <>
                {filteredPonds.length === 0 && (
                  <div className="empty-list">
                    <p>No ponds were found!</p>
                  </div>
                )}
                {filteredPonds.map((pond) => (
                  <Link
                    key={pond.pondId}
                    to={`/dashboard/mypond/detail/info/${pond.pondId}`}
                    className="pond-item"
                  >
                    <img src={pond.image} alt="Pond" />
                    <div className="pond-info">
                      <div>
                        <strong>{pond.pondName}</strong>
                        <p>{pond.size}m²</p>
                        <p>
                          {Intl.NumberFormat("de-DE").format(pond.volume)} m³
                        </p>
                      </div>
                      <p>{pond.kois ? pond.kois.length : "0"} Kois</p>
                      <p>
                        Total food:{" "}
                        {getTotalFoodAmountForPond(pond.kois).toFixed(2)} g
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
