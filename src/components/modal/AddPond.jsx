import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
import FileResizer from "react-image-file-resizer";
// import slices
import { toggleAddPondModal } from "../../redux/slices/modal/modal";
// import dispatch
import { useDispatch } from "react-redux";
// import service
import * as PondService from "../../service/pond/pondService";
import * as WaterService from "../../service/waterParams/waterParamsService";
export const AddPond = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [submitPondData, setSubmitPondData] = useState({
    pondName: "",
    image: "",
    pumpPower: "",
    vein: "",
    size: "",
    depth: "",
    volume: "",
    userId: userId,
  });
  const [submitWaterData, setSubmitWaterData] = useState({
    o2: "",
    temperature: "",
    nh4: "",
    salt: "",
    ph: "",
    no2: "",
    no3: "",
    pondId: "",
  });
  const [invalidNumber, setInvalidNumber] = useState(null);
  const [isMutatePond, setIsMutatePond] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // dispatch
  const dispatch = useDispatch();
  // mutation
  const queryCilent = useQueryClient();
  const pondMutation = useMutation({
    mutationFn: PondService.createPondService,
    onMutate: () => {
      setIsMutatePond(true);
    },
    onSuccess: (responseData) => {
      setIsMutatePond(false);
      setSubmitWaterData({
        ...submitWaterData,
        pondId: responseData.pondId,
      });
      queryCilent.invalidateQueries({
        queryKey: ["ponds"],
      });
    },
  });
  const waterMutation = useMutation({
    mutationFn: WaterService.createWaterService,
    onSuccess: () => {
      toast.success("Create successfully", {
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
        dispatch(toggleAddPondModal());
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["water"],
      });
    },
  });
  //   file resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      100,
      0,
      (uri) => {
        setPreviewImage(uri);
        setSubmitPondData({
          ...submitPondData,
          image: uri,
        });
      },
      "base64",
      250,
      250
    );
  };
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitPondData({
      ...submitPondData,
      image: "",
    });
  };
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddPondModal());
  };
  const handleOnChangePond = (e) => {
    const { name, value } = e.target;
    setSubmitPondData({
      ...submitPondData,
      [name]: value,
    });
  };
  const handleInputNumberPond = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitPondData({
        ...submitPondData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitPondData({
      ...submitPondData,
      [name]: parseInt(value),
    });
    setInvalidNumber(null);
  };
  const handleInputFloatPond = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitPondData({
        ...submitPondData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitPondData({
      ...submitPondData,
      [name]: parseFloat(value),
    });
    setInvalidNumber(null);
  };
  const handleInputFloatWater = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitWaterData({
        ...submitWaterData,
        [name]: "",
      });
      setInvalidNumber("Please input a valid number");
      return;
    }
    setSubmitWaterData({
      ...submitWaterData,
      [name]: parseFloat(value),
    });
    setInvalidNumber(null);
  };
  useEffect(() => {
    if (submitWaterData.pondId) {
      waterMutation.mutateAsync(submitWaterData).catch((error) => {
        console.error(error);
      });
    }
  }, [submitWaterData.pondId]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      submitPondData.depth === null ||
      submitPondData.depth === undefined ||
      submitPondData.image === "" ||
      submitPondData.pondName === "" ||
      submitPondData.pumpPower === null ||
      submitPondData.pumpPower === undefined ||
      submitPondData.size === null ||
      submitPondData.size === undefined ||
      submitPondData.vein === null ||
      submitPondData.vein === undefined ||
      submitPondData.volume === null ||
      submitPondData.volume === undefined ||
      submitWaterData.nh4 === null ||
      submitWaterData.nh4 === undefined ||
      submitWaterData.no2 === null ||
      submitWaterData.no2 === undefined ||
      submitWaterData.no3 === null ||
      submitWaterData.no3 === undefined ||
      submitWaterData.o2 === null ||
      submitWaterData.o2 === undefined ||
      submitWaterData.ph === null ||
      submitWaterData.ph === undefined ||
      submitWaterData.salt === null ||
      submitWaterData.salt === undefined ||
      submitWaterData.temperature === null ||
      submitWaterData.temperature === undefined
    ) {
      toast.error("All fields are required", {
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
      await pondMutation.mutateAsync(submitPondData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-pond-container">
      <ToastContainer />
      <div className="add-pond-modal">
        <div className="add-pond-header">
          <strong>Create A Pond</strong>
          <i className="bx bx-x" onClick={handleToggleAddPondModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmitForm}
          autoComplete="off"
          className="add-pond-detail"
        >
          <div className="pond">
            <div className="input-image">
              <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>

              {previewImage ? (
                <label htmlFor="img">
                  <img src={previewImage} alt="" />
                </label>
              ) : (
                <label htmlFor="img">
                  <i className="bx bx-image-add"></i>
                  <p>Choose An Image</p>
                </label>
              )}

              <input
                type="file"
                id="img"
                src=""
                alt=""
                onChange={(e) => resizeFile(e.target.files[0])}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Pond name"
                name="pondName"
                onChange={handleOnChangePond}
              />
              <input
                type="text"
                placeholder="Pump power (W)"
                name="pumpPower"
                onChange={handleInputFloatPond}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Size (m²)"
                name="size"
                onChange={handleInputFloatPond}
              />
              <input
                type="text"
                placeholder="Depth (m)"
                name="depth"
                onChange={handleInputFloatPond}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Volumn (L)"
                name="volume"
                onChange={handleInputFloatPond}
              />
              <input
                type="text"
                placeholder="Number of veins"
                name="vein"
                onChange={handleInputNumberPond}
              />
            </div>
          </div>
          <div className="water">
            <div className="header">
              <strong>Water quality</strong>
              <p>Input water infomation for the first time</p>
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="NO2 (ppm)"
                name="no2"
                onChange={handleInputFloatWater}
              />
              <input
                type="text"
                placeholder="NO3 (ppm)"
                name="no3"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="NH3/NH4 (ppm)"
                name="nh4"
                onChange={handleInputFloatWater}
              />
              <input
                type="text"
                placeholder="O2 (mg/L)"
                name="o2"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Salt (%)"
                name="salt"
                onChange={handleInputFloatWater}
              />
              <input
                type="text"
                placeholder="pH"
                name="ph"
                onChange={handleInputFloatWater}
              />
            </div>
            <input
              type="text"
              id="temp"
              placeholder="Temparature (℃  )"
              name="temperature"
              onChange={handleInputFloatWater}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleAddPondModal}>Cancel</button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
