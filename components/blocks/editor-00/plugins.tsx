import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"

import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin"

import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin"
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin"
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph"
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading"
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list"
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list"
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list"
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote"
import { ClearFormattingToolbarPlugin } from "@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin"
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin"
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin"
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin"
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin"
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin"
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin"
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin"
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin"
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin"
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin"
import { LinkPlugin } from "@/components/editor/plugins/link-plugin"
import { SubSuperToolbarPlugin } from "@/components/editor/plugins/toolbar/subsuper-toolbar-plugin"
import { BlockInsertPlugin } from "@/components/editor/plugins/toolbar/block-insert-plugin"
import { InsertImage } from "@/components/editor/plugins/toolbar/block-insert/insert-image"
import { ImagesPlugin } from "@/components/editor/plugins/images-plugin"
import { InsertEmbeds } from "@/components/editor/plugins/toolbar/block-insert/insert-embeds"
import { AutoEmbedPlugin } from "@/components/editor/plugins/embeds/auto-embed-plugin"
import { YouTubePlugin } from "@/components/editor/plugins/embeds/youtube-plugin"

export function Plugins({editable = true}:{editable?: boolean}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* toolbar plugins */}
      {editable && (
       <ToolbarPlugin>
        {() => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 border-b-2 border-neutral-200 dark:border-neutral-800 p-1 flex-wrap">
            <HistoryToolbarPlugin />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>
            <FontFamilyToolbarPlugin />
            <FontSizeToolbarPlugin />
            <FontColorToolbarPlugin />
            <FontBackgroundToolbarPlugin />
            <div className="flex">
              <FontFormatToolbarPlugin format="bold" />
              <FontFormatToolbarPlugin format="italic" />
              <FontFormatToolbarPlugin format="underline" />
              <FontFormatToolbarPlugin format="strikethrough" />
            </div>
            <ClearFormattingToolbarPlugin />
            <ElementFormatToolbarPlugin />
            <LinkToolbarPlugin />
            <SubSuperToolbarPlugin />
            <BlockInsertPlugin>
              <InsertImage />
              <InsertEmbeds />
            </BlockInsertPlugin>
          </div>
        )}
      </ToolbarPlugin>
      )}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"입력 시작..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
        <HistoryPlugin />

        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />

        <ImagesPlugin />
        <AutoEmbedPlugin />
        <YouTubePlugin />
      </div>
      {/* actions plugins */}
    </div>
  )
}
