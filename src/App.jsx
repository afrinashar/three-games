import { useState } from 'react'
 
import './App.css'
import { Clock } from './components/Clock'
import { Tictac } from './games/Tictac'
import { Grossary } from './games/Grossary'
import SpinningCube from'./games/Cube'
function App() {
  
  return (
    <>
    <Grossary/>
     <Clock />
     <Tictac/>
  
     <div style={{ height: '100vh' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SpinningCube />
      </Canvas>
    </div>
  </>
  )
}

export default App
