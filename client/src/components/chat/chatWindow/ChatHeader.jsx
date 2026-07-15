import {
    RiPhoneLine,
    RiVideoLine,
    RiMore2Fill,
} from "react-icons/ri";

function ChatHeader() {

    return (

        <div
            className="
            h-20
            border-b
            border-[#1B2748]
            flex
            items-center
            justify-between
            px-8
            "
        >

            <div className="flex items-center gap-4">

                <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt=""
                    className="w-14 h-14 rounded-full"
                />

                <div>

                    <h2 className="font-semibold text-lg">

                        Ashish

                    </h2>

                    <p className="text-green-400 text-sm">

                        Online

                    </p>

                </div>

            </div>

            <div className="flex gap-5">

                <button>

                    <RiPhoneLine size={22}/>

                </button>

                <button>

                    <RiVideoLine size={22}/>

                </button>

                <button>

                    <RiMore2Fill size={22}/>

                </button>

            </div>

        </div>

    )

}

export default ChatHeader;