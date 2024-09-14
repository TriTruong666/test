import { useState } from "react";
import FileResizer from "react-image-file-resizer";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleUpdatePondModal } from "../../redux/slices/modal/modal";
// import dispatch
import { useDispatch } from "react-redux";
export const UpdatePond = () => {
  // dispatch
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
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
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdatePondModal());
  };
  return (
    <div className="update-pond-container">
      <div className="update-pond-modal">
        <div className="update-pond-header">
          <strong>Update Pond</strong>
          <i className="bx bx-x" onClick={handleToggleUpdatePondModal}></i>
        </div>
        <form action="" autoComplete="off" className="update-pond-form">
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
          <div className="submit">
            <button onClick={handleToggleUpdatePondModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
