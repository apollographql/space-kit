/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { withKnobs, select } from "@storybook/addon-knobs/react";
import { Modal } from "./Modal";
import React, { useState, useEffect, useRef } from "react";
import * as colors from "./colors";

interface Props {
    title: string;
    description: string;
    size: "small" | "standard" | "large";
}

export function ModalStory({title, description, size}:Props): ReturnType<React.FC> {
    const [visible, setVisible] = useState(false);
    // TODO: use space kit button when it gets released
    return(
        <div >
        <button type="button" css={{
            textTransform: "uppercase",
        }}
        onClick={()=>setVisible(true)}>{`${size} modal`}</button>
        { visible &&
        <Modal
            onClose={()=>setVisible(false)}
            size={size} 
            title={title} 
            description={description}>
            <div>
                <h3>Body</h3>
                Click outside the body of this modal or press the esc key to exit.
            </div>
        </Modal>}</div>
    )
  };
  


storiesOf("Space Kit/Modal", module)
  .addDecorator(withKnobs)
  .add("interactive", () => (
    <div css={{position: "absolute", left: "200px"}}>
        <ModalStory title="Modal Title" description="modal description" size={"small"} />
        <ModalStory title="Modal Title" description="modal description" size={"standard"} />
        <ModalStory title="Modal Title" description="modal description" size={"large"} />
    </div>
  ))
  .add("static (small)", () => (
    <Modal 
        onClose={()=>console.log("on close")} 
        size="small"
        title="Are you sure you want to remove Jeremy?"
        description="Jeremy will no longer have access to the MGD-Private. You can always add them back to the organization later.">
            <div css={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <div css={{
                    marginRight: "12px",
                    display: "flex"
                }}>
                    <button css={{
                        padding: "8px",
                        backgroundColor: "white"
                    }}>Cancel</button>
                </div>
                <div css={{
                    display: "flex"
                }}>
                    <button css={{
                        padding: "8px",
                        backgroundColor: "red"
                    }}> Yes, remove
                    </button>
                </div>
            </div>
        </Modal>

  ))
  .add("static (standard)", () => (
    <Modal 
        onClose={()=>console.log("on close")} 
        size="standard"
        title="Modal Title"
        description="Description of this modal or call to action">
            <div css={{padding: "20px"}}>
                <div css={{minHeight: "300px"}}/>
            </div>        
    </Modal>

  ))
  .add("static (large)", () => (
    <Modal 
        onClose={()=>console.log("on close")} 
        size="large"
        title="Modal Title"
        description="Description of this modal or call to action">
            <div css={{padding: "20px"}}>
                <div css={{minHeight: "500px"}}/>
            </div>
        </Modal>

  ));
  