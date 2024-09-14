import { useState } from "react";
// import styles
import "../../styles/components/modal/modal.css";
import FileResizer from "react-image-file-resizer";
// import slices
import { toggleAddPondModal } from "../../redux/slices/modal/modal";
// import dispatch
import { useDispatch } from "react-redux";
export const AddPond = () => {
  // state
  const [previewImage, setPreviewImage] = useState(null);
  // dispatch
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
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddPondModal());
  };
  return (
    <div className="add-pond-container">
      <div className="add-pond-modal">
        <div className="add-pond-header">
          <strong>Create A Pond</strong>
          <i className="bx bx-x" onClick={handleToggleAddPondModal}></i>
        </div>
        <form action="" autoComplete="off" className="add-pond-detail">
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
            <input type="text" placeholder="Pond name" />
            <input type="text" placeholder="Pump power (W)" />
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="Size (m)" />
            <input type="text" placeholder="Depth (m)" />
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="Volumn (L)" />
            <input type="text" placeholder="Number of veins" />
          </div>
        </form>
        <form action="" autoComplete="off" className="add-pond-water">
          <div className="header">
            <strong>Water quality</strong>
            <p>Input water infomation for the first time</p>
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="NO2 (mg/l)" />
            <input type="text" placeholder="NO3 (mg/l)" />
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="NH3/NH4 (mg/l)" />
            <input type="text" placeholder="O2 (mg/l)" />
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="Salt (%)" />
            <input type="text" placeholder="pH" />
          </div>
          <input type="text" id="temp" placeholder="Temparature (℃  )" />
          <div className="submit">
            <button onClick={handleToggleAddPondModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
