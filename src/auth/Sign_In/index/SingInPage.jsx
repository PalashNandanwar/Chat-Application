// import React from 'react'

import { SignIn } from "@clerk/clerk-react"

const SingInPage = () => {
  return (
    <div className=" w-full h-full flex justify-center items-center py-20">
      <SignIn />
    </div>
  )
}

export default SingInPage