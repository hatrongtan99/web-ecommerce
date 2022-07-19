import {ReactNode} from 'react';

import SideBar from "./sidebar";

interface Test {
  children:  ReactNode
}

const LayoutAdmin = ({children}: Test) => {
  return (
    <main className='container-fluid'>
      <div className='row'>
        <SideBar/>
        <div className='col'>
          {children}
        </div>
      </div>
    </main>
  )
}

export default LayoutAdmin