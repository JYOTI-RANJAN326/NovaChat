import {

RiEmotionHappyLine,

RiAttachment2,

RiSendPlaneFill,

RiMicLine,

} from "react-icons/ri";

function MessageInput(){

return(

<div

className="

border-t

border-[#1B2748]

p-5

"

>

<div

className="

flex

items-center

gap-4

rounded-2xl

bg-[#10182F]

px-5

py-4

"

>

<button>

<RiEmotionHappyLine size={24}/>

</button>

<button>

<RiAttachment2 size={24}/>

</button>

<input

placeholder="Type your message..."

className="

flex-1

bg-transparent

outline-none

"

/>

<button>

<RiMicLine size={24}/>

</button>

<button

className="

h-12

w-12

rounded-full

bg-cyan-500

flex

items-center

justify-center

"

>

<RiSendPlaneFill/>

</button>

</div>

</div>

)

}

export default MessageInput;