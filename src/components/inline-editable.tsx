import { cn } from "@/lib/utils";
import { HTMLAttributes, KeyboardEvent, ReactNode, useState } from "react";

interface InlineEditableProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  textStyle?: string;
  placeholder?: string;
  children?: ReactNode;
  onSubmitForm: (value: string) => void;
  editor: (props: {
    onDismiss?: VoidFunction;
    onSubmit: () => void;
    onChange: (value: string) => void;
    value: string;
    isUpdating?: boolean;
  }) => ReactNode;
}

const InlineEditable = ({
  text,
  textStyle,
  children,
  placeholder,
  onSubmitForm,
  editor,
  className,
  ...props
}: InlineEditableProps) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Handle when key is pressed
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onSubmitForm(value);
    setEditing(false);
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <div {...props} className={cn("leading-none", className)}>
      {isEditing ? (
        <div
          // onBlur={() => setEditing(false)} // is onBlur when a component lose focus
          onBlur={handleSubmit}
          onKeyDown={(e) => handleKeyDown(e)}
        >
          {editor({ onChange: setValue, value, onSubmit: handleSubmit })}
          {children}
        </div>
      ) : (
        <div className={cn(textStyle)} onClick={() => setEditing(true)}>
          <span>{text || placeholder || "Editable content"}</span>
        </div>
      )}
    </div>
  );
};

export default InlineEditable;
