
function FeatureCard({

icon,

title,

desc,

}){

return(

<div

className="

flex

items-center

gap-4

"

>

<div

className="

flex

h-14

w-14

items-center

justify-center

rounded-2xl

border

border-cyan-500/30

bg-cyan-500/5

text-cyan-400

text-xl

"

>

{icon}

</div>

<div>

<h3

className="

text-xl

font-semibold

"

>

{title}

</h3>

<p

className="

text-slate-400

text-base

"

>

{desc}

</p>

</div>

</div>

)

}

export default FeatureCard;