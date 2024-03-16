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
import DrawerContent from "./DrawerContent";

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
export default function ItemDrawer() {
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
    <Transition.Root show={itemSidebarOpened} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 lg:hidden"
        onClose={setItemSidebarOpened}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-350 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-350 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen lg:max-w-sm">
                  <DrawerContent />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
