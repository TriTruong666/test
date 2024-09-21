import React, { useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Heading,
  Link,
  List,
  BlockQuote,
  Alignment,
  Image,
  ImageToolbar,
  ImageStyle,
  ImageResize,
  Table,
  TableToolbar,
  Font,
} from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleAddBlogModal } from "../../redux/slices/modal/modal";
export const AddBlog = () => {
  // dispatch
  const dispatch = useDispatch();
  // state
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
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddBlogModal());
  };
  return (
    <div className="add-blog-container">
      <div className="add-blog-modal">
        <div className="add-blog-header">
          <strong>Add Blog</strong>
          <i className="bx bx-x" onClick={handleToggleAddPondModal}></i>
        </div>
        <form action="" className="add-blog-form">
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
          <input type="text" name="blog-title" placeholder="Enter blog title" />
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [
                Essentials,
                Bold,
                Italic,
                Paragraph,
                Heading,
                Link,
                List,
                BlockQuote,
                Alignment,
                Image,
                ImageToolbar,
                ImageStyle,
                ImageResize,
                Table,
                TableToolbar,
                Font,
              ],
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "blockQuote",
                "alignment",
                "fontSize",
                "|",
                "imageUpload",
                "insertTable",
                "|",
                "undo",
                "redo",
              ],
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "imageStyle:full",
                  "imageStyle:side",
                ],
                styles: ["full", "side"],
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            }}
            data=""
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          />
          <div className="submit">
            <button onClick={handleToggleAddPondModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
