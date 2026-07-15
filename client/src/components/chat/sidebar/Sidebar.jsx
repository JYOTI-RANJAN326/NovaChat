import {

RiChat3Line,

RiGroupLine,

RiPhoneLine,

RiRobot2Line,

RiBookmarkLine,

RiSettings3Line,

RiUser3Line,

} from "react-icons/ri";

import SidebarItem from "./SidebarItem";

import Logo from "../../common/Logo";

function Sidebar() {

return(

<div

className="

flex

h-full

w-full

flex-col

items-center

justify-between

py-8

"

>

<div

className="

flex

flex-col

items-center

gap-6

"

>

<Logo/>

<SidebarItem

icon={<RiChat3Line/>}

active

/>

<SidebarItem

icon={<RiGroupLine/>}

/>

<SidebarItem

icon={<RiPhoneLine/>}

/>

<SidebarItem

icon={<RiRobot2Line/>}

/>

<SidebarItem

icon={<RiBookmarkLine/>}

/>

</div>

<div

className="

flex

flex-col

gap-6

"

>

<SidebarItem

icon={<RiSettings3Line/>}

/>

<SidebarItem

icon={<RiUser3Line/>}

/>

</div>

</div>

)

}

export default Sidebar;