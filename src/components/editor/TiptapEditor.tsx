"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import { forwardRef, useImperativeHandle, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
} from "lucide-react"

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
  onImageUpload?: (file: File) => Promise<string>
}

const TiptapEditor = forwardRef<any, TiptapEditorProps>(
  ({ content, onChange, onImageUpload }, ref) => {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
          HTMLAttributes: {
            class: "rounded-lg max-w-full h-auto my-4",
          },
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-blue-500 underline",
          },
        }),
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Placeholder.configure({
          placeholder: "Start writing your news content here...",
        }),
      ],
      content: content,
      editorProps: {
        attributes: {
          class:
            "prose prose-invert max-w-none min-h-[400px] focus:outline-none px-4 py-3",
        },
        handleDrop: (view, event, slice, moved) => {
          if (
            !moved &&
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files[0]
          ) {
            const file = event.dataTransfer.files[0]
            if (file.type.startsWith("image/")) {
              event.preventDefault()
              handleImageUpload(file)
              return true
            }
          }
          return false
        },
        handlePaste: (view, event) => {
          const items = event.clipboardData?.items
          if (items) {
            for (let i = 0; i < items.length; i++) {
              if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile()
                if (file) {
                  event.preventDefault()
                  handleImageUpload(file)
                  return true
                }
              }
            }
          }
          return false
        },
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML())
      },
    })

    useImperativeHandle(ref, () => ({
      clearContent: () => {
        editor?.commands.clearContent()
      },
      setContent: (content: string) => {
        editor?.commands.setContent(content)
      },
    }))

    useEffect(() => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content)
      }
    }, [content, editor])

    const handleImageUpload = async (file: File) => {
      if (onImageUpload && editor) {
        try {
          const url = await onImageUpload(file)
          editor.chain().focus().setImage({ src: url }).run()
        } catch (error) {
          console.error("Failed to upload image:", error)
        }
      }
    }

    const addLink = () => {
      const url = window.prompt("Enter URL")
      if (url) {
        editor?.chain().focus().setLink({ href: url }).run()
      }
    }

    const triggerImageUpload = () => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          handleImageUpload(file)
        }
      }
      input.click()
    }

    if (!editor) {
      return null
    }

    return (
      <div className='bg-[#1a1a1a] text-white'>
        {/* Toolbar */}
        <div className='border-b border-gray-700 p-2 flex flex-wrap gap-1'>
          {/* Text Formatting */}
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("bold") ? "bg-gray-700" : ""
            }`}
            title='Bold'>
            <Bold className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("italic") ? "bg-gray-700" : ""
            }`}
            title='Italic'>
            <Italic className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("underline") ? "bg-gray-700" : ""
            }`}
            title='Underline'>
            <UnderlineIcon className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("strike") ? "bg-gray-700" : ""
            }`}
            title='Strikethrough'>
            <Strikethrough className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("code") ? "bg-gray-700" : ""
            }`}
            title='Code'>
            <Code className='w-4 h-4' />
          </button>

          <div className='w-px h-6 bg-gray-700 mx-1'></div>

          {/* Headings */}
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("heading", { level: 1 }) ? "bg-gray-700" : ""
            }`}
            title='Heading 1'>
            <Heading1 className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("heading", { level: 2 }) ? "bg-gray-700" : ""
            }`}
            title='Heading 2'>
            <Heading2 className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("heading", { level: 3 }) ? "bg-gray-700" : ""
            }`}
            title='Heading 3'>
            <Heading3 className='w-4 h-4' />
          </button>

          <div className='w-px h-6 bg-gray-700 mx-1'></div>

          {/* Lists */}
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("bulletList") ? "bg-gray-700" : ""
            }`}
            title='Bullet List'>
            <List className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("orderedList") ? "bg-gray-700" : ""
            }`}
            title='Numbered List'>
            <ListOrdered className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("blockquote") ? "bg-gray-700" : ""
            }`}
            title='Quote'>
            <Quote className='w-4 h-4' />
          </button>

          <div className='w-px h-6 bg-gray-700 mx-1'></div>

          {/* Alignment */}
          <button
            type='button'
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive({ textAlign: "left" }) ? "bg-gray-700" : ""
            }`}
            title='Align Left'>
            <AlignLeft className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive({ textAlign: "center" }) ? "bg-gray-700" : ""
            }`}
            title='Align Center'>
            <AlignCenter className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive({ textAlign: "right" }) ? "bg-gray-700" : ""
            }`}
            title='Align Right'>
            <AlignRight className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive({ textAlign: "justify" }) ? "bg-gray-700" : ""
            }`}
            title='Justify'>
            <AlignJustify className='w-4 h-4' />
          </button>

          <div className='w-px h-6 bg-gray-700 mx-1'></div>

          {/* Link & Image */}
          <button
            type='button'
            onClick={addLink}
            className={`p-2 rounded hover:bg-gray-700 transition ${
              editor.isActive("link") ? "bg-gray-700" : ""
            }`}
            title='Add Link'>
            <LinkIcon className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={triggerImageUpload}
            className='p-2 rounded hover:bg-gray-700 transition'
            title='Insert Image'>
            <ImageIcon className='w-4 h-4' />
          </button>

          <div className='w-px h-6 bg-gray-700 mx-1'></div>

          {/* Undo/Redo */}
          <button
            type='button'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className='p-2 rounded hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
            title='Undo'>
            <Undo className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className='p-2 rounded hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
            title='Redo'>
            <Redo className='w-4 h-4' />
          </button>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />
      </div>
    )
  }
)

TiptapEditor.displayName = "TiptapEditor"

export default TiptapEditor
