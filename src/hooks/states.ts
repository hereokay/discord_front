import useSWRImmutable from "swr/immutable";

export const useSearchKeyword = () => {
  const { data, mutate } = useSWRImmutable<string>("searchKeyword", {
    fallbackData: "",
    revalidateOnReconnect: false,
  });

  return {
    data: data || "",
    setData: mutate,
  };
};

export const useItemSidebarOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("itemSidebarOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};

export const useCurrentItem = () => {
  const { data, mutate } = useSWRImmutable<Object>("currentItem", {
    fallbackData: {},
    revalidateOnReconnect: false,
  });

  return {
    data: data || {},
    setData: mutate,
  };
};

export const useItemId = () => {
  const { data, mutate } = useSWRImmutable<number>("itemId", {
    fallbackData: 0,
    revalidateOnReconnect: false,
  });

  return {
    data: data || 0,
    setData: mutate,
  };
};

export const useChat = () => {
  const { data, mutate } = useSWRImmutable<Chat[]>("chat", {
    fallbackData: [],
    revalidateOnReconnect: false,
  });

  return {
    data: data || [],
    setData: mutate,
  };
};

export const useNotiOpened = () => {
  const { data, mutate } = useSWRImmutable<boolean>("notiOpened", {
    fallbackData: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data || false,
    setData: mutate,
  };
};
