import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import { useState, useMemo, Dispatch, SetStateAction, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

import styles from "./richEditor.module.scss";
import { uploadImg } from "~api/product.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const cx = classNames.bind(styles);

interface RichEditorProps {
  rawHtml: string;
  setRawHtml: any;
}

const RichEditor = ({ rawHtml, setRawHtml }: RichEditorProps) => {
  const Editor = useMemo(() => {
    return dynamic(
      () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
      { ssr: false }
    );
  }, []);

  const aixosPrivate = useAxiosPrivate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleOnchange = (e: EditorState) => {
    setEditorState(e);
    setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(rawHtml);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, []);

  const uploadImageCallBack = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    const imgData = await uploadImg(aixosPrivate, formData);
    return Promise.resolve({
      data: {
        link: `${
          process.env.NEXT_PUBLIC_HOST_SERVER! +
          process.env.NEXT_PUBLIC_FILE__IMAGES
        }/${imgData.data.images[0]}`,
      },
    });
  };

  return (
    <div className="row">
      <div className="col-6">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleOnchange}
          editorClassName={cx("text-editor")}
          wrapperClassName={cx("wrapper-editor")}
          toolbarClassName={cx("toolbar-editor")}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
              previewImage: true,
            },
          }}
        />
      </div>
      <div className="col-6">
        <div
          id={cx("preview")}
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        ></div>
      </div>
    </div>
  );
};

export default RichEditor;
