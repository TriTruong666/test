import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/pond/pond.css";
// import service
import { useDispatch } from "react-redux";
import { toggleAddPondModal } from "../../redux/slices/modal/modal";
import * as PondService from "../../service/pond/pondService";

export const PondList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  // dispatch
  const dispatch = useDispatch();

  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // query
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

  // handle func
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddPondModal());
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
  }, [isFetching, isLoading, isError, ponds.length]);

  // Filter ponds based on search term
  const filteredPonds = ponds.filter((pond) =>
    pond.pondName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalFoodAmountForPond = (koiList) => {
    return koiList
      .reduce((total, koi) => {
        const foodAmount =
          parseFloat(localStorage.getItem(`koi-food-for-${koi.koiId}`)) || 0;
        return total + foodAmount;
      }, 0)
      .toFixed(2);
  };
  return (
    <>
      <div className="pondmanage-utils">
        <div className="search-pond">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search pond..."
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
                {emptyList && (
                  <div className="empty-list">
                    <p>{emptyList}</p>
                  </div>
                )}
                {filteredPonds.length === 0 && (
                  <div className="empty-list">
                    <p>No ponds was found!</p>
                  </div>
                )}
                {filteredPonds.map((pond) => {
                  const pondStatus = localStorage.getItem(
                    `pondStatus-${pond.pondId}`
                  );

                  return (
                    <Link
                      key={pond.pondId}
                      to={`/dashboard/mypond/detail/info/${pond.pondId}`}
                      className={`pond-item `}
                    >
                      <img src={pond.image} alt="" />
                      <div className="pond-info">
                        <div>
                          <strong>{pond.pondName}</strong>
                          <p>{pond.size}m²</p>
                          <p>
                            {Intl.NumberFormat("de-DE").format(pond.volume)} L
                          </p>
                        </div>
                        <span className={pondStatus}>Status: {pondStatus}</span>
                        <p>{pond.kois ? pond.kois.length : "0"} Kois</p>
                        <p>
                          Total food: {getTotalFoodAmountForPond(pond.kois)} g
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
