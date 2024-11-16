import { assets } from "../assets/assets"

const listUser = [
  {
    "name": "Nancy Considine II",
    "msg": "quantify digital matrix",
    "id": "1"
  },
  {
    "name": "Willie Ebert",
    "msg": "connect multi-byte interface",
    "id": "2"
  },
  {
    "name": "Mike Runolfsson",
    "msg": "synthesize mobile circuit",
    "id": "3"
  },
  {
    "name": "Eduardo Schroeder Jr.",
    "msg": "compress redundant protocol",
    "id": "4"
  },
  {
    "name": "Eula Legros",
    "msg": "program multi-byte monitor",
    "id": "5"
  },
  {
    "name": "Howard Stamm",
    "msg": "bypass bluetooth sensor",
    "id": "6"
  },
  {
    "name": "Luis Kunze",
    "msg": "back up cross-platform alarm",
    "id": "7"
  },
  {
    "name": "Felipe Howe",
    "msg": "copy online interface",
    "id": "8"
  },
  {
    "name": "Arlene Beatty",
    "msg": "compress 1080p capacitor",
    "id": "9"
  },
  {
    "name": "Alyssa Goyette",
    "msg": "hack optical capacitor",
    "id": "10"
  },
  {
    "name": "Dewey Hauck Jr.",
    "msg": "copy solid state port",
    "id": "11"
  },
  {
    "name": "Annie Littel V",
    "msg": "bypass solid state bus",
    "id": "12"
  },
  {
    "name": "Lucas Lehner",
    "msg": "override cross-platform system",
    "id": "13"
  },
  {
    "name": "Megan O'Hara",
    "msg": "calculate neural feed",
    "id": "14"
  },
  {
    "name": "Arthur Kuphal",
    "msg": "back up haptic monitor",
    "id": "15"
  },
  {
    "name": "Jessie Cronin",
    "msg": "navigate optical pixel",
    "id": "16"
  },
  {
    "name": "Jo Marvin",
    "msg": "synthesize auxiliary interface",
    "id": "17"
  },
  {
    "name": "Conrad Stamm",
    "msg": "copy optical bandwidth",
    "id": "18"
  },
  {
    "name": "Viola Schamberger",
    "msg": "back up cross-platform alarm",
    "id": "19"
  },
  {
    "name": "Bill Sawayn",
    "msg": "input wireless microchip",
    "id": "20"
  },
  {
    "name": "Van Dickens",
    "msg": "reboot redundant pixel",
    "id": "21"
  },
  {
    "name": "Zachary Balistreri",
    "msg": "quantify digital hard drive",
    "id": "22"
  },
  {
    "name": "April Christiansen",
    "msg": "input virtual driver",
    "id": "23"
  },
  {
    "name": "Terence Mueller",
    "msg": "transmit solid state port",
    "id": "24"
  }
]


const Chat = () => {
  return (
    <div className="flex">
      <div className="w-[30%] border-r-2">
        <h2 className="font-medium text-3xl text-gray-800 mb-8">Chat Admin</h2>
        <div className="flex flex-col gap-2 h-screen overflow-y-scroll hidden_scroll ">
          {listUser.map((item) => (
            <div key={item.id} >
              <div className="flex gap-3 w-full py-3 mb-2">
                <img
                  src={assets.avatar_woman}
                  alt="avatar"
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-medium text-black text-lg">{item.name}</p>
                  <p className="text-sm">{item.msg}</p>
                </div>
              </div>
              <hr  className=" w-[90%] m-auto border-gray-300"/>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-purple-300 h-screen w-[70%]">
      </div>
    </div>
  );
}

export default Chat