"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from 'next/image'
import { Database } from "@/types/supabasetype"
import { useEffect, useState, Dispatch, SetStateAction } from "react"

interface Props {
  profiles: Database["public"]["Tables"]["profiles"]["Row"][]
  setProfiles: Dispatch<SetStateAction<Database["public"]["Tables"]["profiles"]["Row"][]>>,
  handleClick: Function
}

export default function SideBar(
  props: Props
) {
  const { profiles, setProfiles, handleClick } = props
  const supabase = createClientComponentClient()

  const [selectedId, setSelectedId] = useState("");

  const getData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user == null) {
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .neq("id", user.id)

      if (error) {
        console.log(error)
        return
      }
      const profileList: Database["public"]["Tables"]["profiles"]["Row"][] = profile

      setProfiles(profileList)

    } catch (error) {
      console.error(error)
      return
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleStyle = (id: string) => {
    setSelectedId(id)
  }

  return (
    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
      {profiles.map((item, index) => (
        <div
          id={item.id}
          className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
          style={
            { backgroundColor: selectedId === item.id ? "#eee " : "#fff" }
          }
          onClick={(e) => { handleClick(e); handleStyle(item.id); }}
          key={index}
        >
          <div className="w-1/4 min-w-max pointer-events-none">
            <Image src="/user.png" className="object-cover h-auto w-12 rounded-full" width="30" height="30" alt=""></Image>
          </div>
          <div className="w-3/4 pointer-events-none">
            <div className="text-lg font-semibold">
              {item.name}
              <span className=" block text-gray-500 font-normal text-xs truncate">ID: {item.id}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}