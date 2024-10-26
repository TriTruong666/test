import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactFlagsSelect from "react-flags-select";
import FileResizer from "react-image-file-resizer";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleAddKoiModal } from "../../redux/slices/modal/modal";
// import service
import * as KoiService from "../../service/koi/koiService";
export const AddKoi = () => {
  const maxKoiAge = 40;
  const countryNameMap = {
    JP: "Japan",
    CN: "China",
    ID: "Indonesia",
    TH: "Thailand",
    VN: "Vietnam",
    KR: "South Korea",
  };
  // param
  const { pondId } = useParams();

  // state
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [submitData, setSubmitData] = useState({
    name: "",
    image: "",
    sex: "",
    type: "",
    origin: "",
    createDate: "",
    pondId: pondId,
  });
  //   dispatch
  const dispatch = useDispatch();
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
        setSubmitData({
          ...submitData,
          image: uri,
        });
      },
      "base64",
      250,
      250
    );
  };
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: KoiService.createKoiService,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: (responseData) => {
      if (responseData && responseData.code === "200") {
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
          location.reload();
          setIsPreventSubmit(false);
        }, 1500);
      }
      queryCilent.invalidateQueries({
        queryKey: ["kois"],
      });
    },
  });
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };
  const handleToggleAddKoiModal = () => {
    dispatch(toggleAddKoiModal());
  };
  const handleOnSelectFlag = (code) => {
    setSelectedFlag(code);
    setSubmitData((prevData) => ({
      ...prevData,
      origin: countryNameMap[code],
    }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };

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
    const updatedCreateDate = submitData.createDate
      ? submitData.createDate
      : new Date().toISOString().split("T")[0];

    const updatedSubmitData = {
      ...submitData,
      createDate: updatedCreateDate,
    };
    if (
      !updatedSubmitData.image ||
      !updatedSubmitData.name ||
      !updatedSubmitData.origin ||
      !updatedSubmitData.pondId ||
      !updatedSubmitData.sex ||
      !updatedSubmitData.type ||
      !updatedSubmitData.createDate
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
      await mutation.mutateAsync(updatedSubmitData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(submitData);
  }, [submitData]);
  return (
    <div className="add-koi-container">
      <ToastContainer />
      <div className="add-koi-modal">
        <div className="add-koi-header">
          <strong>Add A Koi</strong>
          <i className="bx bx-x" onClick={handleToggleAddKoiModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="add-koi-form">
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

          <div className="input-item">
            <label htmlFor="koiname">Koi name</label>
            <input
              type="text"
              id="koiname"
              placeholder="Koi name"
              onChange={handleOnChange}
              name="name"
            />
          </div>

          <div className="select-two-fields">
            <div className="select">
              <label htmlFor="koi-type">Select Type</label>
              <select name="type" onChange={handleOnChange} id="koi-type">
                <option value="">Select Type</option>
                <option value="Kohaku">Kohaku</option>
                <option value="Sanke">Sanke</option>
                <option value="Showa">Showa</option>
                <option value="Tancho">Tancho</option>
                <option value="Asagi">Asagi</option>
                <option value="Shusui">Shusui</option>
                <option value="Utsurimono">Utsurimono</option>
                <option value="Bekko">Bekko</option>
                <option value="Goshiki">Goshiki</option>
                <option value="Koromo">Koromo</option>
              </select>
            </div>

            <div className="select">
              <label htmlFor="koi-sex">Select Gender</label>
              <select name="sex" onChange={handleOnChange} id="koi-sex">
                <option value="">Select Gender</option>
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="origin">Origin</label>
            <ReactFlagsSelect
              selected={selectedFlag}
              onSelect={handleOnSelectFlag}
              countries={["JP", "CN", "ID", "TH", "VN", "KR"]}
              placeholder="Select origin"
              className="menu-flags"
            />
          </div>

          <div className="input-item">
            <label htmlFor="startDate">First date in pond</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                const currentDate = new Date();
                const koiAge = currentDate.getFullYear() - date.getFullYear();

                if (koiAge <= maxKoiAge) {
                  setStartDate(date);
                  setSubmitData({
                    ...submitData,
                    createDate: date.toISOString().split("T")[0],
                  });
                } else {
                  setSubmitData({
                    ...submitData,
                    createDate: "",
                  });
                  toast.error(
                    `Koi age exceeds the maximum allowed age of ${maxKoiAge} years`,
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "dark",
                    }
                  );
                }
              }}
              maxDate={new Date()}
              endDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="custom-datepicker"
              calendarClassName="custom-calendar"
            />
          </div>

          <div className="submit">
            <button type="button" onClick={handleToggleAddKoiModal}>
              Cancel
            </button>
            <button type="submit">Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
