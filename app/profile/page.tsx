
"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

/**
 * ログイン後のマイページ
 */
const MyPage = () => {
  const supabase = createClientComponentClient();
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user === null) return

    setUserID(user.id)


    const { data: profile, error } = await supabase
      .from('profiles')
      .select()
      .eq("id", user.id)

    if (error) {
      console.log(error);
      return
    }

    if (profile.length === 1) {
      setName(profile[0].name)
    }

  }

  const onChangeName = async (event: any) => {
    event.preventDefault();
    if (userID === "") {
      return
    }
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userID, name: name })
      .select()
    if (error) {
      console.log(error);
      return
    }
  }



  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold">
        ログインに成功しました
      </h1>
      <div className="pt-10">
        <form onSubmit={onChangeName}>
          <label
            htmlFor="name"
            className="block mb-2 text-sm text-left font-medium text-gray-900"
          >
            名前
          </label>
          <div className="flex w-full">
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="山田 太郎"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <button
              className="ml-2 min-w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              更新
            </button>
          </div>
        </form>
      </div>
      <div className="pt-10">
        <form action="/auth/logout" method="post">
          <button
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  )
}


export default MyPage;