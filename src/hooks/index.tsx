import {
  useState,
  useEffect,
  ChangeEvent,
  RefObject
} from "react";

export const useForceUpdate = () :() => void => {
    const [, setValue] = useState(0); // integer state
    return () => setValue((v) => v + 1); // update the state to force render
};

export const useInput = (initialValue : string | boolean | [] | number) : unknown => {
    const [value, setValue] = useState(initialValue);
    const forceUpdate = useForceUpdate();

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: (event : ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
                forceUpdate();
            }
        }
    };
};

export const useKeyPress = (key: string, action : (e: KeyboardEvent) => void) : unknown => ({
    bind: {
        onKeyPress: (event : KeyboardEvent) => {
            if (event.key === key) {
                action(event)
            }
        }
    }
});

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) : void => {
    useEffect(
      () => {
          const listener = (event: MouseEvent | TouchEvent) => {
              if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                  return;
              }
              handler(event);
          };
          document.addEventListener("mousedown", listener);
          document.addEventListener("touchstart", listener);
          return () => {
              document.removeEventListener("mousedown", listener);
              document.removeEventListener("touchstart", listener);
          };
      },
      [ref, handler]
    );
}
