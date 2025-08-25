import { useState } from 'react'

import './App.css'
import {resumeDetails} from './assets/resumeDetails'
import Leftside from './components/Leftside'
import Rightside from './components/Rightside'




function App() {

  const [details, setDetails] = useState(resumeDetails);

  return (
    <>
      <Leftside userDetails ={details} setDetails={setDetails}/>
      <Rightside userDetails ={details} />
    </>
  )
}

export default App
