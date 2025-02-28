import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Section from './components/section'
import Footer from './components/footer'
import Feature from './components/Feature'
import PopUp from "./Popup/PopUp"

function App() {

  return (
    <>
    <Navbar />
    <Section />
    <Feature />
    <Footer />
    </>
  )
}

export default App;
