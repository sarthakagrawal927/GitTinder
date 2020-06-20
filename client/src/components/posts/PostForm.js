import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import axios from "axios";
import $ from "jquery";
const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const [category, setCategory] = useState("");

  const [selectedFiles, setSelectedFiles] = useState("");

  const [imageURL, setURL] = useState([]);

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
              console.log("react fileNames", fileName.locationArray);
              setURL(fileName.locationArray);
              console.log(fileName.locationArray);
              ocShowAlert("File Uploaded", "#3089cf");
            }
          }
        })
        .catch((error) => {
          ocShowAlert(error, "red");
        });
    } else {
      ocShowAlert("Please upload file", "red");
    }
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Share your ideas here</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, imageURL, category });
          setText("");
          setCategory("");
          setURL([]);
        }}>
        <div className='form-group'>
          <select
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value='Web Development'>Development</option>
            <option value='Data Science'>Data Science</option>
            <option value='Coding Contest'>Coding Contest</option>
            <option value='Mobile Software Development'>Cyber Security</option>
            <option value='Internet Of Things'>Internet Of Things</option>
            <option value='Designing'>Designing</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <br />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Share an idea !'
          value={text}
          onChange={(e) => setText(e.target.value)}
          wrap='soft'
        />
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
        <textarea
          name='imageURL'
          cols='30'
          rows='3'
          placeholder='Image URL(s) here [You can add your image links too, its recommended as uploading would take time, backend sucks]'
          value={imageURL}
          onChange={(e) => setURL(e.target.value)}
          wrap='soft'
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
