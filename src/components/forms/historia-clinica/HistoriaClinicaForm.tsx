import React from 'react'

import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'

function HistoriaClinicaForm() {
   return (
      <div
         className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: 'rgba(0, 0, 0, 0.471)' }}
      >
         <DotPulse
            size={40}
            speed={0.8}
            color="#34d399"
         />
      </div>
   )
}

export default HistoriaClinicaForm