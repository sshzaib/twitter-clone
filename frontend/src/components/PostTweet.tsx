import { useState } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { FaRegCircleUser, FaRegImage } from "react-icons/fa6";
import { useCreateTweet } from "../hooks/tweet";
import { useMutation } from "@tanstack/react-query";
import { gqlClient } from "../clients/graphqlClient";
import { CreateTweet } from "../graphql/mutation/tweet";


export const PostTweet = () => {
    const [tweet, setTweet] = useState("")
    const handleTextareaOnchange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setTweet(e.target.value);
    };
    
    const createTweetMutation = useCreateTweet(tweet)

    const handlePostTweet = async () => {
        await createTweetMutation.mutateAsync()
        setTweet("")
    }

    return (
        <>
            <div>
                <div className="grid grid-cols-12 mt-2 px-4 border-b border-slate-900 ">
                    <div className="col-span-1 text-3xl">
                        <FaRegCircleUser />
                    </div>
                <div className="col-span-11 ">
                        <textarea
                            placeholder="What is happening?!"
                            value={tweet}
                            className="bg-transparent w-full"
                            rows={2}
                            onChange={handleTextareaOnchange}
                        />
                    <div className="border-b  flex items-center gap-2 font-semibold text-sm border-gray-800 text-[#1D9BF0] pb-4">
                        <FaGlobeAsia />
                        Everyone can reply
                    </div>
                    <div className="flex items-center my-3  justify-between">
                    <div className="text-[#1D9BF0] text-l hover:bg-[#031018] rounded-full cursor-pointer p-3">
                        <FaRegImage />
                    </div>
                    <div>
                        <button
                        className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-bold"
                         onClick={handlePostTweet}
                        >
                        Post
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )

}