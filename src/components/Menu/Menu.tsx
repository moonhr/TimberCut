import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CiCirclePlus } from "react-icons/ci";

export const Menu = () => {
  return (
    <div className="z-30 fixed bottom-4 right-4 block overflow-visible">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="inline-flex justify-center items-center touch-auto">
            <CiCirclePlus className="w-10 h-10" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2 p-4">
          <DropdownMenuItem className="flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300">
            SAVE
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300">
            EXPORT
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300">
            IMPORT
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
