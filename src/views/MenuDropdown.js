import React, {useState} from 'react'
import Menu from './Menu'

function MenuDropdown(props) {

  const {home} = props

  const [open,setOpen] = useState(false)

  return (
    <div className={`menu-dropdown ${`align-${props.align || 'left'}`}`}>
      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <img src="/img/icons/menu.svg" style={{width:"32px", height: "45px"}} alt="menu" />
      </div>
      <div className={`menu-content ${open ? 'is-open' : '' }`}>
        <div onClick={() => setOpen(false)}  className="site-menu bg-r">
          <Menu home={home}/>
        </div>
      </div>
    </div>
  );
}

export default MenuDropdown;
