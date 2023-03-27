import './App.css'
import axios from 'axios'
import { useState, useEffect,useRef } from 'react'
import domtoimage from 'dom-to-image';



function App () {
  const [images, setImages] = useState([])
  const [input1, setInput1] = useState()
  const [input2, setInput2] = useState()
  const [number, setNumber] = useState(0)
  const baseUrl = 'https://api.imgflip.com/get_memes'
  const inputRef1=useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(baseUrl)
        if (!response.ok) throw new Error('failed')
        const data = await response.json()
        setImages(data.data.memes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchImages()
  }, [])
  // console.log(input);

  function handlerNext () {
    let aaa = number
    aaa = (aaa + 1)%100
    setNumber(aaa)
  }

  function handlerBack () {
    let bbb = number
    bbb = (bbb - 1)%100
    setNumber(bbb)
  }
// upload own image
  function handleChange(event) {

    setImages([{url:URL.createObjectURL(event.target.files[0])}])


    // setImages(i=>{
    //   const image = {
    //     url:URL.createObjectURL(event.target.files[0])
    //   }
    //   return [...i, image]
    // })
  }
function exportToPng(){
  domtoimage.toJpeg(document.getElementById('downloadedImage'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }
  console.log(images);

  function handleSubmit(e){
    e.preventDefault();
    e.target.reset();
    setInput1(e.target.value);
    setInput2(e.target.value);
    // setImages([{url:"https://i.imgflip.com/30b1gx.jpg"}])
    setNumber(0);
}
  return (
    <>
      <div className='App'>
        <div id="downloadedImage" ref={inputRef1}>
          <img className='image' src={images[number] && images[number].url} />
          <div className='input'>
            <p className='input1'>{input1}</p>
            <p className='input2'>{input2}</p>
          </div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <label>Type your words:</label>
          <input  type='text' onChange={e => setInput1(e.target.value)} />
          <br />
          <label>Type your words:</label>
          <input type='text' onChange={e => setInput2(e.target.value)} />
          <button onClick={() => exportToPng(inputRef1.current)}>create meme</button>
          <button>reset all</button>
        </form>
      </div>

      <div className='buttons'>
        <button type='button' onClick={handlerBack}>
          back
        </button>
        <button type='button' onClick={handlerNext}>
          next
        </button>
      </div>
      <div>
      <input type="file" onChange={handleChange}/>
        
        
      </div>
    </>
  )
}

export default App
