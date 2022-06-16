import React from 'react'
import {BsSearch, BsCart3} from 'react-icons/bs'


const Header = () => {

  return (
    <div className='header-wrapper'>
      <div className='container'>
        <div className="row header-container">
          <div className='col-2'>
            <div>logo</div>
            
          </div>

          <div className='col-6'>
            <div className='header__search'>
              <input 
                type='text' 
                placeholder='Search...'
              />
              <button className='header__search__icon'>
                <BsSearch/>
              </button>
            </div>
          </div>

          <div className='col-2'>
            <BsCart3/>
          </div>
          
          <div className='col-2'>
            <div>sản phẩm đã xem</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header