import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// import styles
import "../../styles/components/koi/koi.css";
// import assets
import image from "../../assets/logincover2.jpg";
// import redux
import { useDispatch } from "react-redux";
// import slices
import {
  toggleDetailKoiModal,
  toggleKoiHistoryOff,
} from "../../redux/slices/modal/modal";
// import service
import * as PondService from "../../service/pond/pondService";
export const KoiList = () => {
  // param
  const { pondId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  // handle func
  const handleToggleKoiDetailModal = () => {
    dispatch(toggleDetailKoiModal());
    dispatch(toggleKoiHistoryOff());
  };
  //query
  const {
    data: pondInfo = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["kois", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });
  // handle func
  const calculateAge = (createDate) => {
    const today = new Date();
    const birthDate = new Date(createDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (pondInfo && pondInfo.kois && pondInfo.kois.length === 0) {
      setEmptyList("Product list is empty");
    } else {
      setEmptyList(null);
    }
  }, [isFetching, isLoading]);
  return (
    <table className="koi-list-table">
      <thead>
        <tr>
          <td>Infomation</td>
          <td>Age</td>
          <td>Sex</td>
          <td>Type</td>
          <td>Origin</td>
        </tr>
      </thead>
      <tbody>
        {isLoadingPage ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={35} />
            </div>
          </>
        ) : (
          <>
            {pondInfo &&
              pondInfo.kois &&
              pondInfo.kois.map((koi) => (
                <tr key={koi.koiId} onClick={handleToggleKoiDetailModal}>
                  <th>
                    <img src={koi.image} alt="" />
                    <div>
                      <strong>{koi.name}</strong>
                      <p>#{koi.koiId}</p>
                    </div>
                  </th>
                  <th>{calculateAge(koi.createDate)} years</th>
                  <th>{koi.sex ? "Male" : "Female"}</th>
                  <th>{koi.type}</th>
                  <th>{koi.origin}</th>
                </tr>
              ))}
          </>
        )}
      </tbody>
    </table>
  );
};
