import React, { useContext, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { LoginContext } from '../../Contexts/LoginContext';
import img from '../../Static/Images/UserImages/user.png'
import '../../Static/Styles/UserStyles/ChangeProfileImage.css'
import { imageValidaterHelper } from '../../Utils/ValidationHelpers';
import { uploadProfilePicture } from '../../Services/UserService';
import { toast } from 'react-toastify';

export default function ChangeProfileImage() {

  const loginContext = useContext(LoginContext);
  const userImg = loginContext?.loggedInUser?.profileImage;

  const inputImageRef = useRef(null);
  const image = userImg;
  const [renderImage, setRenderImage] = useState(null);


  const [imageErr, setImageErr] = useState({ isValid: null });



  const handleImageClick = () => {
    inputImageRef.current.click();
  }


  const handlerImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    console.log(file);

    const err = imageValidaterHelper(file);
    setImageErr(err);
    setRenderImage(event.target.files[0]);

  }


  const uploadImageHandler = () => {
    console.log(image);
    const err = imageValidaterHelper(renderImage);
    setImageErr(err);
    console.log(loginContext.loggedInUser);
    uploadProfilePicture(renderImage, loginContext.loggedInUser.userId).then(res => {
      console.log(res);
      loginContext.addImage();
      toast.success("Image is uploaded successfully")
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Container style={{ marginTop: '10vh' }}>
      <Row>
        <Col className='text-center'
          md={{
            offset: 3,
            size: 6
          }}
          sm="12">
          <div class="image-container" onClick={handleImageClick}>
            {renderImage ? (<img src={URL.createObjectURL(renderImage)} className='preview-image' alt='' />) : (image ? (<img src={image} className='preview-image' alt='' />) : (<img src={img} className='preview-image' alt='' />))}
            <div class="change-image-overlay">
              <span class="change-image-text">Change Image</span>
              <input type='file' ref={inputImageRef} onChange={handlerImageChange} style={{ display: 'none' }} />
            </div>
          </div>
          <div className='img-upload-btn-div'>
            <Button color='success' className='img-upload-btn' disabled={imageErr.isValid === false || imageErr.isValid === null} onClick={uploadImageHandler}>Upload</Button>
          </div>

        </Col>
      </Row>
    </Container>
  )
}
