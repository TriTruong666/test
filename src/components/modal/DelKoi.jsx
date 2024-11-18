import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleDelKoiModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import service
import * as KoiService from "../../service/koi/koiService";
export const DelKoi = () => {
  // navigate
  const navigate = useNavigate();
  // selector
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  const koiInfo = useSelector((state) => state.koi.koiInfo.koiInfo);
  // dispatch
  const dispatch = useDispatch();
  // mutation
  const queryCilent = useQueryClient();
  //use State
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const mutation = useMutation({
    mutationKey: ["del-koi", koiInfo?.koiId],
    mutationFn: KoiService.deleteKoiService,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Delete successfully", {
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
        dispatch(toggleDelKoiModal());
        // navigate("/dashboard/mypond/");
        setIsPreventSubmit(false);
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["delete-pond"],
      });
    },
  });
  // handle func
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
    try {
      await mutation.mutateAsync(koiInfo?.koiId);
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleDelKoiModal = () => {
    dispatch(toggleDelKoiModal());
  };
  return (
    <div className="del-koi-containter">
      <ToastContainer />
      <div className="del-koi-modal">
        <div className="del-koi-header">
          <strong>Delete Koi</strong>
          <i className="bx bx-x" onClick={handleToggleDelKoiModal}></i>
        </div>
        <div className="del-koi-main">
          <p>Are you sure to delete {koiInfo?.name}</p>
        </div>
        <div className="submit">
          <button onClick={handleSubmit}>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
