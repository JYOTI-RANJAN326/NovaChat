import Logo from "../common/Logo";

import FeatureCard from "./FeatureCard";

import {

RiRobot2Line,

RiShieldCheckLine,

RiTeamLine,

RiPhoneLine,

} from "react-icons/ri";

function LeftPanel() {

return(

<div

className="

hidden

xl:flex

flex-col

w-[42%]

"

>

<Logo/>

<h1

className="

mt-16

text-[64px]
xl:text-[70px]

leading-[1.05]

font-black

"

>

Where

<br/>

Conversations

<br/>

Meet

<span className="text-cyan-400">

{" "}Intelligence

</span>

</h1>

<p

className="

mt-12

text-2xl

leading-10

text-slate-400

max-w-md

"

>

Secure messaging.

AI Assistant.

Groups.

Voice & Video Calls.

Everything in one place.

</p>

<div

className="

mt-16

space-y-7

"

>

<FeatureCard

icon={<RiShieldCheckLine/>}

title="End-to-end Encrypted"

desc="Your privacy is our priority"

/>

<FeatureCard

icon={<RiRobot2Line/>}

title="AI Assistant"

desc="Smarter chats, instant answers"

/>

<FeatureCard

icon={<RiTeamLine/>}

title="Groups & Communities"

desc="Connect with everyone"

/>

<FeatureCard

icon={<RiPhoneLine/>}

title="Voice & Video Calls"

desc="Crystal clear communication"

/>

</div>

</div>

)

}

export default LeftPanel;