import { useState } from 'react'

import './App.css'
import {resumeDetails} from './assets/resumeDetails'
import Leftside from './components/Leftside'
import Rightside from './components/Rightside'




function App() {

  const [details, setDetails] = useState(resumeDetails);

  console.log(details)

  return (
    <>
      <Leftside userDetails ={details} setDetails={setDetails}/>
      <Rightside/>
    </>
  )
}

export default App
