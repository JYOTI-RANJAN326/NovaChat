import MessageBubble from "./MessageBubble";

const messages=[

{

id:1,

sender:"other",

message:"Hello 👋",

time:"10:30"

},

{

id:2,

sender:"me",

message:"Hi",

time:"10:31"

},

{

id:3,

sender:"other",

message:"How are you?",

time:"10:32"

},

{

id:4,

sender:"me",

message:"I'm doing great!",

time:"10:33"

}

];

function Messages(){

return(

<div

className="

flex-1

overflow-y-auto

p-8

space-y-4

"

>

{

messages.map(msg=>(

<MessageBubble

key={msg.id}

{...msg}

/>

))

}

</div>

)

}

export default Messages;