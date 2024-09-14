import React, { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import ReactFlagsSelect from "react-flags-select";
// import styles
import "../../styles/components/modal/modal.css";
export const AddKoi = () => {
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState("");
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
  //   useEffect(() => {
  //     console.log("Selected country code:", selectedFlag);
  //   }, [selectedFlag]);
  return (
    <div className="add-koi-container">
      <div className="add-koi-modal">
        <div className="add-koi-header">
          <strong>Add A Koi</strong>
          <i className="bx bx-x"></i>
        </div>
        <form action="" className="add-koi-form">
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
            <input type="text" placeholder="Koi name" />
            <select name="" id="">
              <option value="">Male</option>
              <option value="">Female</option>
            </select>
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="Size (cm)" />
            <input type="text" placeholder="Weight (kg)" />
          </div>
          <div className="input-two-fields">
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
            <ReactFlagsSelect
              selected={selectedFlag}
              onSelect={(code) => setSelectedFlag(code)}
              className="menu-flags"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
