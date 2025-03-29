import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";
import { FC, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-react";

import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import { LinkSelector } from "./link-selector";
import { cn } from "@/lib/utils";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor?.isActive("bold") ?? false,
      command: () => props.editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor?.isActive("italic") ?? false,
      command: () => props.editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => props.editor?.isActive("underline") ?? false,
      command: () => props.editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: () => props.editor?.isActive("strike") ?? false,
      command: () => props.editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: () => props.editor?.isActive("code") ?? false,
      command: () => props.editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // Don't show if image is selected or no content is selected
      if (editor.isActive("image")) return false;
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  return (
    <>
      {props.editor && (
        <BubbleMenu
          {...bubbleMenuProps}
          className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
        >
          <NodeSelector
            editor={props.editor}
            isOpen={isNodeSelectorOpen}
            setIsOpen={() => {
              setIsNodeSelectorOpen(!isNodeSelectorOpen);
              setIsColorSelectorOpen(false);
              setIsLinkSelectorOpen(false);
            }}
          />
          <LinkSelector
            editor={props.editor}
            isOpen={isLinkSelectorOpen}
            setIsOpen={() => {
              setIsLinkSelectorOpen(!isLinkSelectorOpen);
              setIsColorSelectorOpen(false);
              setIsNodeSelectorOpen(false);
            }}
          />
          <div className="flex">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={item.command}
                className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
              >
                <item.icon
                  className={cn("h-4 w-4", {
                    "text-blue-500": item.isActive(),
                  })}
                />
              </button>
            ))}
          </div>
          <ColorSelector
            editor={props.editor}
            isOpen={isColorSelectorOpen}
            setIsOpen={() => {
              setIsColorSelectorOpen(!isColorSelectorOpen);
              setIsNodeSelectorOpen(false);
              setIsLinkSelectorOpen(false);
            }}
          />
        </BubbleMenu>
      )}
    </>
  );
};
