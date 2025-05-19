import React from 'react'
import { DotPulse } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import 'ldrs/react/Ripples.css'
import 'ldrs/react/DotPulse.css'
import 'ldrs/react/Ring2.css'

function HistoriaClinicaForm() {
   return (
      <div
         className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: 'rgba(0, 0, 0, 0.471)' }}
      >
         <DotPulse
            size={40}
            // stroke={5}
            // strokeLength={0.25}
            // bgOpacity={0.1}
            speed={0.8}
            color="#34d399"
         />
      </div>
   )
}

export default HistoriaClinicaForm