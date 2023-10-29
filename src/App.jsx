import { useEffect, useState } from 'react';
import TextMobileStepper from './components/StepContent'
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Box, Button, CircularProgress } from '@mui/material';
import hand from './assets/cars/giphy.webp';
import './App.css'

const DEFAULT_IMAGE = "https://storage.googleapis.com/kagglesdsdata/datasets/843852/3866417/data/training_images/vid_4_1000.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20231026%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231026T052751Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=47a62a4ce47cbc1e476b05e878e282a0ced4203a5562a2908e966d09abe79fcd586513174115ee7cd26fd3adc5b592bbab8f13b736cfeed4249f369b3a729283dc0320cdc47249fd0ee0f3cf334e7abfa32fdc0cb237770902a9633488b656ee1baa55a046548f1a392fb360258fd7adee9288f65adb944e4a3b2da2da700c807cabbe8f59d6ebca9d8bc808c93dbb02799451b02cdd1238b06e80fcd1f6fcf869646ac9730bb5dbdf0057621c0f255ee75f05ea022181a4941ff8a8681b459d47922c96918625f79444753d751222812b3cc75d51611238a5b3154aa0a5f639aba473f96cc181d01231091b1d32aead64a457df3b2ef3ae7e65682d03b309b8";
const IMAGE_ONE = "https://storage.googleapis.com/kagglesdsdata/datasets/843852/3866417/data/training_images/vid_4_10040.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20231026%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231026T052751Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=7824dac9e3ea8d6506d8bb91f872919f5bdbe37abb6b4a55337b07d7d52a897d7948b756cae8dc8ff604807dfbffbf1381fc16fc30f30405125e3119940505bfbab3cedd704451e7befa94db6807cf2035861d74a3130c2a0bab6eb4fe4975f23af10aa837d64b8ff7f9af3bf7aeea6b8f15a96d9e85ef86976ec97df7a8ba06bd78742ce26038bc9eefca99d963435bf57ad1bf06477b82f2395394f0e33e9384e906f150d1cf61dfde560756aca6f761e04851b88317f711618b241114d76519451e57032b1c0df10017b4a56c5d42cd28aad29982ff7b6b85c5a3d90a17cae29af8acd97f646c8d61d1744a77811e95602cea0c44ea8e1008c9fa0349208e";
const IMAGE_TWO = "https://storage.googleapis.com/kagglesdsdata/datasets/843852/3866417/data/training_images/vid_4_10500.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20231026%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231026T052751Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=3aa3473867095a2a05c730517a619a01a758c9de0600d34bb9224ba985d1ffd5fa4887b936c5050e07751e8f2cbea062707503d1b26e5dd3ebacaa6d17d07fc29c457616cd2bb7e623ace5dff5d74c2088c906ed2156e8f808e57e0c55b2fda8d3ef424eadf9a3deefae65b395231036bc48005013debfb16a97e3b1b57ff0a751a6264ddbc2f0424be5d5752f759e74526e541a105c06d673d58cb1b142a993628ac31677a6b2d985f29fc4496ae817d19c3636dd4cf703fd246ab44fb40c139bc923fd8a3e10025a917075dca02d11820458b2dca49a188eded2c32a105641352d53fcb8d362e0136cebdde99e6e8d1760b1fadf62262aadb48c5bf2644e0f";
const IMAGE_THREE = "https://storage.googleapis.com/kagglesdsdata/datasets/843852/3866417/data/training_images/vid_4_1040.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20231026%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231026T052751Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0ddbea5112e4581f3630c9b7ce8b5d076bf13692dd44bea536ce7af418f7ba0f18215ecf1a0c41d8cba21e5526befdfef5dc409ea1ccce3927e53414c0438ac3378c4acb6263c22a6bf0e9f79a39824fa0a856f78e2e677490f5adb5fa19861fc24231472b36538cdfd48f3aaf72a17c34663b7624508b05b7bc755fa4c3e182225e838782ec98d093ad466ffaab21230f3d08829c862e28e60d5614de95693d72c8b773758a020c14e560da401c1807483c7c72dfb45ca84be46ed39a24f0568889ecb3cc5edb1be93d05ce39e70941007bfaca0ba0db94c8ed6a70a10e32583034d11992dec1b6f80ff9f6cc976194edc4330f2b63af577432734709b3ed4b";
const IMAGE_OBJECTS_NUM = 1;

function App() {
  const { editor, onReady } = useFabricJSEditor();
  const [rectangleCount, setRectangleCount] = useState(0);
  const images = [IMAGE_ONE, IMAGE_TWO, IMAGE_THREE]
  const [imageIndex, setImageIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const _onReady = (canvas) => {
    fabric.Image.fromURL(DEFAULT_IMAGE, (img) => {
      canvas.set("backgroundImage", img);
      canvas.renderAll();
      onReady(canvas);
    });
  };

  useEffect(() => {
    if (!editor ) return;
    editor.setStrokeColor("red");
  } , [editor])

  function handleStart() {
    setStart(true);
    setImgLoaded(true);
    setTimeout(() => {
      setImgLoaded(false)
    }, 1000);
  }

  const onAddRectangle = () => {
    if (rectangleCount < IMAGE_OBJECTS_NUM && !imgLoaded)  {
      setRectangleCount(rectangleCount + 1);
      setClicked(true);
      editor.addRectangle();
    } 
  };
  const onDeleteAll = () => {
    setRectangleCount(0);
    editor.deleteAll();
  };

  const handleNextImage = () => {
    if (imageIndex === images.length + 1 || rectangleCount === 0) return;
    setImageIndex(imageIndex + 1);
    fabric.Image.fromURL(images[imageIndex] , (img) => {
      editor.canvas.set("backgroundImage", img);
      editor.canvas.renderAll();
    });
    let {top , left} = editor.canvas._activeObject || {};
    if (top && left) {
      console.log("top :"+ top,"left :"+ left);
    }
    onDeleteAll();
    if (imageIndex === images.length) {
      setEnd(true);
      onDeleteAll();
      console.log("call api");
      return false;
    }
    return true;
  }

  return (
    <>
      {!start && <div className="start-container" >
        <Button variant="contained" size='large' color="success" onClick={handleStart}>
          Start
        </Button>
      </div>}
      {end && "Thanks for your interest in our project."}
      {start && <>
        {imgLoaded && <Box sx={{ display: 'flex' , position: 'absolute' , zIndex: 500 }}>
          <CircularProgress />
        </Box>}
        <div className={`sample-container ${imgLoaded && "blur"} ${end && "display-none"}`} onClick={onAddRectangle} onDoubleClick={onDeleteAll}>
          {(!clicked && !imgLoaded) && <img className='hand' src={hand} />}
          <FabricJSCanvas className="sample-canvas" onReady={_onReady} /> 
        </div>
        {!end && <TextMobileStepper handleNextImage={handleNextImage} rectangleCount={rectangleCount} />}
      </>}
    </>
  )
}

export default App
