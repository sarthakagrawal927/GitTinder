import React, { useState } from "react";
import axios from "axios";
import $ from "jquery";

function DisplayPicture(props) {
  const [selectedFile, setSelectedFile] = useState("");

  const singleFileChangedHandler = (event) => {
    setSelectedFile({
      selectedFile: event.target.files[0],
    });
  };
  const singleFileUploadHandler = (event) => {
    const data = new FormData();
    // If file selected
    if (selectedFile) {
      data.append("profileImage", selectedFile, selectedFile.name);
      axios
        .post("/api/profile/upload/profile-img-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                ocShowAlert("Max size: 2MB", "red");
              } else {
                console.log(response.data);
                // If not the given file type
                ocShowAlert(response.data.error, "red");
              }
            } else {
              // Success
              let fileName = response.data;
              console.log("filedata", fileName);
              ocShowAlert("File Uploaded", "#3089cf");
            }
          }
        })
        .catch((error) => {
          // If another error
          ocShowAlert(error, "red");
        });
    } else {
      // if file not selected throw error
      ocShowAlert("Please upload file", "red");
    }
  };

  // ShowAlert Function
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

  return (
    <div id='oc-alert-container'>
      <p>Please upload an image for your profile</p>
      <input type='file' onChange={singleFileChangedHandler} />
      {selectedFile && (
        <button className='btn btn-info' onClick={singleFileUploadHandler}>
          Upload!
        </button>
      )}
    </div>
  );
}

export default DisplayPicture;
