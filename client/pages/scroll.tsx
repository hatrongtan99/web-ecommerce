import React from 'react'

const Scroll: React.FC = () => {

    React.useEffect(() => {
        // let scrollBefore = 0
        // window.addEventListener('scroll', (e) => {
        //     const scrolled = window.scrollY
    
        //     if (scrollBefore > scrolled) {
        //         console.log('scroll Up');
        //         scrollBefore = scrolled
        //     } else {
        //         scrollBefore = scrolled
        //         console.log('scroll Down')
        //     }
        // })

        window.onwheel = e => {
            if(e.deltaY >= 0){
              // Scrolling Down with mouse
              console.log('Scroll Down');
            } else {
              // Scrolling Up with mouse
              console.log('Scroll Up');
            }
          }

    }, [])

  return (
    <div style={{height: '10000px'}}>Scroll</div>
  )
}

export default Scroll