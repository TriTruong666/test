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
  const handleInputNumberWater = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitWaterData({
        ...submitWaterData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitWaterData({
      ...submitWaterData,
      [name]: parseInt(value),
    });
    setInvalidNumber(null);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !submitPondData.depth ||
      !submitPondData.image ||
      !submitPondData.pondName ||
      !submitPondData.pumpPower ||
      !submitPondData.size ||
      !submitPondData.vein ||
      !submitPondData.volume ||
      !submitWaterData.nh4 ||
      !submitWaterData.no2 ||
      !submitWaterData.no3 ||
      !submitWaterData.o2 ||
      !submitWaterData.ph ||
      !submitWaterData.salt ||
      !submitWaterData.temperature
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
  useEffect(() => {
    if (submitWaterData.pondId) {
      waterMutation.mutateAsync(submitWaterData).catch((error) => {
        console.error(error);
      });
    }
  }, [submitWaterData.pondId]);
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
                onChange={handleInputNumberPond}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Size (m)"
                name="size"
                onChange={handleInputNumberPond}
              />
              <input
                type="text"
                placeholder="Depth (m)"
                name="depth"
                onChange={handleInputNumberPond}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Volumn (L)"
                name="volume"
                onChange={handleInputNumberPond}
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
                placeholder="NO2 (mg/l)"
                name="no2"
                onChange={handleInputNumberWater}
              />
              <input
                type="text"
                placeholder="NO3 (mg/l)"
                name="no3"
                onChange={handleInputNumberWater}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="NH3/NH4 (mg/l)"
                name="nh4"
                onChange={handleInputNumberWater}
              />
              <input
                type="text"
                placeholder="O2 (mg/l)"
                name="o2"
                onChange={handleInputNumberWater}
              />
            </div>
            <div className="input-two-fields">
              <input
                type="text"
                placeholder="Salt (%)"
                name="salt"
                onChange={handleInputNumberWater}
              />
              <input
                type="text"
                placeholder="pH"
                name="ph"
                onChange={handleInputNumberWater}
              />
            </div>
            <input
              type="text"
              id="temp"
              placeholder="Temparature (℃  )"
              name="temperature"
              onChange={handleInputNumberWater}
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
