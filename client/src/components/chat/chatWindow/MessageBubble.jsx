function MessageBubble({

message,

sender,

time,

}){

const mine=sender==="me";

return(

<div

className={`

flex

${mine?

"justify-end"

:

"justify-start"

}

`}

>

<div

className={`

max-w-[70%]

rounded-3xl

px-5

py-3

${mine?

"bg-cyan-500"

:

"bg-[#18233F]"

}

`}

>

<p>

{message}

</p>

<p

className="

mt-2

text-right

text-xs

opacity-70

"

>

{time}

</p>

</div>

</div>

)

}

export default MessageBubble;