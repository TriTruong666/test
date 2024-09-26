import React, { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
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
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slice
import { toggleAddProductModal } from "../../redux/slices/modal/modal";
// import service
import * as ProductService from "../../service/product/productService";

export const AddProduct = () => {
  // dispatch
  const dispatch = useDispatch();
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [submitData, setSubmitData] = useState({
    name: "",
    image: "",
    stock: "",
    unitprice: "",
    description: "",
    categoryId: "",
    status: true,
  });
  const [invalidNumber, setInvalidNumber] = useState(null);
  //   file resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      200,
      200,
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
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: ProductService.createProductService,
    onSuccess: (responseData) => {
      if (responseData && responseData.code === "STOCK_INVALID") {
        toast.error("Stock must at least 0", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (responseData && responseData.error === "Bad Request") {
        toast.error("Something was wrong !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
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
          dispatch(toggleAddProductModal());
          location.reload();
        }, 1500);
      }
      queryCilent.invalidateQueries({
        queryKey: ["products"],
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
  const handleToggleAddProductModal = () => {
    dispatch(toggleAddProductModal());
  };
  const handleInputNumber = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseInt(value),
    });
    setInvalidNumber(null);
  };
  const handleInputFloat = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
    setInvalidNumber(null);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // empty validation
    if (
      !submitData.name ||
      !submitData.categoryId ||
      !submitData.image ||
      !submitData.stock ||
      !submitData.unitprice ||
      !submitData.description ||
      !submitData.status
    ) {
      // setRequiredField("All fields are required");
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
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-product-container">
      <ToastContainer />
      <div className="add-product-modal">
        <div className="add-product-header">
          <strong>Create A Product</strong>
          <i className="bx bx-x" onClick={handleToggleAddProductModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmitForm}
          autoComplete="off"
          className="add-product-detail"
        >
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
          <input
            className="name"
            type="text"
            onChange={handleOnChange}
            name="name"
            placeholder="Product name"
          />
          <div className="input-two-fields">
            <input
              type="text"
              name="unitprice"
              placeholder="Price"
              onChange={handleInputFloat}
            />
            <input
              type="text"
              name="stock"
              placeholder="Stock"
              onChange={handleInputNumber}
            />
          </div>
          {invalidNumber && <p className="invalid">{invalidNumber}</p>}
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
            onChange={(event, editor) => {
              const data = editor.getData();
              setSubmitData({
                ...submitData,
                description: data,
              });
            }}
          />
          <select
            className="cate"
            onChange={handleInputNumber}
            name="categoryId"
            id=""
          >
            <option value="">Category</option>
            <option value="1">Koi Health Treatment</option>
            <option value="2">Water Parameter Improvement</option>
          </select>
          <div className="submit">
            <span onClick={handleToggleAddProductModal}>Cancel</span>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
