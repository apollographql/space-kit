/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useEffect } from "react";
import * as typography from "./typography";
import * as colors from "./colors";

interface Props {
    size: "small" | "standard" | "large";
    title: string;
    description?: string;
    children: React.ReactElement;
    onClose: (() => void);
}

const modalBackdrop = css`
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        
        &:after {
            position: fixed;
            z-index: 10;
            content: '';
            background-color: ${colors.grey.lighter};
            opacity: 0.7;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
        }
    `;

const ESCAPE_KEY_CODE = 27;

const getTitleTypography = ( size: Props["size"]) => {
    if(size === "small") {
        return {...typography.base.large,
                fontWeight: 600};
    }
    return {...typography.base.xxlarge};
}

const getModalWidth = ( size: Props["size"]) => {
    if(size === "small") {
        return 460;
    }
    else if(size === "standard") {
        return 600;
    }
    return 800;
}

export function Modal({title, description, children, onClose, size}:Props): ReturnType<React.FC> {

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.keyCode === ESCAPE_KEY_CODE) {
              onClose();
            }
        }

        // add an event listener for all clicks
        document.addEventListener('keydown', handleKeyDown);
    
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    function handleChildClick(event: any) {
        // only close the modal if you click on the parent div, not the modal body
        event.stopPropagation();
    }

    return (
        <div 
        onClick={onClose}
        css={modalBackdrop}>
          <div onClick={handleChildClick} css={{
              width: getModalWidth(size),
              opacity: 1,
              backgroundColor: "white",
              padding: size === "large" ? "40px" : "32px",
              borderRadius: 12,
              position: "absolute",
              left: "50%",
              top: "20%",
              transform: "translate(-50%)",
              minWidth: 400,
              maxHeight: "100%",
              overflowY: "scroll",
              zIndex: 11,
              boxShadow: `0 16px 32px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(18, 21, 26, 0.04)`,
          }}>
            <div css={{
                textAlign: size === "large" ? "center" : "left",
                paddingBottom: "24px"
            }}>
                {title &&
              <div>
                <div css={{
                        ...getTitleTypography(size),
                        marginBottom: "4px",
                        color: colors.black.base,
                    }}>{title}</div>
              </div>}
              {description && <div css={{...typography.base.base, color: colors.black.base}}>{description}</div>}
            </div>
            {children}
          </div>
        </div>
      );
}