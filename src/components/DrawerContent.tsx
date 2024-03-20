import { Disclosure } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CurrencyEuroIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import {
  useChat,
  useCurrentItem,
  useItemId,
  useItemSidebarOpened,
  useSearchKeyword,
} from "@/hooks/states";
import { discord } from "@/constants/const";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const environments: { [key: string]: string } = {
  Yes: "text-orange-400 bg-orange-400/10 ring-gray-400/20",
  No: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
  Special: "text-violet-400 bg-violet-400/10 ring-violet-400/30",
  Approve: "text-orange-400 bg-orange-400/10 ring-orange-400/30",
};
function filterRules(rules: string[]): string[] {
  const priorityRules = rules.filter(
    (rule) => rule.includes("O") || rule.includes("X")
  );
  const otherRules = rules.filter((rule) => !priorityRules.includes(rule));

  return [...priorityRules, ...otherRules].slice(0, 2);
}
export default function DrawerContent() {
  const escapeRegExp = (string: string) => {
    // RegExp에 사용되는 특수 문자를 이스케이프합니다.
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightSearchKeyword = (content: string, keyword: string) => {
    if (!keyword.trim()) {
      return <span>{content}</span>;
    }

    // keyword에서 RegExp에 사용될 수 있는 특수 문자를 이스케이프합니다.
    const escapedKeyword = escapeRegExp(keyword);
    // 대소문자를 구분하지 않고, keyword를 포함하는 모든 부분을 찾습니다.
    const parts = (content || "").split(
      new RegExp(`(${escapedKeyword})`, "gi")
    );

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span key={index} className="bg-orange-400">
              {part}
            </span>
          ) : (
            part // 검색어와 일치하지 않는 텍스트는 그대로 렌더링
          )
        )}
      </span>
    );
  };

  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();
  const { data: currentItem, setData: setCurrentItem } = useCurrentItem();
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();
  const { data: itemId, setData: setItemId } = useItemId();

  const statuses: { [key: string]: string } = {
    offline: "text-yellow-500 bg-yellow-100/10",
    online: "text-orange-400 bg-orange-400/10",
    error: "text-rose-400 bg-rose-400/10",
  };
  const { data: chat, setData: setChat } = useChat();

  function formatDateTime(dateTimeStr: string) {
    const date = new Date(dateTimeStr);

    // 월과 일을 구합니다. getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 시간과 분을 구합니다.
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 분이 한 자리일 경우 앞에 0을 추가

    // 원하는 형식으로 문자열을 반환합니다.
    return `${month}/${day} ${hours}:${minutes}`;
  }

  return (
    <div className="mt-[64px] flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl border-l border-white/5">
      <div className="items-center justify-between border-b border-white/5  px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex items-start justify-between">
          <h2
            id="slide-over-heading"
            className="text-base font-semibold leading-6 text-white"
          >
            상세 정보 확인
          </h2>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative rounded-md text-gray-400 hover:text-gray-500"
              onClick={() => setItemSidebarOpened(false)}
            >
              <span className="absolute -inset-2.5" />
              <span className="sr-only">패널 닫기</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {/* Main */}
      {chat.length === 0 ? (
        <></>
      ) : (
        <div>
          <div className="pb-1 sm:pb-6">
            <div>
              {/* <div className="relative h-40 sm:h-56 overflow-x-auto flex flex-row bg-white">
            {Array.isArray((currentItem as any).exampleImg) &&
            (currentItem as any).exampleImg.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-300 sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            ) : (
              Array.isArray((currentItem as any).exampleImg) &&
              (currentItem as any).exampleImg.map(
                (imgUrl: string, index: number) => (
                  <img
                    key={index}
                    className="object-contain max-h-full w-auto h-full" // 이미지가 부모의 높이에 맞춰져서 너비가 자동 조절되도록 설정
                    src={imgUrl}
                    alt={`이미지 ${index + 1}`}
                  />
                )
              )
            )}
          </div> */}

              <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                <div className="sm:flex-1">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-lg font-bold text-white sm:text-lg">
                        채팅 내용
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        @{chat[itemId]?.globalName ?? "익명"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(
                          chat[itemId]?.timeStamp.toString() ?? "날짜"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                    <a
                      className="w-full"
                      href={
                        discord +
                        (chat[itemId] || { guildId: "" }).guildId +
                        "/" +
                        (chat[itemId] || { channelId: "" }).channelId +
                        "/" +
                        (chat[itemId] || { msbId: "" }).msgId
                      }
                    >
                      <button
                        // onClick={() => {
                        //   alert("나의 물품 담기 성공!");
                        // }}
                        type="button"
                        className="gap-x-2 inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
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
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                          />
                        </svg>
                        채팅 채널 이동
                      </button>
                    </a>

                    {/* <button
                  onClick={() => {
                    const urlToCopy = `https://trippy.kr/check/${
                      (currentItem as any)?.korName ?? ""
                    }`;
                    navigator.clipboard
                      .writeText(urlToCopy)
                      .then(() => {
                        console.log(
                          "URL이 클립보드에 복사되었습니다!"
                        );
                      })
                      .catch((err) => {
                        console.error(
                          "클립보드에 복사하는 데 실패했습니다:",
                          err
                        );
                      });
                  }}
                  type="button"
                  className="gap-x-2 inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  
                </button> */}
                  </div>
                  <p className="text-white mt-[16px] ">
                    {highlightSearchKeyword(
                      chat[itemId]?.content.toString(),
                      searchKeyword
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" pb-5 pt-5 sm:px-0 sm:pt-0">
        <dl className="px-8 sm:px-6 space-y-8  sm:space-y-6">
          <div>
            <dt
              onClick={() => {
                console.log((currentItem as any)?.forbidRule);
              }}
              className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
            >
              금지 규칙
            </dt>
            <dd className="text-sm sm:col-span-2 text-left">
              <li className="relative flex items-center space-x-4 py-2 justify-start">
                {Array.isArray(
                  (currentItem as any)?.forbidRule
                ) &&
                  filterRules(
                    (currentItem as any)?.forbidRule
                  ).map((rule: string, index: number) => {
                    const lastChar = rule[rule.length - 1];
                    let classNameKey =
                      lastChar === "O"
                        ? "Yes"
                        : lastChar === "X"
                        ? "No"
                        : rule === "특별조항"
                        ? "Special"
                        : "Approve";

                    return (
                      <div
                        key={index}
                        className={classNames(
                          environments[classNameKey],
                          "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        {rule}
                      </div>
                    );
                  })}
              </li>
            </dd>
          </div>
          <div>
            <Disclosure as="div" key={0} className="">
              {({ open }) => (
                <>
                  <div className="flex justify-between items-start">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <dt className="text-sm font-medium text-gray-500 sm:flex-shrink-0 whitespace-nowrap">
                        <span className=" flex items-center">
                          {open ? (
                            <p className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              닫기
                            </p>
                          ) : (
                            <p className="underline text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              특수 규칙
                            </p>
                          )}
                        </span>
                      </dt>
                    </Disclosure.Button>
                  </div>
                  <Disclosure.Panel as="dd" className="">
                    <p className="text-white py-2">
                      {(currentItem as any)?.specialRule === ""
                        ? "없음"
                        : (currentItem as any)?.specialRule ??
                          "없음"}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </dl>
        <div className="w-full py-4 shadow-xs"></div>
        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
          <div className="sm:flex-1">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  리뷰{" "}
                </h3>
                <div className="flex gap-x-4">
                  <div
                    onClick={() => {
                      alert("이 물품을 추천하시겠습니까?");
                    }}
                    className="flex gap-x-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#E50012"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                    <p className="text-white">1</p>
                  </div>
                  <div
                    onClick={() => {
                      alert(
                        "이 물품을 추천하지 않으시겠습니까?"
                      );
                    }}
                    className="flex gap-x-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#18B0AE"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                      />
                    </svg>
                    <p className="text-white">0</p>
                  </div>
                </div>
              </div>
              <div className="border-[1px] border-[#585F6D] mt-6  rounded-md flex justify-start items-start p-2">
                <p className="text-white">
                  {(currentItem as any)?.korName ?? ""}{" "}
                  반입해봤는데 괜찮았어요! 다들 안심하셔도
                  될듯해요.
                </p>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-[#585F6D]">24/02/27 02:41</p>
                <div className=" flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#585F6D"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#585F6D"
                    className="ml-2 mr-2 w-6 h-6 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
              <div className="border-[1px] border-[#585F6D] mt-8  rounded-md flex justify-start items-start p-2">
                <p className="text-white">
                  캐리어에 넣고 가니까 보안검색대에 걸려서 5분
                  정도 대기했네요. 다들 조심하세요.
                </p>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-[#585F6D]">24/02/27 05:32</p>
                <div className=" flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#585F6D"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#585F6D"
                    className="ml-2 mr-2 w-6 h-6 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
              <div className="h-[150px]"></div>
            </div>
          </div>
        </div>
      </div> */}
        </div>
      )}
    </div>
  );
}
