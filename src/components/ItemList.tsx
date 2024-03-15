import React from "react";
import useSWR from "swr";
import {
  useChat,
  useCurrentItem,
  useItemId,
  useItemSidebarOpened,
  useSearchKeyword,
} from "@/hooks/states";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { LoaderList } from "./LoaderList";
import { endpoint } from "@/constants/const";
import useDebounce from "./useDebounce";

// 상태별 스타일
const statuses: { [key: string]: string } = {
  offline: "text-yellow-500 bg-yellow-100/10",
  online: "text-orange-400 bg-orange-400/10",
  error: "text-rose-400 bg-rose-400/10",
};

// 환경별 스타일
const environments: { [key: string]: string } = {
  Yes: "text-orange-400 bg-orange-400/10 ring-gray-400/20",
  No: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
  Special: "text-violet-400 bg-violet-400/10 ring-violet-400/30",
  Approve: "text-orange-400 bg-orange-400/10 ring-orange-400/30",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function ItemList() {
  const { data: itemId, setData: setItemId } = useItemId();
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();
  const { data: currentItem, setData: setCurrentItem } = useCurrentItem();
  const debouncedSearchKeyword = useDebounce<string>(searchKeyword, 500);
  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();
  const { data: chat, setData: setChat } = useChat();
  const fetcherChat = async (searchQuery: string) => {
    const chatParams: ChatParams = {
      content: searchQuery,
      macro: false, // 기본값 설정
    };
    const response = await fetch(endpoint + "search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatParams),
    });

    const data: Chat[] = await response.json();
    setChat(data);
    return data;
  };
  const { data, error } = useSWR(
    debouncedSearchKeyword ? debouncedSearchKeyword : null,
    fetcherChat,
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  if (searchKeyword === "")
    return (
      <div
        style={{ height: "calc(100vh - 15rem)" }}
        className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <p className="text-gray-300 text-center">
          찾으시는 아이템이나 유저를 검색해보세요.
        </p>
      </div>
    );

  if (error)
    return (
      <div
        style={{ height: "calc(100vh - 15rem)" }}
        className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>

        <p className="text-gray-300 text-center">
          잘못된 결과를 받았습니다. 다시 시도해주세요.
        </p>
      </div>
    );

  if (!data) return <LoaderList />;
  if (data.length === 0) {
    return (
      <div
        style={{ height: "calc(100vh - 15rem)" }}
        className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>

        <p className="text-gray-300 text-center">검색 결과가 없습니다.</p>
      </div>
    );
  }
  return (
    <ul role="list" className="divide-y divide-white/5">
      {data.flat().map((cur: any, _i: number) => {
        // "X"의 개수에 따라 상태 설정

        return (
          <li
            onClick={() => {
              setItemSidebarOpened(true);
              setItemId(_i);
              setCurrentItem(cur);
            }}
            key={cur.id}
            className="cursor-pointer hover:bg-gray-800 relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div
                  className={classNames(
                    statuses["online"], // 동적 상태 적용
                    "animate-pulse flex-none rounded-full p-1"
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <div className="flex flex-auto min-w-0">
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-white flex-auto overflow-hidden">
                    <a href={"#"} className="flex gap-x-2 items-center">
                      <span className="truncate">{cur.content}</span>
                    </a>
                  </h2>
                </div>
              </div>
            </div>

            <div
              className={classNames(
                environments["Yes"],
                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {cur.globalName}
            </div>

            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </li>
        );
      })}
    </ul>
  );
}
