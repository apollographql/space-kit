import React from "react";
interface Props {
    primaryAction?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    children?: React.ReactNode;
    description?: React.ReactNode;
    bottomLeftText?: React.ReactNode;
    onClose?: () => void;
    size: "small" | "medium" | "large";
    title: React.ReactNode;
}
export declare function Modal({ title, description, children, onClose, size, bottomLeftText, primaryAction, secondaryAction, }: Props): ReturnType<React.FC>;
export {};
