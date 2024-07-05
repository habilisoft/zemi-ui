import copy from 'copy-to-clipboard';
import { PiCopyBold } from "react-icons/pi";
import { toast } from 'sonner';

function CopyButton(
  {
    content = "",
    successMessage = "Copied to clipboard"
  } : {
    content: string | undefined,
    successMessage?: string
  }
) {

  function handleCopy() {
    copy(content);
    toast.success(successMessage);
  }

  return (
    <button
      className="text-blue-600 hover:text-blue-800"
      onClick={(handleCopy)}
    >
      <PiCopyBold className="text-gray-500 hover:text-gray-700" />
    </button>
  )
}

export { CopyButton }
