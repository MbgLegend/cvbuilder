import { useSession } from "next-auth/react"
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar,
} from'react-simple-wysiwyg'

const TextEditor = ({ height, value, onChange, placeholder }) => {
    const { data:session } = useSession()

    return (
        <EditorProvider>
           <Editor
                className={`overflow-y-auto text-[0.9rem] leading-[25px]`}
                style={{ height: `${height}px` }}
                value={value}
                onChange={onChange}
            >
                 {session?.user.plan === "pro" ? (
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                ) : (
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <BtnBold />
                        <BtnItalic />
                    </Toolbar>
                )}
            </Editor> 
        </EditorProvider>
    )
}   

export default TextEditor