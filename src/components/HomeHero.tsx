"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { activityItems, banItems, discord, endpoint } from "@/constants/const";
import ItemDrawer from "./ItemDrawer";
import {
  useChat,
  useItemId,
  useItemSidebarOpened,
  useNotiOpened,
  useSearchKeyword,
} from "@/hooks/states";
import { ItemList } from "./ItemList";
import DrawerContent from "./DrawerContent";
import Notification from "./Notification";

const navigation = [
  { name: "통합검색", href: "#", icon: FolderIcon, current: true },
  // { name: "잠쩔", href: "#", icon: SignalIcon, current: false },
  // { name: "경매장", href: "#", icon: ServerIcon, current: false },
];
const teams = [
  // { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
  // { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
  // { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];
const statuses: { [key: string]: string } = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};

const environments: { [key: string]: string } = {
  Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  Production: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};
const deployments = [
  {
    id: 1,
    href: "#",
    projectName: "ios-app",
    teamName: "아이템 이름1",
    status: "offline",
    statusText: "1/29",
    description: "Deploys from GitHub",
    environment: "Preview",
  },
  // More deployments...
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeHero() {
  const { data: notiOpened, setData: setNotiOpened } = useNotiOpened();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rankingFlag, setRankingFlag] = useState(false);
  const { data: chat, setData: setChat } = useChat();
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();
  const { data: itemId, setData: setItemId } = useItemId();

  const fetcherChat = async (searchQuery: string) => {
    const chatParams: ChatParams = {
      content: searchQuery,
      macro: false, // 기본값 설정
    };
    const response = await fetch(endpoint + "search?keyword="+searchKeyword, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(chatParams),
    });

    const data: Chat[] = await response.json();
    setChat(data);
  };

  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (notiOpened) {
      // 3초 후에 알림을 자동으로 숨기기
      timer = setTimeout(() => {
        setNotiOpened(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되거나 notiOpened가 변경될 때 타이머 정리
  }, [notiOpened, setNotiOpened]);

  return (
    <>
      <html className="h-full bg-gray-900">
        <ItemDrawer />
        <Notification />
        <body className="h-full">
          <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50 xl:hidden"
                onClose={setSidebarOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                          <button
                            type="button"
                            className="-m-2.5 p-2.5"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </Transition.Child>
                      {/* Sidebar component, swap this element with another sidebar if you like */}
                      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                        <div className="flex h-16 shrink-0 items-center">
                          <a href="/">
                            <img
                              className="h-8 w-auto"
                              src="/maple.png"
                              alt="로고"
                            />
                          </a>
                          <a href="/">
                            <p className="ml-[8px] text-white font-semibold">
                              {" "}
                              MapleSearch.KR
                            </p>
                          </a>
                        </div>
                        <nav className="flex flex-1 flex-col">
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                          >
                            <li>
                              <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        item.current
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                    >
                                      <item.icon
                                        className="h-6 w-6 shrink-0"
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                            <li>
                              {/* <div className="text-xs font-semibold leading-6 text-gray-400">
                                Your teams
                              </div> */}
                              {/* <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {teams.map((team) => (
                                  <li key={team.name}>
                                    <a
                                      href={team.href}
                                      className={classNames(
                                        team.current
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                    >
                                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                        {team.initial}
                                      </span>
                                      <span className="truncate">
                                        {team.name}
                                      </span>
                                    </a>
                                  </li>
                                ))}
                              </ul> */}
                            </li>
                            <li className="-mx-6 mt-auto">
                              <a
                                href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                              >
                                <img
                                  className="h-8 w-8 rounded-full bg-gray-800"
                                  src="/maple.png"
                                  alt=""
                                />
                                <span className="sr-only">내 프로필</span>
                                <span aria-hidden="true">
                                  로그인 기능 개발 예정
                                </span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
                <div className="flex h-16 shrink-0 items-center">
                  <a href="/">
                    <img className="h-8 w-auto" src="/maple.png" alt="로고" />
                  </a>
                  <a href="/">
                    <p className="ml-[8px] text-white font-semibold">
                      {" "}
                      <span className="text-orange-400">MapleSearch</span>.KR
                    </p>
                  </a>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      {/* <div className="text-xs font-semibold leading-6 text-gray-400">
                        Your teams
                      </div> */}
                      {/* <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul> */}
                    </li>
                    <li className="-mx-6 mt-auto">
                      <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                      >
                        <img
                          className="h-8 w-8 rounded-full bg-gray-800"
                          src="/maple.png"
                          alt=""
                        />
                        <span className="sr-only">내 프로필</span>
                        <span aria-hidden="true">로그인 기능 개발 예정</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="xl:pl-72">
              {/* Sticky search header */}
              <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-white xl:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    <input
                      autoComplete="off"
                      id="search-field"
                      className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                      placeholder="찾으시는 아이템을 검색해보세요"
                      value={searchKeyword}
                      onChange={(e) => {
                        setChat([]);
                        const value = e.currentTarget.value;
                        // 영문, 한글, 숫자, 그리고 공백을 허용하는 정규 표현식
                        const regex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;

                        if (regex.test(value)) {
                          // 입력값이 정규 표현식에 맞는 경우에만 상태 업데이트
                          setSearchKeyword(value);
                          setItemSidebarOpened(false);
                        }
                      }}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     setSearchKeyword(e.currentTarget.value);
                      //     setItemSidebarOpened(false);
                      //   }
                      // }}
                    />
                  </div>
                </div>
              </div>

              <main className="lg:pr-96">
                <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                  <h1 className="text-base font-semibold leading-7 text-white">
                    채팅 내용   , 3/20, 13:15 ~ 13:40 현재 서버 배포작업으로 인한 임시점검중입니다. 잠시후 이용해주세요 :)
                  </h1>

                  {/* Sort dropdown */}
                  <Menu as="div" className="relative">
                    {/* <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                      정렬 기준
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button> */}
                    <button
                      onClick={() => {
                        setNotiOpened(true);
                        fetcherChat(searchKeyword);
                      }}
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
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      새로고침
                    </button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              Name
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              Date updated
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              Environment
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </header>
                <ItemList />
                {/* Deployment list */}
              </main>

              {/* Activity feed */}

              <aside
                className={`lg:block hidden bg-black/10 lg:fixed lg:bottom-0 lg:right-0 ${
                  searchKeyword === "" || chat.length === 0
                    ? "lg:top-16"
                    : "lg:top-0"
                } lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5`}
              >
                {searchKeyword === "" || chat.length === 0 ? (
                  <div>
                    <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                      <h2 className="text-base font-semibold leading-7 text-white">
                        {rankingFlag === false ? "아이템 랭킹" : "신규 아이템"}
                      </h2>
                      <a
                        href="#"
                        onClick={() => {
                          setRankingFlag(!rankingFlag);
                        }}
                        className="text-sm font-semibold leading-6 text-orange-400"
                      >
                        {rankingFlag === false ? "신규 아이템" : "아이템 랭킹"}
                      </a>
                    </header>
                    <ul role="list" className="divide-y divide-white/5">
                      {(rankingFlag === false ? activityItems : banItems).map(
                        (item, _i) => (
                          <li
                            key={item.commit}
                            className="cursor-pointer hover:bg-gray-800 px-4 py-4 sm:px-6 lg:px-8"
                            onClick={() => {
                              // setSearchKeyword(activityItems[_i].user.name);
                            }}
                          >
                            <div className="flex items-center gap-x-3">
                              <img
                                src={item.user.imageUrl}
                                alt=""
                                className="h-6 w-6 flex-none rounded-full bg-gray-800"
                              />
                              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                                {item.user.name}
                              </h3>
                              <time
                                dateTime={item.dateTime}
                                className="flex-none text-xs text-gray-600"
                              >
                                {item.date}
                              </time>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  <DrawerContent />
                )}
              </aside>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
