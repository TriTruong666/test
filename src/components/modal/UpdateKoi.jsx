import React, { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import ReactFlagsSelect from "react-flags-select";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleUpdateKoiModal } from "../../redux/slices/modal/modal";

export const UpdateKoi = () => {
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState("");
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
      },
      "base64",
      250,
      250
    );
  };
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
  };
  const handleToggleUpdateKoiModal = () => {
    dispatch(toggleUpdateKoiModal());
  };
  //   useEffect(() => {
  //     console.log("Selected country code:", selectedFlag);
  //   }, [selectedFlag]);
  return (
    <div className="update-koi-container">
      <div className="update-koi-modal">
        <div className="update-koi-header">
          <strong>Update A Koi</strong>
          <i className="bx bx-x" onClick={handleToggleUpdateKoiModal}></i>
        </div>
        <form action="" className="update-koi-form">
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
          <input type="text" id="koiname" placeholder="Koi name" />
          <div className="input-two-fields">
            <input type="text" placeholder="Size (cm)" />
            <input type="text" placeholder="Weight (kg)" />
          </div>
          <div className="select-two-fields">
            <div className="select">
              <select name="" id="">
                <option value="">Type</option>
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
              <i className="bx bxs-chevron-down"></i>
            </div>
            <div className="select">
              <select name="" id="">
                <option value="">Gender</option>
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
              <i className="bx bxs-chevron-down"></i>
            </div>
          </div>
          <ReactFlagsSelect
            selected={selectedFlag}
            onSelect={(code) => setSelectedFlag(code)}
            placeholder="Select origin"
            className="menu-flags"
          />
          <div className="submit">
            <button onClick={handleToggleUpdateKoiModal}>Cancel</button>
            <button>Update confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
