import {ReactNode} from 'react';

import SideBar from "./sidebar";

interface Test {
  children:  ReactNode
}

const LayoutAdmin = ({children}: Test) => {
  return (
    <main className='container-fluid'>
      <SideBar/>
      {children}
    </main>
  )
}

export default LayoutAdmin