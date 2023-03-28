import './App.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import domtoimage from 'dom-to-image'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

function App () {
  const [images, setImages] = useState([])
  const [input1, setInput1] = useState()
  const [input2, setInput2] = useState()
  const [number, setNumber] = useState(0)
  const baseUrl = 'https://api.imgflip.com/get_memes'
  const inputRef1 = useRef(null)

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
    aaa = (aaa + 1) % 100
    setNumber(aaa)
  }

  function handlerBack () {
    let bbb = number
    bbb = (bbb - 1) % 100
    setNumber(bbb)
  }
  // upload own image
  function handleChange (event) {
    setImages([{ url: URL.createObjectURL(event.target.files[0]) }])

    // setImages(i=>{
    //   const image = {
    //     url:URL.createObjectURL(event.target.files[0])
    //   }
    //   return [...i, image]
    // })
  }
  function exportToPng () {
    domtoimage
      .toJpeg(document.getElementById('downloadedImage'), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a')
        link.download = 'my-image-name.jpeg'
        link.href = dataUrl
        link.click()
      })
  }
  console.log(images)

  function handleSubmit (e) {
    e.preventDefault()
    e.target.reset()
    setInput1(e.target.value)
    setInput2(e.target.value)
    // setImages([{url:"https://i.imgflip.com/30b1gx.jpg"}])
    setNumber(0)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  return (
    <>
      <h1>Meme Generator</h1>
      <Grid
        container
        rowSpacing={2}
        sx={{
          border: 'solid',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1'
        }}
      >
        <Grid item xs={12} md={6} className='container'>
          <div id='downloadedImage' ref={inputRef1}>
            <img className='image' src={images[number] && images[number].url} />
            <Grid item xs={12} className='input'>
              <p className='input1'>{input1}</p>
              <p className='input2'>{input2}</p>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6} className='form' onSubmit={handleSubmit}>
          <h3>{images[number] && images[number].name}</h3>
          <div className='buttons'>
            <Button type='button' onClick={handlerBack}>
              back
            </Button>
            <Button type='button' onClick={handlerNext}>
              next
            </Button>
          </div>
          <label />
          Type your words:
          <input
            className='inputField'
            type='text'
            onChange={e => setInput1(e.target.value)}
          />
          <br />
          <label>Type your words:</label>
          <input
            className='inputField'
            type='text'
            onChange={e => setInput2(e.target.value)}
          />
          <br />
          <Button
            my={5}
            variant='outlined'
            onClick={() => exportToPng(inputRef1.current)}
          >
            create meme
          </Button>
          <br />
          <Button m={5} variant='outlined'>
            reset all
          </Button>
          <div className='upload'>
            <h3>you can upload your own image here!</h3>
            <input type='file' onChange={handleChange} />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default App
