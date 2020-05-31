import React, { useState } from "react";
import axios from "axios";
import $ from "jquery";

function PostImagesHook(props) {
  const [selectedFiles, setSelectedFiles] = useState("");

  const multipleFileChangedHandler = (event) => {
    setSelectedFiles(event.target.files);
  };

  const ocShowAlert = (message, background = "#3089cf") => {
    let alertContainer = document.querySelector("#oc-alert-container"),
      alertEl = document.createElement("div"),
      textNode = document.createTextNode(message);
    alertEl.setAttribute("class", "oc-alert-pop-up");
    $(alertEl).css("background", background);
    alertEl.appendChild(textNode);
    alertContainer.appendChild(alertEl);
    setTimeout(function () {
      $(alertEl).fadeOut("slow");
      $(alertEl).remove();
    }, 3000);
  };
  const multipleFileUploadHandler = (event) => {
    const data = new FormData();
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append("galleryImage", selectedFiles[i], selectedFiles[i].name);
      }
      axios
        .post("/api/posts/upload/multiple_image_upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          console.log("res", response);
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                ocShowAlert("Max size: 2MB", "red");
              } else if ("LIMIT_UNEXPECTED_FILE" === response.data.error.code) {
                ocShowAlert("Max 4 images allowed", "red");
              } else {
                // If not the given ile type
                ocShowAlert(response.data.error, "red");
              }
            } else {
              // Success
              let fileName = response.data;
              console.log("fileName", fileName);
              ocShowAlert("File Uploaded", "#3089cf");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          // If another error
          //ocShowAlert(error, "red");
        });
    } else {
      ocShowAlert("Please upload file", "red");
    }
  };
  return (
    <div id='oc-alert-container'>
      <input type='file' multiple onChange={multipleFileChangedHandler} />
      {selectedFiles && (
        <button
          type='button'
          className='btn btn-info'
          onClick={multipleFileUploadHandler}>
          Upload!
        </button>
      )}
    </div>
  );
}

export default PostImagesHook;
