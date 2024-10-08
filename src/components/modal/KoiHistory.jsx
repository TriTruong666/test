import React, { useEffect, useState } from "react";
// import styles
import "../../styles/components/modal/modal.css";
import { useQuery } from "@tanstack/react-query";
// import chart
import { WeightLineChart } from "../../chart/WeightLineChart";
import { SizeLineChart } from "../../chart/SizeLineChart";
// import slices
import {
  toggleKoiHistoryModal,
  toggleKoiLogModal,
} from "../../redux/slices/modal/modal";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import service
import * as KoiService from "../../service/koi/koiService";
export const KoiHistory = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  // state
  const [isEmptyLog, setIsEmptyLog] = useState(false);
  const [koiLogList, setKoiLogList] = useState([]);
  // query
  const {
    data: koiInfo = {},
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["koi-detail", koiId],
    queryFn: () => KoiService.detailKoiService(koiId),
  });
  // handle func
  const handleToggleKoiHistoryModal = () => {
    dispatch(toggleKoiHistoryModal());
  };
  const handleToggleKoiLogModal = () => {
    dispatch(toggleKoiLogModal());
  };
  useEffect(() => {
    if (koiInfo && koiInfo.koiGrowthLogs) {
      if (koiInfo.koiGrowthLogs.length === 0) {
        setIsEmptyLog(true);
      } else {
        setIsEmptyLog(false);
        setKoiLogList(koiInfo.koiGrowthLogs);
      }
    }
  }, [koiInfo]);
  return (
    <div className="koi-history-modal">
      {isEmptyLog ? (
        <>
          <div className="empty-log">
            <strong>No growth history available for this koi yet.</strong>
            <p>
              Start tracking the growth by adding the koi's size and weight!
            </p>
            <button onClick={handleToggleKoiLogModal}>Add Growth Data</button>
          </div>
        </>
      ) : (
        <>
          <div className="koi-history-header">
            <strong>Koi History #1233</strong>
            <i className="bx bx-x" onClick={handleToggleKoiHistoryModal}></i>
          </div>
          <div className="koi-history-chart">
            <WeightLineChart koiGrowthLogs={koiLogList} />
            <SizeLineChart koiGrowthLogs={koiLogList} />
          </div>
          <div className="koi-history-main">
            <div className="header">
              <div>
                <strong>Koi Growth History</strong>
                <p>System will show growth history of your Koi</p>
              </div>
              <span onClick={handleToggleKoiLogModal}>Update new data</span>
            </div>
            <table className="history">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Last Update</th>
                  <th>Size</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {koiLogList.map((log, index) => (
                  <tr key={log.koiLogId}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(log.koiLogDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      {log.logTime}
                    </td>
                    <td>{log.size}cm</td>
                    <td>{log.weight}kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
