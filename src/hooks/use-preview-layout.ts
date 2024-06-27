import { useEffect } from "react";
import useDisclosure from "./use-disclosure";

const usePreviewLayout = () => {
  const handleOpenPreview = () => {
    localStorage.setItem("preview-layout", "open");
  };
  const handleClosePreview = () => {
    localStorage.setItem("preview-layout", "close");
  };

  const [isOpen, { open, close, toggle }] = useDisclosure(false, {
    onOpen: handleOpenPreview,
    onClose: handleClosePreview,
  });

  useEffect(() => {
    const currentPreviewLayout = localStorage.getItem("preview-layout");
    if (currentPreviewLayout) {
      if (currentPreviewLayout === "open") {
        open();
      } else {
        close();
      }
    } else {
      open();
    }
  }, [close, open]);

  return [isOpen, { toggle }] as const;
};

export default usePreviewLayout;
